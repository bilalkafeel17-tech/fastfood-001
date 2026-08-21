import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { couponService } from "../services/couponService";
import { useToast } from "./ToastContext";

const CartContext = createContext();

const STORAGE_CART_KEY = "cravebite_cart_items_v2";
const STORAGE_SAVED_KEY = "cravebite_saved_for_later_v2";
const STORAGE_COUPON_KEY = "cravebite_applied_coupon_v2";
const FREE_DELIVERY_THRESHOLD = 35.00;
const STANDARD_DELIVERY_FEE = 3.99;
const TAX_RATE = 0.08; // 8%

const generateItemKey = (productId, selectedSize, selectedAddOns, instructions) => {
  const sizeName = selectedSize?.name || "Regular";
  const addOnsSorted = (selectedAddOns || []).map((a) => a.name).sort().join("|");
  const notes = (instructions || "").trim().toLowerCase();
  return `${productId}_${sizeName}_${addOnsSorted}_${notes}`;
};

export const CartProvider = ({ children }) => {
  const { showSuccess, showError, showInfo } = useToast();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [savedForLater, setSavedForLater] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_SAVED_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_COUPON_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify(savedForLater));
  }, [savedForLater]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem(STORAGE_COUPON_KEY, JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem(STORAGE_COUPON_KEY);
    }
  }, [appliedCoupon]);

  const addToCart = (product, quantity = 1, selectedSize = null, selectedAddOns = [], specialInstructions = "") => {
    const size = selectedSize || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : { name: "Standard", priceDelta: 0 });
    const addOns = selectedAddOns || [];
    const itemKey = generateItemKey(product.id, size, addOns, specialInstructions);

    const basePrice = Number(product.price);
    const sizeDelta = Number(size.priceDelta || 0);
    const addOnsTotal = addOns.reduce((sum, item) => sum + Number(item.price || 0), 0);
    const unitPrice = basePrice + sizeDelta + addOnsTotal;

    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex((item) => item.key === itemKey);
      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += quantity;
        updated[existingIdx].itemTotal = Number((updated[existingIdx].quantity * unitPrice).toFixed(2));
        return updated;
      } else {
        const newItem = {
          key: itemKey,
          productId: product.id,
          name: product.name,
          category: product.category,
          image: product.image,
          unitPrice: Number(unitPrice.toFixed(2)),
          quantity,
          selectedSize: size,
          selectedAddOns: addOns,
          specialInstructions,
          itemTotal: Number((unitPrice * quantity).toFixed(2))
        };
        return [...prevItems, newItem];
      }
    });

    showSuccess(`Added "${product.name}" to cart!`);
  };

  const updateQuantity = (itemKey, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.key === itemKey) {
          return {
            ...item,
            quantity: newQuantity,
            itemTotal: Number((item.unitPrice * newQuantity).toFixed(2))
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (itemKey) => {
    setCartItems((prev) => {
      const removed = prev.find((item) => item.key === itemKey);
      if (removed) {
        showInfo(`Removed "${removed.name}" from cart.`);
      }
      return prev.filter((item) => item.key !== itemKey);
    });
  };

  const saveForLaterItem = (itemKey) => {
    const item = cartItems.find((i) => i.key === itemKey);
    if (!item) return;

    setCartItems((prev) => prev.filter((i) => i.key !== itemKey));
    setSavedForLater((prev) => {
      const exists = prev.some((s) => s.key === itemKey);
      return exists ? prev : [...prev, item];
    });
    showInfo(`Saved "${item.name}" for later.`);
  };

  const moveToCart = (itemKey) => {
    const item = savedForLater.find((i) => i.key === itemKey);
    if (!item) return;

    setSavedForLater((prev) => prev.filter((i) => i.key !== itemKey));
    setCartItems((prev) => {
      const existing = prev.find((i) => i.key === itemKey);
      if (existing) {
        return prev.map((i) => (i.key === itemKey ? { ...i, quantity: i.quantity + item.quantity } : i));
      }
      return [...prev, item];
    });
    showSuccess(`Moved "${item.name}" back to cart!`);
  };

  const removeSavedItem = (itemKey) => {
    setSavedForLater((prev) => prev.filter((i) => i.key !== itemKey));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  // Subtotal calculation
  const subtotal = useMemo(() => {
    return Number(cartItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0).toFixed(2));
  }, [cartItems]);

  // Discount calculation
  const discount = useMemo(() => {
    if (!appliedCoupon || subtotal === 0) return 0;
    if (appliedCoupon.discountType === "percentage") {
      const d = (subtotal * appliedCoupon.discountValue) / 100;
      return Number((appliedCoupon.maxDiscount ? Math.min(d, appliedCoupon.maxDiscount) : d).toFixed(2));
    }
    if (appliedCoupon.discountType === "fixed") {
      return Number(Math.min(appliedCoupon.discountValue, subtotal).toFixed(2));
    }
    return 0;
  }, [appliedCoupon, subtotal]);

  // Delivery fee calculation
  const deliveryFee = useMemo(() => {
    if (cartItems.length === 0) return 0;
    if (subtotal >= FREE_DELIVERY_THRESHOLD) return 0;
    if (appliedCoupon && appliedCoupon.discountType === "delivery") return 0;
    return STANDARD_DELIVERY_FEE;
  }, [cartItems.length, subtotal, appliedCoupon]);

  // Free delivery progress
  const freeDeliveryRemaining = useMemo(() => {
    const rem = FREE_DELIVERY_THRESHOLD - subtotal;
    return rem > 0 ? Number(rem.toFixed(2)) : 0;
  }, [subtotal]);

  const freeDeliveryProgress = useMemo(() => {
    if (subtotal >= FREE_DELIVERY_THRESHOLD) return 100;
    return Math.min(Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100), 100);
  }, [subtotal]);

  // Tax & Final Total
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Number((taxableAmount * TAX_RATE).toFixed(2));
  const grandTotal = Number(Math.max(0, taxableAmount + deliveryFee + tax).toFixed(2));
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = async (code) => {
    try {
      const res = await couponService.validateCoupon(code, subtotal);
      setAppliedCoupon(res.coupon);
      showSuccess(`Coupon "${res.coupon.code}" applied successfully!`);
      return res;
    } catch (err) {
      showError(err.message || "Invalid coupon code");
      throw err;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showInfo("Coupon removed.");
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        savedForLater,
        appliedCoupon,
        subtotal,
        discount,
        deliveryFee,
        tax,
        grandTotal,
        totalItemCount,
        freeDeliveryRemaining,
        freeDeliveryProgress,
        FREE_DELIVERY_THRESHOLD,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        saveForLaterItem,
        moveToCart,
        removeSavedItem,
        clearCart,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
