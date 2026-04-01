/**
 * Strip accidental code fences and surrounding quotes from LLM output.
 */
export function clean(text: string): string {
  const stripped = text.replace(/^```\w*\n?|```$/g, "").trim();
  return stripped.replace(/^(['"])([\s\S]*)\1$/, "$2").trim();
}
