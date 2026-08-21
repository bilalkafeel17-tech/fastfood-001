import React from "react";
import { Link } from "react-router-dom";
import { Flame, Award, Heart, Users, Sparkles, ChefHat } from "lucide-react";

export const AboutPage = () => {
  return (
    <div style={{ padding: "3rem 0 6rem" }}>
      <div className="container">
        {/* About Hero */}
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 4rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary)", letterSpacing: "1px", textTransform: "uppercase" }}>
            The CraveBite Story
          </span>
          <h1 style={{ fontSize: "3rem", fontWeight: 900, color: "var(--dark)", marginTop: "4px" }}>
            Born from a Passion for Extraordinary Flavors 🔥
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginTop: "1rem", lineHeight: 1.6 }}>
            Founded in 2021, CraveBite started with a simple obsession: to elevate fast food from ordinary grease to culinary art with smashed Angus beef, stone-baked pizzas, and artisanal sauces.
          </p>
        </div>

        {/* Story Section Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3.5rem",
            alignItems: "center",
            marginBottom: "5rem"
          }}
          className="about-story-grid"
        >
          <div style={{ position: "relative", borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--shadow-xl)" }}>
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80"
              alt="Kitchen grill master"
              style={{ width: "100%", height: "420px", objectFit: "cover" }}
            />
          </div>

          <div>
            <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--secondary)", letterSpacing: "1px", textTransform: "uppercase" }}>
              Our Kitchen Philosophy
            </span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "var(--dark)", marginTop: "4px", marginBottom: "1.25rem" }}>
              Never Frozen. Always Freshly Smashed to Order.
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
              Every patty is hand-rolled and seared on a 450°F cast-iron flat-top to lock in that caramelized crust. We bake our brioche buns twice daily and whip up all signature dips in-house without artificial preservatives.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1.5rem" }}>
              <div style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "#FFFFFF", border: "1px solid var(--border-light)" }}>
                <ChefHat size={24} color="var(--primary)" />
                <h4 style={{ fontSize: "1rem", fontWeight: 800, marginTop: "4px" }}>Master Chefs</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Crafted by seasoned culinary veterans</p>
              </div>
              <div style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "#FFFFFF", border: "1px solid var(--border-light)" }}>
                <Award size={24} color="var(--success)" />
                <h4 style={{ fontSize: "1rem", fontWeight: 800, marginTop: "4px" }}>Prime Cuts</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>100% Grass-fed Angus certified beef</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--dark) 0%, #222226 100%)",
            borderRadius: "var(--radius-xl)",
            padding: "3.5rem 2.5rem",
            color: "#FFFFFF",
            textAlign: "center"
          }}
        >
          <h2 style={{ fontSize: "2.4rem", fontWeight: 900, color: "#FFFFFF", marginBottom: "0.75rem" }}>
            Ready to Taste the CraveBite Difference?
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#9CA3AF", maxWidth: "540px", margin: "0 auto 2rem" }}>
            Explore our menu of award-winning burgers, loaded fries, and signature shakes with lightning 20-min delivery.
          </p>
          <Link to="/menu" className="btn btn-primary btn-lg" style={{ fontWeight: 800, padding: "0.9rem 2.5rem" }}>
            Order Your Meal Now 🔥
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 840px) {
          .about-story-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  );
};
