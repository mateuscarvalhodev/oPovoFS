export type PageToken = number | "…";

export function getPaginationTokens(
  current: number,
  last: number
): PageToken[] {
  if (last <= 1) return [1];
  if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1);

  const left = Math.max(2, current - 1);
  const right = Math.min(last - 1, current + 1);

  const middle = Array.from({ length: right - left + 1 }, (_, i) => left + i);

  return [
    1,
    ...(left > 2 ? (["…"] as const) : []),
    ...middle,
    ...(right < last - 1 ? (["…"] as const) : []),
    last,
  ];
}
