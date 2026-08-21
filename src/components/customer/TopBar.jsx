import React from "react";
import { Sparkles, Phone, Clock, ShieldCheck } from "lucide-react";

export const TopBar = () => {
  return (
    <div
      style={{
        background: "var(--dark)",
        color: "#E5E7EB",
        fontSize: "0.8rem",
        padding: "0.45rem 1rem",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              background: "var(--primary)",
              color: "#FFFFFF",
              padding: "0.15rem 0.5rem",
              borderRadius: "var(--radius-full)",
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase"
            }}
          >
            🔥 Special Deal
          </span>
          <span>
            Use code <strong style={{ color: "var(--secondary)" }}>CRAVE20</strong> for 20% OFF your feast! Free delivery over $35.
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", color: "#9CA3AF" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
            <Clock size={13} color="#FFB703" /> Open Daily: 10:00 AM – 2:00 AM
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
            <Phone size={13} color="#2A9D8F" /> +1 (800) 555-CRAVE
          </span>
        </div>
      </div>
    </div>
  );
};
