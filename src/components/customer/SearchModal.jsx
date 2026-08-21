import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, X, Flame, ArrowRight, Clock, Star } from "lucide-react";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";

export const SearchModal = ({ isOpen, onClose, onOpenProductQuickView }) => {
  const { products, categories } = useProducts();
  const { addToCart } = useCart();
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const inputRef = useRef(null);

  const popularSearches = ["Bacon Beast", "Pepperoni", "Nashville Chicken", "Loaded Fries", "Milkshake", "Combo"];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setSelectedCat("all");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCat === "all" || p.category.toLowerCase() === selectedCat.toLowerCase();
    if (!matchesCat) return false;

    if (!query.trim()) return true;

    const q = query.toLowerCase().trim();
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.ingredients && p.ingredients.some((i) => i.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{
          maxWidth: "680px",
          padding: 0,
          overflow: "hidden",
          borderRadius: "var(--radius-xl)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--border-light)",
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
            background: "#FFFFFF"
          }}
        >
          <Search size={22} color="var(--primary)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search burgers, pizzas, crispy chicken, ingredients..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "1.1rem",
              fontWeight: 500,
              color: "var(--text-main)",
              background: "transparent"
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "#9CA3AF" }}
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-light)",
              background: "#F3F4F6",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            ESC
          </button>
        </div>

        {/* Category Filter Pills & Popular Searches */}
        <div
          style={{
            padding: "0.85rem 1.5rem",
            background: "#F9FAFB",
            borderBottom: "1px solid var(--border-light)",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem"
          }}
        >
          {/* Quick Categories */}
          <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "2px" }}>
            <button
              onClick={() => setSelectedCat("all")}
              style={{
                padding: "0.3rem 0.75rem",
                borderRadius: "var(--radius-full)",
                border: selectedCat === "all" ? "1.5px solid var(--primary)" : "1px solid var(--border-light)",
                background: selectedCat === "all" ? "var(--primary)" : "#FFFFFF",
                color: selectedCat === "all" ? "#FFFFFF" : "var(--text-main)",
                fontSize: "0.78rem",
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              All Items
            </button>
            {categories.slice(0, 7).map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.slug)}
                style={{
                  padding: "0.3rem 0.75rem",
                  borderRadius: "var(--radius-full)",
                  border: selectedCat === c.slug ? "1.5px solid var(--primary)" : "1px solid var(--border-light)",
                  background: selectedCat === c.slug ? "var(--primary)" : "#FFFFFF",
                  color: selectedCat === c.slug ? "#FFFFFF" : "var(--text-main)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
              >
                {c.icon} {c.name}
              </button>
            ))}
          </div>

          {/* Popular Tag suggestions */}
          {!query && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", fontSize: "0.78rem" }}>
              <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Trending:</span>
              {popularSearches.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--primary)",
                    fontWeight: 600,
                    cursor: "pointer",
                    textDecoration: "underline"
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results List */}
        <div style={{ maxHeight: "380px", overflowY: "auto", padding: "1rem 1.5rem" }}>
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--text-muted)" }}>
              <p style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--dark)" }}>No mouthwatering matches found for "{query}"</p>
              <p style={{ fontSize: "0.85rem", marginTop: "4px" }}>Try searching for burgers, chicken, pizza, shakes, or reset category filters.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {filteredProducts.slice(0, 10).map((prod) => (
                <div
                  key={prod.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "var(--radius-md)",
                    background: "#FFFFFF",
                    border: "1px solid var(--border-light)",
                    transition: "background var(--transition-fast)"
                  }}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    style={{ width: "52px", height: "52px", borderRadius: "var(--radius-sm)", objectFit: "cover" }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link
                      to={`/product/${prod.id}`}
                      onClick={onClose}
                      style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--dark)", display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
                    >
                      {prod.name}
                    </Link>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>
                      <span style={{ fontWeight: 700, color: "var(--primary)", fontSize: "0.88rem" }}>
                        ${Number(prod.price).toFixed(2)}
                      </span>
                      <span>•</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                        <Star size={12} fill="#FFB703" color="#FFB703" /> {prod.rating}
                      </span>
                      <span>•</span>
                      <span style={{ textTransform: "capitalize" }}>{prod.category}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      addToCart(prod, 1);
                      onClose();
                    }}
                    className="btn btn-primary btn-sm"
                    style={{ borderRadius: "var(--radius-full)", padding: "0.35rem 0.8rem", fontSize: "0.8rem" }}
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div
          style={{
            padding: "0.75rem 1.5rem",
            background: "#F9FAFB",
            borderTop: "1px solid var(--border-light)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.8rem",
            color: "var(--text-muted)"
          }}
        >
          <span>Showing {Math.min(filteredProducts.length, 10)} of {filteredProducts.length} items</span>
          <Link to="/menu" onClick={onClose} style={{ color: "var(--primary)", fontWeight: 700, display: "flex", alignItems: "center", gap: "3px" }}>
            View Full Menu <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
};
