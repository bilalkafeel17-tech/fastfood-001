import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";
import { useToast } from "../../context/ToastContext";

export const ContactPage = () => {
  const { showSuccess } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    showSuccess("Thank you! Your message has been sent to our customer care team.");
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
      setSent(false);
    }, 2000);
  };

  return (
    <div style={{ padding: "3rem 0 6rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "650px", margin: "0 auto 3.5rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary)", letterSpacing: "1px", textTransform: "uppercase" }}>
            We'd Love to Hear from You
          </span>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 900, color: "var(--dark)", marginTop: "4px" }}>
            Contact CraveBite Kitchen 📬
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Have a question about an order, allergen inquiries, or catering a major party? Get in touch with our team anytime.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "3.5rem",
            alignItems: "flex-start"
          }}
          className="contact-grid"
        >
          {/* Left: Contact Info & Locations */}
          <div>
            <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", padding: "2rem", boxShadow: "var(--shadow-sm)", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--dark)", marginBottom: "1.5rem" }}>
                Springfield Flagship Kitchen
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <strong style={{ fontSize: "0.95rem", color: "var(--dark)" }}>Kitchen & Storefront:</strong>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "2px" }}>
                      450 Gourmet Blvd, Downtown Food District, Springfield, NY 10001
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--secondary-light)", color: "var(--dark)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <strong style={{ fontSize: "0.95rem", color: "var(--dark)" }}>Direct Phone Line:</strong>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "2px" }}>+1 (800) 555-CRAVE (2728)</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--success-light)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <strong style={{ fontSize: "0.95rem", color: "var(--dark)" }}>Email Support:</strong>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "2px" }}>support@cravebite.com</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#F3F4F6", color: "var(--text-main)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <strong style={{ fontSize: "0.95rem", color: "var(--dark)" }}>Operating Hours:</strong>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "2px" }}>Monday – Sunday: 10:00 AM – 2:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-light)",
              padding: "2.25rem",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <h3 style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--dark)", marginBottom: "1.25rem" }}>
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Alex Jordan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="e.g. alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <select
                  className="form-select"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order Issue">Order Issue or Delivery Feedback</option>
                  <option value="Catering">Party / Catering Order</option>
                  <option value="Franchise">Franchise Opportunities</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Your Message</label>
                <textarea
                  rows={4}
                  className="form-textarea"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={sent}
                style={{ width: "100%", borderRadius: "var(--radius-full)", fontWeight: 800 }}
              >
                {sent ? <Check size={18} /> : <Send size={18} />}
                {sent ? "Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  );
};
