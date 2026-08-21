import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendType = "up", // 'up' or 'down'
  color = "var(--primary)",
  bgColor = "var(--primary-light)"
}) => {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--border-light)",
        padding: "1.5rem",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <div>
          <span style={{ fontSize: "0.825rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {title}
          </span>
          <h3 style={{ fontSize: "1.85rem", fontWeight: 900, color: "var(--dark)", marginTop: "4px" }}>
            {value}
          </h3>
        </div>

        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: bgColor,
            color: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}
        >
          {Icon && <Icon size={24} />}
        </div>
      </div>

      {trend && (
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", fontWeight: 600 }}>
          {trendType === "up" ? (
            <span style={{ color: "var(--success)", display: "inline-flex", alignItems: "center", gap: "2px" }}>
              <TrendingUp size={14} /> {trend}
            </span>
          ) : (
            <span style={{ color: "var(--error)", display: "inline-flex", alignItems: "center", gap: "2px" }}>
              <TrendingDown size={14} /> {trend}
            </span>
          )}
          <span style={{ color: "var(--text-light)" }}>vs last week</span>
        </div>
      )}
    </div>
  );
};
