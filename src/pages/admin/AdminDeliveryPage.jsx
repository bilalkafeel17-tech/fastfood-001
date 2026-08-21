import React, { useState } from "react";
import { useOrders } from "../../context/OrderContext";
import { INITIAL_STAFF } from "../../data/initialStaff";
import { useToast } from "../../context/ToastContext";
import { Truck, MapPin, Phone, User, Clock, CheckCircle } from "lucide-react";
import { Badge } from "../../components/common/Badge";

export const AdminDeliveryPage = () => {
  const { orders, updateOrderStatus } = useOrders();
  const { showSuccess } = useToast();

  const drivers = INITIAL_STAFF.filter((s) => s.role === "Delivery Staff" || s.role === "Kitchen Staff");
  const deliveryOrders = orders.filter((o) => o.status === "Preparing" || o.status === "Out for Delivery" || o.status === "Confirmed");

  const handleAssignDriver = (orderId, driverName) => {
    updateOrderStatus(orderId, "Out for Delivery");
    showSuccess(`Assigned driver ${driverName} to order ${orderId}!`);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--dark)" }}>
            Delivery Fleet & Courier Dispatch 🚚
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "2px" }}>
            Assign drivers, monitor transit routes, and guarantee on-time thermal doorstep delivery.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "2rem", alignItems: "flex-start" }} className="dispatch-layout">
        {/* Active Dispatch Orders */}
        <div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--dark)", marginBottom: "1.25rem" }}>
            Active Orders Needing Delivery ({deliveryOrders.length})
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {deliveryOrders.length === 0 ? (
              <div style={{ background: "#FFFFFF", padding: "2.5rem", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", textAlign: "center", color: "var(--text-muted)" }}>
                All deliveries completed! No pending courier orders.
              </div>
            ) : (
              deliveryOrders.map((ord) => (
                <div
                  key={ord.id}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "var(--radius-xl)",
                    border: "1px solid var(--border-light)",
                    padding: "1.5rem",
                    boxShadow: "var(--shadow-sm)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <strong style={{ fontSize: "1.1rem" }}>#{ord.id}</strong>
                      <Badge type="status" text={ord.status} />
                    </div>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      ETA: {ord.estimatedDeliveryTime || "20 min"}
                    </span>
                  </div>

                  <div style={{ fontSize: "0.88rem", color: "var(--text-main)", marginBottom: "0.75rem" }}>
                    <strong>Customer:</strong> {ord.customer?.name} ({ord.customer?.phone})
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", fontSize: "0.85rem", color: "var(--text-muted)", background: "#F9FAFB", padding: "0.75rem", borderRadius: "var(--radius-md)", marginBottom: "1rem" }}>
                    <MapPin size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span>{ord.deliveryAddress?.street}, {ord.deliveryAddress?.city}</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>
                      Driver: <span style={{ color: "var(--primary)" }}>{ord.driver?.name || "Unassigned"}</span>
                    </div>

                    <button
                      onClick={() => handleAssignDriver(ord.id, "Jake Reynolds")}
                      className="btn btn-primary btn-sm"
                      style={{ borderRadius: "var(--radius-full)" }}
                    >
                      <Truck size={14} /> Dispatch Courier
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Courier Staff Status Roster */}
        <div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--dark)", marginBottom: "1.25rem" }}>
            Active Drivers Roster
          </h3>

          <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", padding: "1.5rem", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" alt="Jake" style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <strong style={{ fontSize: "0.95rem" }}>Jake Reynolds</strong>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Honda Civic (Red) • ⭐ 4.9</div>
                  </div>
                </div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--success)", background: "var(--success-light)", padding: "2px 8px", borderRadius: "var(--radius-full)" }}>
                  On Route
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" alt="Carlos" style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <strong style={{ fontSize: "0.95rem" }}>Carlos Mendez</strong>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Yamaha Scooter • ⭐ 4.8</div>
                  </div>
                </div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#3B82F6", background: "#EFF6FF", padding: "2px 8px", borderRadius: "var(--radius-full)" }}>
                  Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .dispatch-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
