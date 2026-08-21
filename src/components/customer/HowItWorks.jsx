import React from "react";
import { Utensils, Sliders, Truck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      icon: Utensils,
      title: "Pick Your Craving",
      desc: "Browse our mouthwatering menu of flame-grilled smash burgers, loaded fries, stone-baked pizzas, and thick milkshakes."
    },
    {
      num: "02",
      icon: Sliders,
      title: "Customize To Perfection",
      desc: "Double your patties, add extra melted cheddar, swap truffle sauce, and add crunchy toppings exactly the way you love it."
    },
    {
      num: "03",
      icon: Truck,
      title: "Sizzling Fast Delivery",
      desc: "Track your food live as our thermal delivery fleet brings your order straight to your doorstep piping hot in 20 minutes."
    }
  ];

  return (
    <section style={{ padding: "4.5rem 0", background: "#FFFFFF", borderBottom: "1px solid var(--border-light)" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 3.5rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary)", letterSpacing: "1px", textTransform: "uppercase" }}>
            Effortless Dining
          </span>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "var(--dark)", marginTop: "4px" }}>
            How CraveBite Works
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            From your screen to your plate in three quick and simple steps.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            position: "relative"
          }}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="card"
                style={{
                  padding: "2rem 1.5rem",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center"
                }}
              >
                {/* Step Number Watermark */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "16px",
                    fontSize: "2.5rem",
                    fontWeight: 900,
                    color: "rgba(0, 0, 0, 0.05)",
                    fontFamily: "var(--font-heading)"
                  }}
                >
                  {step.num}
                </div>

                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "var(--primary-light)",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem"
                  }}
                >
                  <Icon size={30} />
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--dark)", marginBottom: "0.6rem" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.55 }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link to="/menu" className="btn btn-primary btn-lg">
            Start Your Order Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};
