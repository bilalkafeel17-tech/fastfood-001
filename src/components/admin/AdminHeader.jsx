import React from "react";
import { Link } from "react-router-dom";
import { Menu, Bell, Search, ExternalLink, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";

export const AdminHeader = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const { unreadAdminCount } = useNotifications();

  return (
    <header
      style={{
        height: "70px",
        background: "#FFFFFF",
        borderBottom: "1px solid var(--border-light)",
        padding: "0 1.75rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 500
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          onClick={onToggleSidebar}
          className="btn-icon"
          style={{ width: "38px", height: "38px", border: "1px solid var(--border-light)" }}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--dark)" }} className="admin-header-title">
          CraveBite Restaurant Operations Center
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link
          to="/"
          target="_blank"
          className="btn btn-outline btn-sm"
          style={{ borderRadius: "var(--radius-full)", fontSize: "0.82rem" }}
        >
          <ExternalLink size={14} /> Storefront Preview
        </Link>

        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <div
            className="btn-icon"
            style={{ width: "38px", height: "38px", cursor: "pointer" }}
            title={`${unreadAdminCount} unread system notifications`}
          >
            <Bell size={18} />
            {unreadAdminCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "2px",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "var(--primary)"
                }}
              />
            )}
          </div>
        </div>

        {/* Admin Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80"}
            alt={user?.name}
            style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }} className="admin-profile-name">
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--dark)" }}>
              {user?.name || "Admin"}
            </span>
            <span style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 700 }}>
              Super Administrator
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .admin-header-title { display: none !important; }
          .admin-profile-name { display: none !important; }
        }
      `}</style>
    </header>
  );
};
