import React from "react";
import { Modal } from "../common/Modal";
import { Printer, Flame, CheckCircle2 } from "lucide-react";

export const InvoiceModal = ({ order, isOpen, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="640px" title={`Invoice #${order.id}`}>
      <div id="printable-invoice" style={{ padding: "0.5rem 0" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid var(--dark)", paddingBottom: "1.25rem", marginBottom: "1.5rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Flame size={24} color="var(--primary)" fill="var(--secondary)" />
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 900 }}>
                CRAVE<span style={{ color: "var(--primary)" }}>BITE</span>
              </span>
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
              450 Gourmet Blvd, Springfield, NY 10001 <br />
              Phone: +1 (800) 555-CRAVE • support@cravebite.com
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--dark)" }}>INVOICE</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Order ID: #{order.id}</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Today"}
            </div>
          </div>
        </div>

        {/* Customer & Address Details */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem", fontSize: "0.88rem" }}>
          <div>
            <strong>Billed & Delivered To:</strong>
            <div style={{ color: "var(--dark)", fontWeight: 700, marginTop: "2px" }}>{order.customer?.name || "Customer"}</div>
            <div style={{ color: "var(--text-muted)" }}>{order.deliveryAddress?.street || "742 Evergreen Terrace"}</div>
            <div style={{ color: "var(--text-muted)" }}>{order.deliveryAddress?.city}, {order.deliveryAddress?.postalCode}</div>
            <div style={{ color: "var(--text-muted)" }}>Phone: {order.customer?.phone || "+1 (555) 912-3456"}</div>
          </div>

          <div style={{ textAlign: "right" }}>
            <strong>Payment Summary:</strong>
            <div style={{ color: "var(--dark)", fontWeight: 700, marginTop: "2px" }}>Method: {order.paymentMethod || "Credit Card"}</div>
            <div style={{ color: "var(--success)", fontWeight: 700 }}>Status: {order.paymentStatus || "Paid"}</div>
            <div style={{ color: "var(--text-muted)" }}>Delivery: {order.deliveryMethod || "Standard"}</div>
          </div>
        </div>

        {/* Items Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem", fontSize: "0.88rem" }}>
          <thead>
            <tr style={{ background: "#F3F4F6", borderBottom: "1px solid var(--border-light)" }}>
              <th style={{ padding: "0.6rem 0.8rem", textAlign: "left" }}>Item</th>
              <th style={{ padding: "0.6rem 0.8rem", textAlign: "center" }}>Qty</th>
              <th style={{ padding: "0.6rem 0.8rem", textAlign: "right" }}>Price</th>
              <th style={{ padding: "0.6rem 0.8rem", textAlign: "right" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid var(--border-light)" }}>
                <td style={{ padding: "0.65rem 0.8rem" }}>
                  <strong>{item.name}</strong>
                  {item.selectedSize?.name && <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Portion: {item.selectedSize.name}</div>}
                  {item.selectedAddOns?.length > 0 && <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Toppings: {item.selectedAddOns.map((a) => a.name).join(", ")}</div>}
                </td>
                <td style={{ padding: "0.65rem 0.8rem", textAlign: "center" }}>{item.quantity}</td>
                <td style={{ padding: "0.65rem 0.8rem", textAlign: "right" }}>${(item.unitPrice || item.price).toFixed(2)}</td>
                <td style={{ padding: "0.65rem 0.8rem", textAlign: "right", fontWeight: 700 }}>
                  ${(item.itemTotal || item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Breakdown */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem" }}>
          <div style={{ width: "240px", display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.88rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Subtotal:</span>
              <span>${Number(order.subtotal || order.total).toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--success)", fontWeight: 700 }}>
                <span>Discount ({order.couponCode || 'PROMO'}):</span>
                <span>-${Number(order.discount).toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Delivery Fee:</span>
              <span>${Number(order.deliveryFee || 0).toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Taxes (8%):</span>
              <span>${Number(order.tax || 0).toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.15rem", fontWeight: 900, borderTop: "2px solid var(--dark)", paddingTop: "0.5rem", marginTop: "0.25rem" }}>
              <span>Grand Total:</span>
              <span style={{ color: "var(--primary)" }}>${Number(order.total).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-light)", paddingTop: "1rem" }}>
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Thank you for dining with CraveBite!</span>
          <button onClick={handlePrint} className="btn btn-dark btn-sm" style={{ borderRadius: "var(--radius-full)" }}>
            <Printer size={15} /> Print Receipt
          </button>
        </div>
      </div>
    </Modal>
  );
};
