import React, { useState } from "react";
import { useOrders } from "../../context/OrderContext";
import { Badge } from "../../components/common/Badge";
import { InvoiceModal } from "../../components/admin/InvoiceModal";
import { Modal } from "../../components/common/Modal";
import { Search, Filter, FileText, Eye, CheckCircle2, XCircle, Truck, Printer } from "lucide-react";

export const AdminOrdersPage = () => {
  const { orders, updateOrderStatus, cancelOrder } = useOrders();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== "all" && o.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchId = o.id.toLowerCase().includes(q);
      const matchName = o.customer?.name?.toLowerCase().includes(q);
      if (!matchId && !matchName) return false;
    }
    return true;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--dark)" }}>
            Live Orders Management 📦
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "2px" }}>
            Track, update, and fulfill incoming customer orders in real-time.
          </p>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--border-light)",
          padding: "1.25rem",
          boxShadow: "var(--shadow-sm)",
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap"
        }}
      >
        <div style={{ position: "relative", flex: "1 1 280px" }}>
          <Search size={18} color="#9CA3AF" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            placeholder="Search by Order ID (e.g. ORD-9841) or Customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", padding: "0.65rem 1rem 0.65rem 2.5rem", borderRadius: "var(--radius-md)", border: "1.5px solid var(--border-light)", outline: "none" }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {["all", "Pending", "Confirmed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: "0.45rem 0.85rem",
                borderRadius: "var(--radius-full)",
                border: statusFilter === st ? "1.5px solid var(--dark)" : "1px solid var(--border-light)",
                background: statusFilter === st ? "var(--dark)" : "#F9FAFB",
                color: statusFilter === st ? "#FFFFFF" : "var(--text-main)",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "capitalize"
              }}
            >
              {st === "all" ? `All (${orders.length})` : st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--border-light)",
          boxShadow: "var(--shadow-sm)",
          overflow: "hidden"
        }}
      >
        <div className="table-responsive">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Delivery Address</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Change Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                    No orders matching this filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id}>
                    <td>
                      <strong style={{ color: "var(--dark)" }}>{ord.id}</strong>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        {ord.createdAt ? new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Recent"}
                      </div>
                    </td>
                    <td>
                      <strong>{ord.customer?.name || "Alex Jordan"}</strong>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{ord.customer?.phone || "+1 555-912-3456"}</div>
                    </td>
                    <td style={{ fontSize: "0.825rem", maxWidth: "200px" }}>
                      {ord.deliveryAddress?.street || "742 Evergreen Terrace"}, {ord.deliveryAddress?.city}
                    </td>
                    <td style={{ fontSize: "0.825rem" }}>
                      {ord.items?.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
                    </td>
                    <td>
                      <strong style={{ color: "var(--primary)" }}>${Number(ord.total).toFixed(2)}</strong>
                    </td>
                    <td>
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: ord.paymentStatus === "Paid" ? "var(--success)" : "var(--warning)" }}>
                        {ord.paymentStatus || "Paid"}
                      </span>
                    </td>
                    <td><Badge type="status" text={ord.status} /></td>
                    <td>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        style={{
                          padding: "0.35rem 0.6rem",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--border-light)",
                          background: "#FFFFFF",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "4px" }}>
                        <button
                          onClick={() => setViewingOrder(ord)}
                          className="btn btn-icon"
                          style={{ width: "32px", height: "32px" }}
                          title="View Details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => setSelectedInvoice(ord)}
                          className="btn btn-icon"
                          style={{ width: "32px", height: "32px", color: "var(--primary)" }}
                          title="Print Receipt"
                        >
                          <FileText size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Order Modal */}
      {viewingOrder && (
        <Modal isOpen={Boolean(viewingOrder)} onClose={() => setViewingOrder(null)} title={`Order Summary #${viewingOrder.id}`}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div>
                <strong>Customer:</strong> {viewingOrder.customer?.name} ({viewingOrder.customer?.phone})
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{viewingOrder.customer?.email}</div>
              </div>
              <Badge type="status" text={viewingOrder.status} />
            </div>

            <div style={{ background: "#F9FAFB", padding: "1rem", borderRadius: "var(--radius-md)", marginBottom: "1rem", fontSize: "0.88rem" }}>
              <strong>Delivery Location:</strong>
              <div>{viewingOrder.deliveryAddress?.street}, {viewingOrder.deliveryAddress?.city}, {viewingOrder.deliveryAddress?.postalCode}</div>
              {viewingOrder.deliveryAddress?.instructions && (
                <div style={{ fontStyle: "italic", color: "var(--text-muted)", marginTop: "4px" }}>
                  Note: "{viewingOrder.deliveryAddress.instructions}"
                </div>
              )}
            </div>

            <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ fontWeight: 800, marginBottom: "0.5rem" }}>Ordered Items:</div>
              {viewingOrder.items?.map((item, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", padding: "4px 0" }}>
                  <span>{item.quantity}x {item.name} {item.selectedSize?.name && `(${item.selectedSize.name})`}</span>
                  <strong>${(item.itemTotal || item.price * item.quantity).toFixed(2)}</strong>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1.5px dashed var(--border-light)", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", fontSize: "1.1rem", fontWeight: 900 }}>
              <span>Total:</span>
              <span style={{ color: "var(--primary)" }}>${Number(viewingOrder.total).toFixed(2)}</span>
            </div>
          </div>
        </Modal>
      )}

      {/* Invoice Modal */}
      <InvoiceModal
        order={selectedInvoice}
        isOpen={Boolean(selectedInvoice)}
        onClose={() => setSelectedInvoice(null)}
      />
    </div>
  );
};
