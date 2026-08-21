import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { Badge } from "../../components/common/Badge";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";
import { Search, Plus, Edit, Trash2, Check, X, Sparkles, Flame, Eye } from "lucide-react";

export const AdminProductsPage = () => {
  const { products, categories, updateProduct, deleteProduct } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [deletingProductId, setDeletingProductId] = useState(null);

  const filteredProducts = products.filter((p) => {
    if (selectedCat !== "all" && p.category.toLowerCase() !== selectedCat.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    }
    return true;
  });

  const handleToggleStock = async (prod) => {
    await updateProduct(prod.id, { inStock: !prod.inStock });
  };

  const handleConfirmDelete = async () => {
    if (deletingProductId) {
      await deleteProduct(deletingProductId);
      setDeletingProductId(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--dark)" }}>
            Product Catalog Management 🍔
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "2px" }}>
            Add, update, adjust pricing, manage inventory stock, and configure food add-ons.
          </p>
        </div>

        <Link to="/admin/products/add" className="btn btn-primary" style={{ borderRadius: "var(--radius-full)" }}>
          <Plus size={18} /> Add New Dish
        </Link>
      </div>

      {/* Filters Toolbar */}
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
        <div style={{ position: "relative", flex: "1 1 260px" }}>
          <Search size={18} color="#9CA3AF" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            placeholder="Search products by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", padding: "0.65rem 1rem 0.65rem 2.5rem", borderRadius: "var(--radius-md)", border: "1.5px solid var(--border-light)", outline: "none" }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            style={{
              padding: "0.65rem 1rem",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--border-light)",
              background: "#FFFFFF",
              fontWeight: 600,
              fontSize: "0.85rem",
              outline: "none"
            }}
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
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
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Rating</th>
                <th>Stock</th>
                <th>Tags</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((prod) => (
                <tr key={prod.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <img src={prod.image} alt={prod.name} style={{ width: "44px", height: "44px", borderRadius: "var(--radius-sm)", objectFit: "cover" }} />
                      <div>
                        <strong>{prod.name}</strong>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{prod.calories ? `${prod.calories} kcal` : ''}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ textTransform: "capitalize", fontSize: "0.85rem" }}>{prod.category}</td>
                  <td><strong style={{ color: "var(--primary)" }}>${Number(prod.price).toFixed(2)}</strong></td>
                  <td>{prod.discount ? <span style={{ color: "var(--success)", fontWeight: 700 }}>{prod.discount}%</span> : '-'}</td>
                  <td>⭐ {prod.rating}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: prod.stockCount <= 25 ? "var(--error)" : "var(--dark)" }}>
                      {prod.stockCount || 50}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                      {prod.isVeg ? <Badge type="veg" /> : <Badge type="nonveg" />}
                      {prod.isSpicy && <Badge type="spicy" />}
                      {prod.isBestseller && <Badge type="bestseller" />}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleStock(prod)}
                      style={{
                        padding: "3px 8px",
                        borderRadius: "var(--radius-full)",
                        border: "none",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        background: prod.inStock ? "var(--success-light)" : "var(--error-light)",
                        color: prod.inStock ? "var(--success)" : "var(--error)"
                      }}
                    >
                      {prod.inStock ? "In Stock" : "Disabled"}
                    </button>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <Link
                        to={`/admin/products/edit/${prod.id}`}
                        className="btn btn-icon"
                        style={{ width: "32px", height: "32px" }}
                        title="Edit Dish"
                      >
                        <Edit size={14} />
                      </Link>
                      <button
                        onClick={() => setDeletingProductId(prod.id)}
                        className="btn btn-icon"
                        style={{ width: "32px", height: "32px", color: "var(--error)" }}
                        title="Delete Dish"
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

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(deletingProductId)}
        onClose={() => setDeletingProductId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Food Product?"
        message="This will permanently remove this item from the customer storefront and menu."
      />
    </div>
  );
};
