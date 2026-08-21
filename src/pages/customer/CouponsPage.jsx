import React, { useState } from "react";
import { INITIAL_COUPONS } from "../../data/initialCoupons";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { Ticket, Copy, Check, Sparkles } from "lucide-react";

export const CouponsPage = () => {
  const { applyCoupon } = useCart();
  const { showSuccess } = useToast();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showSuccess(`Coupon code "${code}" copied!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div style={{ padding: "2.5rem 0 5rem" }}>
      <div className="container" style={{ maxWidth: "900px" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary)", letterSpacing: "1px", textTransform: "uppercase" }}>
            Promo Codes & Discounts
          </span>
          <h1 style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--dark)", marginTop: "4px" }}>
            My Active Vouchers & Coupons 🎟️
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "4px" }}>
            Use these codes at checkout or in your shopping cart drawer to slash prices on your meal.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {INITIAL_COUPONS.map((coupon) => (
            <div
              key={coupon.id}
              style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-xl)",
                border: "1.5px dashed var(--border-light)",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ background: "var(--secondary-light)", color: "var(--dark)", fontWeight: 900, fontSize: "1.1rem", padding: "0.3rem 0.8rem", borderRadius: "var(--radius-md)", letterSpacing: "1px" }}>
                  {coupon.code}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Expires: {coupon.expiryDate}</span>
              </div>

              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--dark)", marginBottom: "4px" }}>
                {coupon.description}
              </h3>
              <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginBottom: "1.25rem", flex: 1 }}>
                Valid on minimum orders over ${coupon.minOrder.toFixed(2)}
              </p>

              <button
                onClick={() => handleCopy(coupon.code)}
                className="btn btn-primary btn-sm"
                style={{ width: "100%", borderRadius: "var(--radius-full)", fontWeight: 700 }}
              >
                {copiedCode === coupon.code ? <Check size={16} /> : <Copy size={16} />}
                {copiedCode === coupon.code ? "Code Copied!" : "Copy Code"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
