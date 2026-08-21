import React from "react";

export const RevenueBarChart = ({ data = [] }) => {
  const maxSales = Math.max(...data.map((d) => d.sales), 4500);

  return (
    <div style={{ width: "100%", height: "240px", display: "flex", alignItems: "flex-end", gap: "1rem", padding: "1rem 0" }}>
      {data.map((item, idx) => {
        const heightPct = Math.round((item.sales / maxSales) * 100);
        return (
          <div
            key={idx}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              justifyContent: "flex-end",
              gap: "6px"
            }}
          >
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)" }}>
              ${item.sales}
            </span>
            <div
              style={{
                width: "100%",
                maxWidth: "36px",
                height: `${Math.max(heightPct, 12)}%`,
                borderRadius: "6px 6px 0 0",
                background: "linear-gradient(180deg, var(--primary) 0%, #D62828 100%)",
                transition: "height 0.4s ease",
                boxShadow: "0 2px 6px rgba(230, 57, 70, 0.25)"
              }}
              title={`${item.day}: $${item.sales} (${item.orders} orders)`}
            />
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--dark)" }}>
              {item.day}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const CategoryShareProgress = ({ data = [] }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {data.map((cat, idx) => (
        <div key={idx}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", fontWeight: 700, marginBottom: "4px" }}>
            <span style={{ color: "var(--dark)" }}>{cat.category}</span>
            <span style={{ color: cat.color }}>${cat.revenue.toLocaleString()} ({cat.percentage}%)</span>
          </div>
          <div style={{ width: "100%", height: "8px", borderRadius: "4px", background: "#F3F4F6", overflow: "hidden" }}>
            <div
              style={{
                width: `${cat.percentage}%`,
                height: "100%",
                background: cat.color,
                borderRadius: "4px"
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
