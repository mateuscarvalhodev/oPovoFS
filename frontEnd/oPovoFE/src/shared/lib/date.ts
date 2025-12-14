export function formatDatePtBR(iso: string) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(date);
}
