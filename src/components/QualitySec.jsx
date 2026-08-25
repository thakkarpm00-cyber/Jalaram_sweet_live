import React, { useState } from "react";
import { FaAward, FaShieldAlt, FaLeaf, FaGem } from "react-icons/fa";
import { PiFlaskDuotone } from "react-icons/pi";
import { FaBowlRice } from "react-icons/fa6";

const qualityItems = [
  { id: 1, icon: FaAward,       label: "HIGH QUALITY",     desc: "Best-in-class ingredients" },
  { id: 2, icon: FaShieldAlt,   label: "HYGIENIC",         desc: "Prepared in clean kitchens" },
  { id: 3, icon: PiFlaskDuotone, label: "NO PRESERVATIVES", desc: "100% natural, always fresh" },
  { id: 4, icon: FaLeaf,        label: "VEGETARIAN",       desc: "Pure veg, every sweet" },
  { id: 5, icon: FaGem,         label: "PREMIUM QUALITY",  desc: "Handpicked premium taste" },
  { id: 6, icon: FaBowlRice,    label: "TRADITIONAL",      desc: "Recipes passed down generations" },
];

const QualitySec = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(40px,7vw,80px) clamp(16px,4vw,40px)",
        background: "linear-gradient(135deg, #c0392b 0%, #e04e2c 40%, #f4a020 100%)",
      }}
    >
      {/* subtle pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.07) 0%, transparent 50%)," +
            "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 40%)",
          pointerEvents: "none",
        }}
      />

      {/* Section title */}
      <div style={{ textAlign: "center", marginBottom: "clamp(28px,5vw,48px)", position: "relative" }}>
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(11px,1.3vw,13px)",
            fontWeight: "700",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.75)",
            marginBottom: "8px",
          }}
        >
          Why choose us
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: "800",
            fontSize: "clamp(22px,4vw,40px)",
            color: "#fff",
            lineHeight: "1.2",
            textShadow: "0 2px 12px rgba(0,0,0,0.15)",
          }}
        >
          Our Promise to You
        </h2>
      </div>

      {/* Badges grid */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(12px,3vw,24px)",
          position: "relative",
        }}
      >
        {qualityItems.map((item) => {
          const IconComponent = item.icon;
          const hovered = hoveredId === item.id;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "clamp(18px,3vw,28px) 16px",
                borderRadius: "20px",
                background: hovered
                  ? "rgba(255,255,255,0.22)"
                  : "rgba(255,255,255,0.10)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: hovered
                  ? "1px solid rgba(255,255,255,0.5)"
                  : "1px solid rgba(255,255,255,0.18)",
                boxShadow: hovered
                  ? "0 12px 36px rgba(0,0,0,0.18)"
                  : "0 2px 12px rgba(0,0,0,0.08)",
                transform: hovered ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
                transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                cursor: "default",
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: "clamp(52px,6vw,68px)",
                  height: "clamp(52px,6vw,68px)",
                  borderRadius: "50%",
                  background: hovered
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                  boxShadow: hovered ? "0 4px 20px rgba(0,0,0,0.15)" : "none",
                  transition: "all 0.3s ease",
                }}
              >
                <IconComponent
                  style={{
                    fontSize: "clamp(22px,3vw,28px)",
                    color: hovered ? "#e04e2c" : "#fff",
                    transition: "color 0.3s ease",
                  }}
                />
              </div>

              {/* Label */}
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "700",
                  fontSize: "clamp(10px,1.2vw,12px)",
                  letterSpacing: "0.12em",
                  color: "#fff",
                  marginBottom: "6px",
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </p>

              {/* Description — appears on hover */}
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.78)",
                  lineHeight: "1.5",
                  maxHeight: hovered ? "40px" : "0",
                  overflow: "hidden",
                  opacity: hovered ? 1 : 0,
                  transition: "all 0.3s ease",
                }}
              >
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom tagline */}
      <p
        style={{
          textAlign: "center",
          marginTop: "clamp(28px,5vw,44px)",
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: "clamp(14px,2vw,18px)",
          color: "rgba(255,255,255,0.82)",
          position: "relative",
        }}
      >
        "Made fresh. Delivered with love. Since 1991."
      </p>
    </section>
  );
};

export default QualitySec;
