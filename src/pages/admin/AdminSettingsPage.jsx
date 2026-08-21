import React, { useState } from "react";
import { useToast } from "../../context/ToastContext";
import { Settings, Store, Clock, DollarSign, ShieldCheck, Save, Bell, Lock } from "lucide-react";

export const AdminSettingsPage = () => {
  const { showSuccess } = useToast();

  const [settings, setSettings] = useState({
    restaurantName: "CraveBite Springfield Flagship",
    email: "support@cravebite.com",
    phone: "+1 (800) 555-CRAVE",
    address: "450 Gourmet Blvd, Downtown Food District, Springfield, NY 10001",
    openingHours: "10:00 AM – 2:00 AM Daily",
    deliveryFee: 3.99,
    freeDeliveryThreshold: 35.00,
    taxRate: 8,
    acceptCard: true,
    acceptCash: true,
    acceptWallet: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    showSuccess("Restaurant configuration and operational settings updated!");
  };

  return (
    <div style={{ maxWidth: "860px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--dark)" }}>
          Store Operations & System Settings ⚙️
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "2px" }}>
          Configure restaurant contact info, delivery pricing, taxes, payment gateways, and security.
        </p>
      </div>

      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* Restaurant Profile */}
        <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", padding: "2rem", boxShadow: "var(--shadow-sm)" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--dark)", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Store size={20} color="var(--primary)" /> Storefront Details
          </h3>

          <div className="form-group">
            <label className="form-label">Restaurant Display Name</label>
            <input
              type="text"
              className="form-input"
              value={settings.restaurantName}
              onChange={(e) => setSettings({ ...settings, restaurantName: e.target.value })}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Customer Support Email</label>
              <input
                type="email"
                className="form-input"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Direct Order Hotline</label>
              <input
                type="text"
                className="form-input"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Physical Kitchen & Dispatch Address</label>
            <input
              type="text"
              className="form-input"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Daily Operating Schedule</label>
            <input
              type="text"
              className="form-input"
              value={settings.openingHours}
              onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
            />
          </div>
        </div>

        {/* Pricing & Delivery Calculations */}
        <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", padding: "2rem", boxShadow: "var(--shadow-sm)" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--dark)", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <DollarSign size={20} color="var(--success)" /> Delivery Fees & Tax Rates
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Standard Delivery Fee ($)</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={settings.deliveryFee}
                onChange={(e) => setSettings({ ...settings, deliveryFee: Number(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Free Delivery Threshold ($)</label>
              <input
                type="number"
                step="1.00"
                className="form-input"
                value={settings.freeDeliveryThreshold}
                onChange={(e) => setSettings({ ...settings, freeDeliveryThreshold: Number(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">State Tax Rate (%)</label>
              <input
                type="number"
                step="0.1"
                className="form-input"
                value={settings.taxRate}
                onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>

        {/* Payment Gateways Enabled */}
        <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", padding: "2rem", boxShadow: "var(--shadow-sm)" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--dark)", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShieldCheck size={20} color="var(--primary)" /> Accepted Payment Methods
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={settings.acceptCard}
                onChange={(e) => setSettings({ ...settings, acceptCard: e.target.checked })}
              />
              <span>Enable Visa, Mastercard, American Express credit cards</span>
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={settings.acceptCash}
                onChange={(e) => setSettings({ ...settings, acceptCash: e.target.checked })}
              />
              <span>Enable Cash on Delivery (COD) driver collection</span>
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={settings.acceptWallet}
                onChange={(e) => setSettings({ ...settings, acceptWallet: e.target.checked })}
              />
              <span>Enable Apple Pay & Google Wallet 1-touch checkout</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg"
          style={{ width: "100%", borderRadius: "var(--radius-full)", fontWeight: 800 }}
        >
          <Save size={18} /> Save Operations Settings
        </button>
      </form>
    </div>
  );
};
