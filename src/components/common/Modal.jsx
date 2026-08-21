import React, { useEffect } from "react";
import { X } from "lucide-react";

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "560px",
  showClose = true
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {(title || showClose) && (
          <div
            style={{
              padding: "1.25rem 1.5rem",
              borderBottom: "1px solid var(--border-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "sticky",
              top: 0,
              background: "#FFFFFF",
              zIndex: 10
            }}
          >
            <div>
              {title && <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>{title}</h3>}
              {subtitle && <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "2px" }}>{subtitle}</p>}
            </div>
            {showClose && (
              <button
                onClick={onClose}
                className="btn-icon"
                style={{ width: "36px", height: "36px", border: "none", background: "#F3F4F6" }}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}
        <div style={{ padding: "1.5rem" }}>{children}</div>
      </div>
    </div>
  );
};
