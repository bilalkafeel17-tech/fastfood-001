import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle, Clock, MapPin, Truck, ArrowRight, ShoppingBag, Flame } from "lucide-react";
import confetti from "canvas-confetti";

export const OrderSuccessPage = () => {
  const location = useLocation();
  const order = location.state?.order || {
    id: "ORD-9841",
    total: 49.72,
    estimatedDeliveryTime: "25-30 Mins",
    deliveryAddress: {
      street: "742 Evergreen Terrace",
      city: "Springfield"
    },
    items: [
      { name: "Smoky BBQ Bacon Beast", quantity: 2, itemTotal: 33.98 },
      { name: "Signature Salted Caramel Pretzel Shake", quantity: 2, itemTotal: 15.74 }
    ]
  };

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 }
      });
    } catch {}
  }, []);

  return (
    <div style={{ padding: "4rem 0 6rem" }}>
      <div className="container" style={{ maxWidth: "680px" }}>
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-light)",
            boxShadow: "var(--shadow-lg)",
            padding: "3rem 2.5rem",
            textAlign: "center"
          }}
        >
          {/* Animated Success Icon */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "var(--success-light)",
              color: "var(--success)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              boxShadow: "0 0 25px rgba(42, 157, 143, 0.25)"
            }}
          >
            <CheckCircle size={46} strokeWidth={2.5} />
          </div>

          <span
            style={{
              background: "var(--primary-light)",
              color: "var(--primary)",
              fontWeight: 800,
              fontSize: "0.85rem",
              padding: "4px 14px",
              borderRadius: "var(--radius-full)",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}
          >
            Order Confirmed & Sizzling! 🔥
          </span>

          <h1 style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--dark)", marginTop: "0.75rem", marginBottom: "0.5rem" }}>
            Thank You For Your Order!
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", marginBottom: "2rem" }}>
            Order <strong style={{ color: "var(--dark)" }}>#{order.id}</strong> has been transmitted to our kitchen line. Our chefs are firing up the grill right now!
          </p>

          {/* Key Info Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "2rem",
              textAlign: "left"
            }}
          >
            <div style={{ padding: "1.1rem", borderRadius: "var(--radius-md)", background: "#F9FAFB", border: "1px solid var(--border-light)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--primary)", fontWeight: 700, fontSize: "0.85rem", marginBottom: "4px" }}>
                <Clock size={16} /> Estimated Arrival
              </div>
              <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--dark)" }}>
                {order.estimatedDeliveryTime || "20-30 mins"}
              </div>
            </div>

            <div style={{ padding: "1.1rem", borderRadius: "var(--radius-md)", background: "#F9FAFB", border: "1px solid var(--border-light)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--success)", fontWeight: 700, fontSize: "0.85rem", marginBottom: "4px" }}>
                <MapPin size={16} /> Delivering To
              </div>
              <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--dark)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                {order.deliveryAddress?.street || "742 Evergreen Terrace"}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to={`/track-order/${order.id}`}
              className="btn btn-primary btn-lg"
              style={{ fontWeight: 800, padding: "0.9rem 2rem", boxShadow: "var(--shadow-primary)" }}
            >
              <Truck size={20} /> Track Live Order Progress
            </Link>
            <Link
              to="/menu"
              className="btn btn-outline btn-lg"
              style={{ fontWeight: 700, padding: "0.9rem 1.8rem" }}
            >
              Back to Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
