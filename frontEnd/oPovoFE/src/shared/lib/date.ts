export function formatDatePtBR(iso: string) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(date);
}

export function parsePtBrDateTimeToIso(value: string): string {
  const [datePart, timePart] = value.split(" ");
  const [dd, mm, yyyy] = datePart.split("/").map(Number);
  const [hh, min] = (timePart ?? "00:00").split(":").map(Number);

  const d = new Date(yyyy, (mm ?? 1) - 1, dd ?? 1, hh ?? 0, min ?? 0);
  return d.toISOString();
}
