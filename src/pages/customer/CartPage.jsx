import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { EmptyState } from "../../components/common/EmptyState";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Bookmark,
  ArrowRight,
  Ticket,
  Truck,
  ShieldCheck,
  ArrowLeft
} from "lucide-react";

export const CartPage = () => {
  const {
    cartItems,
    savedForLater,
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
  const navigate = useNavigate();

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

  if (cartItems.length === 0 && savedForLater.length === 0) {
    return (
      <div style={{ padding: "4rem 0 6rem" }}>
        <div className="container" style={{ maxWidth: "600px" }}>
          <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", padding: "2rem" }}>
            <EmptyState
              emoji="🛒"
              title="Your Feast Basket is Empty"
              description="You haven't added any juicy burgers, stone-baked pizzas, or crunchy chicken yet. Explore our delicious menu to begin."
              actionText="Explore Full Menu"
              actionLink="/menu"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2.5rem 0 5rem" }}>
      <div className="container">
        {/* Cart Page Title */}
        <div style={{ marginBottom: "2rem" }}>
          <Link to="/menu" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.88rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.5rem" }}>
            <ArrowLeft size={16} /> Continue Browsing Menu
          </Link>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--dark)" }}>
            Review Your Order ({totalItemCount} Items) 🍔
          </h1>
        </div>

        {/* Free Delivery Meter Banner */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: "1rem 1.5rem",
              background: freeDeliveryRemaining === 0 ? "var(--success-light)" : "var(--primary-light)",
              borderRadius: "var(--radius-lg)",
              border: `1px solid ${freeDeliveryRemaining === 0 ? "#A5D6A7" : "#F87171"}`,
              marginBottom: "2rem"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", fontWeight: 800, marginBottom: "6px" }}>
              <span style={{ color: freeDeliveryRemaining === 0 ? "var(--success)" : "var(--primary)", display: "flex", alignItems: "center", gap: "6px" }}>
                <Truck size={18} />
                {freeDeliveryRemaining === 0
                  ? "🎉 Awesome! You unlocked FREE Instant Doorstep Delivery!"
                  : `Add $${freeDeliveryRemaining.toFixed(2)} more to your cart to qualify for FREE Delivery!`}
              </span>
              <span>{freeDeliveryProgress}%</span>
            </div>
            <div style={{ width: "100%", height: "8px", borderRadius: "4px", background: "rgba(0,0,0,0.08)", overflow: "hidden" }}>
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

        {/* Main Grid: Cart Items List vs Order Summary */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 0.7fr",
            gap: "2.5rem",
            alignItems: "flex-start"
          }}
          className="cart-page-grid"
        >
          {/* Left Column: Cart Items Table/Cards */}
          <div>
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--border-light)",
                boxShadow: "var(--shadow-sm)",
                overflow: "hidden",
                marginBottom: "2rem"
              }}
            >
              <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-light)", fontWeight: 800, fontSize: "1.1rem" }}>
                Selected Food Items
              </div>

              <div style={{ padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {cartItems.map((item) => (
                  <div
                    key={item.key}
                    style={{
                      display: "flex",
                      gap: "1.25rem",
                      paddingBottom: "1.25rem",
                      borderBottom: "1px solid var(--border-light)",
                      flexWrap: "wrap"
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "84px", height: "84px", borderRadius: "var(--radius-md)", objectFit: "cover", flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: "220px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <Link to={`/product/${item.productId}`} style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--dark)" }}>
                          {item.name}
                        </Link>
                        <span style={{ fontWeight: 900, fontSize: "1.1rem", color: "var(--primary)" }}>
                          ${item.itemTotal.toFixed(2)}
                        </span>
                      </div>

                      {/* Customization Details */}
                      <div style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginTop: "4px", lineHeight: 1.4 }}>
                        {item.selectedSize?.name && <div>Portion: <strong>{item.selectedSize.name}</strong></div>}
                        {item.selectedAddOns?.length > 0 && (
                          <div>Extras: {item.selectedAddOns.map((a) => a.name).join(", ")}</div>
                        )}
                        {item.specialInstructions && (
                          <div style={{ fontStyle: "italic", color: "var(--text-light)" }}>
                            Instructions: "{item.specialInstructions}"
                          </div>
                        )}
                      </div>

                      {/* Action Row */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                        {/* Quantity Counter */}
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            border: "1.5px solid var(--border-light)",
                            borderRadius: "var(--radius-full)",
                            background: "#F9FAFB"
                          }}
                        >
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            style={{ width: "30px", height: "30px", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            <Minus size={14} />
                          </button>
                          <span style={{ minWidth: "28px", textAlign: "center", fontWeight: 800, fontSize: "0.95rem" }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            style={{ width: "30px", height: "30px", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Save & Remove */}
                        <div style={{ display: "flex", gap: "1rem" }}>
                          <button
                            onClick={() => saveForLaterItem(item.key)}
                            style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.825rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}
                          >
                            <Bookmark size={14} /> Save for Later
                          </button>
                          <button
                            onClick={() => removeFromCart(item.key)}
                            style={{ background: "transparent", border: "none", color: "var(--error)", cursor: "pointer", fontSize: "0.825rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}
                          >
                            <Trash2 size={14} /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved for Later Section */}
            {savedForLater.length > 0 && (
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--border-light)",
                  padding: "1.5rem"
                }}
              >
                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--dark)", marginBottom: "1rem" }}>
                  Saved For Later ({savedForLater.length})
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {savedForLater.map((item) => (
                    <div
                      key={item.key}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "0.75rem 0",
                        borderBottom: "1px solid var(--border-light)"
                      }}
                    >
                      <img src={item.image} alt={item.name} style={{ width: "50px", height: "50px", borderRadius: "var(--radius-sm)", objectFit: "cover" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{item.name}</div>
                        <div style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 800 }}>${item.unitPrice.toFixed(2)}</div>
                      </div>
                      <button onClick={() => moveToCart(item.key)} className="btn btn-primary btn-sm">
                        Move to Cart
                      </button>
                      <button onClick={() => removeSavedItem(item.key)} style={{ background: "transparent", border: "none", color: "#9CA3AF", cursor: "pointer" }}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary & Checkout Card */}
          <div style={{ position: "sticky", top: "90px" }}>
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--border-light)",
                boxShadow: "var(--shadow-md)",
                padding: "1.75rem"
              }}
            >
              <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--dark)", marginBottom: "1.25rem" }}>
                Order Summary
              </h3>

              {/* Coupon Code Input */}
              <div style={{ marginBottom: "1.5rem" }}>
                {appliedCoupon ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "var(--radius-md)",
                      background: "var(--success-light)",
                      border: "1px solid #A5D6A7",
                      fontSize: "0.85rem"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--success)", fontWeight: 700 }}>
                      <Ticket size={16} />
                      <span>Code "{appliedCoupon.code}" applied! (-${discount.toFixed(2)})</span>
                    </div>
                    <button onClick={removeCoupon} style={{ background: "transparent", border: "none", color: "var(--error)", cursor: "pointer", fontWeight: 700 }}>
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
                      className="form-input"
                      style={{ fontSize: "0.85rem", padding: "0.6rem 0.85rem" }}
                    />
                    <button type="submit" className="btn btn-dark btn-sm" disabled={couponLoading || !couponInput.trim()} style={{ borderRadius: "var(--radius-md)" }}>
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Calculations List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.92rem", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                  <span>Items Subtotal</span>
                  <span style={{ fontWeight: 600, color: "var(--dark)" }}>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--success)", fontWeight: 700 }}>
                    <span>Coupon Savings</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                  <span>Estimated Delivery</span>
                  <span>{deliveryFee === 0 ? <strong style={{ color: "var(--success)" }}>FREE</strong> : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                  <span>Sales Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1.35rem",
                    fontWeight: 900,
                    color: "var(--dark)",
                    paddingTop: "0.75rem",
                    borderTop: "1.5px dashed var(--border-light)",
                    marginTop: "0.25rem"
                  }}
                >
                  <span>Grand Total</span>
                  <span style={{ color: "var(--primary)" }}>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => navigate("/checkout")}
                className="btn btn-primary btn-lg"
                style={{
                  width: "100%",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem"
                }}
              >
                Proceed to Checkout <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cart-page-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
