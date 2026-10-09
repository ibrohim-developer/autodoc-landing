// Shown as dd.MM.yyyy in every locale.
export function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
}
