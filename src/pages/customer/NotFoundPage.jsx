import React from "react";
import { Link } from "react-router-dom";
import { Flame, ArrowLeft, Home, UtensilsCrossed } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <div style={{ padding: "5rem 1rem 8rem", textAlign: "center" }}>
      <div className="container" style={{ maxWidth: "560px" }}>
        <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>🍔💥</div>
        <span
          style={{
            background: "var(--primary-light)",
            color: "var(--primary)",
            fontWeight: 800,
            fontSize: "0.85rem",
            padding: "4px 14px",
            borderRadius: "var(--radius-full)",
            textTransform: "uppercase"
          }}
        >
          404 Page Not Found
        </span>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--dark)", marginTop: "0.75rem", marginBottom: "0.75rem" }}>
          Oops! Looks Like Someone Ate This Page!
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "2rem", lineHeight: 1.6 }}>
          The link you followed might be broken or the sizzling dish you're searching for was moved. Let's get you back to the delicious menu.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/" className="btn btn-primary btn-lg" style={{ fontWeight: 800 }}>
            <Home size={18} /> Return Home
          </Link>
          <Link to="/menu" className="btn btn-outline btn-lg" style={{ fontWeight: 700 }}>
            <UtensilsCrossed size={18} /> Explore Menu
          </Link>
        </div>
      </div>
    </div>
  );
};
