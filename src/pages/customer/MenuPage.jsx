import React, { useState, useMemo, useEffect } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { FoodCard } from "../../components/customer/FoodCard";
import { EmptyState } from "../../components/common/EmptyState";
import { Search, SlidersHorizontal, ArrowUpDown, X, Sparkles, Filter } from "lucide-react";

export const MenuPage = () => {
  const { category: urlCategory } = useParams();
  const { openQuickView } = useOutletContext();
  const { products, categories, loading } = useProducts();
  const navigate = useNavigate();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietaryFilter, setDietaryFilter] = useState("all"); // 'all', 'veg', 'nonveg', 'spicy', 'bestseller'
  const [maxPrice, setMaxPrice] = useState(40);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popular"); // 'popular', 'price-low', 'price-high', 'rating'
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Sync category param
  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    } else {
      setSelectedCategory("all");
    }
  }, [urlCategory]);

  const handleCategoryClick = (catSlug) => {
    setSelectedCategory(catSlug);
    if (catSlug === "all") navigate("/menu");
    else navigate(`/menu/${catSlug}`);
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setDietaryFilter("all");
    setMaxPrice(40);
    setMinRating(0);
    setSortBy("popular");
    navigate("/menu");
  };

  // Filtered & Sorted items
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category
      if (selectedCategory !== "all" && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesIng = p.ingredients && p.ingredients.some((i) => i.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesIng) return false;
      }
      // Dietary
      if (dietaryFilter === "veg" && !p.isVeg) return false;
      if (dietaryFilter === "nonveg" && p.isVeg) return false;
      if (dietaryFilter === "spicy" && !p.isSpicy) return false;
      if (dietaryFilter === "bestseller" && !p.isBestseller) return false;
      // Price & Rating
      if (p.price > maxPrice) return false;
      if (p.rating < minRating) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "popular") return b.reviewCount - a.reviewCount;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, dietaryFilter, maxPrice, minRating, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div style={{ padding: "2.5rem 0 5rem" }}>
      <div className="container">
        {/* Menu Hero Header */}
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 2.5rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary)", letterSpacing: "1px", textTransform: "uppercase" }}>
            Handcrafted With Passion
          </span>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 900, color: "var(--dark)", marginTop: "4px" }}>
            Our Full Food Menu 🍔
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Explore 10 categories of sizzling smash burgers, wood-fired pizzas, crispy wings, loaded fries, and decadent desserts.
          </p>
        </div>

        {/* Category Filter Buttons Carousel */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            overflowX: "auto",
            paddingBottom: "0.75rem",
            marginBottom: "2rem",
            scrollbarWidth: "none"
          }}
        >
          <button
            onClick={() => handleCategoryClick("all")}
            style={{
              padding: "0.6rem 1.25rem",
              borderRadius: "var(--radius-full)",
              border: selectedCategory === "all" ? "2px solid var(--primary)" : "1.5px solid var(--border-light)",
              background: selectedCategory === "all" ? "var(--primary)" : "#FFFFFF",
              color: selectedCategory === "all" ? "#FFFFFF" : "var(--text-main)",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: selectedCategory === "all" ? "var(--shadow-primary)" : "none"
            }}
          >
            🔥 All Menu ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.category.toLowerCase() === cat.slug.toLowerCase()).length;
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                style={{
                  padding: "0.6rem 1.25rem",
                  borderRadius: "var(--radius-full)",
                  border: isSelected ? "2px solid var(--primary)" : "1.5px solid var(--border-light)",
                  background: isSelected ? "var(--primary)" : "#FFFFFF",
                  color: isSelected ? "#FFFFFF" : "var(--text-main)",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: isSelected ? "var(--shadow-primary)" : "none"
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>({count})</span>
              </button>
            );
          })}
        </div>

        {/* Filter & Search Toolbar */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-xl)",
            padding: "1.25rem",
            boxShadow: "var(--shadow-sm)",
            marginBottom: "2.5rem"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap"
            }}
          >
            {/* Search Input */}
            <div style={{ position: "relative", flex: "1 1 280px" }}>
              <Search
                size={18}
                color="#9CA3AF"
                style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                placeholder="Search food by name, ingredient, flavor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.65rem 1rem 0.65rem 2.5rem",
                  borderRadius: "var(--radius-full)",
                  border: "1.5px solid var(--border-light)",
                  fontSize: "0.9rem",
                  outline: "none"
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "#9CA3AF",
                    cursor: "pointer"
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Dietary Filter Pills */}
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              <button
                onClick={() => setDietaryFilter("all")}
                style={{
                  padding: "0.45rem 0.85rem",
                  borderRadius: "var(--radius-full)",
                  border: dietaryFilter === "all" ? "1.5px solid var(--dark)" : "1px solid var(--border-light)",
                  background: dietaryFilter === "all" ? "var(--dark)" : "#F9FAFB",
                  color: dietaryFilter === "all" ? "#FFFFFF" : "var(--text-main)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                All Diets
              </button>
              <button
                onClick={() => setDietaryFilter("veg")}
                style={{
                  padding: "0.45rem 0.85rem",
                  borderRadius: "var(--radius-full)",
                  border: dietaryFilter === "veg" ? "1.5px solid #2E7D32" : "1px solid var(--border-light)",
                  background: dietaryFilter === "veg" ? "#E8F5E9" : "#F9FAFB",
                  color: dietaryFilter === "veg" ? "#2E7D32" : "var(--text-main)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                🌱 Vegetarian
              </button>
              <button
                onClick={() => setDietaryFilter("nonveg")}
                style={{
                  padding: "0.45rem 0.85rem",
                  borderRadius: "var(--radius-full)",
                  border: dietaryFilter === "nonveg" ? "1.5px solid #C62828" : "1px solid var(--border-light)",
                  background: dietaryFilter === "nonveg" ? "#FFEBEE" : "#F9FAFB",
                  color: dietaryFilter === "nonveg" ? "#C62828" : "var(--text-main)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                🍗 Non-Veg
              </button>
              <button
                onClick={() => setDietaryFilter("spicy")}
                style={{
                  padding: "0.45rem 0.85rem",
                  borderRadius: "var(--radius-full)",
                  border: dietaryFilter === "spicy" ? "1.5px solid #E65100" : "1px solid var(--border-light)",
                  background: dietaryFilter === "spicy" ? "#FFF3E0" : "#F9FAFB",
                  color: dietaryFilter === "spicy" ? "#E65100" : "var(--text-main)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                🌶️ Spicy
              </button>
              <button
                onClick={() => setDietaryFilter("bestseller")}
                style={{
                  padding: "0.45rem 0.85rem",
                  borderRadius: "var(--radius-full)",
                  border: dietaryFilter === "bestseller" ? "1.5px solid #D97706" : "1px solid var(--border-light)",
                  background: dietaryFilter === "bestseller" ? "#FEF3C7" : "#F9FAFB",
                  color: dietaryFilter === "bestseller" ? "#D97706" : "var(--text-main)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                ★ Best Sellers
              </button>
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <ArrowUpDown size={16} color="var(--text-muted)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "0.55rem 0.9rem",
                  borderRadius: "var(--radius-md)",
                  border: "1.5px solid var(--border-light)",
                  background: "#FFFFFF",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Items Grid & Results Counter */}
        <div style={{ marginBottom: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--dark)" }}>
            Showing {displayedProducts.length} of {filteredProducts.length} dishes
          </span>
          {(searchQuery || dietaryFilter !== "all" || selectedCategory !== "all") && (
            <button
              onClick={handleResetFilters}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--primary)",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer"
              }}
            >
              Reset Filters ↺
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", padding: "2rem" }}>
            <EmptyState
              emoji="🔍"
              title="No delicious matches found"
              description="We couldn't find any dishes matching your current filter criteria. Try adjusting your dietary tags or search term."
              actionText="Reset All Filters"
              onActionClick={handleResetFilters}
            />
          </div>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
                gap: "1.75rem"
              }}
            >
              {displayedProducts.map((product) => (
                <FoodCard
                  key={product.id}
                  product={product}
                  onQuickView={openQuickView}
                />
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < filteredProducts.length && (
              <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
                <button
                  onClick={() => setVisibleCount((c) => c + 12)}
                  className="btn btn-outline btn-lg"
                  style={{ padding: "0.85rem 2.5rem", borderRadius: "var(--radius-full)", fontWeight: 700 }}
                >
                  Load More Dishes ({filteredProducts.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
