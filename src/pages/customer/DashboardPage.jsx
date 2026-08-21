import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../context/OrderContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";
import { Badge } from "../../components/common/Badge";
import {
  User,
  Package,
  Heart,
  DollarSign,
  Clock,
  ArrowRight,
  Truck,
  MapPin,
  Ticket,
  Lock,
  Edit2,
  Check
} from "lucide-react";

export const DashboardPage = () => {
  const { user, updateProfile } = useAuth();
  const { orders } = useOrders();
  const { favoritesCount } = useFavorites();
  const { addToCart } = useCart();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || "");
  const [profilePhone, setProfilePhone] = useState(user?.phone || "");

  const userOrders = orders;
  const totalSpent = userOrders.reduce((sum, o) => (o.status !== "Cancelled" ? sum + Number(o.total || 0) : sum), 0);
  const pendingOrders = userOrders.filter((o) => o.status !== "Delivered" && o.status !== "Cancelled");

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    await updateProfile({ name: profileName, phone: profilePhone });
    setIsEditingProfile(false);
  };

  return (
    <div style={{ padding: "2.5rem 0 5rem" }}>
      <div className="container">
        {/* Dashboard Header Bar */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-light)",
            padding: "2rem",
            boxShadow: "var(--shadow-sm)",
            marginBottom: "2.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"}
              alt={user?.name}
              style={{ width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover", border: "3px solid var(--primary-light)" }}
            />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: "var(--dark)", margin: 0 }}>
                  Welcome, {user?.name || "Craver"}!
                </h1>
                <span
                  style={{
                    background: "var(--secondary)",
                    color: "var(--dark)",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    padding: "2px 8px",
                    borderRadius: "var(--radius-full)"
                  }}
                >
                  VIP Craver
                </span>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "3px" }}>
                {user?.email} • {user?.phone || "+1 (555) 912-3456"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditingProfile((p) => !p)}
            className="btn btn-outline"
            style={{ borderRadius: "var(--radius-full)" }}
          >
            <Edit2 size={16} /> {isEditingProfile ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Profile Edit Form Inline Card */}
        {isEditingProfile && (
          <form
            onSubmit={handleSaveProfile}
            style={{
              background: "#FFFFFF",
              borderRadius: "var(--radius-xl)",
              border: "1.5px solid var(--primary)",
              padding: "1.5rem",
              marginBottom: "2.5rem",
              boxShadow: "var(--shadow-md)"
            }}
          >
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--dark)", marginBottom: "1rem" }}>
              Update Profile Information
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: "var(--radius-full)" }}>
              <Check size={16} /> Save Changes
            </button>
          </form>
        )}

        {/* Summary Metric Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
            marginBottom: "3rem"
          }}
        >
          <div className="card" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Package size={24} />
            </div>
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Total Orders</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--dark)" }}>{userOrders.length}</div>
            </div>
          </div>

          <div className="card" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#FEF3C7", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Clock size={24} />
            </div>
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Active / In Progress</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--dark)" }}>{pendingOrders.length}</div>
            </div>
          </div>

          <div className="card" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--success-light)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <DollarSign size={24} />
            </div>
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Total Spent</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--dark)" }}>${totalSpent.toFixed(2)}</div>
            </div>
          </div>

          <div className="card" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#FEE2E2", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Heart size={24} fill="currentColor" />
            </div>
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Saved Favorites</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--dark)" }}>{favoritesCount}</div>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-light)",
            padding: "2rem",
            boxShadow: "var(--shadow-sm)",
            marginBottom: "3rem"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--dark)" }}>
              Recent Orders
            </h3>
            <Link to="/orders" style={{ color: "var(--primary)", fontWeight: 700, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "3px" }}>
              View All Orders <ArrowRight size={15} />
            </Link>
          </div>

          <div className="table-responsive">
            <table className="table-custom">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userOrders.slice(0, 5).map((ord) => (
                  <tr key={ord.id}>
                    <td>
                      <strong style={{ color: "var(--dark)" }}>{ord.id}</strong>
                    </td>
                    <td style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      {ord.createdAt ? new Date(ord.createdAt).toLocaleDateString() : "Today"}
                    </td>
                    <td style={{ fontSize: "0.85rem" }}>
                      {ord.items?.map((i) => `${i.quantity}x ${i.name}`).join(", ") || "Feast"}
                    </td>
                    <td>
                      <strong style={{ color: "var(--primary)" }}>${Number(ord.total).toFixed(2)}</strong>
                    </td>
                    <td>
                      <Badge type="status" text={ord.status} />
                    </td>
                    <td>
                      <Link
                        to={`/track-order/${ord.id}`}
                        className="btn btn-primary btn-sm"
                        style={{ padding: "0.35rem 0.75rem", fontSize: "0.78rem" }}
                      >
                        <Truck size={13} /> Track
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Shortcut Panels */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          <Link
            to="/addresses"
            className="card card-hoverable"
            style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}
          >
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#EFF6FF", color: "#3B82F6", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MapPin size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--dark)" }}>Saved Addresses</h4>
              <p style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>Manage home, work, and dorm locations</p>
            </div>
          </Link>

          <Link
            to="/coupons"
            className="card card-hoverable"
            style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}
          >
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#FEF3C7", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ticket size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--dark)" }}>My Coupons & Vouchers</h4>
              <p style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>Claim instant promo codes and discounts</p>
            </div>
          </Link>

          <Link
            to="/favorites"
            className="card card-hoverable"
            style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}
          >
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Heart size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--dark)" }}>Favorite Dishes</h4>
              <p style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>Fast re-order your favorite snacks</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
