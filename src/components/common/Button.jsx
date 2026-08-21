import React from "react";
import { Loader2 } from "lucide-react";

export const Button = ({
  children,
  variant = "primary", // primary, secondary, dark, outline, ghost
  size = "md", // sm, md, lg
  loading = false,
  disabled = false,
  icon: Icon,
  className = "",
  type = "button",
  onClick,
  style = {},
  ...props
}) => {
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";
  const variantClass = `btn-${variant}`;

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      style={{
        opacity: disabled ? 0.6 : 1,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        ...style
      }}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 size={18} className="spin-animation" style={{ animation: "spin 1s linear infinite" }} />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon size={18} />}
          {children}
        </>
      )}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
};
