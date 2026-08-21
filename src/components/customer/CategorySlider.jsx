import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { ArrowRight } from "lucide-react";

export const CategorySlider = ({ selectedCategory, onSelectCategory }) => {
  const { categories } = useProducts();

  return (
    <section style={{ padding: "3rem 0", background: "#FFFFFF", borderBottom: "1px solid var(--border-light)" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary)", letterSpacing: "1px", textTransform: "uppercase" }}>
              Explore Our Kitchen
            </span>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--dark)", marginTop: "4px" }}>
              Craving by Category
            </h2>
          </div>
          <Link
            to="/menu"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "var(--primary)"
            }}
          >
            View All Categories <ArrowRight size={16} />
          </Link>
        </div>

        {/* Categories Grid / Slider */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            gap: "1rem"
          }}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <Link
                key={cat.id}
                to={`/menu/${cat.slug}`}
                style={{
                  background: isSelected ? "var(--primary-light)" : "var(--bg-light)",
                  border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border-light)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.2rem 0.8rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  transition: "all var(--transition-fast)",
                  boxShadow: isSelected ? "var(--shadow-primary)" : "none"
                }}
                className="category-card"
              >
                <div
                  style={{
                    fontSize: "2.4rem",
                    marginBottom: "0.6rem",
                    transition: "transform var(--transition-fast)"
                  }}
                  className="cat-icon"
                >
                  {cat.icon}
                </div>
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: isSelected ? "var(--primary)" : "var(--dark)",
                    textAlign: "center",
                    lineHeight: 1.2
                  }}
                >
                  {cat.name}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
                  {cat.itemCount || 4}+ items
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <style>{`
        .category-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary);
          box-shadow: var(--shadow-md);
        }
        .category-card:hover .cat-icon {
          transform: scale(1.15);
        }
      `}</style>
    </section>
  );
};
