import React from "react";
import { Link } from "react-router-dom";

export const EmptyState = ({
  icon: Icon,
  emoji,
  title,
  description,
  actionText,
  actionLink,
  onActionClick
}) => {
  return (
    <div
      style={{
        padding: "3.5rem 1.5rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "480px",
        margin: "0 auto"
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "var(--primary-light)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2.5rem",
          marginBottom: "1.25rem",
          color: "var(--primary)"
        }}
      >
        {emoji ? emoji : Icon ? <Icon size={38} /> : "🍽️"}
      </div>
      <h3 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "0.5rem" }}>
        {title}
      </h3>
      <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginBottom: "1.5rem", lineHeight: 1.5 }}>
        {description}
      </p>
      {actionText && (
        actionLink ? (
          <Link to={actionLink} className="btn btn-primary">
            {actionText}
          </Link>
        ) : (
          <button onClick={onActionClick} className="btn btn-primary">
            {actionText}
          </button>
        )
      )}
    </div>
  );
};
