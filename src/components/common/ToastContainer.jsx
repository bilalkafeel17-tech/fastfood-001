import React from "react";
import { useToast } from "../../context/ToastContext";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let iconColor = "#2A9D8F";

        if (toast.type === "error") {
          Icon = AlertCircle;
          iconColor = "#D62828";
        } else if (toast.type === "warning") {
          Icon = AlertTriangle;
          iconColor = "#F59E0B";
        } else if (toast.type === "info") {
          Icon = Info;
          iconColor = "#3B82F6";
        }

        return (
          <div key={toast.id} className={`toast-item ${toast.type}`}>
            <Icon size={20} color={iconColor} style={{ flexShrink: 0 }} />
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#9CA3AF",
                padding: "2px",
                display: "flex",
                alignItems: "center"
              }}
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
