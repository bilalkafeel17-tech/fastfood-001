import React, { useState } from "react";
import { useProducts } from "../../context/ProductContext";
import { Modal } from "../../components/common/Modal";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";
import { Plus, Edit, Trash2, Tags } from "lucide-react";

export const AdminCategoriesPage = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useProducts();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    icon: "🍔",
    description: "",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80"
  });

  const handleOpenAdd = () => {
    setEditingCat(null);
    setFormData({ name: "", slug: "", icon: "🍔", description: "", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80" });
    setModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCat(cat);
    setFormData({ ...cat });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingCat) {
      await updateCategory(editingCat.id, formData);
    } else {
      await addCategory(formData);
    }
    setModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (deletingId) {
      await deleteCategory(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--dark)" }}>
            Menu Categories Management 🏷️
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "2px" }}>
            Configure food taxonomy, icons, descriptions, and category showcase cards.
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-primary" style={{ borderRadius: "var(--radius-full)" }}>
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            style={{
              background: "#FFFFFF",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-light)",
              padding: "1.5rem",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "2.4rem" }}>{cat.icon}</span>
              <div style={{ display: "flex", gap: "4px" }}>
                <button onClick={() => handleOpenEdit(cat)} className="btn btn-icon" style={{ width: "32px", height: "32px" }}>
                  <Edit size={14} />
                </button>
                <button onClick={() => setDeletingId(cat.id)} className="btn btn-icon" style={{ width: "32px", height: "32px", color: "var(--error)" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--dark)", marginBottom: "4px" }}>
              {cat.name}
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.45, flex: 1, marginBottom: "1rem" }}>
              {cat.description || "Freshly cooked gourmet dishes."}
            </p>

            <div style={{ fontSize: "0.78rem", color: "var(--text-light)", borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
              Slug: <code>{cat.slug}</code>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingCat ? "Edit Category" : "Add New Category"}>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Emoji / Icon</label>
              <input
                type="text"
                className="form-input"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Slug</label>
              <input
                type="text"
                className="form-input"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
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
            Save Category
          </button>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Category?"
        message="This category will be deleted from the database."
      />
    </div>
  );
};
