import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { useProducts } from "../../context/ProductContext";
import { FoodCard } from "../../components/customer/FoodCard";
import { EmptyState } from "../../components/common/EmptyState";
import { Heart, ArrowLeft } from "lucide-react";

export const FavoritesPage = () => {
  const { favoriteIds } = useFavorites();
  const { products } = useProducts();
  const { openQuickView } = useOutletContext();

  const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id));

  return (
    <div style={{ padding: "2.5rem 0 5rem" }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <Link to="/menu" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.88rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.5rem" }}>
            <ArrowLeft size={16} /> Back to Full Menu
          </Link>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--dark)" }}>
            My Favorite Cravings ({favoriteProducts.length}) ❤️
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "4px" }}>
            Your handpicked favorite burgers, pizzas, and sides for quick and easy 1-click re-ordering.
          </p>
        </div>

        {favoriteProducts.length === 0 ? (
          <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", padding: "3rem" }}>
            <EmptyState
              emoji="💔"
              title="No Favorite Dishes Yet"
              description="Click the heart icon on any food item card to save your top cravings here."
              actionText="Explore Dishes"
              actionLink="/menu"
            />
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
              gap: "1.75rem"
            }}
          >
            {favoriteProducts.map((product) => (
              <FoodCard
                key={product.id}
                product={product}
                onQuickView={openQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
