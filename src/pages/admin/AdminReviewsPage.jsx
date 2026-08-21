import React, { useState, useEffect } from "react";
import { reviewService } from "../../services/reviewService";
import { RatingStars } from "../../components/common/RatingStars";
import { useToast } from "../../context/ToastContext";
import { Star, Check, X, Trash2, MessageSquare } from "lucide-react";

export const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [filterRating, setFilterRating] = useState("all");
  const { showSuccess } = useToast();

  useEffect(() => {
    reviewService.getAll().then(setReviews);
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    await reviewService.updateStatus(id, newStatus);
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
    showSuccess(`Review marked as ${newStatus}.`);
  };

  const handleDelete = async (id) => {
    await reviewService.delete(id);
    setReviews(reviews.filter((r) => r.id !== id));
    showSuccess("Review deleted.");
  };

  const filtered = reviews.filter((r) => {
    if (filterRating === "all") return true;
    return String(Math.floor(r.rating)) === filterRating;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--dark)" }}>
            Customer Feedback & Reviews Board ⭐
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "2px" }}>
            Moderate customer ratings, approve verified testimonials, and address dining feedback.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.4rem" }}>
          {["all", "5", "4", "3", "2", "1"].map((stars) => (
            <button
              key={stars}
              onClick={() => setFilterRating(stars)}
              className={`btn btn-sm ${filterRating === stars ? "btn-dark" : "btn-outline"}`}
            >
              {stars === "all" ? "All Ratings" : `${stars} ★`}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {filtered.map((rev) => (
          <div
            key={rev.id}
            style={{
              background: "#FFFFFF",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-light)",
              padding: "1.5rem",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <img src={rev.userAvatar} alt={rev.userName} style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <strong style={{ fontSize: "0.95rem", color: "var(--dark)" }}>{rev.userName}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{rev.date}</div>
                </div>
              </div>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "var(--radius-full)",
                  background: rev.status === "approved" ? "var(--success-light)" : "var(--error-light)",
                  color: rev.status === "approved" ? "var(--success)" : "var(--error)",
                  textTransform: "capitalize"
                }}
              >
                {rev.status || "approved"}
              </span>
            </div>

            <div style={{ marginBottom: "0.5rem" }}>
              <RatingStars rating={rev.rating} size={14} />
            </div>

            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--primary)", marginBottom: "0.5rem" }}>
              Dish: {rev.productName}
            </div>

            <p style={{ fontSize: "0.88rem", color: "var(--text-main)", lineHeight: 1.5, flex: 1, marginBottom: "1.25rem" }}>
              "{rev.comment}"
            </p>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-light)", paddingTop: "0.85rem" }}>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                {rev.status !== "approved" && (
                  <button
                    onClick={() => handleUpdateStatus(rev.id, "approved")}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: "0.75rem", color: "var(--success)", borderColor: "var(--success)" }}
                  >
                    <Check size={12} /> Approve
                  </button>
                )}
                {rev.status !== "rejected" && (
                  <button
                    onClick={() => handleUpdateStatus(rev.id, "rejected")}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: "0.75rem", color: "var(--warning)", borderColor: "var(--warning)" }}
                  >
                    <X size={12} /> Reject
                  </button>
                )}
              </div>

              <button
                onClick={() => handleDelete(rev.id)}
                className="btn btn-ghost btn-sm"
                style={{ color: "var(--error)" }}
                title="Delete review"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
