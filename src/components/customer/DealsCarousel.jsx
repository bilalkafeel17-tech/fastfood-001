import React from "react";
import { Link } from "react-router-dom";
import { INITIAL_DEALS } from "../../data/initialDeals";
import { Flame, Clock, Copy, Check, ArrowRight } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { useCart } from "../../context/CartContext";

export const DealsCarousel = () => {
  const { showSuccess } = useToast();
  const { applyCoupon } = useCart();
  const [copiedCode, setCopiedCode] = React.useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showSuccess(`Coupon code "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleApplyDeal = async (code) => {
    try {
      await applyCoupon(code);
    } catch {
      // toast shown in context
    }
  };

  return (
    <section style={{ padding: "4rem 0", background: "var(--bg-light)" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary)", letterSpacing: "1px", textTransform: "uppercase" }}>
              Save Big Today
            </span>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--dark)", marginTop: "4px" }}>
              Hot Deals & Combos 🔥
            </h2>
          </div>
          <Link
            to="/deals"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "var(--primary)"
            }}
          >
            View All Deals <ArrowRight size={16} />
          </Link>
        </div>

        {/* Deals Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem"
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
              {/* Image & Tag */}
              <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                <img
                  src={deal.image}
                  alt={deal.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
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
                    borderRadius: "var(--radius-full)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                  }}
                >
                  {deal.tag}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "12px",
                    background: "rgba(0, 0, 0, 0.75)",
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

              {/* Deal Body */}
              <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--dark)", marginBottom: "4px" }}>
                  {deal.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.45, marginBottom: "1.25rem", flex: 1 }}>
                  {deal.description}
                </p>

                {/* Pricing & Savings */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--primary)" }}>
                    ${deal.discountPrice.toFixed(2)}
                  </span>
                  <span style={{ fontSize: "0.9rem", color: "#9CA3AF", textDecoration: "line-through" }}>
                    ${deal.originalPrice.toFixed(2)}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: "var(--success)",
                      background: "var(--success-light)",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      marginLeft: "auto"
                    }}
                  >
                    SAVE {deal.discountPercent}%
                  </span>
                </div>

                {/* Code Box & Order Button */}
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => handleCopyCode(deal.code)}
                    style={{
                      flex: 1,
                      padding: "0.55rem 0.75rem",
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
                    title="Click to copy coupon code"
                  >
                    {copiedCode === deal.code ? <Check size={14} /> : <Copy size={14} />}
                    {deal.code}
                  </button>

                  <Link
                    to="/menu"
                    className="btn btn-primary btn-sm"
                    style={{ padding: "0.55rem 1rem", borderRadius: "var(--radius-md)" }}
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
