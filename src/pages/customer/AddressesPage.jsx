import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { MapPin, Plus, Trash2, Check, Home, Briefcase, Building } from "lucide-react";
import { Modal } from "../../components/common/Modal";

export const AddressesPage = () => {
  const { user } = useAuth();
  const { showSuccess } = useToast();

  const [addresses, setAddresses] = useState([
    {
      id: "addr-1",
      label: "Home",
      street: "742 Evergreen Terrace",
      apartment: "Apt 4B",
      city: "Springfield",
      postalCode: "97477",
      phone: "+1 (555) 912-3456",
      isDefault: true
    },
    {
      id: "addr-2",
      label: "Work Office",
      street: "500 Tech Blvd",
      apartment: "Floor 8, Suite 810",
      city: "Springfield",
      postalCode: "97478",
      phone: "+1 (555) 912-3456",
      isDefault: false
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newAddr, setNewAddr] = useState({
    label: "Home",
    street: "",
    apartment: "",
    city: "Springfield",
    postalCode: "",
    phone: user?.phone || "+1 (555) 912-3456"
  });

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.postalCode) return;

    const created = {
      ...newAddr,
      id: "addr-" + Date.now(),
      isDefault: addresses.length === 0
    };

    setAddresses([...addresses, created]);
    setModalOpen(false);
    setNewAddr({ label: "Home", street: "", apartment: "", city: "Springfield", postalCode: "", phone: "" });
    showSuccess("New delivery address saved!");
  };

  const handleSetDefault = (id) => {
    setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
    showSuccess("Default address updated.");
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter((a) => a.id !== id));
    showSuccess("Address removed.");
  };

  return (
    <div style={{ padding: "2.5rem 0 5rem" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--dark)" }}>
              Saved Addresses 📍
            </h1>
            <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "4px" }}>
              Manage your delivery drop-off locations for rapid 1-click checkout.
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-primary"
            style={{ borderRadius: "var(--radius-full)" }}
          >
            <Plus size={18} /> Add New Address
          </button>
        </div>

        {/* Addresses Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {addresses.map((addr) => (
            <div
              key={addr.id}
              style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-xl)",
                border: addr.isDefault ? "2px solid var(--primary)" : "1px solid var(--border-light)",
                padding: "1.5rem 1.75rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "var(--shadow-sm)",
                flexWrap: "wrap",
                gap: "1rem"
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: addr.isDefault ? "var(--primary-light)" : "#F3F4F6",
                    color: addr.isDefault ? "var(--primary)" : "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  {addr.label === "Home" ? <Home size={22} /> : addr.label === "Work Office" ? <Briefcase size={22} /> : <Building size={22} />}
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "4px" }}>
                    <strong style={{ fontSize: "1.05rem", color: "var(--dark)" }}>{addr.label}</strong>
                    {addr.isDefault && (
                      <span style={{ background: "var(--primary-light)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "var(--radius-full)" }}>
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.92rem", color: "var(--text-main)", fontWeight: 500 }}>
                    {addr.street} {addr.apartment && `, ${addr.apartment}`}
                  </div>
                  <div style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginTop: "2px" }}>
                    {addr.city}, {addr.postalCode} • {addr.phone}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                {!addr.isDefault && (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="btn btn-outline btn-sm"
                    style={{ borderRadius: "var(--radius-full)" }}
                  >
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => handleDelete(addr.id)}
                  style={{ background: "transparent", border: "none", color: "var(--error)", cursor: "pointer", padding: "6px" }}
                  title="Delete address"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Address Modal */}
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Delivery Address">
          <form onSubmit={handleAddAddress}>
            <div className="form-group">
              <label className="form-label">Address Tag / Label</label>
              <select
                className="form-select"
                value={newAddr.label}
                onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })}
              >
                <option value="Home">Home</option>
                <option value="Work Office">Work Office</option>
                <option value="College / Dorm">College / Dorm</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Street Address</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 742 Evergreen Terrace"
                value={newAddr.street}
                onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Apartment / Suite / Unit</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Apt 4B"
                value={newAddr.apartment}
                onChange={(e) => setNewAddr({ ...newAddr, apartment: e.target.value })}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-input"
                  value={newAddr.city}
                  onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Postal / ZIP Code</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 97477"
                  value={newAddr.postalCode}
                  onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem", borderRadius: "var(--radius-full)", fontWeight: 700 }}>
              Save Address
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};
