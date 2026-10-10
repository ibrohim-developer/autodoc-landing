// Accepts +998 XX XXX XX XX (any separators) or a 9-digit local number.
export function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return (digits.length === 12 && digits.startsWith("998")) || digits.length === 9;
}
