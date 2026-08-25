import React from "react";
import { Link } from "react-router-dom";
import HomeProducts from "../components/HomeProducts";
import QualitySec from "../components/qualitySec";

const Home = () => (
  <>
    {/* ── Hero Section ── */}
    <section 
      style={{ 
        position: "relative", 
        marginTop: "96px", 
        overflow: "hidden", 
        minHeight: "80vh", 
        display: "flex", 
        alignItems: "center" 
      }}
    >
      {/* Hero Image */}
      <img
        src="/images/slide1.png"
        alt="Jalaram Sweets – Authentic Indian Mithai"
        loading="eager"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
          zIndex: 1,
        }}
      />

      {/* Warm gradient overlay background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(61,28,2,0.95) 0%, rgba(123,63,0,0.7) 45%, rgba(244,160,32,0.2) 100%)",
          zIndex: 2,
        }}
      />

      {/* Content Container - Above background layers */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          padding: "0 clamp(24px, 6vw, 80px)",
        }}
      >
        <div
          style={{
            maxWidth: "640px",
          }}
        >
          {/* Pill badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(244,160,32,0.18)",
              border: "1px solid rgba(244,160,32,0.55)",
              borderRadius: "50px",
              padding: "6px 16px",
              marginBottom: "18px",
              backdropFilter: "blur(6px)",
            }}
          >
            <span style={{ fontSize: "14px" }}>✨</span>
            <span
              style={{
                fontSize: "clamp(11px, 1.4vw, 13px)",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "600",
                color: "#f4a020",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Since 1991 · Rav, Kachchh
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: "800",
              fontSize: "clamp(28px, 5.5vw, 62px)",
              color: "#fff",
              lineHeight: "1.15",
              marginBottom: "16px",
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
          >
            Taste the{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#f4a020,#e04e2c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Sweetness
            </span>
            <br />
            of Tradition
          </h1>

          {/* Sub-text */}
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(13px, 1.6vw, 17px)",
              color: "rgba(255,255,255,0.85)",
              maxWidth: "440px",
              lineHeight: "1.7",
              marginBottom: "28px",
            }}
          >
            Handcrafted Indian sweets made with pure ingredients, no
            preservatives, and decades of love.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link
              to="/products"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(13px, 1.4vw, 15px)",
                fontWeight: "600",
                color: "#fff",
                background: "linear-gradient(135deg,#f4a020,#e04e2c)",
                border: "none",
                borderRadius: "50px",
                padding: "12px 28px",
                cursor: "pointer",
                textDecoration: "none",
                boxShadow: "0 6px 24px rgba(228,78,44,0.45)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 10px 32px rgba(228,78,44,0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(228,78,44,0.45)";
              }}
            >
              Shop Now
            </Link>
            <Link
              to="/about"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(13px, 1.4vw, 15px)",
                fontWeight: "600",
                color: "#fff",
                background: "rgba(255,255,255,0.12)",
                border: "1.5px solid rgba(255,255,255,0.5)",
                borderRadius: "50px",
                padding: "12px 28px",
                cursor: "pointer",
                textDecoration: "none",
                backdropFilter: "blur(6px)",
                transition: "all 0.25s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.22)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* ── Featured Products ── */}
    <HomeProducts />

    {/* ── Quality Strip ── */}
    <QualitySec />
  </>
);

export default Home;
