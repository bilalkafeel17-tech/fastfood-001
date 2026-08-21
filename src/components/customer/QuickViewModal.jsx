import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../common/Modal";
import { RatingStars } from "../common/RatingStars";
import { Badge } from "../common/Badge";
import { Plus, Minus, ShoppingBag, ExternalLink, Check, Flame } from "lucide-react";
import { useCart } from "../../context/CartContext";

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : { name: "Standard", priceDelta: 0 });
      setSelectedAddOns([]);
      setQuantity(1);
      setSpecialInstructions("");
    }
  }, [product]);

  if (!product) return null;

  const toggleAddOn = (addon) => {
    setSelectedAddOns((prev) => {
      const exists = prev.some((a) => a.name === addon.name);
      if (exists) return prev.filter((a) => a.name !== addon.name);
      return [...prev, addon];
    });
  };

  const basePrice = Number(product.price);
  const sizeDelta = Number(selectedSize?.priceDelta || 0);
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + Number(a.price || 0), 0);
  const unitPrice = basePrice + sizeDelta + addOnsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedAddOns, specialInstructions);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="640px" title="Customize Your Meal">
      <div>
        {/* Top Product Summary Row */}
        <div style={{ display: "flex", gap: "1.25rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "140px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "var(--radius-md)",
              flexShrink: 0
            }}
          />
          <div style={{ flex: 1, minWidth: "200px" }}>
            <div style={{ display: "flex", gap: "6px", marginBottom: "4px" }}>
              {product.isVeg ? <Badge type="veg" /> : <Badge type="nonveg" />}
              {product.isSpicy && <Badge type="spicy" />}
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--dark)", marginBottom: "4px" }}>
              {product.name}
            </h3>
            <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginBottom: "6px", lineHeight: 1.4 }}>
              {product.description}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} showCount={true} size={14} />
              {product.calories && (
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>
                  🔥 {product.calories} kcal
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 1 && (
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--dark)", marginBottom: "0.5rem", display: "block" }}>
              Choose Portion Size:
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem" }}>
              {product.sizes.map((size) => {
                const isSelected = selectedSize?.name === size.name;
                return (
                  <button
                    key={size.name}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: "0.6rem 0.8rem",
                      borderRadius: "var(--radius-md)",
                      border: isSelected ? "2px solid var(--primary)" : "1.5px solid var(--border-light)",
                      background: isSelected ? "var(--primary-light)" : "#FFFFFF",
                      color: isSelected ? "var(--primary)" : "var(--text-main)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      cursor: "pointer",
                      textAlign: "left"
                    }}
                  >
                    <span style={{ fontWeight: 700, fontSize: "0.88rem" }}>{size.name}</span>
                    <span style={{ fontSize: "0.78rem", color: isSelected ? "var(--primary)" : "var(--text-muted)" }}>
                      {size.priceDelta > 0 ? `+$${size.priceDelta.toFixed(2)}` : "Included"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Add-ons Selection */}
        {product.addOns && product.addOns.length > 0 && (
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--dark)", marginBottom: "0.5rem", display: "block" }}>
              Delicious Add-ons & Extra Toppings:
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }} className="addons-grid">
              {product.addOns.map((addon) => {
                const isChecked = selectedAddOns.some((a) => a.name === addon.name);
                return (
                  <button
                    key={addon.name}
                    type="button"
                    onClick={() => toggleAddOn(addon)}
                    style={{
                      padding: "0.55rem 0.75rem",
                      borderRadius: "var(--radius-md)",
                      border: isChecked ? "1.5px solid var(--primary)" : "1.5px solid var(--border-light)",
                      background: isChecked ? "var(--primary-light)" : "#FFFFFF",
                      color: "var(--text-main)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      fontSize: "0.85rem"
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: isChecked ? 600 : 500 }}>
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "4px",
                          border: isChecked ? "none" : "1.5px solid #D1D5DB",
                          background: isChecked ? "var(--primary)" : "transparent",
                          color: "#FFFFFF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </div>
                      {addon.name}
                    </span>
                    <span style={{ fontWeight: 700, color: "var(--primary)", fontSize: "0.82rem" }}>
                      +${addon.price.toFixed(2)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Special Instructions */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-main)", marginBottom: "0.4rem", display: "block" }}>
            Special Cooking Instructions (Optional):
          </label>
          <input
            type="text"
            placeholder="e.g. Extra crispy bacon, sauce on the side, no onions"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            className="form-input"
            style={{ fontSize: "0.88rem", padding: "0.6rem 0.85rem" }}
          />
        </div>

        {/* Bottom Actions Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "1rem",
            borderTop: "1px solid var(--border-light)",
            gap: "1rem",
            flexWrap: "wrap"
          }}
        >
          {/* Quantity Counter */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              border: "1.5px solid var(--border-light)",
              borderRadius: "var(--radius-full)",
              background: "#F9FAFB",
              padding: "2px"
            }}
          >
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "transparent",
                border: "none",
                cursor: quantity <= 1 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: quantity <= 1 ? "#D1D5DB" : "var(--dark)"
              }}
            >
              <Minus size={15} />
            </button>
            <span style={{ minWidth: "30px", textAlign: "center", fontWeight: 700, fontSize: "0.95rem" }}>
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--dark)"
              }}
            >
              <Plus size={15} />
            </button>
          </div>

          {/* Add to Cart Submit */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, justifyContent: "flex-end" }}>
            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                gap: "3px"
              }}
            >
              Full Details <ExternalLink size={13} />
            </Link>

            <button
              onClick={handleAddToCart}
              className="btn btn-primary"
              style={{ padding: "0.7rem 1.5rem", borderRadius: "var(--radius-full)", fontWeight: 700 }}
            >
              <ShoppingBag size={18} /> Add to Cart • ${totalPrice.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 540px) {
          .addons-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Modal>
  );
};
