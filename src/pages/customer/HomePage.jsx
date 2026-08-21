import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import { HeroSection } from "../../components/customer/HeroSection";
import { CategorySlider } from "../../components/customer/CategorySlider";
import { DealsCarousel } from "../../components/customer/DealsCarousel";
import { FoodCard } from "../../components/customer/FoodCard";
import { StatsSection } from "../../components/customer/StatsSection";
import { HowItWorks } from "../../components/customer/HowItWorks";
import { ReviewsCarousel } from "../../components/customer/ReviewsCarousel";
import { useProducts } from "../../context/ProductContext";
import { Flame, Sparkles, ArrowRight } from "lucide-react";

export const HomePage = () => {
  const { openQuickView } = useOutletContext();
  const { products, loading } = useProducts();

  const bestSellers = products.filter((p) => p.isBestseller).slice(0, 4);
  const featuredCombos = products.filter((p) => p.category === "combos").slice(0, 2);

  return (
    <div>
      {/* 1. Hero Showcase */}
      <HeroSection />

      {/* 2. Category Carousel */}
      <CategorySlider />

      {/* 3. Popular Best Sellers Section */}
      <section style={{ padding: "4rem 0", background: "#FFFFFF", borderBottom: "1px solid var(--border-light)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary)", letterSpacing: "1px", textTransform: "uppercase" }}>
                Top Craver Favorites
              </span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "var(--dark)", marginTop: "4px" }}>
                Most Popular Dishes 🔥
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
              Explore All {products.length} Items <ArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem"
            }}
          >
            {bestSellers.map((product) => (
              <FoodCard
                key={product.id}
                product={product}
                onQuickView={openQuickView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Special Promotional Deals */}
      <DealsCarousel />

      {/* 5. Monster Combos Showcase */}
      {featuredCombos.length > 0 && (
        <section style={{ padding: "4rem 0", background: "#FFFFFF", borderBottom: "1px solid var(--border-light)" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 3rem" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary)", letterSpacing: "1px", textTransform: "uppercase" }}>
                Value Feasts
              </span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "var(--dark)", marginTop: "4px" }}>
                Signature Meal Bundles 🍱
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                Feed the entire squad with our jumbo combo boxes and save up to 30%.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "2rem"
              }}
            >
              {featuredCombos.map((product) => (
                <FoodCard
                  key={product.id}
                  product={product}
                  onQuickView={openQuickView}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. How It Works Steps */}
      <HowItWorks />

      {/* 7. Statistics Section */}
      <StatsSection />

      {/* 8. Customer Testimonials */}
      <ReviewsCarousel />
    </div>
  );
};
