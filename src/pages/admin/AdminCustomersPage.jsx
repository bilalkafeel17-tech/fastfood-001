import React, { useState, useEffect } from "react";
import { customerService } from "../../services/customerService";
import { useToast } from "../../context/ToastContext";
import { Users, Search, Ban, CheckCircle, Trash2, Mail, Phone, MapPin } from "lucide-react";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";

export const AdminCustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const { showSuccess } = useToast();

  useEffect(() => {
    customerService.getAll().then(setCustomers);
  }, []);

  const handleToggleStatus = async (cust) => {
    const nextStatus = cust.status === "Active" ? "Blocked" : "Active";
    await customerService.updateStatus(cust.id, nextStatus);
    setCustomers(customers.map((c) => (c.id === cust.id ? { ...c, status: nextStatus } : c)));
    showSuccess(`Customer account set to ${nextStatus}.`);
  };

  const handleConfirmDelete = async () => {
    if (deletingId) {
      await customerService.delete(deletingId);
      setCustomers(customers.filter((c) => c.id !== deletingId));
      setDeletingId(null);
      showSuccess("Customer record deleted.");
    }
  };

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--dark)" }}>
            Registered Customers & Foodies 👥
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "2px" }}>
            View customer ordering activity, loyalty spending, contact details, and manage access.
          </p>
        </div>
      </div>

      {/* Search */}
      <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", padding: "1.25rem", marginBottom: "2rem" }}>
        <div style={{ position: "relative", maxWidth: "400px" }}>
          <Search size={18} color="#9CA3AF" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            placeholder="Search by customer name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "0.65rem 1rem 0.65rem 2.5rem", borderRadius: "var(--radius-md)", border: "1.5px solid var(--border-light)", outline: "none" }}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
        <div className="table-responsive">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact Info</th>
                <th>Orders Count</th>
                <th>Total Spent</th>
                <th>Registered</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <img src={c.avatar} alt={c.name} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
                      <div>
                        <strong>{c.name}</strong>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>ID: {c.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: "0.85rem" }}>
                    <div>{c.email}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{c.phone}</div>
                  </td>
                  <td><strong>{c.ordersCount || 0} orders</strong></td>
                  <td><strong style={{ color: "var(--primary)" }}>${(c.totalSpent || 0).toFixed(2)}</strong></td>
                  <td style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{c.registrationDate || "2024-01-15"}</td>
                  <td>
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "var(--radius-full)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        background: c.status === "Active" ? "var(--success-light)" : "var(--error-light)",
                        color: c.status === "Active" ? "var(--success)" : "var(--error)"
                      }}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        onClick={() => handleToggleStatus(c)}
                        className="btn btn-icon"
                        style={{ width: "32px", height: "32px" }}
                        title={c.status === "Active" ? "Block Customer" : "Unblock Customer"}
                      >
                        {c.status === "Active" ? <Ban size={14} color="var(--error)" /> : <CheckCircle size={14} color="var(--success)" />}
                      </button>
                      <button
                        onClick={() => setDeletingId(c.id)}
                        className="btn btn-icon"
                        style={{ width: "32px", height: "32px", color: "var(--error)" }}
                        title="Delete Record"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Customer Profile?"
        message="This will permanently delete this customer record and associated addresses."
      />
    </div>
  );
};
