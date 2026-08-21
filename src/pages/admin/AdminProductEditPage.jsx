import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { useToast } from "../../context/ToastContext";
import { ArrowLeft, Save, Plus, Trash2, Image, Sparkles } from "lucide-react";

export const AdminProductEditPage = () => {
  const { id } = useParams();
  const isAddMode = !id;
  const { products, categories, addProduct, updateProduct } = useProducts();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "burgers",
    price: 9.99,
    originalPrice: 11.99,
    discount: 0,
    calories: 650,
    prepTime: "10-12 min",
    description: "",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80",
    isVeg: false,
    isSpicy: false,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 50,
    ingredientsStr: "Beef Patty, Cheddar Cheese, Brioche Bun, Crave Sauce",
    allergensStr: "Gluten, Dairy",
    sizes: [
      { name: "Standard", priceDelta: 0 },
      { name: "Double Size", priceDelta: 3.50 }
    ],
    addOns: [
      { name: "Extra Melted Cheese", price: 1.50 },
      { name: "Crispy Bacon Strips", price: 2.00 }
    ]
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAddMode && products.length > 0) {
      const found = products.find((p) => String(p.id) === String(id));
      if (found) {
        setFormData({
          ...found,
          ingredientsStr: found.ingredients ? found.ingredients.join(", ") : "",
          allergensStr: found.allergens ? found.allergens.join(", ") : "",
          sizes: found.sizes || [{ name: "Standard", priceDelta: 0 }],
          addOns: found.addOns || []
        });
      }
    }
  }, [id, isAddMode, products]);

  const handleAddSize = () => {
    setFormData({
      ...formData,
      sizes: [...formData.sizes, { name: "New Portion", priceDelta: 2.00 }]
    });
  };

  const handleRemoveSize = (idx) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.filter((_, i) => i !== idx)
    });
  };

  const handleSizeChange = (idx, field, value) => {
    const updated = [...formData.sizes];
    updated[idx][field] = field === "priceDelta" ? Number(value) : value;
    setFormData({ ...formData, sizes: updated });
  };

  const handleAddAddon = () => {
    setFormData({
      ...formData,
      addOns: [...formData.addOns, { name: "Extra Topping", price: 1.00 }]
    });
  };

  const handleRemoveAddon = (idx) => {
    setFormData({
      ...formData,
      addOns: formData.addOns.filter((_, i) => i !== idx)
    });
  };

  const handleAddonChange = (idx, field, value) => {
    const updated = [...formData.addOns];
    updated[idx][field] = field === "price" ? Number(value) : value;
    setFormData({ ...formData, addOns: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      showError("Please enter product title and price.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice) || Number(formData.price),
        discount: Number(formData.discount) || 0,
        calories: Number(formData.calories) || 0,
        stockCount: Number(formData.stockCount) || 50,
        ingredients: formData.ingredientsStr.split(",").map((s) => s.trim()).filter(Boolean),
        allergens: formData.allergensStr.split(",").map((s) => s.trim()).filter(Boolean)
      };

      if (isAddMode) {
        await addProduct(payload);
      } else {
        await updateProduct(id, payload);
      }
      navigate("/admin/products");
    } catch {
      // toast shown in context
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: "900px" }}>
      {/* Back Link */}
      <Link to="/admin/products" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.88rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "1.5rem" }}>
        <ArrowLeft size={16} /> Back to Product Catalog
      </Link>

      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--border-light)",
          padding: "2.5rem",
          boxShadow: "var(--shadow-sm)"
        }}
      >
        <h1 style={{ fontSize: "1.85rem", fontWeight: 900, color: "var(--dark)", marginBottom: "1.75rem" }}>
          {isAddMode ? "Create New Fast Food Dish" : `Edit Product: ${formData.name}`}
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.25rem" }}>
            <div className="form-group">
              <label className="form-label">Product Name / Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Smoky BBQ Bacon Beast"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Food Category</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Pricing Row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Selling Price ($)</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Discount (%)</label>
              <input
                type="number"
                className="form-input"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Stock Units</label>
              <input
                type="number"
                className="form-input"
                value={formData.stockCount}
                onChange={(e) => setFormData({ ...formData, stockCount: e.target.value })}
              />
            </div>
          </div>

          {/* Image URL & Thumbnail Preview */}
          <div className="form-group">
            <label className="form-label">High-Resolution Image URL</label>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <input
                type="url"
                className="form-input"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  style={{ width: "48px", height: "48px", borderRadius: "var(--radius-sm)", objectFit: "cover", border: "1px solid var(--border-light)" }}
                />
              )}
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Appetizing Product Description</label>
            <textarea
              rows={3}
              className="form-textarea"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          {/* Calories & Prep Time */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Estimated Calories (kcal)</label>
              <input
                type="number"
                className="form-input"
                value={formData.calories}
                onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Preparation Time</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 10-15 min"
                value={formData.prepTime}
                onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
              />
            </div>
          </div>

          {/* Ingredients & Allergens */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Ingredients (comma-separated)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Angus Beef, Cheddar, Brioche, BBQ"
                value={formData.ingredientsStr}
                onChange={(e) => setFormData({ ...formData, ingredientsStr: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Allergens (comma-separated)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Gluten, Dairy, Egg"
                value={formData.allergensStr}
                onChange={(e) => setFormData({ ...formData, allergensStr: e.target.value })}
              />
            </div>
          </div>

          {/* Tags & Flags */}
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", padding: "1rem", background: "#F9FAFB", borderRadius: "var(--radius-md)", margin: "1.5rem 0" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={formData.isVeg}
                onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
              />
              <span>🌱 Vegetarian</span>
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={formData.isSpicy}
                onChange={(e) => setFormData({ ...formData, isSpicy: e.target.checked })}
              />
              <span>🌶️ Spicy / Hot</span>
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={formData.isBestseller}
                onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
              />
              <span>★ Best Seller</span>
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
              />
              <span>Active in Stock</span>
            </label>
          </div>

          {/* Portions & Add-Ons Customizer Configurator */}
          <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "1.5rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800 }}>Portion Sizes</h3>
              <button type="button" onClick={handleAddSize} className="btn btn-outline btn-sm">
                <Plus size={14} /> Add Portion
              </button>
            </div>
            {formData.sizes?.map((sz, idx) => (
              <div key={idx} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Size Name (e.g. Double Stack)"
                  value={sz.name}
                  onChange={(e) => handleSizeChange(idx, "name", e.target.value)}
                />
                <input
                  type="number"
                  step="0.10"
                  className="form-input"
                  placeholder="Price Delta (+$)"
                  value={sz.priceDelta}
                  onChange={(e) => handleSizeChange(idx, "priceDelta", e.target.value)}
                  style={{ maxWidth: "140px" }}
                />
                <button type="button" onClick={() => handleRemoveSize(idx)} className="btn btn-ghost" style={{ color: "var(--error)" }}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Add-ons Builder */}
          <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "1.5rem", marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800 }}>Add-Ons & Extra Toppings</h3>
              <button type="button" onClick={handleAddAddon} className="btn btn-outline btn-sm">
                <Plus size={14} /> Add Extra Option
              </button>
            </div>
            {formData.addOns?.map((addon, idx) => (
              <div key={idx} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Topping Name (e.g. Extra Cheese)"
                  value={addon.name}
                  onChange={(e) => handleAddonChange(idx, "name", e.target.value)}
                />
                <input
                  type="number"
                  step="0.10"
                  className="form-input"
                  placeholder="Price (+$)"
                  value={addon.price}
                  onChange={(e) => handleAddonChange(idx, "price", e.target.value)}
                  style={{ maxWidth: "140px" }}
                />
                <button type="button" onClick={() => handleRemoveAddon(idx)} className="btn btn-ghost" style={{ color: "var(--error)" }}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary btn-lg"
            style={{ width: "100%", borderRadius: "var(--radius-full)", fontWeight: 800 }}
          >
            <Save size={18} /> {saving ? "Saving Product..." : isAddMode ? "Create Food Product" : "Update Product Details"}
          </button>
        </form>
      </div>
    </div>
  );
};
