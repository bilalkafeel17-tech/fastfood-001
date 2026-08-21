import React from "react";
import { useNotifications } from "../../context/NotificationContext";
import { Bell, CheckCheck, Trash2, Flame, Ticket, Package, AlertCircle } from "lucide-react";
import { EmptyState } from "../../components/common/EmptyState";

export const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, clearAll } = useNotifications();

  const customerNotifs = notifications.filter((n) => n.target === "customer");

  return (
    <div style={{ padding: "2.5rem 0 5rem" }}>
      <div className="container" style={{ maxWidth: "780px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--dark)" }}>
              Notifications 🔔
            </h1>
            <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "4px" }}>
              Stay updated on your live cooking, drivers, and promo drops.
            </p>
          </div>
          {customerNotifs.length > 0 && (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => markAllAsRead("customer")}
                className="btn btn-outline btn-sm"
                style={{ borderRadius: "var(--radius-full)" }}
              >
                <CheckCheck size={15} /> Mark All Read
              </button>
              <button
                onClick={clearAll}
                className="btn btn-ghost btn-sm"
                style={{ color: "var(--error)" }}
              >
                <Trash2 size={15} /> Clear All
              </button>
            </div>
          )}
        </div>

        {customerNotifs.length === 0 ? (
          <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", padding: "3rem" }}>
            <EmptyState
              emoji="🔕"
              title="No New Notifications"
              description="You're all caught up! Order status updates and secret discounts will appear here."
            />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {customerNotifs.map((n) => (
              <div
                key={n.id}
                style={{
                  background: n.read ? "#FFFFFF" : "var(--primary-light)",
                  border: n.read ? "1px solid var(--border-light)" : "1.5px solid var(--primary)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: n.type === "order" ? "var(--primary)" : "var(--secondary)",
                      color: n.type === "order" ? "#FFFFFF" : "var(--dark)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    {n.type === "order" ? <Package size={20} /> : <Ticket size={20} />}
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--dark)", marginBottom: "2px" }}>
                      {n.title}
                    </h4>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-main)", lineHeight: 1.4 }}>
                      {n.message}
                    </p>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px", display: "block" }}>
                      {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {!n.read && (
                    <button
                      onClick={() => markAsRead(n.id)}
                      className="btn btn-ghost btn-sm"
                      style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)" }}
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(n.id)}
                    style={{ background: "transparent", border: "none", color: "#9CA3AF", cursor: "pointer", padding: "4px" }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
