import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { Flame, Mail, ArrowLeft, CheckCircle } from "lucide-react";

export const ForgotPasswordPage = () => {
  const { showSuccess } = useToast();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    showSuccess("Password reset instructions sent to your email!");
  };

  return (
    <div style={{ padding: "4rem 1rem 6rem", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "#FFFFFF",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--border-light)",
          boxShadow: "var(--shadow-lg)",
          padding: "2.5rem 2rem",
          textAlign: "center"
        }}
      >
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

        <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: "var(--dark)", marginBottom: "0.5rem" }}>
          Reset Password
        </h1>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1.75rem" }}>
          Enter the email associated with your CraveBite account and we'll send you a password reset link.
        </p>

        {sent ? (
          <div style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)", background: "var(--success-light)", border: "1px solid #A5D6A7", marginBottom: "1.5rem" }}>
            <CheckCircle size={36} color="var(--success)" style={{ margin: "0 auto 0.75rem" }} />
            <h4 style={{ color: "var(--success)", fontWeight: 800, fontSize: "1.05rem" }}>Email Dispatched!</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-main)", marginTop: "4px" }}>
              Please check your inbox at <strong>{email}</strong> for instructions to reset your credentials.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: "100%", marginTop: "1rem", borderRadius: "var(--radius-full)", fontWeight: 800 }}
            >
              Send Reset Link
            </button>
          </form>
        )}

        <div style={{ marginTop: "1.75rem" }}>
          <Link to="/login" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.88rem", fontWeight: 700, color: "var(--primary)" }}>
            <ArrowLeft size={16} /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
