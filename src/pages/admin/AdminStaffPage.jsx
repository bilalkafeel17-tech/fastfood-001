import React, { useState, useEffect } from "react";
import { staffService } from "../../services/staffService";
import { useToast } from "../../context/ToastContext";
import { Modal } from "../../components/common/Modal";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";
import { UserCheck, Plus, Edit, Trash2, ShieldCheck, Mail, Phone } from "lucide-react";

export const AdminStaffPage = () => {
  const [staff, setStaff] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const { showSuccess } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Kitchen Staff",
    status: "Active"
  });

  const loadStaff = async () => {
    const list = await staffService.getAll();
    setStaff(list);
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const handleOpenAdd = () => {
    setEditingStaff(null);
    setFormData({ name: "", email: "", phone: "", role: "Kitchen Staff", status: "Active" });
    setModalOpen(true);
  };

  const handleOpenEdit = (s) => {
    setEditingStaff(s);
    setFormData({ ...s });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    if (editingStaff) {
      await staffService.update(editingStaff.id, formData);
      showSuccess("Staff member updated!");
    } else {
      await staffService.create(formData);
      showSuccess("New staff member onboarded!");
    }
    setModalOpen(false);
    loadStaff();
  };

  const handleConfirmDelete = async () => {
    if (deletingId) {
      await staffService.delete(deletingId);
      setDeletingId(null);
      showSuccess("Staff record deleted.");
      loadStaff();
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--dark)" }}>
            Staff & Role Permissions 👨‍🍳
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "2px" }}>
            Manage master chefs, kitchen grill staff, dispatch riders, and admin access roles.
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-primary" style={{ borderRadius: "var(--radius-full)" }}>
          <Plus size={18} /> Add New Staff
        </button>
      </div>

      <div style={{ background: "#FFFFFF", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
        <div className="table-responsive">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Staff Member</th>
                <th>Role</th>
                <th>Contact Email</th>
                <th>Phone</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <img src={s.avatar} alt={s.name} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
                      <strong>{s.name}</strong>
                    </div>
                  </td>
                  <td>
                    <span style={{ background: s.role === "Super Admin" ? "var(--primary-light)" : "#F3F4F6", color: s.role === "Super Admin" ? "var(--primary)" : "var(--dark)", fontWeight: 700, fontSize: "0.78rem", padding: "3px 8px", borderRadius: "var(--radius-full)" }}>
                      {s.role}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.85rem" }}>{s.email}</td>
                  <td style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{s.phone}</td>
                  <td style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{s.joinDate}</td>
                  <td>
                    <span style={{ padding: "2px 8px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 700, background: s.status === "Active" ? "var(--success-light)" : "var(--error-light)", color: s.status === "Active" ? "var(--success)" : "var(--error)" }}>
                      {s.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button onClick={() => handleOpenEdit(s)} className="btn btn-icon" style={{ width: "32px", height: "32px" }}>
                        <Edit size={14} />
                      </button>
                      <button onClick={() => setDeletingId(s.id)} className="btn btn-icon" style={{ width: "32px", height: "32px", color: "var(--error)" }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingStaff ? "Edit Staff" : "Add Staff Member"}>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-input"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Assigned Role</label>
            <select
              className="form-select"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Kitchen Staff">Kitchen Staff / Grill Master</option>
              <option value="Delivery Staff">Delivery Courier</option>
              <option value="Support Staff">Customer Support</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem", borderRadius: "var(--radius-full)", fontWeight: 700 }}>
            Save Staff Member
          </button>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Staff Member?"
        message="This user will lose access to the operations portal."
      />
    </div>
  );
};
