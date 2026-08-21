export const INITIAL_COUPONS = [
  {
    id: "coup-1",
    code: "CRAVE20",
    discountType: "percentage", // percentage or fixed
    discountValue: 20,
    minOrder: 25.00,
    maxDiscount: 15.00,
    description: "20% off all orders above $25",
    expiryDate: "2026-12-31",
    usageLimit: 500,
    usageCount: 142,
    active: true
  },
  {
    id: "coup-2",
    code: "FREESHIP",
    discountType: "delivery",
    discountValue: 100, // 100% off delivery fee
    minOrder: 15.00,
    maxDiscount: 4.99,
    description: "Free instant doorstep delivery on orders over $15",
    expiryDate: "2026-12-31",
    usageLimit: 1000,
    usageCount: 423,
    active: true
  },
  {
    id: "coup-3",
    code: "BITE10",
    discountType: "fixed",
    discountValue: 10.00,
    minOrder: 40.00,
    maxDiscount: 10.00,
    description: "Flat $10 instant discount on orders above $40",
    expiryDate: "2026-11-30",
    usageLimit: 300,
    usageCount: 88,
    active: true
  },
  {
    id: "coup-4",
    code: "WELCOME15",
    discountType: "percentage",
    discountValue: 15,
    minOrder: 20.00,
    maxDiscount: 10.00,
    description: "15% off your first CraveBite order",
    expiryDate: "2026-12-31",
    usageLimit: 2000,
    usageCount: 651,
    active: true
  }
];
