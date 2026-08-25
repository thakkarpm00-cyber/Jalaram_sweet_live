import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products";

/* ─── tiny helpers ─── */
const StarRating = () => (
  <div style={{ display: "flex", gap: "2px", justifyContent: "center", marginBottom: "10px" }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} style={{ color: "#f4a020", fontSize: "12px" }}>★</span>
    ))}
  </div>
);

const HomeProducts = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({});
  const [hoveredId, setHoveredId] = useState(null);

  // Show only first 3 featured products on home page
  const featuredProducts = products.slice(0, 3);

  const toggleReadMore = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #fffbf4 0%, #fdf6ec 100%)",
        padding: "80px 0 90px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background blobs */}
      <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(244,160,32,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "260px", height: "260px", borderRadius: "50%", background: "radial-gradient(circle, rgba(224,78,44,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(16px,4vw,40px)" }}>

        {/* ── Section Header ── */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "14px" }}>
            <div style={{ height: "2px", width: "40px", background: "linear-gradient(to right,transparent,#f4a020)" }} />
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "12px", fontWeight: "700", letterSpacing: "0.2em", color: "#f4a020", textTransform: "uppercase" }}>
              Handcrafted with Love
            </span>
            <div style={{ height: "2px", width: "40px", background: "linear-gradient(to left,transparent,#f4a020)" }} />
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontWeight: "800",
              fontSize: "clamp(28px,5vw,52px)",
              lineHeight: "1.2",
              margin: "0 0 16px",
              background: "linear-gradient(135deg,#f4a020 0%,#e04e2c 55%,#c0392b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Our Featured Sweets
          </h2>

          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(14px,1.6vw,16px)", color: "#7b5e3a", maxWidth: "480px", margin: "0 auto", lineHeight: "1.7" }}>
            A curated selection of our most beloved traditional mithai — pure, fresh &amp; irresistible.
          </p>
        </div>

        {/* ── Products Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))",
            gap: "clamp(18px,3vw,32px)",
          }}
        >
          {featuredProducts.map((product, index) => {
            const hovered = hoveredId === product.id;

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  borderRadius: "24px",
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: hovered
                    ? "0 20px 60px rgba(244,160,32,0.22), 0 8px 24px rgba(61,28,2,0.10)"
                    : "0 4px 24px rgba(61,28,2,0.09)",
                  transform: hovered ? "translateY(-8px)" : "translateY(0)",
                  transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                {/* Image wrapper */}
                <div
                  style={{
                    position: "relative",
                    background: "linear-gradient(135deg,#fdf6ec,#ffecd2)",
                    overflow: "hidden",
                    height: "210px",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      padding: "0",
                      transform: hovered ? "scale(1.08)" : "scale(1)",
                      transition: "transform 0.4s ease",
                    }}
                  />
                  {/* Fallback */}
                  <div
                    style={{
                      display: "none",
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "72px",
                    }}
                  >
                    🍬
                  </div>
                  {/* "Fresh" badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "linear-gradient(135deg,#f4a020,#e04e2c)",
                      color: "#fff",
                      fontSize: "10px",
                      fontWeight: "700",
                      fontFamily: "'Poppins',sans-serif",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: "50px",
                      boxShadow: "0 2px 8px rgba(228,78,44,0.4)",
                    }}
                  >
                    ✦ Fresh
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <StarRating />

                  <h3
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontWeight: "700",
                      fontSize: "clamp(16px,2vw,19px)",
                      color: "#3d1c02",
                      textAlign: "center",
                      marginBottom: "6px",
                      lineHeight: "1.3",
                    }}
                  >
                    {product.name}
                  </h3>

                  {/* Price */}
                  <p
                    style={{
                      fontFamily: "'Poppins',sans-serif",
                      fontWeight: "800",
                      fontSize: "22px",
                      textAlign: "center",
                      marginBottom: "12px",
                      background: "linear-gradient(135deg,#f4a020,#e04e2c)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    ₹{product.price}
                  </p>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: "12.5px",
                      color: "#7b5e3a",
                      textAlign: "center",
                      lineHeight: "1.65",
                      flex: 1,
                      marginBottom: "18px",
                    }}
                  >
                    {expanded[product.id]
                      ? product.description
                      : `${product.description.substring(0, 100)}… `}
                    <button
                      onClick={() => toggleReadMore(product.id)}
                      style={{ color: "#e04e2c", fontWeight: "600", background: "none", border: "none", cursor: "pointer", fontSize: "12px", fontFamily: "'Poppins',sans-serif" }}
                    >
                      {expanded[product.id] ? "Less" : "More"}
                    </button>
                  </p>

                  {/* CTA - Contact to Order */}
                  <button
                    onClick={() => navigate("/contact")}
                    style={{
                      width: "100%",
                      padding: "12px 0",
                      borderRadius: "50px",
                      border: "none",
                      fontFamily: "'Poppins',sans-serif",
                      fontWeight: "700",
                      fontSize: "14px",
                      letterSpacing: "0.04em",
                      cursor: "pointer",
                      color: "#fff",
                      background: "linear-gradient(135deg,#f4a020,#e04e2c)",
                      boxShadow: "0 4px 20px rgba(228,78,44,0.45)",
                      transform: "scale(1)",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.background = "linear-gradient(135deg,#e04e2c,#c0392b)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "linear-gradient(135deg,#f4a020,#e04e2c)"; }}
                  >
                    📞 Contact to Order
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── View All Button ── */}
        <div style={{ textAlign: "center", marginTop: "52px" }}>
          <button
            onClick={() => navigate("/products")}
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontWeight: "700",
              fontSize: "15px",
              letterSpacing: "0.04em",
              color: "#e04e2c",
              background: "transparent",
              border: "2px solid #e04e2c",
              borderRadius: "50px",
              padding: "13px 38px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg,#f4a020,#e04e2c)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.border = "2px solid transparent";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(228,78,44,0.4)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#e04e2c";
              e.currentTarget.style.border = "2px solid #e04e2c";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Explore All Products →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shimmerBg {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </section>
  );
};

export default HomeProducts;
