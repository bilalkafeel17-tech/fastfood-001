import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ShieldCheck, Lock, Mail, ArrowRight, KeyRound, Sparkles } from "lucide-react";

export const AdminLoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@cravebite.com");
  const [password, setPassword] = useState("Admin@123");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const logged = await login(email, password);
      if (logged.role === "admin") {
        navigate("/admin");
      }
    } catch {
      // toast shown in context
    } finally {
      setLoading(false);
    }
  };

  const handleFillAdmin = () => {
    setEmail("admin@cravebite.com");
    setPassword("Admin@123");
  };

  return (
    <div style={{ padding: "4rem 1rem 6rem", minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--dark)" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#18181B",
          borderRadius: "var(--radius-xl)",
          border: "1px solid #333338",
          boxShadow: "var(--shadow-xl)",
          padding: "2.5rem 2rem",
          color: "#FFFFFF"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "var(--primary)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.25rem",
              boxShadow: "var(--shadow-primary)"
            }}
          >
            <ShieldCheck size={32} />
          </div>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 900, color: "#FFFFFF" }}>
            Admin Management Portal
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#9CA3AF", marginTop: "4px" }}>
            Restricted to restaurant staff, managers, and super administrators.
          </p>
        </div>

        {/* Demo Credentials Alert Pill */}
        <div
          style={{
            padding: "1rem",
            borderRadius: "var(--radius-md)",
            background: "#222226",
            border: "1px solid #333338",
            marginBottom: "1.5rem"
          }}
        >
          <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--secondary)", textTransform: "uppercase", marginBottom: "4px" }}>
            ⚡ Demo Credentials:
          </div>
          <div style={{ fontSize: "0.82rem", color: "#E5E7EB", lineHeight: 1.4 }}>
            Email: <code>admin@cravebite.com</code> <br />
            Password: <code>Admin@123</code>
          </div>
          <button
            type="button"
            onClick={handleFillAdmin}
            style={{
              marginTop: "8px",
              background: "rgba(255, 183, 3, 0.15)",
              border: "1px solid var(--secondary)",
              color: "var(--secondary)",
              fontSize: "0.75rem",
              fontWeight: 700,
              padding: "4px 8px",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer"
            }}
          >
            Auto-fill Credentials
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ color: "#E5E7EB" }}>Admin Email</label>
            <input
              type="email"
              className="form-input"
              style={{ background: "#222226", borderColor: "#333338", color: "#FFFFFF" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ color: "#E5E7EB" }}>Password</label>
            <input
              type="password"
              className="form-input"
              style={{ background: "#222226", borderColor: "#333338", color: "#FFFFFF" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg"
            style={{ width: "100%", marginTop: "1rem", borderRadius: "var(--radius-full)", fontWeight: 800 }}
          >
            {loading ? "Authenticating..." : "Enter Admin Portal"} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.75rem" }}>
          <Link to="/" style={{ fontSize: "0.85rem", color: "#9CA3AF" }}>
            ← Return to Customer Storefront
          </Link>
        </div>
      </div>
    </div>
  );
};
