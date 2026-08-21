import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Flame, Lock, Mail, User, Phone, Eye, EyeOff, ArrowRight } from "lucide-react";

export const RegisterPage = () => {
  const { register } = useAuth();
  const { showError } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showError("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.phone, formData.password);
      navigate("/dashboard");
    } catch {
      // toast shown in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "4rem 1rem 6rem", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#FFFFFF",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--border-light)",
          boxShadow: "var(--shadow-lg)",
          padding: "2.5rem 2rem"
        }}
      >
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
            Create Your Account 🎉
          </h1>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "4px" }}>
            Join CraveBite Club and get 15% OFF your first order.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Jordan Miller"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="jordan@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-input"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Min 6 chars"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Repeat password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg"
            style={{ width: "100%", marginTop: "1rem", borderRadius: "var(--radius-full)", fontWeight: 800 }}
          >
            {loading ? "Creating Account..." : "Create Free Account"} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.75rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--primary)", fontWeight: 700 }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
