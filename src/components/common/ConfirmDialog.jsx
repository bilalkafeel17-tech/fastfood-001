import React from "react";
import { Modal } from "./Modal";
import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  confirmVariant = "primary",
  loading = false
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="420px" showClose={false}>
      <div style={{ textAlign: "center", padding: "0.5rem 0" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "var(--error-light)",
            color: "var(--error)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem"
          }}
        >
          <AlertTriangle size={28} />
        </div>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          {title}
        </h3>
        <p style={{ fontSize: "0.925rem", color: "var(--text-muted)", marginBottom: "1.75rem", lineHeight: 1.5 }}>
          {message}
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            loading={loading}
            style={{ minWidth: "100px" }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
