import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";
import { useCart } from "../../context/CartContext";
import { Badge } from "../../components/common/Badge";
import { EmptyState } from "../../components/common/EmptyState";
import { Package, Truck, RotateCcw, Clock, MapPin, Eye, ShoppingBag } from "lucide-react";

export const MyOrdersPage = () => {
  const { orders } = useOrders();
  const { addToCart } = useCart();
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "active") return o.status !== "Delivered" && o.status !== "Cancelled";
    if (filterStatus === "delivered") return o.status === "Delivered";
    if (filterStatus === "cancelled") return o.status === "Cancelled";
    return true;
  });

  const handleReorder = (order) => {
    order.items?.forEach((item) => {
      addToCart(
        {
          id: item.productId || item.id,
          name: item.name,
          category: item.category || "burgers",
          price: item.price || item.unitPrice,
          image: item.image
        },
        item.quantity,
        item.selectedSize,
        item.selectedAddOns,
        item.specialInstructions
      );
    });
  };

  return (
    <div style={{ padding: "2.5rem 0 5rem" }}>
      <div className="container" style={{ maxWidth: "980px" }}>
        {/* Page Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary)", letterSpacing: "1px", textTransform: "uppercase" }}>
              Order Timeline
            </span>
            <h1 style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--dark)", marginTop: "4px" }}>
              My Orders & History 📦
            </h1>
          </div>

          {/* Status Filter Buttons */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => setFilterStatus("all")}
              className={`btn btn-sm ${filterStatus === "all" ? "btn-dark" : "btn-outline"}`}
            >
              All ({orders.length})
            </button>
            <button
              onClick={() => setFilterStatus("active")}
              className={`btn btn-sm ${filterStatus === "active" ? "btn-primary" : "btn-outline"}`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilterStatus("delivered")}
              className={`btn btn-sm ${filterStatus === "delivered" ? "btn-dark" : "btn-outline"}`}
            >
              Delivered
            </button>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", padding: "3rem" }}>
            <EmptyState
              emoji="📦"
              title="No orders found"
              description="You don't have any orders under this filter status."
              actionText="Order Your Next Meal"
              actionLink="/menu"
            />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--border-light)",
                  padding: "1.75rem",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                {/* Top Row: Order ID, Date, Status */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-light)", paddingBottom: "1rem", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <strong style={{ fontSize: "1.15rem", color: "var(--dark)" }}>#{order.id}</strong>
                      <Badge type="status" text={order.status} />
                    </div>
                    <div style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginTop: "2px" }}>
                      Placed on {order.createdAt ? new Date(order.createdAt).toLocaleString() : "Recent"}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "0.6rem" }}>
                    <Link
                      to={`/track-order/${order.id}`}
                      className="btn btn-primary btn-sm"
                      style={{ borderRadius: "var(--radius-full)" }}
                    >
                      <Truck size={14} /> Live Track
                    </Link>
                    <button
                      onClick={() => handleReorder(order)}
                      className="btn btn-outline btn-sm"
                      style={{ borderRadius: "var(--radius-full)" }}
                    >
                      <RotateCcw size={14} /> Reorder
                    </button>
                  </div>
                </div>

                {/* Items List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  {order.items?.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "50px", height: "50px", borderRadius: "var(--radius-sm)", objectFit: "cover" }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--dark)" }}>
                          {item.quantity}x {item.name}
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                          {item.selectedSize?.name && `Portion: ${item.selectedSize.name}`}
                          {item.selectedAddOns?.length > 0 && ` • Addons: ${item.selectedAddOns.map((a) => a.name).join(", ")}`}
                        </div>
                      </div>
                      <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--dark)" }}>
                        ${(item.itemTotal || item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Row: Address & Total */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px dashed var(--border-light)", paddingTop: "1rem", fontSize: "0.88rem", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--text-muted)" }}>
                    <MapPin size={15} color="var(--primary)" />
                    <span>{order.deliveryAddress?.street || "742 Evergreen Terrace"}</span>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-muted)" }}>Grand Total: </span>
                    <strong style={{ fontSize: "1.15rem", color: "var(--primary)" }}>${Number(order.total).toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
