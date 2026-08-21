import { INITIAL_COUPONS } from "../data/initialCoupons";

const STORAGE_KEY = "cravebite_coupons_data";

const getStoredCoupons = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COUPONS));
      return INITIAL_COUPONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_COUPONS;
  }
};

const saveCoupons = (coupons) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(coupons));
};

export const couponService = {
  getAll: async () => {
    await new Promise((r) => setTimeout(r, 100));
    return getStoredCoupons();
  },

  validateCoupon: async (code, subtotal) => {
    await new Promise((r) => setTimeout(r, 200));
    const coupons = getStoredCoupons();
    const coupon = coupons.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.active
    );

    if (!coupon) {
      throw new Error(`Coupon "${code}" is invalid or expired.`);
    }

    if (subtotal < coupon.minOrder) {
      throw new Error(`Minimum order of $${coupon.minOrder.toFixed(2)} required for coupon ${coupon.code}.`);
    }

    let discountAmount = 0;
    if (coupon.discountType === "percentage") {
      discountAmount = (subtotal * coupon.discountValue) / 100;
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    } else if (coupon.discountType === "fixed") {
      discountAmount = coupon.discountValue;
    } else if (coupon.discountType === "delivery") {
      discountAmount = 3.99; // Standard delivery fee waiver
    }

    return {
      valid: true,
      coupon,
      discountAmount: Number(discountAmount.toFixed(2))
    };
  },

  create: async (data) => {
    await new Promise((r) => setTimeout(r, 150));
    const list = getStoredCoupons();
    const newCoupon = {
      ...data,
      id: "coup-" + Date.now(),
      code: data.code.toUpperCase().trim(),
      usageCount: 0,
      active: data.active !== false
    };
    const updated = [newCoupon, ...list];
    saveCoupons(updated);
    return newCoupon;
  },

  update: async (id, updates) => {
    await new Promise((r) => setTimeout(r, 150));
    const list = getStoredCoupons();
    const idx = list.findIndex((c) => String(c.id) === String(id));
    if (idx === -1) throw new Error("Coupon not found");
    list[idx] = { ...list[idx], ...updates };
    saveCoupons(list);
    return list[idx];
  },

  delete: async (id) => {
    await new Promise((r) => setTimeout(r, 150));
    const list = getStoredCoupons();
    const filtered = list.filter((c) => String(c.id) !== String(id));
    saveCoupons(filtered);
    return true;
  }
};
