/**
 * isLowStock
 * - Shared low-stock predicate used across the menu surface and the
 *   stock-management dashboard.
 * - "Low" means strictly positive stock at or below the threshold (3).
 *   `stock === 0` is a separate "out of stock" state, not low.
 */
export const LOW_STOCK_THRESHOLD = 3;

export const isLowStock = (stock: number): boolean =>
  stock >= 1 && stock <= LOW_STOCK_THRESHOLD;
