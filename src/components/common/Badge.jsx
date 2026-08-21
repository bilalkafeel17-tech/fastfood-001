import React from "react";
import { Flame, Sparkles, Leaf, Drumstick } from "lucide-react";

export const Badge = ({ type, text, className = "" }) => {
  if (type === "veg") {
    return (
      <span className={`badge badge-veg ${className}`}>
        <Leaf size={11} /> {text || "Veg"}
      </span>
    );
  }

  if (type === "nonveg") {
    return (
      <span className={`badge badge-nonveg ${className}`}>
        <Drumstick size={11} /> {text || "Non-Veg"}
      </span>
    );
  }

  if (type === "spicy") {
    return (
      <span className={`badge badge-spicy ${className}`}>
        <Flame size={11} /> {text || "Spicy"}
      </span>
    );
  }

  if (type === "bestseller") {
    return (
      <span className={`badge badge-bestseller ${className}`}>
        <Sparkles size={11} /> {text || "Best Seller"}
      </span>
    );
  }

  if (type === "discount") {
    return (
      <span className={`badge badge-deal ${className}`}>
        {text}
      </span>
    );
  }

  if (type === "status") {
    const slug = (text || "").toLowerCase().replace(/\s+/g, "-");
    return (
      <span className={`badge-status ${slug} ${className}`}>
        {text}
      </span>
    );
  }

  return <span className={`badge ${className}`}>{text}</span>;
};
