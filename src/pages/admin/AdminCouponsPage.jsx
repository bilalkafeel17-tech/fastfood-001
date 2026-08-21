import React, { useState, useEffect } from "react";
import { couponService } from "../../services/couponService";
import { useToast } from "../../context/ToastContext";
import { Modal } from "../../components/common/Modal";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";
import { Ticket, Plus, Edit, Trash2, Check } from "lucide-react";

export const AdminCouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const { showSuccess, showError } = useToast();

  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: 20,
    minOrder: 25.00,
    maxDiscount: 15.00,
    description: "",
    expiryDate: "2026-12-31",
    usageLimit: 500,
    active: true
  });

  const loadCoupons = async () => {
    const list = await couponService.getAll();
    setCoupons(list);
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleOpenAdd = () => {
    setEditingCoupon(null);
    setFormData({
      code: "",
      discountType: "percentage",
      discountValue: 20,
      minOrder: 25.00,
      maxDiscount: 15.00,
      description: "",
      expiryDate: "2026-12-31",
      usageLimit: 500,
      active: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (c) => {
    setEditingCoupon(c);
    setFormData({ ...c });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.code.trim()) return;

    try {
      if (editingCoupon) {
        await couponService.update(editingCoupon.id, formData);
        showSuccess("Coupon updated!");
      } else {
        await couponService.create(formData);
        showSuccess("New coupon created!");
      }
      setModalOpen(false);
      loadCoupons();
    } catch (err) {
      showError(err.message || "Failed to save coupon");
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingId) {
      await couponService.delete(deletingId);
      setDeletingId(null);
      showSuccess("Coupon deleted.");
      loadCoupons();
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--dark)" }}>
            Coupon & Discount Voucher Manager 🎟️
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "2px" }}>
            Create discount rules, limit redemptions, and monitor coupon claim metrics.
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-primary" style={{ borderRadius: "var(--radius-full)" }}>
          <Plus size={18} /> Create New Coupon
        </button>
      </div>

      {/* Table */}
      <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
        <div className="table-responsive">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Discount Type</th>
                <th>Value</th>
                <th>Min. Order</th>
                <th>Expiry</th>
                <th>Claims Used</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id}>
                  <td>
                    <strong style={{ background: "var(--secondary-light)", padding: "2px 8px", borderRadius: "var(--radius-sm)", color: "var(--dark)" }}>
                      {c.code}
                    </strong>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>{c.description}</div>
                  </td>
                  <td style={{ textTransform: "capitalize", fontSize: "0.85rem" }}>{c.discountType}</td>
                  <td>
                    <strong style={{ color: "var(--primary)" }}>
                      {c.discountType === "percentage" ? `${c.discountValue}%` : c.discountType === "fixed" ? `$${c.discountValue}` : "Free Shipping"}
                    </strong>
                  </td>
                  <td>${Number(c.minOrder).toFixed(2)}</td>
                  <td style={{ fontSize: "0.85rem" }}>{c.expiryDate}</td>
                  <td><strong>{c.usageCount || 0}</strong> / {c.usageLimit}</td>
                  <td>
                    <span style={{ padding: "2px 8px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 700, background: c.active ? "var(--success-light)" : "var(--error-light)", color: c.active ? "var(--success)" : "var(--error)" }}>
                      {c.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button onClick={() => handleOpenEdit(c)} className="btn btn-icon" style={{ width: "32px", height: "32px" }}>
                        <Edit size={14} />
                      </button>
                      <button onClick={() => setDeletingId(c.id)} className="btn btn-icon" style={{ width: "32px", height: "32px", color: "var(--error)" }}>
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

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingCoupon ? "Edit Coupon" : "Create Coupon"}>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Coupon Code (UPPERCASE)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. CRAVE25"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Discount Type</label>
              <select
                className="form-select"
                value={formData.discountType}
                onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Dollar ($)</option>
                <option value="delivery">Free Delivery</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Discount Value</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={formData.discountValue}
                onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Minimum Order ($)</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={formData.minOrder}
                onChange={(e) => setFormData({ ...formData, minOrder: Number(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Max Discount Cap ($)</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={formData.maxDiscount}
                onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description / Catchphrase</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. 20% off all orders above $25"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem", borderRadius: "var(--radius-full)", fontWeight: 700 }}>
            Save Coupon
          </button>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Coupon Voucher?"
        message="Customers will no longer be able to redeem this code at checkout."
      />
    </div>
  );
};
