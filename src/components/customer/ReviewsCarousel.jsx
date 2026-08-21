import React from "react";
import { INITIAL_REVIEWS } from "../../data/initialReviews";
import { RatingStars } from "../common/RatingStars";
import { ThumbsUp, CheckCircle2, Quote } from "lucide-react";

export const ReviewsCarousel = () => {
  return (
    <section style={{ padding: "4.5rem 0", background: "var(--bg-light)" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 3rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary)", letterSpacing: "1px", textTransform: "uppercase" }}>
            Real Foodies, Real Love
          </span>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "var(--dark)", marginTop: "4px" }}>
            Loved by Thousands of Cravers
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            See what Springfield’s hungriest food lovers have to say about our food & delivery.
          </p>
        </div>

        {/* Reviews Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem"
          }}
        >
          {INITIAL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="card"
              style={{
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                border: "1px solid var(--border-light)"
              }}
            >
              <Quote
                size={36}
                color="var(--primary)"
                style={{ position: "absolute", top: "16px", right: "16px", opacity: 0.15 }}
              />

              {/* Rating & Date */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <RatingStars rating={rev.rating} size={16} />
                <span style={{ fontSize: "0.78rem", color: "var(--text-light)" }}>{rev.date}</span>
              </div>

              {/* Review Text */}
              <p style={{ fontSize: "0.925rem", color: "var(--text-main)", lineHeight: 1.6, marginBottom: "1.25rem", flex: 1 }}>
                "{rev.comment}"
              </p>

              {/* Product Tag */}
              <div style={{ marginBottom: "1rem" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--primary)",
                    background: "var(--primary-light)",
                    padding: "3px 8px",
                    borderRadius: "4px"
                  }}
                >
                  Ordered: {rev.productName}
                </span>
              </div>

              {/* Customer Avatar & Name */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "0.85rem",
                  borderTop: "1px solid var(--border-light)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <img
                    src={rev.userAvatar}
                    alt={rev.userName}
                    style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--dark)", display: "flex", alignItems: "center", gap: "4px" }}>
                      {rev.userName}
                      {rev.verified && <CheckCircle2 size={13} color="var(--success)" />}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Verified Foodie</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <ThumbsUp size={13} color="var(--primary)" /> {rev.likes}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
