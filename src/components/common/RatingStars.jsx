import React from "react";
import { Star, StarHalf } from "lucide-react";

export const RatingStars = ({ rating = 5, size = 16, showCount = false, reviewCount = 0, interactive = false, onRatingChange }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.4;

  for (let i = 1; i <= 5; i++) {
    if (interactive) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => onRatingChange && onRatingChange(i)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "2px",
            color: i <= rating ? "#FFB703" : "#D1D5DB",
            display: "inline-flex"
          }}
        >
          <Star size={size} fill={i <= rating ? "#FFB703" : "none"} strokeWidth={1.5} />
        </button>
      );
    } else {
      if (i <= fullStars) {
        stars.push(
          <Star
            key={i}
            size={size}
            fill="#FFB703"
            color="#FFB703"
            strokeWidth={1}
            style={{ display: "inline-block" }}
          />
        );
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <StarHalf
            key={i}
            size={size}
            fill="#FFB703"
            color="#FFB703"
            strokeWidth={1}
            style={{ display: "inline-block" }}
          />
        );
      } else {
        stars.push(
          <Star
            key={i}
            size={size}
            fill="none"
            color="#D1D5DB"
            strokeWidth={1.5}
            style={{ display: "inline-block" }}
          />
        );
      }
    }
  }

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "2px" }}>{stars}</div>
      {!interactive && (
        <span style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--dark)", marginLeft: "4px" }}>
          {Number(rating).toFixed(1)}
        </span>
      )}
      {showCount && reviewCount > 0 && (
        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginLeft: "2px" }}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
