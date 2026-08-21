import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, FileText, ArrowLeft } from "lucide-react";

export const PrivacyTermsPage = () => {
  return (
    <div style={{ padding: "3rem 0 6rem" }}>
      <div className="container" style={{ maxWidth: "840px" }}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.88rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", padding: "3rem 2.5rem", boxShadow: "var(--shadow-sm)" }}>
          <h1 style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--dark)", marginBottom: "1.5rem" }}>
            Privacy Policy & Terms of Service 📜
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontSize: "0.95rem", color: "var(--text-main)", lineHeight: 1.7 }}>
            <section>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--dark)", marginBottom: "0.5rem" }}>
                1. Order Placement & Fulfillment
              </h2>
              <p>
                All orders placed on CraveBite are prepared fresh upon confirmation. Delivery times provided are estimated based on live kitchen queue and driver dispatch. In the rare event of a major delay exceeding 45 minutes, our customer care team will issue complimentary food vouchers.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--dark)", marginBottom: "0.5rem" }}>
                2. Freshness & 100% Satisfaction Guarantee
              </h2>
              <p>
                We stand firmly by the quality of our ingredients. If your burger, pizza, or sides arrive cold or incorrect, notify us within 15 minutes of receipt through our live tracking or support line, and we will remake or refund your order without hesitation.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--dark)", marginBottom: "0.5rem" }}>
                3. Privacy & Secure Transactions
              </h2>
              <p>
                CraveBite adheres to modern encryption standards. We never sell or distribute your personal contact details, physical delivery address, or payment credentials to third-party advertisers. All credit card processing utilizes PCI-DSS compliant gateways.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--dark)", marginBottom: "0.5rem" }}>
                4. Cancellation Policy
              </h2>
              <p>
                Orders may be cancelled free of charge prior to the kitchen initiating grilling ("Preparing in Kitchen"). Once food preparation has begun, cancellations cannot be guaranteed for a cash refund.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
