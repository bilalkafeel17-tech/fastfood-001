/**
 * Generate a unique, readable order number
 * Format: ORD-YYYYMMDD-XXXX (e.g. ORD-20261001-4821)
 */
export const generateOrderNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);

  return `ORD-${year}${month}${day}-${randomSuffix}`;
};
