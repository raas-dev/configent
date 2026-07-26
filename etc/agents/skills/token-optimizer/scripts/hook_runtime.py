"""Portable runtime bounds for short-lived hook processes.

This module deliberately uses only the Python standard library.  HookDeadline
provides the same hard wall-clock boundary on every platform; LeaseLock uses
portable exclusive-create semantics instead of platform-specific advisory
locking.
"""

from __future__ import annotations

import hashlib
import json
import os
import random
import secrets
import threading
import time
from contextlib import contextmanager
from pathlib import Path


_DEADLINE_LOCAL = threading.local()


class HookDeadline:
    """Hard process deadline enforced by a daemon watchdog thread."""

    def __init__(self, seconds: float, message: bytes | None = None):
        self.seconds = max(0.0, float(seconds))
        self.end = time.monotonic() + self.seconds
        self.message = message or (
            b"[Token Optimizer] hook budget exceeded; skipping\n"
        )
        self._cancelled = threading.Event()
        self._thread = threading.Thread(
            target=self._watch,
            name="token-optimizer-hook-deadline",
            daemon=True,
        )
        self._started = False
        self._previous = None

    def start(self):
        if not self._started:
            self._started = True
            self._previous = getattr(_DEADLINE_LOCAL, "current", None)
            _DEADLINE_LOCAL.current = self
            self._thread.start()
        return self

    def remaining(self) -> float:
        return max(0.0, self.end - time.monotonic())

    def expires_wall(self) -> float:
        return time.time() + self.remaining()

    def _emit_diagnostic(self):
        try:
            os.write(2, self.message)
        except OSError:
            pass

    def _watch(self):
        if not self._cancelled.wait(self.remaining()):
            # The diagnostic belongs on the timeout path only - emitting it at
            # arm time made every NORMAL completion print "budget exceeded".
            # It runs in a bounded side thread so a full/undrained stderr pipe
            # can never delay termination: if the write blocks, the daemon
            # thread is abandoned and os._exit still fires. Losing the message
            # is acceptable; failing to exit is not.
            emitter = threading.Thread(
                target=self._emit_diagnostic,
                name="token-optimizer-hook-deadline-msg",
                daemon=True,
            )
            emitter.start()
            emitter.join(0.05)
            os._exit(0)

    def cancel(self):
        if not self._started:
            return
        self._cancelled.set()
        self._thread.join(timeout=0.1)
        if getattr(_DEADLINE_LOCAL, "current", None) is self:
            _DEADLINE_LOCAL.current = self._previous

    def __enter__(self):
        return self.start()

    def __exit__(self, *_exc):
        self.cancel()


def current_deadline() -> HookDeadline | None:
    """Return the active deadline for the calling thread, if any."""

    deadline = getattr(_DEADLINE_LOCAL, "current", None)
    if deadline is not None and deadline.remaining() > 0:
        return deadline
    return None


class LeaseLock:
    """Portable, bounded, fail-open lock backed by an exclusive-create file."""

    def __init__(
        self,
        path,
        *,
        deadline: HookDeadline | None = None,
        acquire_timeout: float = 0.075,
        lease_seconds: float = 10.0,
        reclaim_grace: float = 0.25,
        cohort_throttle: bool = True,
    ):
        # Preserve an already-materialized concrete path. This also lets tests
        # simulate Windows by changing os.name after pathlib created PosixPath
        # objects, without asking pathlib to instantiate an unsupported flavor.
        self.path = path if hasattr(path, "read_text") else Path(path)
        self.deadline = deadline
        self.acquire_timeout = max(0.0, float(acquire_timeout))
        self.lease_seconds = max(0.1, float(lease_seconds))
        self.reclaim_grace = max(0.0, float(reclaim_grace))
        self.cohort_throttle = bool(cohort_throttle)
        self.nonce = secrets.token_hex(16)
        self._owner_path = self.path.with_name(
            f".{self.path.name}.candidate-{self.nonce}"
        )
        self.acquired = False

    def _metadata(self):
        now = time.time()
        expires = (
            self.deadline.expires_wall()
            if self.deadline is not None
            else now + self.lease_seconds
        )
        return {
            "pid": os.getpid(),
            "nonce": self.nonce,
            "released": 0,
            # Waiting acquisitions represent a thundering-herd cohort. Keep
            # that generation reserved through its lease so a delayed cohort
            # member cannot run the same mutation after an early release.
            # Nonblocking locks retain immediate sequential reuse. Writers that
            # persist DISTINCT mutations (e.g. archive writers keyed by
            # tool_use_id) opt out via cohort_throttle=False so a trailing
            # distinct-PID writer can immediately reclaim a released lease
            # instead of being suppressed for the full lease window.
            "reuse_wall": expires if (self.acquire_timeout > 0 and self.cohort_throttle) else now,
            "created_wall": now,
            "expires_wall": expires,
        }

    def _try_create(self):
        metadata = json.dumps(
            self._metadata(), separators=(",", ":"), sort_keys=True
        ).encode("utf-8")
        candidate = self._owner_path
        fd = None
        published = False
        try:
            fd = os.open(
                str(candidate),
                os.O_CREAT | os.O_EXCL | os.O_WRONLY,
                0o600,
            )
            offset = 0
            while offset < len(metadata):
                written = os.write(fd, metadata[offset:])
                if written <= 0:
                    raise OSError("short lease metadata write")
                offset += written
            try:
                os.fsync(fd)
            except OSError:
                pass
            os.close(fd)
            fd = None
            # Publishing a hard link is an atomic no-replace operation on the
            # supported POSIX and Windows filesystems. The final pathname can
            # therefore never expose partially-written JSON.
            os.link(str(candidate), str(self.path))
            published = True
        except FileExistsError:
            return False
        except OSError:
            return None
        finally:
            if fd is not None:
                try:
                    os.close(fd)
                except OSError:
                    pass
            if not published:
                try:
                    candidate.unlink()
                except OSError:
                    pass
        self.acquired = True
        return True

    def _read_owner(self):
        try:
            raw = self.path.read_text(encoding="utf-8")
            owner = json.loads(raw)
            nonce = owner.get("nonce")
            created = float(owner.get("created_wall"))
            expires = float(owner.get("expires_wall"))
            reuse = float(owner.get("reuse_wall", created))
            released = owner.get("released", 0)
            if (
                not isinstance(nonce, str)
                or not nonce
                or released not in (0, 1, False, True)
                or created <= 0
                or expires < created
                or reuse < created
                or reuse > expires
            ):
                return None
            return owner, created, expires
        except (OSError, ValueError, TypeError, json.JSONDecodeError):
            return None

    def _reclaim_path(self, generation, validate_claim):
        """Unlink one exact lease generation after exclusively claiming it.

        The hard link pins the observed inode while it is validated, turning
        unlink into a conditional operation without platform-specific APIs.
        A paused stale reclaimer may link a successor, but validation prevents
        it from unlinking that successor. A process killed mid-reclaim leaves
        its claim behind, making future contenders fail open.
        """

        digest = hashlib.sha256(generation.encode("utf-8")).hexdigest()[:32]
        claim = self.path.with_name(f".{self.path.name}.reclaim-{digest}")
        try:
            os.link(str(self.path), str(claim))
        except (FileExistsError, OSError):
            return False
        try:
            current = os.stat(self.path)
            claimed = os.stat(claim)
            if not os.path.samestat(current, claimed):
                return False
            if not validate_claim(claim):
                return False
            os.unlink(self.path)
            return True
        except OSError:
            return False
        finally:
            try:
                claim.unlink()
            except OSError:
                pass

    def _reclaim_if_expired(self):
        parsed = self._read_owner()
        if parsed is None:
            # A creator killed before older releases finished their direct
            # write can leave empty/truncated JSON. Reclaim only a stable,
            # grace-aged pathname; a fresh malformed file may still be in the
            # middle of publication by an old process.
            try:
                before = os.lstat(self.path)
                malformed_grace = max(self.reclaim_grace, 0.25)
                if time.time() <= before.st_mtime + malformed_grace:
                    return False
                raw = self.path.read_bytes()
                after = os.lstat(self.path)
                if (
                    not os.path.samestat(before, after)
                    or len(raw) != before.st_size
                    or after.st_mtime_ns != before.st_mtime_ns
                ):
                    return False
            except OSError:
                return False
            generation = "malformed:{0}:{1}:{2}:{3}".format(
                before.st_dev,
                before.st_ino,
                before.st_size,
                before.st_mtime_ns,
            )

            def stable_malformed(claim):
                try:
                    claimed = os.lstat(claim)
                    return (
                        claimed.st_size == before.st_size
                        and claimed.st_mtime_ns == before.st_mtime_ns
                        and claim.read_bytes() == raw
                    )
                except OSError:
                    return False

            return self._reclaim_path(generation, stable_malformed)
        owner, created, expires = parsed
        now = time.time()
        # Future creation times indicate clock rollback or malformed metadata.
        # Fail open without stealing a lock whose lease cannot be assessed.
        if created > now + self.reclaim_grace:
            return False
        if owner.get("released"):
            reuse = float(owner.get("reuse_wall", created))
            if owner.get("pid") != os.getpid() and now <= reuse:
                return False
        elif now <= expires + self.reclaim_grace:
            return False

        def same_owner(claim):
            try:
                claimed = json.loads(claim.read_text(encoding="utf-8"))
                return claimed.get("nonce") == owner["nonce"]
            except (OSError, ValueError, TypeError, json.JSONDecodeError):
                return False

        return self._reclaim_path(f"owner:{owner['nonce']}", same_owner)

    def acquire(self) -> bool:
        try:
            self.path.parent.mkdir(parents=True, exist_ok=True)
        except OSError:
            return False
        wait_for = self.acquire_timeout
        if self.deadline is not None:
            wait_for = min(wait_for, self.deadline.remaining())
        stop = time.monotonic() + wait_for
        first_attempt = True
        while True:
            if not first_attempt and time.monotonic() >= stop:
                return False
            first_attempt = False
            created = self._try_create()
            if created is True:
                return True
            if created is None:
                return False
            if self._reclaim_if_expired():
                # Reclamation freed the pathname. Retry exclusive creation once
                # even when acquire_timeout is zero.
                created = self._try_create()
                if created is not False:
                    return created is True
            if time.monotonic() >= stop:
                return False
            remaining = stop - time.monotonic()
            time.sleep(min(remaining, random.uniform(0.004, 0.012)))

    def release(self):
        if not self.acquired:
            return
        try:
            raw = self._owner_path.read_bytes()
            owner = json.loads(raw)
            marker = b'"released":0'
            offset = raw.find(marker)
            if owner.get("nonce") == self.nonce and offset >= 0:
                fd = os.open(str(self._owner_path), os.O_WRONLY)
                try:
                    os.lseek(fd, offset + len(marker) - 1, os.SEEK_SET)
                    if os.write(fd, b"1") != 1:
                        raise OSError("short lease release write")
                    try:
                        os.fsync(fd)
                    except OSError:
                        pass
                finally:
                    os.close(fd)
        except (OSError, ValueError, TypeError, json.JSONDecodeError):
            pass
        finally:
            try:
                self._owner_path.unlink()
            except OSError:
                pass
            self.acquired = False

    def __enter__(self):
        return self.acquire()

    def __exit__(self, *_exc):
        self.release()


@contextmanager
def lease_lock(path, **kwargs):
    """Yield whether the lease was acquired; callers skip mutation on False."""

    lock = LeaseLock(path, **kwargs)
    acquired = lock.acquire()
    try:
        yield acquired
    finally:
        if acquired:
            lock.release()
