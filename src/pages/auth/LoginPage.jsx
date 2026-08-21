import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Flame, Lock, Mail, Eye, EyeOff, ShieldAlert, ArrowRight, Check } from "lucide-react";

export const LoginPage = () => {
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("alex.jordan@gmail.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loggedUser = await login(email, password, remember);
      if (loggedUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate(from, { replace: true });
      }
    } catch {
      // Toast error handles message
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (type) => {
    if (type === "admin") {
      setEmail("admin@cravebite.com");
      setPassword("Admin@123");
    } else {
      setEmail("alex.jordan@gmail.com");
      setPassword("password123");
    }
  };

  return (
    <div style={{ padding: "4rem 1rem 6rem", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#FFFFFF",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--border-light)",
          boxShadow: "var(--shadow-lg)",
          padding: "2.5rem 2rem"
        }}
      >
        {/* Brand Logo Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: "var(--primary)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              boxShadow: "var(--shadow-primary)"
            }}
          >
            <Flame size={30} fill="#FFB703" color="#FFB703" />
          </div>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 900, color: "var(--dark)" }}>
            Welcome Back! 👋
          </h1>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "4px" }}>
            Sign in to track orders, claim vouchers, and enjoy instant checkout.
          </p>
        </div>

        {/* Demo Quick-Fill Buttons */}
        <div
          style={{
            padding: "0.85rem",
            borderRadius: "var(--radius-lg)",
            background: "#F9FAFB",
            border: "1px solid var(--border-light)",
            marginBottom: "1.75rem"
          }}
        >
          <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "6px" }}>
            ⚡ Instant 1-Click Demo Login:
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            <button
              type="button"
              onClick={() => handleFillDemo("customer")}
              className="btn btn-outline btn-sm"
              style={{ fontSize: "0.78rem", borderRadius: "var(--radius-md)" }}
            >
              Demo Customer
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo("admin")}
              className="btn btn-dark btn-sm"
              style={{ fontSize: "0.78rem", borderRadius: "var(--radius-md)", background: "var(--primary)", borderColor: "var(--primary)" }}
            >
              <ShieldAlert size={13} /> Demo Admin
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                className="form-input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label className="form-label" style={{ margin: 0 }}>Password</label>
              <Link to="/forgot-password" style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 600 }}>
                Forgot Password?
              </Link>
            </div>
            <div style={{ position: "relative", marginTop: "4px" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#9CA3AF"
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "1.25rem 0" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "var(--text-muted)", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember this device</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg"
            style={{ width: "100%", borderRadius: "var(--radius-full)", fontWeight: 800 }}
          >
            {loading ? "Signing in..." : "Sign In to CraveBite"} <ArrowRight size={18} />
          </button>
        </form>

        {/* Footer Link */}
        <div style={{ textAlign: "center", marginTop: "1.75rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          Don't have an account yet?{" "}
          <Link to="/register" style={{ color: "var(--primary)", fontWeight: 700 }}>
            Sign Up Free
          </Link>
        </div>
      </div>
    </div>
  );
};
