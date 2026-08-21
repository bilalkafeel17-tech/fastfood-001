import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, Plus, ShoppingBag, Flame, Clock } from "lucide-react";
import { RatingStars } from "../common/RatingStars";
import { Badge } from "../common/Badge";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";

export const FoodCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [imgLoaded, setImgLoaded] = useState(false);

  const fav = isFavorite(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // If product has multiple sizes or required addons, open customizer modal
    if ((product.sizes && product.sizes.length > 1) || (product.addOns && product.addOns.length > 0)) {
      if (onQuickView) onQuickView(product);
    } else {
      addToCart(product, 1);
    }
  };

  const handleToggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id, product.name);
  };

  const handleOpenQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div
      className="card card-hoverable"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        borderRadius: "var(--radius-lg)"
      }}
    >
      {/* Image & Badges Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "68%",
          overflow: "hidden",
          backgroundColor: "#F3F4F6"
        }}
      >
        <Link to={`/product/${product.id}`} style={{ display: "block", position: "absolute", inset: 0 }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease",
              opacity: imgLoaded ? 1 : 0
            }}
            className="food-card-img"
          />
        </Link>

        {/* Top Badges */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            zIndex: 2
          }}
        >
          {product.discount > 0 && (
            <span
              style={{
                background: "var(--primary)",
                color: "#FFFFFF",
                fontSize: "0.72rem",
                fontWeight: 800,
                padding: "2px 8px",
                borderRadius: "var(--radius-full)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
              }}
            >
              -{product.discount}% OFF
            </span>
          )}
          {product.isBestseller && (
            <span
              style={{
                background: "var(--secondary)",
                color: "var(--dark)",
                fontSize: "0.72rem",
                fontWeight: 800,
                padding: "2px 8px",
                borderRadius: "var(--radius-full)"
              }}
            >
              ★ POPULAR
            </span>
          )}
        </div>

        {/* Veg/Non-Veg & Spicy Indicators */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            display: "flex",
            gap: "5px",
            zIndex: 2
          }}
        >
          {product.isVeg ? (
            <span
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(4px)",
                border: "1.5px solid #2E7D32",
                padding: "2px 6px",
                borderRadius: "4px",
                display: "inline-flex",
                alignItems: "center",
                gap: "3px",
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "#2E7D32"
              }}
            >
              🌱 VEG
            </span>
          ) : (
            <span
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(4px)",
                border: "1.5px solid #C62828",
                padding: "2px 6px",
                borderRadius: "4px",
                display: "inline-flex",
                alignItems: "center",
                gap: "3px",
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "#C62828"
              }}
            >
              🍗 NON-VEG
            </span>
          )}
          {product.isSpicy && (
            <span
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(4px)",
                padding: "2px 6px",
                borderRadius: "4px",
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "#E65100"
              }}
            >
              🌶️ HOT
            </span>
          )}
        </div>

        {/* Top Right Actions (Favorite & Quick View) */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            zIndex: 2
          }}
        >
          <button
            onClick={handleToggleFav}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(6px)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              transition: "transform var(--transition-fast)"
            }}
            aria-label="Save to favorites"
          >
            <Heart
              size={17}
              fill={fav ? "var(--primary)" : "none"}
              color={fav ? "var(--primary)" : "#4B5563"}
            />
          </button>

          <button
            onClick={handleOpenQuickView}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(6px)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              transition: "transform var(--transition-fast)"
            }}
            aria-label="Quick customize view"
            title="Quick View"
          >
            <Eye size={17} color="#4B5563" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: "1.1rem", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Rating & Prep Time */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} showCount={true} size={14} />
          {product.prepTime && (
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "3px" }}>
              <Clock size={12} /> {product.prepTime}
            </span>
          )}
        </div>

        {/* Title */}
        <Link
          to={`/product/${product.id}`}
          style={{
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "var(--dark)",
            lineHeight: 1.3,
            marginBottom: "0.4rem",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Description */}
        <p
          style={{
            fontSize: "0.825rem",
            color: "var(--text-muted)",
            lineHeight: 1.45,
            marginBottom: "1rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flex: 1
          }}
        >
          {product.description}
        </p>

        {/* Price & Action Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: "0.6rem",
            borderTop: "1px dashed var(--border-light)"
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
              <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--primary)" }}>
                ${Number(product.price).toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span style={{ fontSize: "0.85rem", color: "#9CA3AF", textDecoration: "line-through" }}>
                  ${Number(product.originalPrice).toFixed(2)}
                </span>
              )}
            </div>
            {product.calories && (
              <span style={{ fontSize: "0.72rem", color: "var(--text-light)" }}>
                {product.calories} kcal
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="btn btn-primary"
            style={{
              padding: "0.45rem 0.95rem",
              borderRadius: "var(--radius-full)",
              fontSize: "0.85rem",
              fontWeight: 700,
              gap: "4px"
            }}
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>

      <style>{`
        .food-card-img:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};
