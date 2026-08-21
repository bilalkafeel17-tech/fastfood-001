import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Bookmark,
  ArrowRight,
  Sparkles,
  Ticket,
  Truck,
  Check
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { EmptyState } from "../common/EmptyState";

export const CartDrawer = () => {
  const {
    cartItems,
    savedForLater,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    saveForLaterItem,
    moveToCart,
    removeSavedItem,
    subtotal,
    discount,
    deliveryFee,
    tax,
    grandTotal,
    totalItemCount,
    freeDeliveryRemaining,
    freeDeliveryProgress,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("cart"); // 'cart' or 'saved'
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    try {
      setCouponLoading(true);
      await applyCoupon(couponInput);
      setCouponInput("");
    } catch {
      // Toast handles error message
    } finally {
      setCouponLoading(false);
    }
  };

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <div
      className="modal-overlay"
      style={{
        justifyContent: "flex-end",
        padding: 0,
        animation: "fadeIn 0.2s ease-out"
      }}
      onClick={closeCart}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          height: "100vh",
          background: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          boxShadow: "var(--shadow-xl)",
          animation: "slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--border-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShoppingBag size={20} color="var(--primary)" />
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0, color: "var(--dark)" }}>
              Your Feast ({totalItemCount})
            </h3>
          </div>
          <button
            onClick={closeCart}
            className="btn-icon"
            style={{ width: "36px", height: "36px", border: "none", background: "#F3F4F6" }}
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs: Cart & Saved for Later */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--border-light)", background: "#F9FAFB" }}>
          <button
            onClick={() => setActiveTab("cart")}
            style={{
              flex: 1,
              padding: "0.75rem",
              background: "transparent",
              border: "none",
              borderBottom: activeTab === "cart" ? "2.5px solid var(--primary)" : "2.5px solid transparent",
              fontWeight: 700,
              fontSize: "0.88rem",
              color: activeTab === "cart" ? "var(--primary)" : "var(--text-muted)",
              cursor: "pointer"
            }}
          >
            Cart Items ({totalItemCount})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            style={{
              flex: 1,
              padding: "0.75rem",
              background: "transparent",
              border: "none",
              borderBottom: activeTab === "saved" ? "2.5px solid var(--primary)" : "2.5px solid transparent",
              fontWeight: 700,
              fontSize: "0.88rem",
              color: activeTab === "saved" ? "var(--primary)" : "var(--text-muted)",
              cursor: "pointer"
            }}
          >
            Saved for Later ({savedForLater.length})
          </button>
        </div>

        {/* Free Delivery Progress Meter (Cart Tab Only) */}
        {activeTab === "cart" && cartItems.length > 0 && (
          <div
            style={{
              padding: "0.85rem 1.5rem",
              background: freeDeliveryRemaining === 0 ? "var(--success-light)" : "var(--primary-light)",
              borderBottom: "1px solid var(--border-light)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 700, marginBottom: "5px" }}>
              <span style={{ color: freeDeliveryRemaining === 0 ? "var(--success)" : "var(--primary)", display: "flex", alignItems: "center", gap: "4px" }}>
                <Truck size={14} />
                {freeDeliveryRemaining === 0
                  ? "🎉 You unlocked FREE Delivery!"
                  : `Add $${freeDeliveryRemaining.toFixed(2)} more for FREE delivery`}
              </span>
              <span style={{ color: "var(--dark)" }}>{freeDeliveryProgress}%</span>
            </div>
            <div
              style={{
                width: "100%",
                height: "6px",
                borderRadius: "3px",
                background: "rgba(0, 0, 0, 0.08)",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  width: `${freeDeliveryProgress}%`,
                  height: "100%",
                  background: freeDeliveryRemaining === 0 ? "var(--success)" : "var(--primary)",
                  transition: "width 0.3s ease"
                }}
              />
            </div>
          </div>
        )}

        {/* Drawer Body Items List */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.5rem" }}>
          {activeTab === "cart" ? (
            cartItems.length === 0 ? (
              <EmptyState
                emoji="🛒"
                title="Your cart is empty!"
                description="Looks like you haven't picked any delicious treats yet. Explore our mouthwatering menu."
                actionText="Explore Menu"
                actionLink="/menu"
                onActionClick={closeCart}
              />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {cartItems.map((item) => (
                  <div
                    key={item.key}
                    style={{
                      display: "flex",
                      gap: "0.85rem",
                      padding: "0.85rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-light)",
                      background: "#FFFFFF"
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "70px", height: "70px", borderRadius: "var(--radius-sm)", objectFit: "cover", flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "4px" }}>
                        <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--dark)", lineHeight: 1.2 }}>
                          {item.name}
                        </h4>
                        <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--primary)" }}>
                          ${item.itemTotal.toFixed(2)}
                        </span>
                      </div>

                      {/* Customization Details */}
                      <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginTop: "3px", lineHeight: 1.3 }}>
                        {item.selectedSize?.name && <span>Portion: {item.selectedSize.name}</span>}
                        {item.selectedAddOns?.length > 0 && (
                          <div>Toppings: {item.selectedAddOns.map((a) => a.name).join(", ")}</div>
                        )}
                        {item.specialInstructions && (
                          <div style={{ fontStyle: "italic", color: "var(--text-light)" }}>
                            Note: "{item.specialInstructions}"
                          </div>
                        )}
                      </div>

                      {/* Controls Row */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: "0.75rem"
                        }}
                      >
                        {/* Quantity Counter */}
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            border: "1px solid var(--border-light)",
                            borderRadius: "var(--radius-full)",
                            background: "#F9FAFB"
                          }}
                        >
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            style={{
                              width: "26px",
                              height: "26px",
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "var(--dark)"
                            }}
                          >
                            <Minus size={13} />
                          </button>
                          <span style={{ minWidth: "24px", textAlign: "center", fontWeight: 700, fontSize: "0.85rem" }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            style={{
                              width: "26px",
                              height: "26px",
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "var(--dark)"
                            }}
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* Save for later & Delete actions */}
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button
                            onClick={() => saveForLaterItem(item.key)}
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "var(--text-muted)",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "3px",
                              fontSize: "0.75rem"
                            }}
                            title="Save for later"
                          >
                            <Bookmark size={13} /> Save
                          </button>
                          <button
                            onClick={() => removeFromCart(item.key)}
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "var(--error)",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              padding: "2px"
                            }}
                            title="Remove item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            // Saved for Later List
            savedForLater.length === 0 ? (
              <EmptyState
                emoji="🔖"
                title="No saved items"
                description="Save your favorite cravings here to order later with a single click."
              />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {savedForLater.map((item) => (
                  <div
                    key={item.key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.75rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-light)",
                      background: "#FFFFFF"
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "50px", height: "50px", borderRadius: "var(--radius-sm)", objectFit: "cover" }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--dark)" }}>{item.name}</h4>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary)" }}>
                        ${item.unitPrice.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => moveToCart(item.key)}
                      className="btn btn-primary btn-sm"
                      style={{ fontSize: "0.78rem", padding: "0.35rem 0.75rem" }}
                    >
                      Move to Cart
                    </button>
                    <button
                      onClick={() => removeSavedItem(item.key)}
                      style={{ background: "transparent", border: "none", color: "#9CA3AF", cursor: "pointer" }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {activeTab === "cart" && cartItems.length > 0 && (
          <div
            style={{
              padding: "1.25rem 1.5rem",
              borderTop: "1px solid var(--border-light)",
              background: "#FFFFFF",
              boxShadow: "0 -4px 16px rgba(0, 0, 0, 0.05)"
            }}
          >
            {/* Promo Code Input Box */}
            <div style={{ marginBottom: "1rem" }}>
              {appliedCoupon ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.6rem 0.85rem",
                    borderRadius: "var(--radius-md)",
                    background: "var(--success-light)",
                    border: "1px solid #A5D6A7",
                    fontSize: "0.85rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--success)", fontWeight: 700 }}>
                    <Ticket size={16} />
                    <span>Coupon "{appliedCoupon.code}" applied! (-${discount.toFixed(2)})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    style={{ background: "transparent", border: "none", color: "var(--error)", cursor: "pointer", fontWeight: 700 }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    placeholder="Promo code (e.g. CRAVE20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    style={{
                      flex: 1,
                      padding: "0.55rem 0.85rem",
                      borderRadius: "var(--radius-md)",
                      border: "1.5px solid var(--border-light)",
                      fontSize: "0.85rem",
                      outline: "none"
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-dark btn-sm"
                    disabled={couponLoading || !couponInput.trim()}
                    style={{ padding: "0.55rem 1rem", borderRadius: "var(--radius-md)" }}
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Bill Summary Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.88rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--success)", fontWeight: 600 }}>
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? <strong style={{ color: "var(--success)" }}>FREE</strong> : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.15rem",
                  fontWeight: 900,
                  color: "var(--dark)",
                  paddingTop: "0.5rem",
                  borderTop: "1px dashed var(--border-light)",
                  marginTop: "0.25rem"
                }}
              >
                <span>Grand Total</span>
                <span style={{ color: "var(--primary)" }}>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleCheckout}
              className="btn btn-primary"
              style={{
                width: "100%",
                padding: "0.85rem",
                borderRadius: "var(--radius-full)",
                fontSize: "1.05rem",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem"
              }}
            >
              Checkout Now <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
