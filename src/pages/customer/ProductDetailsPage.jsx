import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useOutletContext } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useToast } from "../../context/ToastContext";
import { RatingStars } from "../../components/common/RatingStars";
import { Badge } from "../../components/common/Badge";
import { FoodCard } from "../../components/customer/FoodCard";
import { reviewService } from "../../services/reviewService";
import {
  Heart,
  ShoppingBag,
  Clock,
  Flame,
  Check,
  Plus,
  Minus,
  Sparkles,
  ShieldCheck,
  Star,
  ThumbsUp,
  MessageSquarePlus,
  ArrowLeft
} from "lucide-react";

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart, openCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showSuccess } = useToast();
  const { openQuickView } = useOutletContext();
  const navigate = useNavigate();

  const product = products.find((p) => String(p.id) === String(id)) || products[0];

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(5);
  const [reviewerName, setReviewerName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : { name: "Regular", priceDelta: 0 });
      setSelectedAddOns([]);
      setQuantity(1);
      setSpecialInstructions("");
      window.scrollTo(0, 0);

      // Load reviews
      reviewService.getByProduct(product.name).then((revs) => setReviews(revs));
    }
  }, [product]);

  if (!product) return null;

  const fav = isFavorite(product.id);

  const toggleAddOn = (addon) => {
    setSelectedAddOns((prev) => {
      const exists = prev.some((a) => a.name === addon.name);
      if (exists) return prev.filter((a) => a.name !== addon.name);
      return [...prev, addon];
    });
  };

  const basePrice = Number(product.price);
  const sizeDelta = Number(selectedSize?.priceDelta || 0);
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + Number(a.price || 0), 0);
  const unitPrice = basePrice + sizeDelta + addOnsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedAddOns, specialInstructions);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedAddOns, specialInstructions);
    navigate("/checkout");
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;
    setSubmittingReview(true);
    try {
      const created = await reviewService.create({
        userName: reviewerName,
        userAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${reviewerName}`,
        rating: newRating,
        productName: product.name,
        comment: reviewComment
      });
      setReviews((prev) => [created, ...prev]);
      setReviewerName("");
      setReviewComment("");
      showSuccess("Thank you for your feedback! Review published.");
    } catch {
      // toast
    } finally {
      setSubmittingReview(false);
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div style={{ padding: "2rem 0 5rem" }}>
      <div className="container">
        {/* Breadcrumb Back Link */}
        <div style={{ marginBottom: "1.5rem" }}>
          <Link
            to="/menu"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.88rem",
              fontWeight: 600,
              color: "var(--text-muted)"
            }}
          >
            <ArrowLeft size={16} /> Back to Full Menu
          </Link>
        </div>

        {/* Product Details Main Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.15fr",
            gap: "3rem",
            alignItems: "flex-start",
            marginBottom: "4rem"
          }}
          className="product-details-grid"
        >
          {/* Left: Big Food Image Showcase */}
          <div style={{ position: "sticky", top: "90px" }}>
            <div
              style={{
                position: "relative",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                boxShadow: "var(--shadow-lg)",
                border: "1px solid var(--border-light)",
                background: "#FFFFFF"
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "440px",
                  objectFit: "cover",
                  display: "block"
                }}
              />

              {/* Floating Badges */}
              <div style={{ position: "absolute", top: "16px", left: "16px", display: "flex", gap: "6px" }}>
                {product.isVeg ? <Badge type="veg" /> : <Badge type="nonveg" />}
                {product.isSpicy && <Badge type="spicy" />}
                {product.discount > 0 && <Badge type="discount" text={`-${product.discount}% OFF`} />}
              </div>

              {/* Favorite Toggle Button */}
              <button
                onClick={() => toggleFavorite(product.id, product.name)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.92)",
                  backdropFilter: "blur(6px)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "var(--shadow-md)"
                }}
                aria-label="Save to favorites"
              >
                <Heart size={20} fill={fav ? "var(--primary)" : "none"} color={fav ? "var(--primary)" : "var(--dark)"} />
              </button>
            </div>

            {/* Quick Guarantees Bar */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginTop: "1.25rem"
              }}
            >
              <div
                style={{
                  padding: "0.85rem",
                  borderRadius: "var(--radius-md)",
                  background: "#FFFFFF",
                  border: "1px solid var(--border-light)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem"
                }}
              >
                <Clock size={20} color="var(--primary)" />
                <div style={{ fontSize: "0.8rem" }}>
                  <strong>Prep & Cook Time</strong>
                  <div style={{ color: "var(--text-muted)" }}>{product.prepTime || "12-15 mins"}</div>
                </div>
              </div>

              <div
                style={{
                  padding: "0.85rem",
                  borderRadius: "var(--radius-md)",
                  background: "#FFFFFF",
                  border: "1px solid var(--border-light)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem"
                }}
              >
                <ShieldCheck size={20} color="var(--success)" />
                <div style={{ fontSize: "0.8rem" }}>
                  <strong>Quality Certified</strong>
                  <div style={{ color: "var(--text-muted)" }}>100% Fresh Daily</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Info, Size Options, Toppings Customizer & Actions */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} showCount={true} size={16} />
              {product.calories && (
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)" }}>
                  🔥 {product.calories} Calories
                </span>
              )}
            </div>

            <h1 style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--dark)", lineHeight: 1.15, marginBottom: "0.75rem" }}>
              {product.name}
            </h1>

            <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              {product.description}
            </p>

            {/* Ingredients & Allergens */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div
                style={{
                  padding: "1rem 1.25rem",
                  borderRadius: "var(--radius-lg)",
                  background: "#FFFFFF",
                  border: "1px solid var(--border-light)",
                  marginBottom: "1.75rem"
                }}
              >
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--dark)", marginBottom: "0.35rem" }}>
                  Fresh Ingredients:
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.45 }}>
                  {product.ingredients.join(" • ")}
                </div>
                {product.allergens && product.allergens.length > 0 && (
                  <div style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 600, marginTop: "0.4rem" }}>
                    Allergen Notice: Contains {product.allergens.join(", ")}
                  </div>
                )}
              </div>
            )}

            {/* Portion Size Selector */}
            {product.sizes && product.sizes.length > 1 && (
              <div style={{ marginBottom: "1.75rem" }}>
                <label style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--dark)", marginBottom: "0.6rem", display: "block" }}>
                  1. Choose Your Portion Size:
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.65rem" }}>
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize?.name === size.name;
                    return (
                      <button
                        key={size.name}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        style={{
                          padding: "0.75rem 1rem",
                          borderRadius: "var(--radius-md)",
                          border: isSelected ? "2px solid var(--primary)" : "1.5px solid var(--border-light)",
                          background: isSelected ? "var(--primary-light)" : "#FFFFFF",
                          color: isSelected ? "var(--primary)" : "var(--text-main)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          cursor: "pointer",
                          textAlign: "left"
                        }}
                      >
                        <span style={{ fontWeight: 800, fontSize: "0.92rem" }}>{size.name}</span>
                        <span style={{ fontSize: "0.8rem", color: isSelected ? "var(--primary)" : "var(--text-muted)", marginTop: "2px" }}>
                          {size.priceDelta > 0 ? `+$${size.priceDelta.toFixed(2)}` : "Standard Base"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add-ons Checklist */}
            {product.addOns && product.addOns.length > 0 && (
              <div style={{ marginBottom: "1.75rem" }}>
                <label style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--dark)", marginBottom: "0.6rem", display: "block" }}>
                  2. Customize With Extra Toppings & Dips:
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }} className="addons-grid">
                  {product.addOns.map((addon) => {
                    const isChecked = selectedAddOns.some((a) => a.name === addon.name);
                    return (
                      <button
                        key={addon.name}
                        type="button"
                        onClick={() => toggleAddOn(addon)}
                        style={{
                          padding: "0.65rem 0.85rem",
                          borderRadius: "var(--radius-md)",
                          border: isChecked ? "1.5px solid var(--primary)" : "1.5px solid var(--border-light)",
                          background: isChecked ? "var(--primary-light)" : "#FFFFFF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          fontSize: "0.88rem"
                        }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: isChecked ? 700 : 500 }}>
                          <div
                            style={{
                              width: "18px",
                              height: "18px",
                              borderRadius: "4px",
                              border: isChecked ? "none" : "1.5px solid #D1D5DB",
                              background: isChecked ? "var(--primary)" : "transparent",
                              color: "#FFFFFF",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            {isChecked && <Check size={12} strokeWidth={3} />}
                          </div>
                          {addon.name}
                        </span>
                        <span style={{ fontWeight: 800, color: "var(--primary)", fontSize: "0.82rem" }}>
                          +${addon.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div style={{ marginBottom: "2rem" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--dark)", marginBottom: "0.4rem", display: "block" }}>
                3. Special Cooking Notes (Optional):
              </label>
              <input
                type="text"
                placeholder="e.g. Extra napkins, no pickles, dressing on the side..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Price & Quantity & Action Buttons */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-xl)",
                padding: "1.5rem",
                border: "1px solid var(--border-light)",
                boxShadow: "var(--shadow-md)"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.25rem",
                  flexWrap: "wrap",
                  gap: "0.75rem"
                }}
              >
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>
                    Total Calculated Price
                  </span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <span style={{ fontSize: "2rem", fontWeight: 900, color: "var(--primary)" }}>
                      ${totalPrice.toFixed(2)}
                    </span>
                    {quantity > 1 && (
                      <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                        (${unitPrice.toFixed(2)} each)
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    border: "1.5px solid var(--border-light)",
                    borderRadius: "var(--radius-full)",
                    background: "#F9FAFB",
                    padding: "3px"
                  }}
                >
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "transparent",
                      border: "none",
                      cursor: quantity <= 1 ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: quantity <= 1 ? "#D1D5DB" : "var(--dark)"
                    }}
                  >
                    <Minus size={16} />
                  </button>
                  <span style={{ minWidth: "36px", textAlign: "center", fontWeight: 800, fontSize: "1.1rem" }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--dark)"
                    }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.75rem" }}>
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary btn-lg"
                  style={{ fontWeight: 800 }}
                >
                  <ShoppingBag size={20} /> Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="btn btn-dark btn-lg"
                  style={{ fontWeight: 800 }}
                >
                  ⚡ Express Buy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Reviews Section */}
        <div style={{ marginTop: "4rem", paddingTop: "3rem", borderTop: "1px solid var(--border-light)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "3rem" }} className="reviews-layout">
            {/* Reviews List */}
            <div>
              <h3 style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--dark)", marginBottom: "1.5rem" }}>
                Craver Reviews ({reviews.length})
              </h3>
              {reviews.length === 0 ? (
                <p style={{ color: "var(--text-muted)" }}>Be the first to review this sizzling delicious dish!</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      style={{
                        padding: "1.25rem",
                        borderRadius: "var(--radius-lg)",
                        background: "#FFFFFF",
                        border: "1px solid var(--border-light)"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                          <img
                            src={rev.userAvatar}
                            alt={rev.userName}
                            style={{ width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover" }}
                          />
                          <strong style={{ fontSize: "0.95rem", color: "var(--dark)" }}>{rev.userName}</strong>
                        </div>
                        <span style={{ fontSize: "0.78rem", color: "var(--text-light)" }}>{rev.date}</span>
                      </div>
                      <RatingStars rating={rev.rating} size={14} />
                      <p style={{ fontSize: "0.9rem", color: "var(--text-main)", marginTop: "0.5rem", lineHeight: 1.5 }}>
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Write a Review Form */}
            <div>
              <div
                style={{
                  padding: "1.75rem",
                  borderRadius: "var(--radius-xl)",
                  background: "#FFFFFF",
                  border: "1px solid var(--border-light)",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--dark)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <MessageSquarePlus size={20} color="var(--primary)" /> Rate This Dish
                </h4>
                <form onSubmit={handleAddReview}>
                  <div className="form-group">
                    <label className="form-label">Your Rating (1 to 5 Stars)</label>
                    <RatingStars rating={newRating} size={24} interactive={true} onRatingChange={(r) => setNewRating(r)} />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Alex Jordan"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Review & Taste Experience</label>
                    <textarea
                      className="form-textarea"
                      rows={3}
                      placeholder="Tell us what you loved about the flavor, crunch, and delivery!"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submittingReview}
                    style={{ width: "100%", borderRadius: "var(--radius-full)", fontWeight: 700 }}
                  >
                    Submit Verified Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* You Might Also Crave */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: "5rem", paddingTop: "3rem", borderTop: "1px solid var(--border-light)" }}>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--dark)", marginBottom: "2rem" }}>
              You Might Also Crave 🔥
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
              {relatedProducts.map((p) => (
                <FoodCard key={p.id} product={p} onQuickView={openQuickView} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .product-details-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .reviews-layout { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .addons-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
