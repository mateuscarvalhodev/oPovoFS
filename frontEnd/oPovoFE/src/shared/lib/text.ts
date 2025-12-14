export function makeExcerpt(text: string, max = 140) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  return normalized.slice(0, max).trimEnd() + "...";
}
