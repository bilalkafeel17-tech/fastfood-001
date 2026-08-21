import React from "react";
import { NavLink } from "react-router-dom";
import { Home, UtensilsCrossed, Tag, Heart, ShoppingBag, User } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useAuth } from "../../context/AuthContext";

export const MobileNav = () => {
  const { totalItemCount, openCart } = useCart();
  const { favoritesCount } = useFavorites();
  const { isAuthenticated } = useAuth();

  return (
    <div className="mobile-bottom-nav">
      <NavLink to="/" end className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
        <Home size={20} />
        <span>Home</span>
      </NavLink>

      <NavLink to="/menu" className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
        <UtensilsCrossed size={20} />
        <span>Menu</span>
      </NavLink>

      <NavLink to="/deals" className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
        <Tag size={20} />
        <span>Deals</span>
      </NavLink>

      <NavLink to="/favorites" className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
        <Heart size={20} />
        <span>Saved</span>
        {favoritesCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "4px",
              right: "22%",
              background: "var(--primary)",
              color: "#FFFFFF",
              fontSize: "0.6rem",
              fontWeight: 700,
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {favoritesCount}
          </span>
        )}
      </NavLink>

      <button
        onClick={openCart}
        className="mobile-nav-item"
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
        aria-label="Open cart"
      >
        <ShoppingBag size={20} color="var(--primary)" />
        <span style={{ color: "var(--primary)", fontWeight: 700 }}>Cart</span>
        {totalItemCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "4px",
              right: "22%",
              background: "var(--secondary)",
              color: "var(--dark)",
              fontSize: "0.6rem",
              fontWeight: 800,
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {totalItemCount}
          </span>
        )}
      </button>

      <NavLink
        to={isAuthenticated ? "/dashboard" : "/login"}
        className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}
      >
        <User size={20} />
        <span>{isAuthenticated ? "Account" : "Login"}</span>
      </NavLink>
    </div>
  );
};
