import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../context/OrderContext";
import { useToast } from "../../context/ToastContext";
import confetti from "canvas-confetti";
import {
  Check,
  User,
  MapPin,
  Truck,
  CreditCard,
  FileText,
  Lock,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Wallet,
  DollarSign
} from "lucide-react";

export const CheckoutPage = () => {
  const { cartItems, subtotal, discount, tax, grandTotal, clearCart, appliedCoupon } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const { showError, showSuccess } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [placingOrder, setPlacingOrder] = useState(false);

  // Step 1: Customer Info
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || "Alex Jordan",
    email: user?.email || "alex.jordan@gmail.com",
    phone: user?.phone || "+1 (555) 912-3456"
  });

  // Step 2: Address
  const [address, setAddress] = useState({
    house: "742",
    street: "Evergreen Terrace",
    apartment: "Apt 4B",
    city: "Springfield",
    postalCode: "97477",
    instructions: "Ring buzzer 4B, leave on front porch."
  });

  // Step 3: Delivery Method
  const [deliveryMethod, setDeliveryMethod] = useState("Standard Delivery (25-35 min)");
  const [deliveryCost, setDeliveryCost] = useState(3.99);

  // Step 4: Payment Method
  const [paymentMethod, setPaymentMethod] = useState("credit-card"); // 'credit-card', 'cod', 'wallet', 'apple-pay'
  const [cardInfo, setCardInfo] = useState({
    number: "•••• •••• •••• 4242",
    expiry: "12/28",
    cvv: "•••",
    nameOnCard: user?.name || "Alex Jordan"
  });

  const finalDeliveryFee = subtotal >= 35 || appliedCoupon?.discountType === "delivery" ? 0 : deliveryCost;
  const finalTotal = Number((subtotal - discount + finalDeliveryFee + tax).toFixed(2));

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "5rem 0", textAlign: "center" }}>
        <h2>Your cart is empty</h2>
        <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>Please add some items to your feast before checking out.</p>
        <Link to="/menu" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>Explore Menu</Link>
      </div>
    );
  }

  const validateStep1 = () => {
    if (!customerInfo.name.trim() || !customerInfo.email.trim() || !customerInfo.phone.trim()) {
      showError("Please fill out all customer information fields.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!address.street.trim() || !address.city.trim() || !address.postalCode.trim()) {
      showError("Please provide your street, city, and postal code.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async () => {
    try {
      setPlacingOrder(true);

      const orderPayload = {
        customer: {
          id: user?.id || "guest",
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone
        },
        items: cartItems,
        deliveryAddress: address,
        deliveryMethod,
        paymentMethod:
          paymentMethod === "credit-card"
            ? `Credit Card (ending in •••• 4242)`
            : paymentMethod === "cod"
            ? "Cash on Delivery"
            : paymentMethod === "wallet"
            ? "Digital Wallet"
            : "Apple Pay",
        subtotal,
        discount,
        couponCode: appliedCoupon?.code || null,
        deliveryFee: finalDeliveryFee,
        tax,
        total: finalTotal
      };

      const newOrder = await createOrder(orderPayload);
      clearCart();

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.warn("Confetti error", err);
      }

      navigate("/order-success", { state: { order: newOrder } });
    } catch (err) {
      showError(err.message || "Failed to place order");
    } finally {
      setPlacingOrder(false);
    }
  };

  const steps = [
    { num: 1, label: "Customer", icon: User },
    { num: 2, label: "Address", icon: MapPin },
    { num: 3, label: "Delivery", icon: Truck },
    { num: 4, label: "Payment", icon: CreditCard },
    { num: 5, label: "Review", icon: FileText }
  ];

  return (
    <div style={{ padding: "2.5rem 0 5rem" }}>
      <div className="container" style={{ maxWidth: "1000px" }}>
        {/* Checkout Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--dark)" }}>
            Express Checkout 🔒
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "4px" }}>
            Safe, encrypted 256-bit ordering. Complete the steps below to sizzle up your order.
          </p>
        </div>

        {/* 5-Step Progress Stepper */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            marginBottom: "3rem",
            background: "#FFFFFF",
            padding: "1.25rem 1.75rem",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-light)",
            boxShadow: "var(--shadow-sm)"
          }}
          className="stepper-bar"
        >
          {steps.map((s, idx) => {
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;
            const Icon = s.icon;

            return (
              <div
                key={s.num}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  zIndex: 2,
                  cursor: isCompleted ? "pointer" : "default"
                }}
                onClick={() => isCompleted && setStep(s.num)}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: isCompleted
                      ? "var(--success)"
                      : isCurrent
                      ? "var(--primary)"
                      : "#F3F4F6",
                    color: isCompleted || isCurrent ? "#FFFFFF" : "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    boxShadow: isCurrent ? "var(--shadow-primary)" : "none",
                    transition: "all var(--transition-fast)"
                  }}
                >
                  {isCompleted ? <Check size={20} strokeWidth={3} /> : <Icon size={18} />}
                </div>
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: isCurrent ? 800 : 600,
                    color: isCurrent ? "var(--dark)" : "var(--text-muted)"
                  }}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Wizard Main Card Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.25fr 0.75fr",
            gap: "2.5rem",
            alignItems: "flex-start"
          }}
          className="checkout-grid"
        >
          {/* Left: Step Active Form */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-light)",
              padding: "2rem",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            {/* STEP 1: CUSTOMER INFORMATION */}
            {step === 1 && (
              <div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--dark)", marginBottom: "1.25rem" }}>
                  Step 1: Contact Information
                </h3>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address (for live receipts & tracking updates)</label>
                  <input
                    type="email"
                    className="form-input"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number (driver will call upon arrival)</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            {/* STEP 2: DELIVERY ADDRESS */}
            {step === 2 && (
              <div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--dark)", marginBottom: "1.25rem" }}>
                  Step 2: Delivery Location
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">House / Flat #</label>
                    <input
                      type="text"
                      className="form-input"
                      value={address.house}
                      onChange={(e) => setAddress({ ...address, house: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Street Address</label>
                    <input
                      type="text"
                      className="form-input"
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Apartment / Suite / Floor (Optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={address.apartment}
                    onChange={(e) => setAddress({ ...address, apartment: e.target.value })}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-input"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Postal / ZIP Code</label>
                    <input
                      type="text"
                      className="form-input"
                      value={address.postalCode}
                      onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Drop-off Instructions (Optional)</label>
                  <textarea
                    rows={2}
                    className="form-textarea"
                    placeholder="e.g. Leave by front door, ring doorbell, gate passcode 1234"
                    value={address.instructions}
                    onChange={(e) => setAddress({ ...address, instructions: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* STEP 3: DELIVERY METHOD */}
            {step === 3 && (
              <div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--dark)", marginBottom: "1.25rem" }}>
                  Step 3: Choose Delivery Speed
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem 1.25rem",
                      borderRadius: "var(--radius-lg)",
                      border: deliveryMethod.includes("Standard") ? "2px solid var(--primary)" : "1.5px solid var(--border-light)",
                      background: deliveryMethod.includes("Standard") ? "var(--primary-light)" : "#FFFFFF",
                      cursor: "pointer"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={deliveryMethod.includes("Standard")}
                        onChange={() => {
                          setDeliveryMethod("Standard Delivery (25-35 min)");
                          setDeliveryCost(3.99);
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>Standard Thermal Delivery</div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Arrives piping hot in 25-35 mins</div>
                      </div>
                    </div>
                    <span style={{ fontWeight: 800, color: "var(--primary)" }}>$3.99</span>
                  </label>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem 1.25rem",
                      borderRadius: "var(--radius-lg)",
                      border: deliveryMethod.includes("Express") ? "2px solid var(--primary)" : "1.5px solid var(--border-light)",
                      background: deliveryMethod.includes("Express") ? "var(--primary-light)" : "#FFFFFF",
                      cursor: "pointer"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={deliveryMethod.includes("Express")}
                        onChange={() => {
                          setDeliveryMethod("Express Priority Delivery (15-20 min)");
                          setDeliveryCost(5.99);
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>⚡ Priority Rush Delivery</div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Direct priority courier route (15-20 mins)</div>
                      </div>
                    </div>
                    <span style={{ fontWeight: 800, color: "var(--primary)" }}>$5.99</span>
                  </label>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem 1.25rem",
                      borderRadius: "var(--radius-lg)",
                      border: deliveryMethod.includes("Pickup") ? "2px solid var(--primary)" : "1.5px solid var(--border-light)",
                      background: deliveryMethod.includes("Pickup") ? "var(--primary-light)" : "#FFFFFF",
                      cursor: "pointer"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={deliveryMethod.includes("Pickup")}
                        onChange={() => {
                          setDeliveryMethod("In-Store Fast Pickup");
                          setDeliveryCost(0.00);
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>🏬 Store Pickup</div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Ready in 10-15 mins at Springfield Central</div>
                      </div>
                    </div>
                    <span style={{ fontWeight: 800, color: "var(--success)" }}>FREE</span>
                  </label>
                </div>
              </div>
            )}

            {/* STEP 4: PAYMENT METHOD */}
            {step === 4 && (
              <div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--dark)", marginBottom: "1.25rem" }}>
                  Step 4: Secure Payment
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                  {/* Credit Card Option */}
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem 1.25rem",
                      borderRadius: "var(--radius-lg)",
                      border: paymentMethod === "credit-card" ? "2px solid var(--primary)" : "1.5px solid var(--border-light)",
                      background: paymentMethod === "credit-card" ? "var(--primary-light)" : "#FFFFFF",
                      cursor: "pointer"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "credit-card"}
                        onChange={() => setPaymentMethod("credit-card")}
                      />
                      <CreditCard size={20} color="var(--primary)" />
                      <span style={{ fontWeight: 700 }}>Credit / Debit Card (Visa, Mastercard, Amex)</span>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem 1.25rem",
                      borderRadius: "var(--radius-lg)",
                      border: paymentMethod === "cod" ? "2px solid var(--primary)" : "1.5px solid var(--border-light)",
                      background: paymentMethod === "cod" ? "var(--primary-light)" : "#FFFFFF",
                      cursor: "pointer"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                      />
                      <DollarSign size={20} color="var(--success)" />
                      <span style={{ fontWeight: 700 }}>Cash on Delivery (Pay driver upon arrival)</span>
                    </div>
                  </label>

                  {/* Wallet / Apple Pay */}
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem 1.25rem",
                      borderRadius: "var(--radius-lg)",
                      border: paymentMethod === "apple-pay" ? "2px solid var(--primary)" : "1.5px solid var(--border-light)",
                      background: paymentMethod === "apple-pay" ? "var(--primary-light)" : "#FFFFFF",
                      cursor: "pointer"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "apple-pay"}
                        onChange={() => setPaymentMethod("apple-pay")}
                      />
                      <Wallet size={20} color="#8338EC" />
                      <span style={{ fontWeight: 700 }}>Apple Pay / Google Wallet Instant Pay</span>
                    </div>
                  </label>
                </div>

                {/* Credit card fields if selected */}
                {paymentMethod === "credit-card" && (
                  <div style={{ padding: "1.25rem", borderRadius: "var(--radius-lg)", background: "#F9FAFB", border: "1px solid var(--border-light)" }}>
                    <div className="form-group">
                      <label className="form-label">Card Number</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="•••• •••• •••• 4242"
                        value={cardInfo.number}
                        onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                      />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div className="form-group">
                        <label className="form-label">Expiration Date</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="MM/YY"
                          value={cardInfo.expiry}
                          onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">CVV / CVC</label>
                        <input
                          type="password"
                          className="form-input"
                          placeholder="•••"
                          maxLength={4}
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 5: ORDER REVIEW & FINAL CONFIRMATION */}
            {step === 5 && (
              <div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--dark)", marginBottom: "1.25rem" }}>
                  Step 5: Final Review & Confirmation
                </h3>

                {/* Summary Info Cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "#F9FAFB", border: "1px solid var(--border-light)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <strong style={{ fontSize: "0.9rem" }}>Delivery Destination:</strong>
                      <button onClick={() => setStep(2)} style={{ background: "transparent", border: "none", color: "var(--primary)", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}>Edit</button>
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      {address.house} {address.street} {address.apartment && `, ${address.apartment}`}, {address.city}, {address.postalCode}
                    </div>
                  </div>

                  <div style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "#F9FAFB", border: "1px solid var(--border-light)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <strong style={{ fontSize: "0.9rem" }}>Delivery Speed & Payment:</strong>
                      <button onClick={() => setStep(3)} style={{ background: "transparent", border: "none", color: "var(--primary)", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}>Edit</button>
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      {deliveryMethod} • Payment: {paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "credit-card" ? "Credit Card (•••• 4242)" : "Digital Wallet"}
                    </div>
                  </div>
                </div>

                {/* Items Mini List */}
                <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "1rem" }}>
                  <div style={{ fontWeight: 800, fontSize: "0.95rem", marginBottom: "0.75rem" }}>Feast Items:</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {cartItems.map((item) => (
                      <div key={item.key} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem" }}>
                        <span>{item.quantity}x {item.name} {item.selectedSize?.name && `(${item.selectedSize.name})`}</span>
                        <span style={{ fontWeight: 700 }}>${item.itemTotal.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "2.5rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--border-light)"
              }}
            >
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="btn btn-outline"
                >
                  <ArrowLeft size={16} /> Back
                </button>
              ) : (
                <Link to="/cart" className="btn btn-ghost" style={{ fontSize: "0.88rem" }}>
                  <ArrowLeft size={16} /> Back to Cart
                </Link>
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary btn-lg"
                  style={{ fontWeight: 800 }}
                >
                  Continue <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={placingOrder}
                  className="btn btn-primary btn-lg"
                  style={{ fontWeight: 900, padding: "1rem 2.5rem", boxShadow: "var(--shadow-primary)" }}
                >
                  {placingOrder ? "Preparing Order..." : `🔥 Place Order • $${finalTotal.toFixed(2)}`}
                </button>
              )}
            </div>
          </div>

          {/* Right: Sticky Order Bill Summary */}
          <div style={{ position: "sticky", top: "90px" }}>
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--border-light)",
                padding: "1.5rem",
                boxShadow: "var(--shadow-md)"
              }}
            >
              <h4 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--dark)", marginBottom: "1rem" }}>
                Order Total ({cartItems.length} items)
              </h4>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.88rem", marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--success)", fontWeight: 700 }}>
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                  <span>Delivery Fee</span>
                  <span>{finalDeliveryFee === 0 ? <strong style={{ color: "var(--success)" }}>FREE</strong> : `$${finalDeliveryFee.toFixed(2)}`}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                  <span>Taxes (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1.25rem",
                    fontWeight: 900,
                    color: "var(--dark)",
                    paddingTop: "0.6rem",
                    borderTop: "1px dashed var(--border-light)",
                    marginTop: "0.25rem"
                  }}
                >
                  <span>Grand Total</span>
                  <span style={{ color: "var(--primary)" }}>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div style={{ padding: "0.75rem", borderRadius: "var(--radius-md)", background: "#F9FAFB", border: "1px solid var(--border-light)", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                <ShieldCheck size={18} color="var(--success)" style={{ flexShrink: 0 }} />
                <span>Protected by CraveBite On-Time Freshness Guarantee.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 580px) {
          .stepper-bar span { display: none; }
        }
      `}</style>
    </div>
  );
};
