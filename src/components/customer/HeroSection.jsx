import React from "react";
import { Link } from "react-router-dom";
import { Flame, ShoppingBag, ArrowRight, Star, Clock, ShieldCheck, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: "3rem",
        paddingBottom: "4.5rem",
        background: "linear-gradient(180deg, #FFFFFF 0%, var(--bg-light) 100%)",
        borderBottom: "1px solid var(--border-light)"
      }}
    >
      {/* Decorative Glow Blobs */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "5%",
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(230, 57, 70, 0.12) 0%, rgba(255, 183, 3, 0.08) 70%, transparent 100%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none"
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "5%",
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, rgba(255, 183, 3, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(50px)",
          pointerEvents: "none"
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            alignItems: "center",
            gap: "3.5rem"
          }}
          className="hero-grid"
        >
          {/* Left Column: Headlines, Pitch & CTAs */}
          <div>
            {/* Tag Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "var(--primary-light)",
                color: "var(--primary)",
                padding: "0.4rem 1rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.85rem",
                fontWeight: 800,
                letterSpacing: "0.5px",
                marginBottom: "1.25rem",
                boxShadow: "0 2px 8px rgba(230, 57, 70, 0.15)"
              }}
            >
              <Flame size={16} fill="var(--primary)" /> SIZZLING HOT & CRUNCHY DEALS
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: "3.5rem",
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: "-1.5px",
                color: "var(--dark)",
                marginBottom: "1.25rem"
              }}
              className="hero-headline"
            >
              Cravings? <br />
              <span
                style={{
                  background: "linear-gradient(135deg, var(--primary) 0%, var(--accent-orange) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                We've Got You
              </span>{" "}
              Covered.
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "1.15rem",
                color: "var(--text-muted)",
                lineHeight: 1.6,
                marginBottom: "2rem",
                maxWidth: "540px"
              }}
            >
              Indulge in artisanal double-smashed Angus burgers, stone-baked pepperoni pizzas, and golden Nashville hot tenders — delivered in under 25 minutes.
            </p>

            {/* CTA Action Buttons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
                marginBottom: "2.5rem"
              }}
            >
              <Link
                to="/menu"
                className="btn btn-primary btn-lg"
                style={{
                  padding: "0.95rem 2.2rem",
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  boxShadow: "var(--shadow-primary)"
                }}
              >
                <ShoppingBag size={20} /> Order Now
              </Link>

              <Link
                to="/deals"
                className="btn btn-outline btn-lg"
                style={{
                  padding: "0.95rem 1.8rem",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  background: "#FFFFFF"
                }}
              >
                Explore Deals 🔥
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--border-light)",
                flexWrap: "wrap"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#FEF3C7",
                    color: "#D97706",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Clock size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "var(--dark)" }}>20-30 Mins</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Superfast Delivery</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#E6F6F4",
                    color: "var(--success)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "var(--dark)" }}>100% Fresh</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Never Frozen Meat</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#FEE2E2",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Star size={18} fill="currentColor" />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "var(--dark)" }}>4.9 / 5.0</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>14,000+ Reviews</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Food Showcase & Floating Cards */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            {/* Main Showcase Image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "460px",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                boxShadow: "var(--shadow-xl)",
                border: "4px solid #FFFFFF"
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&fit=crop&q=80"
                alt="Smoky BBQ Bacon Beast Smash Burger"
                style={{
                  width: "100%",
                  height: "440px",
                  objectFit: "cover",
                  display: "block"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, transparent 60%)"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  left: "1.5rem",
                  right: "1.5rem",
                  color: "#FFFFFF"
                }}
              >
                <span
                  style={{
                    background: "var(--primary)",
                    color: "#FFFFFF",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    padding: "3px 8px",
                    borderRadius: "var(--radius-full)",
                    textTransform: "uppercase"
                  }}
                >
                  Chef Signature
                </span>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#FFFFFF", marginTop: "4px" }}>
                  Smoky BBQ Bacon Beast
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#E5E7EB", marginTop: "2px" }}>
                  Double smashed Angus beef with bourbon BBQ & aged cheddar
                </p>
              </div>
            </div>

            {/* Floating Card 1: 20% OFF Deal Pill */}
            <div
              className="glass-panel"
              style={{
                position: "absolute",
                top: "10%",
                left: "-30px",
                padding: "0.85rem 1.1rem",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-lg)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                animation: "floatSlow 4s ease-in-out infinite"
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "var(--secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem"
                }}
              >
                🍔
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "var(--dark)" }}>20% OFF Code</div>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--primary)" }}>Use: CRAVE20</div>
              </div>
            </div>

            {/* Floating Card 2: Live Delivery Speed */}
            <div
              className="glass-panel"
              style={{
                position: "absolute",
                bottom: "5%",
                right: "-20px",
                padding: "0.85rem 1.1rem",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-lg)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                animation: "floatSlow 5s ease-in-out infinite 1s"
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "var(--success-light)",
                  color: "var(--success)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Clock size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "var(--dark)" }}>Superfast Delivery</div>
                <div style={{ fontSize: "0.78rem", color: "var(--success)", fontWeight: 600 }}>Avg. 18 mins to doorstep</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .hero-headline {
            font-size: 2.75rem !important;
          }
        }
        @media (max-width: 480px) {
          .hero-headline {
            font-size: 2.2rem !important;
          }
        }
      `}</style>
    </section>
  );
};
