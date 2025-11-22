/**
 * Format a number as Vietnamese currency
 * @param amount - The amount in VND
 * @returns Formatted string (e.g., "599.000 ₫")
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

/**
 * Format a number as Vietnamese currency without symbol
 * @param amount - The amount in VND
 * @returns Formatted string (e.g., "599.000")
 */
export function formatPriceNumber(amount: number): string {
  return new Intl.NumberFormat("vi-VN").format(amount);
}

/**
 * Parse a formatted price string back to number
 * @param priceString - Formatted price string
 * @returns Number value
 */
export function parsePrice(priceString: string): number {
  // Remove all non-digit characters except decimal point
  const cleaned = priceString.replace(/[^\d.]/g, "");
  return parseFloat(cleaned) || 0;
}
