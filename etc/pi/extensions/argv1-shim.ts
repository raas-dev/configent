// pi is a bun-compiled binary: process.argv[1] is the virtual bunfs entry (/$bunfs/root/pi). existsSync
// says true but realpathSync/lstat throw ENOENT, so extensions with an import-time "am I the CLI entry"
// guard like visual-explainer's (realpathSync(process.argv[1])) crash on it. Clear argv[1] when it
// cannot be realpath'd; a real CLI entry always can.
// shortcut: if pi ever stops being a bun binary, argv[1] realpaths and this shim does nothing; delete it then.
import { realpathSync } from "node:fs";

if (process.argv[1]) {
  try {
    realpathSync(process.argv[1]);
  } catch {
    process.argv[1] = undefined;
  }
}

export default function () {}
