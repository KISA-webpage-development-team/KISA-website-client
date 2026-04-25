/**
 * Format a USD price for display. KISA pocha is USD-only today; if a
 * second currency ever appears, extend this with a currency-code argument.
 */
export function formatPrice(price: number | undefined): string {
  if (price === undefined || price === null) return "$0";
  return `$${price.toLocaleString()}`;
}
