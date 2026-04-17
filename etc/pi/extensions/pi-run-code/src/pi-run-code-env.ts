/** Truthy acknowledgments for PI_RUN_CODE_UNSANDBOXED (trimmed, case-insensitive). */
export function piRunCodeUnsandboxedAcknowledged(raw: string | undefined): boolean {
  if (raw === undefined) return false;
  const v = raw.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}
