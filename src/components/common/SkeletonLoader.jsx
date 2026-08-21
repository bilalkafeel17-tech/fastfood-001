import React from "react";

export const FoodCardSkeleton = () => (
  <div className="card" style={{ padding: "0.85rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
    <div className="skeleton" style={{ width: "100%", height: "180px", borderRadius: "var(--radius-md)" }} />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div className="skeleton" style={{ width: "60px", height: "18px" }} />
      <div className="skeleton" style={{ width: "40px", height: "18px" }} />
    </div>
    <div className="skeleton" style={{ width: "80%", height: "22px" }} />
    <div className="skeleton" style={{ width: "100%", height: "36px" }} />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "0.5rem" }}>
      <div className="skeleton" style={{ width: "60px", height: "26px" }} />
      <div className="skeleton" style={{ width: "100px", height: "36px", borderRadius: "var(--radius-full)" }} />
    </div>
  </div>
);

export const TableRowSkeleton = ({ columns = 6 }) => (
  <tr>
    {Array.from({ length: columns }).map((_, idx) => (
      <td key={idx}>
        <div className="skeleton" style={{ width: "80%", height: "20px" }} />
      </td>
    ))}
  </tr>
);
