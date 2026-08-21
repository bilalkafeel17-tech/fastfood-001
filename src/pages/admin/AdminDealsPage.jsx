import React, { useState } from "react";
import { INITIAL_DEALS } from "../../data/initialDeals";
import { useToast } from "../../context/ToastContext";
import { Modal } from "../../components/common/Modal";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";
import { Flame, Plus, Edit, Trash2, Clock } from "lucide-react";

export const AdminDealsPage = () => {
  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const { showSuccess } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    originalPrice: 20,
    discountPrice: 15,
    discountPercent: 25,
    tag: "COMBO DEAL",
    code: "DEAL25",
    expiresIn: "Today, 11:59 PM",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80"
  });

  const handleOpenAdd = () => {
    setEditingDeal(null);
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      originalPrice: 20,
      discountPrice: 15,
      discountPercent: 25,
      tag: "COMBO DEAL",
      code: "DEAL25",
      expiresIn: "Today, 11:59 PM",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80"
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (deal) => {
    setEditingDeal(deal);
    setFormData({ ...deal });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingDeal) {
      setDeals(deals.map((d) => (d.id === editingDeal.id ? { ...formData, id: d.id } : d)));
      showSuccess("Special deal updated!");
    } else {
      const newDeal = { ...formData, id: "deal-" + Date.now() };
      setDeals([newDeal, ...deals]);
      showSuccess("New promotional deal published!");
    }
    setModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      setDeals(deals.filter((d) => d.id !== deletingId));
      setDeletingId(null);
      showSuccess("Deal removed.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--dark)" }}>
            Flash Deals & Combo Bundles Manager 🔥
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "2px" }}>
            Create promotional countdown banners, BOGO deals, and family packages.
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-primary" style={{ borderRadius: "var(--radius-full)" }}>
          <Plus size={18} /> Create New Deal
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {deals.map((deal) => (
          <div
            key={deal.id}
            style={{
              background: "#FFFFFF",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-light)",
              overflow: "hidden",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div style={{ position: "relative", height: "160px" }}>
              <img src={deal.image} alt={deal.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <span style={{ position: "absolute", top: "10px", left: "10px", background: "var(--primary)", color: "#FFFFFF", fontSize: "0.75rem", fontWeight: 800, padding: "2px 8px", borderRadius: "var(--radius-full)" }}>
                {deal.tag}
              </span>
            </div>

            <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--dark)", marginBottom: "4px" }}>
                {deal.title}
              </h3>
              <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginBottom: "1rem", flex: 1 }}>
                {deal.description}
              </p>

              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "1rem" }}>
                <span style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--primary)" }}>
                  ${Number(deal.discountPrice).toFixed(2)}
                </span>
                <span style={{ fontSize: "0.85rem", color: "#9CA3AF", textDecoration: "line-through" }}>
                  ${Number(deal.originalPrice).toFixed(2)}
                </span>
                <span style={{ marginLeft: "auto", background: "var(--success-light)", color: "var(--success)", fontWeight: 800, fontSize: "0.75rem", padding: "2px 6px", borderRadius: "4px" }}>
                  SAVE {deal.discountPercent}%
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                <code>Code: {deal.code}</code>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button onClick={() => handleOpenEdit(deal)} className="btn btn-icon" style={{ width: "32px", height: "32px" }}>
                    <Edit size={14} />
                  </button>
                  <button onClick={() => setDeletingId(deal.id)} className="btn btn-icon" style={{ width: "32px", height: "32px", color: "var(--error)" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingDeal ? "Edit Deal" : "Create New Deal"}>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Deal Title</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Discount Price ($)</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={formData.discountPrice}
                onChange={(e) => setFormData({ ...formData, discountPrice: Number(e.target.value) })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Original Price ($)</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Coupon Code</label>
              <input
                type="text"
                className="form-input"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Tag Badge</label>
              <input
                type="text"
                className="form-input"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              rows={2}
              className="form-textarea"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem", borderRadius: "var(--radius-full)", fontWeight: 700 }}>
            Save Deal Offer
          </button>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Deal?"
        message="This deal will be removed from the customer storefront carousel."
      />
    </div>
  );
};
