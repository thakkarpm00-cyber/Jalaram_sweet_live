import React, { useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { products as allProducts, categories } from "../data/products";

// ─── Responsive style injection ───────────────────────────────────────────────
const mobileStyles = `
  @media (max-width: 640px) {
    .products-hero { margin-top: 70px !important; min-height: 220px !important; padding: 28px 20px !important; }
    .products-hero-content { padding: 0 !important; max-width: 100% !important; }
    .products-hero h1 { font-size: 26px !important; margin-bottom: 10px !important; }
    .products-hero p { font-size: 13px !important; }
    .products-hero-badge { font-size: 10px !important; padding: 4px 12px !important; margin-bottom: 12px !important; }
    .products-stats { display: none !important; }

    .products-filters { flex-direction: column !important; gap: 10px !important; padding: 20px 16px 0 !important; }
    .products-search { flex: 1 1 100% !important; }
    .products-cats { gap: 6px !important; overflow-x: auto !important; flex-wrap: nowrap !important; padding-bottom: 4px !important; }
    .products-cats button { flex-shrink: 0 !important; font-size: 11px !important; padding: 7px 14px !important; }

    .products-section-header { padding: 20px 16px 0 !important; }
    .products-section-header h2 { font-size: 24px !important; }

    .products-grid { padding: 0 16px 60px !important; }
    .products-grid-inner { grid-template-columns: 1fr !important; gap: 16px !important; }

    .products-cta { padding: 36px 20px !important; }
    .products-cta p:first-of-type { font-size: 18px !important; }
  }

  @media (min-width: 641px) and (max-width: 900px) {
    .products-grid-inner { grid-template-columns: repeat(2, 1fr) !important; }
    .products-filters { flex-wrap: wrap !important; }
    .products-stats { display: none !important; }
  }

  .products-cats::-webkit-scrollbar { height: 3px; }
  .products-cats::-webkit-scrollbar-thumb { background: rgba(244,160,32,0.4); border-radius: 50px; }
`;

// ─── Star Rating ──────────────────────────────────────────────────────────────
const Stars = () => (
  <div style={{ display: "flex", gap: "2px", justifyContent: "center", marginBottom: "10px" }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} style={{ color: "#f4a020", fontSize: "12px" }}>★</span>
    ))}
  </div>
);

// ─── Product Card ─────────────────────────────────────────────────────────────
const ProductCard = memo(({ product, expanded, toggleReadMore }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "24px",
        overflow: "hidden",
        background: "#fff",
        boxShadow: hovered
          ? "0 24px 60px rgba(244,160,32,0.22), 0 8px 24px rgba(61,28,2,0.10)"
          : "0 4px 24px rgba(61,28,2,0.08)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.38s cubic-bezier(0.34,1.56,0.64,1)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Image area */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(135deg,#fdf6ec,#ffecd2)",
          height: "200px",
          overflow: "hidden",
          flexShrink: 0,
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
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.45s ease",
          }}
        />
        {/* Fallback emoji placeholder */}
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
        {/* gradient overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60px",
            background: "linear-gradient(to top, #fff 0%, transparent 100%)",
          }}
        />
        {/* Fresh badge */}
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
        {/* Category badge */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "#fff",
            borderRadius: "50px",
            padding: "3px 10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            fontSize: "10px",
            fontFamily: "'Poppins',sans-serif",
            fontWeight: "600",
            color: "#7b3f00",
          }}
        >
          {product.category}
        </div>
      </div>

      {/* Card body */}
      <div
        style={{
          padding: "18px 20px 22px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Stars />

        <h3
          style={{
            fontFamily: "'Playfair Display',serif",
            fontWeight: "700",
            fontSize: "18px",
            color: "#3d1c02",
            textAlign: "center",
            marginBottom: "6px",
            lineHeight: "1.3",
          }}
        >
          {product.name}
        </h3>

        {/* Price row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "12px" }}>
          <span
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontWeight: "800",
              fontSize: "22px",
              background: "linear-gradient(135deg,#f4a020,#e04e2c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ₹{product.price.toLocaleString()}
          </span>
          <span
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: "11px",
              fontWeight: "600",
              color: "#27ae60",
              background: "rgba(39,174,96,0.10)",
              borderRadius: "50px",
              padding: "2px 8px",
            }}
          >
            per Kg
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "12.5px",
            color: "#7b5e3a",
            textAlign: "center",
            lineHeight: "1.65",
            flex: 1,
            marginBottom: "16px",
          }}
        >
          {expanded[product.id]
            ? product.description
            : `${product.description.substring(0, 90)}… `}
          <button
            onClick={() => toggleReadMore(product.id)}
            style={{
              color: "#e04e2c",
              fontWeight: "600",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              fontFamily: "'Poppins',sans-serif",
            }}
          >
            {expanded[product.id] ? "Less ↑" : "More ↓"}
          </button>
        </p>

        {/* Contact to order CTA */}
        <Link
          to="/contact"
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
            background: hovered
              ? "linear-gradient(135deg,#e04e2c,#c0392b)"
              : "linear-gradient(135deg,#f4a020,#e04e2c)",
            boxShadow: hovered
              ? "0 6px 24px rgba(192,57,43,0.45)"
              : "0 4px 20px rgba(228,78,44,0.35)",
            transition: "all 0.3s ease",
            display: "block",
            textAlign: "center",
            textDecoration: "none",
          }}
        >
          📞 Contact to Order
        </Link>
      </div>
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export const OurProducts = () => {
  const [expanded, setExpanded] = useState({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const toggleReadMore = useCallback((id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] })), []);

  const filtered = allProducts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ background: "#fffbf4", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Inject responsive styles */}
      <style>{mobileStyles}</style>

      {/* ── Hero banner ── */}
      <section
        className="products-hero"
        style={{
          position: "relative",
          marginTop: "80px",
          minHeight: "clamp(200px,28vw,320px)",
          background: "linear-gradient(135deg,#3d1c02 0%,#7b3f00 55%,#c87941 100%)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          padding: "clamp(32px,5vw,60px) clamp(24px,6vw,80px)",
        }}
      >
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "320px", height: "320px", borderRadius: "50%", border: "1px solid rgba(244,160,32,0.15)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20px", right: "20px", width: "220px", height: "220px", borderRadius: "50%", border: "1px solid rgba(244,160,32,0.12)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "25%", width: "260px", height: "260px", borderRadius: "50%", background: "radial-gradient(circle,rgba(244,160,32,0.09) 0%,transparent 70%)", pointerEvents: "none" }} />

        {/* Hero content */}
        <div className="products-hero-content" style={{ position: "relative", zIndex: 1, maxWidth: "700px", flex: 1 }}>
          <div
            className="products-hero-badge"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(244,160,32,0.15)", border: "1px solid rgba(244,160,32,0.45)", borderRadius: "50px", padding: "6px 16px", marginBottom: "18px", backdropFilter: "blur(6px)" }}
          >
            <span style={{ fontSize: "13px" }}>🍭</span>
            <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.18em", color: "#f4a020", textTransform: "uppercase" }}>Freshly Made · Every Day</span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: "900", fontSize: "clamp(26px,5vw,54px)", color: "#fff", lineHeight: "1.15", marginBottom: "14px", textShadow: "0 2px 18px rgba(0,0,0,0.25)" }}>
            Our Sweet{" "}
            <span style={{ background: "linear-gradient(135deg,#f4a020,#fda085)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Collection
            </span>
          </h1>

          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(13px,1.5vw,16px)", color: "rgba(255,255,255,0.80)", maxWidth: "440px", lineHeight: "1.75", margin: 0 }}>
            Explore our full range of handcrafted Indian sweets — made with pure milk, real ghee, and generations of tradition.
          </p>
        </div>

        {/* Stats (hidden on mobile via CSS) */}
        <div
          className="products-stats"
          style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "16px", marginLeft: "auto", flexShrink: 0 }}
        >
          {[
            { num: "50+", label: "Varieties" },
            { num: "100%", label: "Pure" },
            { num: "0", label: "Preservatives" },
          ].map(({ num, label }) => (
            <div
              key={label}
              style={{
                textAlign: "center",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "14px",
                padding: "14px 22px",
                minWidth: "110px",
              }}
            >
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: "800", fontSize: "26px", color: "#f4a020", lineHeight: 1 }}>{num}</div>
              <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: "11px", fontWeight: "600", color: "rgba(255,255,255,0.65)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "4px" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Filters ── */}
      <div
        className="products-filters"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "36px clamp(16px,4vw,40px) 0",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "14px",
        }}
      >
        {/* Search */}
        <div className="products-search" style={{ position: "relative", flex: "1 1 240px" }}>
          <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#f4a020", fontSize: "14px" }}>🔍</span>
          <input
            type="text"
            placeholder="Search sweets…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "11px 16px 11px 40px",
              borderRadius: "50px",
              border: "1.5px solid rgba(61,28,2,0.12)",
              fontFamily: "'Poppins',sans-serif",
              fontSize: "13px",
              color: "#3d1c02",
              background: "#fff",
              outline: "none",
              boxSizing: "border-box",
              boxShadow: "0 2px 10px rgba(61,28,2,0.06)",
              transition: "border-color 0.2s ease",
            }}
            onFocus={(e) => { e.target.style.borderColor = "#f4a020"; }}
            onBlur={(e) => { e.target.style.borderColor = "rgba(61,28,2,0.12)"; }}
          />
        </div>

        {/* Category tabs — scrollable on mobile */}
        <div className="products-cats" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 18px",
                borderRadius: "50px",
                border: activeCategory === cat ? "1.5px solid #f4a020" : "1.5px solid rgba(61,28,2,0.12)",
                background: activeCategory === cat ? "linear-gradient(135deg,#f4a020,#e04e2c)" : "#fff",
                color: activeCategory === cat ? "#fff" : "#3d1c02",
                fontFamily: "'Poppins',sans-serif",
                fontWeight: "600",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.22s ease",
                boxShadow: activeCategory === cat ? "0 4px 14px rgba(244,160,32,0.35)" : "none",
                whiteSpace: "nowrap",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Section header ── */}
      <div
        className="products-section-header"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "32px clamp(16px,4vw,40px) 0",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "14px" }}>
          <div style={{ height: "2px", width: "40px", background: "linear-gradient(to right,transparent,#f4a020)" }} />
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "11px", fontWeight: "700", letterSpacing: "0.22em", color: "#f4a020", textTransform: "uppercase" }}>Handcrafted with Love</span>
          <div style={{ height: "2px", width: "40px", background: "linear-gradient(to left,transparent,#f4a020)" }} />
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            fontWeight: "800",
            fontSize: "clamp(24px,4vw,44px)",
            background: "linear-gradient(135deg,#f4a020 0%,#e04e2c 55%,#c0392b 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: "1.2",
            marginBottom: "10px",
          }}
        >
          {activeCategory === "All" ? "All Our Sweets" : activeCategory + " Sweets"}
        </h2>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "14px", color: "#7b5e3a", maxWidth: "440px", margin: "0 auto 40px", lineHeight: "1.7" }}>
          {filtered.length} {filtered.length === 1 ? "sweet" : "sweets"} available · Contact us to place a bulk or custom order.
        </p>
      </div>

      {/* ── Products grid ── */}
      <div className="products-grid" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(16px,4vw,40px) 80px", position: "relative" }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: "0", right: "-60px", width: "280px", height: "280px", borderRadius: "50%", background: "radial-gradient(circle,rgba(244,160,32,0.07) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "200px", left: "-60px", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle,rgba(224,78,44,0.06) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              borderRadius: "20px",
              border: "2px dashed rgba(244,160,32,0.25)",
            }}
          >
            <p style={{ fontSize: "42px", marginBottom: "12px" }}>🍬</p>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "22px", fontWeight: "700", color: "#3d1c02", marginBottom: "8px" }}>
              No sweets found
            </p>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "14px", color: "#7b5e3a" }}>
              Try adjusting your search or category filter.
            </p>
          </div>
        ) : (
          <div
            className="products-grid-inner"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 290px), 1fr))",
              gap: "clamp(16px,3vw,28px)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {filtered.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                expanded={expanded}
                toggleReadMore={toggleReadMore}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <section
        className="products-cta"
        style={{
          background: "linear-gradient(135deg,#3d1c02 0%,#7b3f00 100%)",
          padding: "clamp(36px,5vw,60px) clamp(24px,6vw,80px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(244,160,32,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
        <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: "700", fontSize: "clamp(18px,3vw,30px)", color: "#fff", position: "relative", zIndex: 1, marginBottom: "12px" }}>
          Want a bulk or custom sweet order? 🍮
        </p>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.70)", marginBottom: "24px", position: "relative", zIndex: 1 }}>
          Contact us directly for bulk orders, event catering, and special packaging.
        </p>
        <Link
          to="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 36px",
            borderRadius: "50px",
            background: "linear-gradient(135deg,#f4a020,#e04e2c)",
            color: "#fff",
            fontFamily: "'Poppins',sans-serif",
            fontWeight: "700",
            fontSize: "15px",
            textDecoration: "none",
            boxShadow: "0 8px 28px rgba(244,160,32,0.45)",
            position: "relative",
            zIndex: 1,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(244,160,32,0.55)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(244,160,32,0.45)"; }}
        >
          📞 Get in Touch
        </Link>
      </section>
    </div>
  );
};
