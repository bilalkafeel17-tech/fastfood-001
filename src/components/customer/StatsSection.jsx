import React from "react";
import { Users, Truck, HeartHandshake, Award } from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: "50,000+",
      label: "Happy Cravers",
      desc: "Delighting tastebuds across town daily",
      color: "var(--primary)"
    },
    {
      icon: Truck,
      value: "18 Mins",
      label: "Average Delivery",
      desc: "Blazing fast thermal packaging guarantee",
      color: "var(--secondary)"
    },
    {
      icon: Award,
      value: "100%",
      label: "Prime Ingredients",
      desc: "Certified grass-fed Angus & local brioche",
      color: "var(--success)"
    },
    {
      icon: HeartHandshake,
      value: "4.9 ★",
      label: "Customer Rating",
      desc: "Rated #1 fast food brand in Springfield",
      color: "#8338EC"
    }
  ];

  return (
    <section style={{ padding: "4.5rem 0", background: "var(--dark)", color: "#FFFFFF" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
            textAlign: "center"
          }}
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "1.5rem 1rem",
                  borderRadius: "var(--radius-lg)",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.06)"
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: `rgba(255, 255, 255, 0.08)`,
                    color: stat.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem"
                  }}
                >
                  <Icon size={28} />
                </div>
                <h3
                  style={{
                    fontSize: "2.25rem",
                    fontWeight: 900,
                    color: "#FFFFFF",
                    marginBottom: "0.25rem",
                    letterSpacing: "-0.5px"
                  }}
                >
                  {stat.value}
                </h3>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--secondary)", marginBottom: "0.4rem" }}>
                  {stat.label}
                </span>
                <p style={{ fontSize: "0.825rem", color: "#9CA3AF", maxWidth: "200px" }}>
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
