import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Truck,
  ChefHat,
  ShoppingBag,
  Flame,
  Play,
  RotateCcw,
  ShieldCheck
} from "lucide-react";
import { Badge } from "../../components/common/Badge";

export const TrackOrderPage = () => {
  const { id } = useParams();
  const { getOrderById, updateOrderStatus, orders } = useOrders();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const found = getOrderById(id) || (orders.length > 0 ? orders[0] : null);
    setOrder(found);
  }, [id, orders, getOrderById]);

  if (!order) {
    return (
      <div style={{ padding: "5rem 0", textAlign: "center" }}>
        <h2>Order Not Found</h2>
        <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>Could not find tracking info for order #{id}.</p>
        <Link to="/orders" className="btn btn-primary" style={{ marginTop: "1rem" }}>View My Orders</Link>
      </div>
    );
  }

  const stages = [
    { title: "Order Placed", desc: "Received by CraveBite kitchen server", icon: ShoppingBag, statusKey: "Pending" },
    { title: "Order Confirmed", desc: "Ingredients prepped & ticket printed", icon: CheckCircle2, statusKey: "Confirmed" },
    { title: "Preparing on Grill", desc: "Patties smashing & cheese melting", icon: ChefHat, statusKey: "Preparing" },
    { title: "Out for Delivery", desc: "Hot in thermal bag with courier", icon: Truck, statusKey: "Out for Delivery" },
    { title: "Delivered", desc: "Enjoy your sizzling feast!", icon: Flame, statusKey: "Delivered" }
  ];

  const statusOrder = ["Pending", "Confirmed", "Preparing", "Ready", "Out for Delivery", "Delivered"];
  const currentStageIndex = Math.max(0, statusOrder.indexOf(order.status));

  const handleSimulateNextStage = () => {
    if (currentStageIndex < statusOrder.length - 1) {
      const nextStatus = statusOrder[currentStageIndex + 1];
      updateOrderStatus(order.id, nextStatus);
    }
  };

  const handleResetStage = () => {
    updateOrderStatus(order.id, "Pending");
  };

  return (
    <div style={{ padding: "2.5rem 0 5rem" }}>
      <div className="container" style={{ maxWidth: "980px" }}>
        {/* Top Header Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-light)",
            padding: "1.75rem 2rem",
            boxShadow: "var(--shadow-sm)",
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem"
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "4px" }}>
              <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: "var(--dark)", margin: 0 }}>
                Live Order #{order.id}
              </h1>
              <Badge type="status" text={order.status} />
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
              Estimated Delivery Time: <strong style={{ color: "var(--dark)" }}>{order.estimatedDeliveryTime || "15:45 PM"}</strong> (In 18 mins)
            </p>
          </div>

          {/* Interactive Live Progression Simulator Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#F9FAFB",
              padding: "0.5rem 0.85rem",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-light)"
            }}
          >
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>
              Interactive Demo:
            </span>
            <button
              onClick={handleSimulateNextStage}
              disabled={order.status === "Delivered"}
              className="btn btn-primary btn-sm"
              style={{ fontSize: "0.78rem", padding: "0.35rem 0.75rem" }}
            >
              <Play size={12} /> Advance Stage
            </button>
            <button
              onClick={handleResetStage}
              className="btn btn-outline btn-sm"
              style={{ fontSize: "0.78rem", padding: "0.35rem 0.65rem" }}
            >
              <RotateCcw size={12} /> Reset
            </button>
          </div>
        </div>

        {/* 5-Step Visual Timeline Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-light)",
            padding: "2.5rem 2rem",
            boxShadow: "var(--shadow-sm)",
            marginBottom: "2rem"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              position: "relative",
              gap: "1rem"
            }}
            className="tracking-timeline-grid"
          >
            {stages.map((stage, idx) => {
              const isPassed = currentStageIndex >= idx;
              const isCurrent = currentStageIndex === idx;
              const Icon = stage.icon;

              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    position: "relative",
                    zIndex: 2
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      background: isPassed
                        ? "var(--primary)"
                        : "#F3F4F6",
                      color: isPassed ? "#FFFFFF" : "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "0.75rem",
                      boxShadow: isCurrent ? "var(--shadow-primary)" : "none",
                      border: isCurrent ? "3px solid var(--secondary)" : "none",
                      transition: "all var(--transition-fast)"
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h4 style={{ fontSize: "0.92rem", fontWeight: 800, color: isPassed ? "var(--dark)" : "var(--text-muted)", marginBottom: "2px" }}>
                    {stage.title}
                  </h4>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.3, maxWidth: "140px" }}>
                    {stage.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Simulated GPS Delivery Map & Courier Profile */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "2rem",
            alignItems: "flex-start"
          }}
          className="tracking-split-grid"
        >
          {/* Simulated Courier GPS Map */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-light)",
              overflow: "hidden",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-light)", fontWeight: 800, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Truck size={18} color="var(--primary)" /> Live Driver GPS Route
              </span>
              <span style={{ fontSize: "0.78rem", color: "var(--success)", fontWeight: 700 }}>
                ● Active GPS Signal
              </span>
            </div>

            {/* Visual Styled Map Mockup */}
            <div
              style={{
                height: "260px",
                background: "linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 100%)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
              }}
            >
              {/* Simulated streets grid lines */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                  opacity: 0.6
                }}
              />

              {/* Kitchen Origin Marker */}
              <div
                style={{
                  position: "absolute",
                  left: "20%",
                  top: "40%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "var(--dark)",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "var(--shadow-md)"
                  }}
                >
                  🍔
                </div>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, background: "#FFFFFF", padding: "2px 6px", borderRadius: "4px", marginTop: "3px", boxShadow: "var(--shadow-xs)" }}>
                  CraveBite Kitchen
                </span>
              </div>

              {/* Courier Moving Vehicle */}
              <div
                style={{
                  position: "absolute",
                  left: currentStageIndex >= 3 ? "60%" : "25%",
                  top: currentStageIndex >= 3 ? "50%" : "42%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
                  zIndex: 3
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "var(--primary)",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 15px rgba(230, 57, 70, 0.6)",
                    animation: "pulseGlow 2s infinite"
                  }}
                >
                  <Truck size={22} />
                </div>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, background: "var(--primary)", color: "#FFFFFF", padding: "2px 8px", borderRadius: "var(--radius-full)", marginTop: "3px" }}>
                  Driver Jake (En Route)
                </span>
              </div>

              {/* Destination House Marker */}
              <div
                style={{
                  position: "absolute",
                  right: "15%",
                  top: "35%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "var(--success)",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "var(--shadow-md)"
                  }}
                >
                  🏠
                </div>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, background: "#FFFFFF", padding: "2px 6px", borderRadius: "4px", marginTop: "3px", boxShadow: "var(--shadow-xs)" }}>
                  Your Doorstep
                </span>
              </div>
            </div>

            {/* Courier Profile Info */}
            <div style={{ padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
                  alt="Driver Jake"
                  style={{ width: "46px", height: "46px", borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--dark)" }}>
                    Jake Reynolds ⭐ 4.9
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    Red Honda Civic • Plate: CRV-882
                  </div>
                </div>
              </div>
              <a href="tel:+15555678901" className="btn btn-outline btn-sm" style={{ borderRadius: "var(--radius-full)" }}>
                <Phone size={14} /> Call Driver
              </a>
            </div>
          </div>

          {/* Right: Order Summary & Address details */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-light)",
              padding: "1.75rem",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--dark)", marginBottom: "1rem" }}>
              Delivery Details
            </h3>

            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                Delivery Address:
              </div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--dark)", marginTop: "2px" }}>
                {order.deliveryAddress?.street || "742 Evergreen Terrace"}
              </div>
              <div style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>
                {order.deliveryAddress?.city}, {order.deliveryAddress?.postalCode}
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "1rem", marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                Items in Feast ({order.items?.length || 0}):
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {order.items?.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                    <span>{item.quantity}x {item.name}</span>
                    <span style={{ fontWeight: 700 }}>${(item.itemTotal || item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: "1.5px dashed var(--border-light)", paddingTop: "0.85rem", display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "1.15rem", color: "var(--dark)" }}>
              <span>Total Paid</span>
              <span style={{ color: "var(--primary)" }}>${Number(order.total).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tracking-timeline-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .tracking-split-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
