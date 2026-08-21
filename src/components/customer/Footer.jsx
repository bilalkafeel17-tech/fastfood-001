import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Flame,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ShieldCheck,
  Truck,
  Award
} from "lucide-react";
import { useToast } from "../../context/ToastContext";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const { showSuccess } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    showSuccess("Thank you for subscribing! Check your inbox for exclusive secret discounts.");
    setEmail("");
  };

  return (
    <footer
      style={{
        background: "var(--dark)",
        color: "#9CA3AF",
        paddingTop: "4rem",
        paddingBottom: "2rem",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        marginTop: "4rem"
      }}
    >
      <div className="container">
        {/* Top Feature Highlights */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            marginBottom: "3rem"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(230, 57, 70, 0.15)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <Truck size={24} />
            </div>
            <div>
              <h4 style={{ color: "#FFFFFF", fontSize: "1rem", marginBottom: "2px" }}>Lightning Delivery</h4>
              <p style={{ fontSize: "0.825rem", color: "#9CA3AF" }}>Piping hot to your door in 20-30 mins</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(255, 183, 3, 0.15)",
                color: "var(--secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <Award size={24} />
            </div>
            <div>
              <h4 style={{ color: "#FFFFFF", fontSize: "1rem", marginBottom: "2px" }}>100% Prime Quality</h4>
              <p style={{ fontSize: "0.825rem", color: "#9CA3AF" }}>Grass-fed beef & fresh ingredients daily</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(42, 157, 143, 0.15)",
                color: "var(--success)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ color: "#FFFFFF", fontSize: "1rem", marginBottom: "2px" }}>Satisfaction Guaranteed</h4>
              <p style={{ fontSize: "0.825rem", color: "#9CA3AF" }}>Not 100% thrilled? We'll remake it free</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3.5rem"
          }}
        >
          {/* Brand Col */}
          <div style={{ gridColumn: "span 1" }}>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF"
                }}
              >
                <Flame size={20} fill="#FFB703" color="#FFB703" />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.35rem",
                  fontWeight: 900,
                  color: "#FFFFFF"
                }}
              >
                CRAVE<span style={{ color: "var(--primary)" }}>BITE</span>
              </span>
            </Link>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              Serving culinary perfection with fire-grilled smash burgers, stone-baked pizzas, and artisanal loaded sides.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <a href="#social" className="btn-icon" style={{ background: "#222226", borderColor: "#333338", color: "#FFFFFF" }} aria-label="Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#social" className="btn-icon" style={{ background: "#222226", borderColor: "#333338", color: "#FFFFFF" }} aria-label="Facebook">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#social" className="btn-icon" style={{ background: "#222226", borderColor: "#333338", color: "#FFFFFF" }} aria-label="Twitter">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#social" className="btn-icon" style={{ background: "#222226", borderColor: "#333338", color: "#FFFFFF" }} aria-label="YouTube">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1rem", marginBottom: "1.25rem" }}>Quick Links</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.9rem" }}>
              <li><Link to="/" style={{ color: "#9CA3AF" }}>Home Page</Link></li>
              <li><Link to="/menu" style={{ color: "#9CA3AF" }}>Explore Full Menu</Link></li>
              <li><Link to="/deals" style={{ color: "#9CA3AF" }}>Deals & Combos</Link></li>
              <li><Link to="/about" style={{ color: "#9CA3AF" }}>About Our Kitchen</Link></li>
              <li><Link to="/contact" style={{ color: "#9CA3AF" }}>Store Locations</Link></li>
              <li><Link to="/admin" style={{ color: "var(--secondary)" }}>Admin Management</Link></li>
            </ul>
          </div>

          {/* Food Categories */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1rem", marginBottom: "1.25rem" }}>Popular Menu</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.9rem" }}>
              <li><Link to="/menu/burgers" style={{ color: "#9CA3AF" }}>Smash Burgers</Link></li>
              <li><Link to="/menu/pizza" style={{ color: "#9CA3AF" }}>Artisan Pizzas</Link></li>
              <li><Link to="/menu/chicken" style={{ color: "#9CA3AF" }}>Fried Chicken</Link></li>
              <li><Link to="/menu/fries" style={{ color: "#9CA3AF" }}>Monster Loaded Fries</Link></li>
              <li><Link to="/menu/desserts" style={{ color: "#9CA3AF" }}>Lava Cakes & Shakes</Link></li>
              <li><Link to="/menu/combos" style={{ color: "#9CA3AF" }}>Value Meal Bundles</Link></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1rem", marginBottom: "1.25rem" }}>Get In Touch</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.88rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <MapPin size={17} color="var(--primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>450 Gourmet Blvd, Downtown Food District, NY 10001</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Phone size={17} color="var(--secondary)" style={{ flexShrink: 0 }} />
                <span>+1 (800) 555-CRAVE</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Mail size={17} color="var(--success)" style={{ flexShrink: 0 }} />
                <span>hello@cravebite.com</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Clock size={17} color="#9CA3AF" style={{ flexShrink: 0 }} />
                <span>10:00 AM – 2:00 AM Daily</span>
              </div>
            </div>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1rem", marginBottom: "0.5rem" }}>Join Craver Club</h4>
            <p style={{ fontSize: "0.85rem", marginBottom: "1rem" }}>
              Subscribe to get secret discount drops, free fries coupons, and VIP tasting invites.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{ position: "relative" }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.7rem 1rem",
                    borderRadius: "var(--radius-full)",
                    background: "#222226",
                    border: "1px solid #333338",
                    color: "#FFFFFF",
                    fontSize: "0.88rem",
                    outline: "none"
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ borderRadius: "var(--radius-full)", padding: "0.65rem" }}
              >
                <Send size={15} /> Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "1.75rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            fontSize: "0.825rem"
          }}
        >
          <div>
            © {new Date().getFullYear()} CraveBite Inc. All Rights Reserved. Crafted for food lovers.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link to="/privacy" style={{ color: "#9CA3AF" }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: "#9CA3AF" }}>Terms & Conditions</Link>
            <Link to="/privacy" style={{ color: "#9CA3AF" }}>Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
