import React, { useState } from "react";
import { useOrders } from "../../context/OrderContext";
import { CreditCard, Search, DollarSign, CheckCircle2, Clock, AlertTriangle, RefreshCw } from "lucide-react";
import { useToast } from "../../context/ToastContext";

export const AdminPaymentsPage = () => {
  const { orders } = useOrders();
  const { showSuccess } = useToast();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const transactions = orders.map((o, idx) => ({
    txId: `TXN-${98400 + idx}`,
    orderId: o.id,
    customer: o.customer?.name || "Customer",
    amount: o.total || 0,
    method: o.paymentMethod || "Credit Card",
    status: o.paymentStatus || "Paid",
    date: o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "Today"
  }));

  const filtered = transactions.filter((t) => {
    if (filter !== "all" && t.status.toLowerCase() !== filter.toLowerCase()) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return t.txId.toLowerCase().includes(q) || t.orderId.toLowerCase().includes(q) || t.customer.toLowerCase().includes(q);
    }
    return true;
  });

  const totalCollected = transactions.reduce((sum, t) => (t.status === "Paid" ? sum + Number(t.amount) : sum), 0);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--dark)" }}>
            Financial Transactions & Payments 💳
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "2px" }}>
            Real-time ledger of credit card payments, digital wallets, cash collections, and refunds.
          </p>
        </div>

        <div style={{ background: "#FFFFFF", padding: "0.75rem 1.25rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)", textAlign: "right" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>Total Collected</div>
          <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--primary)" }}>${totalCollected.toFixed(2)}</div>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", padding: "1.25rem", marginBottom: "2rem", display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ position: "relative", maxWidth: "340px", flex: 1 }}>
          <Search size={18} color="#9CA3AF" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            placeholder="Search by TXN ID, Order ID, Customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "0.65rem 1rem 0.65rem 2.5rem", borderRadius: "var(--radius-md)", border: "1.5px solid var(--border-light)", outline: "none" }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.4rem" }}>
          {["all", "Paid", "Pending", "Refunded"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`btn btn-sm ${filter === st ? "btn-dark" : "btn-outline"}`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
        <div className="table-responsive">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Payment Gateway / Method</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.txId}>
                  <td><strong>{t.txId}</strong></td>
                  <td><code>{t.orderId}</code></td>
                  <td>{t.customer}</td>
                  <td><strong style={{ color: "var(--primary)" }}>${Number(t.amount).toFixed(2)}</strong></td>
                  <td style={{ fontSize: "0.85rem" }}>{t.method}</td>
                  <td style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{t.date}</td>
                  <td>
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "var(--radius-full)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        background: t.status === "Paid" ? "var(--success-light)" : "var(--warning-light)",
                        color: t.status === "Paid" ? "var(--success)" : "#B45309"
                      }}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
