import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Tags,
  Users,
  Star,
  Ticket,
  Flame,
  CreditCard,
  Truck,
  UserCheck,
  BarChart3,
  Settings,
  LogOut,
  ExternalLink,
  X
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const AdminSidebar = ({ isOpen, onClose }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { to: "/admin/products", label: "Products", icon: UtensilsCrossed },
    { to: "/admin/categories", label: "Categories", icon: Tags },
    { to: "/admin/customers", label: "Customers", icon: Users },
    { to: "/admin/reviews", label: "Reviews", icon: Star },
    { to: "/admin/coupons", label: "Coupons", icon: Ticket },
    { to: "/admin/deals", label: "Deals & Combos", icon: Flame },
    { to: "/admin/payments", label: "Payments", icon: CreditCard },
    { to: "/admin/delivery", label: "Delivery Dispatch", icon: Truck },
    { to: "/admin/staff", label: "Staff & Roles", icon: UserCheck },
    { to: "/admin/reports", label: "Reports & Analytics", icon: BarChart3 },
    { to: "/admin/settings", label: "Settings", icon: Settings }
  ];

  return (
    <aside
      style={{
        width: "260px",
        height: "100vh",
        background: "var(--dark)",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 900,
        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
        transition: "transform 0.25s ease",
        transform: isOpen ? "translateX(0)" : "translateX(-100%)"
      }}
      className="admin-sidebar"
    >
      {/* Brand Header */}
      <div
        style={{
          padding: "1.25rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
        }}
      >
        <Link to="/admin" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF"
            }}
          >
            <Flame size={20} fill="#FFB703" color="#FFB703" />
          </div>
          <div>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 900, color: "#FFFFFF" }}>
              CRAVE<span style={{ color: "var(--primary)" }}>BITE</span>
            </span>
            <span style={{ display: "block", fontSize: "0.65rem", color: "var(--secondary)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>
              ADMIN PANEL
            </span>
          </div>
        </Link>

        <button
          onClick={onClose}
          className="admin-sidebar-close"
          style={{ background: "transparent", border: "none", color: "#9CA3AF", cursor: "pointer", display: "none" }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation List */}
      <div style={{ flex: 1, overflowY: "auto", padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => {
                if (window.innerWidth <= 900 && onClose) onClose();
              }}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.65rem 1rem",
                borderRadius: "var(--radius-md)",
                fontSize: "0.88rem",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "#FFFFFF" : "#9CA3AF",
                background: isActive ? "var(--primary)" : "transparent",
                transition: "all var(--transition-fast)"
              })}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Footer Profile & Actions */}
      <div
        style={{
          padding: "1rem 1.25rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          background: "#18181B"
        }}
      >
        <Link
          to="/"
          target="_blank"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.82rem",
            color: "var(--secondary)",
            fontWeight: 700,
            marginBottom: "0.85rem"
          }}
        >
          <ExternalLink size={14} /> Open Live Customer Storefront
        </Link>

        <button
          onClick={() => {
            logout();
            navigate("/admin/login");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "transparent",
            border: "none",
            color: "var(--error)",
            fontSize: "0.85rem",
            fontWeight: 700,
            cursor: "pointer",
            width: "100%",
            textAlign: "left"
          }}
        >
          <LogOut size={16} /> Sign Out Admin
        </button>
      </div>

      <style>{`
        @media (min-width: 901px) {
          .admin-sidebar {
            transform: translateX(0) !important;
          }
        }
        @media (max-width: 900px) {
          .admin-sidebar-close {
            display: block !important;
          }
        }
      `}</style>
    </aside>
  );
};
