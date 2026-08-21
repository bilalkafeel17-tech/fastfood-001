import React, { useState } from "react";
import { Link } from "react-router-dom";
import { INITIAL_DEALS } from "../../data/initialDeals";
import { INITIAL_COUPONS } from "../../data/initialCoupons";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { Flame, Tag, Clock, Copy, Check, Ticket, ArrowRight, Sparkles } from "lucide-react";

export const DealsPage = () => {
  const { applyCoupon } = useCart();
  const { showSuccess } = useToast();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showSuccess(`Coupon code "${code}" copied!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleApply = async (code) => {
    try {
      await applyCoupon(code);
    } catch {
      // toast shown in context
    }
  };

  return (
    <div style={{ padding: "2.5rem 0 5rem" }}>
      <div className="container">
        {/* Deals Page Hero Header */}
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary)", letterSpacing: "1px", textTransform: "uppercase" }}>
            Unbeatable Value
          </span>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 900, color: "var(--dark)", marginTop: "4px" }}>
            Exclusive Deals & Coupons 🔥
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Grab limited-time daily flash sales, combo bundles, and promotional voucher codes for maximum savings on your food cravings.
          </p>
        </div>

        {/* 1. Flash Deals & Combo Offers Grid */}
        <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--dark)", marginBottom: "1.5rem" }}>
          Active Meal Specials
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.75rem",
            marginBottom: "4.5rem"
          }}
        >
          {INITIAL_DEALS.map((deal) => (
            <div
              key={deal.id}
              className="card card-hoverable"
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                border: "1px solid var(--border-light)"
              }}
            >
              <div style={{ position: "relative", height: "190px" }}>
                <img src={deal.image} alt={deal.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    background: deal.badgeColor || "var(--primary)",
                    color: "#FFFFFF",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    padding: "3px 10px",
                    borderRadius: "var(--radius-full)"
                  }}
                >
                  {deal.tag}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "12px",
                    background: "rgba(0,0,0,0.75)",
                    backdropFilter: "blur(4px)",
                    color: "#FFFFFF",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: "var(--radius-sm)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  <Clock size={12} color="#FFB703" /> {deal.expiresIn}
                </div>
              </div>

              <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--dark)", marginBottom: "4px" }}>
                  {deal.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.45, marginBottom: "1rem", flex: 1 }}>
                  {deal.description}
                </p>

                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--primary)" }}>
                    ${deal.discountPrice.toFixed(2)}
                  </span>
                  <span style={{ fontSize: "0.9rem", color: "#9CA3AF", textDecoration: "line-through" }}>
                    ${deal.originalPrice.toFixed(2)}
                  </span>
                  <span style={{ marginLeft: "auto", background: "var(--success-light)", color: "var(--success)", fontWeight: 800, fontSize: "0.75rem", padding: "2px 6px", borderRadius: "4px" }}>
                    SAVE {deal.discountPercent}%
                  </span>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => handleCopy(deal.code)}
                    style={{
                      flex: 1,
                      padding: "0.6rem",
                      borderRadius: "var(--radius-md)",
                      border: "1.5px dashed var(--primary)",
                      background: "var(--primary-light)",
                      color: "var(--primary)",
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      cursor: "pointer"
                    }}
                  >
                    {copiedCode === deal.code ? <Check size={14} /> : <Copy size={14} />} {deal.code}
                  </button>
                  <Link
                    to="/menu"
                    className="btn btn-primary btn-sm"
                    style={{ padding: "0.6rem 1.1rem", borderRadius: "var(--radius-md)" }}
                  >
                    Order
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Promo Voucher Coupons List */}
        <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--dark)", marginBottom: "1.5rem" }}>
          Available Discount Vouchers 🎟️
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem"
          }}
        >
          {INITIAL_COUPONS.map((coupon) => (
            <div
              key={coupon.id}
              style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-xl)",
                border: "1.5px dashed var(--border-light)",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <div
                  style={{
                    background: "var(--secondary-light)",
                    color: "var(--dark)",
                    fontWeight: 900,
                    fontSize: "1.1rem",
                    padding: "0.3rem 0.75rem",
                    borderRadius: "var(--radius-md)",
                    letterSpacing: "1px",
                    fontFamily: "var(--font-heading)"
                  }}
                >
                  {coupon.code}
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Exp: {coupon.expiryDate}
                </span>
              </div>

              <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--dark)", marginBottom: "4px" }}>
                {coupon.description}
              </h4>
              <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginBottom: "1.25rem", flex: 1 }}>
                Min. order ${coupon.minOrder.toFixed(2)} • {coupon.usageLimit - coupon.usageCount} claims left
              </p>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="btn btn-outline btn-sm"
                  style={{ flex: 1, borderRadius: "var(--radius-md)" }}
                >
                  {copiedCode === coupon.code ? <Check size={14} /> : <Copy size={14} />} Copy Code
                </button>
                <button
                  onClick={() => handleApply(coupon.code)}
                  className="btn btn-primary btn-sm"
                  style={{ borderRadius: "var(--radius-md)" }}
                >
                  Apply to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
