import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ── animated counter hook ── */
const useCounter = (target, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

/* ── stat card ── */
const StatCard = ({ value, suffix, label, icon, animate }) => {
  const count = useCounter(value, 1600, animate);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textAlign: "center",
        padding: "28px 20px",
        borderRadius: "20px",
        background: hovered
          ? "linear-gradient(135deg,#f4a020,#e04e2c)"
          : "rgba(255,255,255,0.08)",
        border: hovered
          ? "1px solid transparent"
          : "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(8px)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: hovered ? "0 16px 40px rgba(244,160,32,0.35)" : "none",
        cursor: "default",
        flex: "1 1 150px",
      }}
    >
      <div style={{ fontSize: "28px", marginBottom: "8px" }}>{icon}</div>
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: "800",
          fontSize: "clamp(28px,4vw,42px)",
          color: "#fff",
          lineHeight: 1,
          marginBottom: "6px",
        }}
      >
        {animate ? count : value}
        {suffix}
      </div>
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "12px",
          fontWeight: "500",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: hovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.60)",
        }}
      >
        {label}
      </div>
    </div>
  );
};

/* ── value card ── */
const ValueCard = ({ icon, title, desc }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "32px 24px",
        boxShadow: hovered
          ? "0 20px 50px rgba(244,160,32,0.18)"
          : "0 4px 20px rgba(61,28,2,0.08)",
        border: hovered
          ? "1px solid rgba(244,160,32,0.35)"
          : "1px solid rgba(61,28,2,0.06)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        textAlign: "center",
        cursor: "default",
        flex: "1 1 200px",
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: hovered
            ? "linear-gradient(135deg,#f4a020,#e04e2c)"
            : "linear-gradient(135deg,rgba(244,160,32,0.12),rgba(224,78,44,0.08))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "26px",
          margin: "0 auto 18px",
          transition: "all 0.3s ease",
          boxShadow: hovered ? "0 6px 20px rgba(244,160,32,0.4)" : "none",
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: "700",
          fontSize: "18px",
          color: "#3d1c02",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "13.5px",
          color: "#7b5e3a",
          lineHeight: "1.65",
        }}
      >
        {desc}
      </p>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   ABOUT PAGE
══════════════════════════════════════════════════ */
function About() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  /* trigger counter animation when stats strip scrolls into view */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: "#fffbf4", overflowX: "hidden" }}>

      {/* ══ 1. HERO BANNER ══════════════════════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "clamp(320px,45vw,500px)",
          marginTop: "96px",
          background: "linear-gradient(135deg,#3d1c02 0%,#7b3f00 55%,#c87941 100%)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* decorative circles */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "380px", height: "380px", borderRadius: "50%", border: "1px solid rgba(244,160,32,0.15)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "260px", height: "260px", borderRadius: "50%", border: "1px solid rgba(244,160,32,0.20)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-100px", left: "30%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle,rgba(244,160,32,0.10) 0%,transparent 70%)", pointerEvents: "none" }} />

        {/* hero image – right side */}
        <img
          src="/images/about.png"
          alt="Jalaram Sweets – Milk Penda"
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            height: "100%",
            width: "48%",
            objectFit: "cover",
            objectPosition: "center top",
            maskImage: "linear-gradient(to left, rgba(0,0,0,0.85) 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.85) 55%, transparent 100%)",
          }}
        />

        {/* text overlay */}
        <div style={{ position: "relative", padding: "60px clamp(24px,6vw,80px)", maxWidth: "600px", zIndex: 1 }}>
          {/* pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(244,160,32,0.15)", border: "1px solid rgba(244,160,32,0.45)", borderRadius: "50px", padding: "6px 16px", marginBottom: "20px", backdropFilter: "blur(6px)" }}>
            <span style={{ fontSize: "13px" }}>🍬</span>
            <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.18em", color: "#f4a020", textTransform: "uppercase" }}>Our Story · Since 1991</span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: "900", fontSize: "clamp(30px,5vw,58px)", color: "#fff", lineHeight: "1.15", marginBottom: "18px", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
            Savor Authenticity<br />
            <span style={{ background: "linear-gradient(135deg,#f4a020,#fda085)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>in Every Bite</span>
          </h1>

          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(13px,1.6vw,16px)", color: "rgba(255,255,255,0.82)", lineHeight: "1.75", maxWidth: "440px" }}>
            Welcome to Jalaram Sweet — where tradition meets taste. For over three decades we've delighted connoisseurs with authentic Indian sweets, blending timeless recipes with loving craftsmanship.
          </p>
        </div>
      </section>

      {/* ══ 2. STATS STRIP ══════════════════════════════ */}
      <section
        ref={statsRef}
        style={{
          background: "linear-gradient(135deg,#c0392b 0%,#e04e2c 50%,#f4a020 100%)",
          padding: "clamp(28px,5vw,48px) clamp(20px,5vw,60px)",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "clamp(12px,3vw,24px)", justifyContent: "center" }}>
          <StatCard value={33} suffix="+" label="Years of Legacy" icon="🏆" animate={statsVisible} />
          <StatCard value={50} suffix="+" label="Sweet Varieties" icon="🍮" animate={statsVisible} />
          <StatCard value={1000} suffix="+" label="Happy Customers" icon="😊" animate={statsVisible} />
          <StatCard value={100} suffix="%" label="Pure Ingredients" icon="🌿" animate={statsVisible} />
        </div>
      </section>

      {/* ══ 3. STORY SECTION ════════════════════════════ */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(56px,8vw,96px) clamp(20px,5vw,60px)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px,5vw,64px)", alignItems: "center" }}>

          {/* Image stack */}
          <div style={{ flex: "1 1 320px", position: "relative", minHeight: "360px" }}>
            <img
              src="/images/kajukatri.png"
              alt="Fresh Indian sweets"
              style={{
                width: "100%",
                maxWidth: "460px",
                borderRadius: "24px",
                boxShadow: "0 20px 60px rgba(61,28,2,0.18)",
                display: "block",
                objectFit: "cover",
                aspectRatio: "4/3",
              }}
            />
            {/* floating badge */}
            <div style={{ position: "absolute", bottom: "-20px", right: "-12px", background: "linear-gradient(135deg,#f4a020,#e04e2c)", borderRadius: "16px", padding: "16px 22px", boxShadow: "0 8px 28px rgba(244,160,32,0.45)", minWidth: "140px", textAlign: "center", border: "3px solid #fff" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: "900", fontSize: "32px", color: "#fff", lineHeight: 1 }}>1991</div>
              <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: "11px", fontWeight: "600", color: "rgba(255,255,255,0.88)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "4px" }}>Est. Year</div>
            </div>
          </div>

          {/* Text */}
          <div style={{ flex: "1 1 320px" }}>
            {/* section label */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ height: "2px", width: "36px", background: "linear-gradient(to right,transparent,#f4a020)" }} />
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "11px", fontWeight: "700", letterSpacing: "0.2em", color: "#f4a020", textTransform: "uppercase" }}>Who We Are</span>
            </div>

            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: "800", fontSize: "clamp(26px,4vw,44px)", color: "#3d1c02", lineHeight: "1.2", marginBottom: "20px" }}>
              A Legacy of Sweetness,<br />Passed Down Through Generations
            </h2>

            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "15px", color: "#7b5e3a", lineHeight: "1.8", marginBottom: "18px" }}>
              Jalaram Sweet was founded in 1991 in the heart of Rav Moti, Kachchh — a small town with an immense love for traditional Indian mithai. What started as a single shop with a handful of recipes has grown into a cherished local institution.
            </p>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "15px", color: "#7b5e3a", lineHeight: "1.8", marginBottom: "28px" }}>
              Every sweet is handcrafted using pure milk, natural sugar, and time-honoured techniques. We use no artificial preservatives — just honest ingredients, clean kitchens, and decades of experience. Our commitment to authenticity is what brings generations of families back to us, again and again.
            </p>

            {/* highlight pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {["No Preservatives", "100% Vegetarian", "Fresh Daily", "Pure Milk Used", "Traditional Recipes"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#e04e2c",
                    background: "rgba(224,78,44,0.08)",
                    border: "1px solid rgba(224,78,44,0.25)",
                    borderRadius: "50px",
                    padding: "5px 14px",
                    letterSpacing: "0.03em",
                  }}
                >
                  ✦ {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. OUR VALUES ════════════════════════════════ */}
      <section
        style={{
          background: "linear-gradient(180deg,#fdf6ec 0%,#ffecd2 100%)",
          padding: "clamp(48px,7vw,80px) clamp(20px,5vw,60px)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* heading */}
          <div style={{ textAlign: "center", marginBottom: "clamp(36px,5vw,56px)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ height: "2px", width: "36px", background: "linear-gradient(to right,transparent,#f4a020)" }} />
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "11px", fontWeight: "700", letterSpacing: "0.2em", color: "#f4a020", textTransform: "uppercase" }}>What Drives Us</span>
              <div style={{ height: "2px", width: "36px", background: "linear-gradient(to left,transparent,#f4a020)" }} />
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: "800", fontSize: "clamp(26px,4vw,42px)", color: "#3d1c02", lineHeight: "1.2" }}>
              Our Core Values
            </h2>
          </div>

          {/* cards */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(16px,3vw,28px)" }}>
            <ValueCard icon="🌿" title="Pure Ingredients" desc="We source only the finest natural ingredients — pure milk, real ghee, and hand-picked dry fruits — with zero artificial additives." />
            <ValueCard icon="👨‍🍳" title="Crafted by Hand" desc="Every sweet is lovingly shaped by skilled artisans who have mastered their craft over years of dedicated practice." />
            <ValueCard icon="🕰️" title="Timeless Recipes" desc="Our recipes have been refined over 33 years, striking the perfect balance between tradition and the modern palate." />
            <ValueCard icon="🤝" title="Community First" desc="Rooted in Rav, Kachchh — we are proud to serve our community and bring smiles to every household we touch." />
          </div>
        </div>
      </section>

      {/* ══ 5. SIGNATURE PRODUCT HIGHLIGHT ════════════ */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(56px,8vw,88px) clamp(20px,5vw,60px)" }}>
        <div
          style={{
            borderRadius: "28px",
            overflow: "hidden",
            background: "linear-gradient(135deg,#3d1c02 0%,#7b3f00 100%)",
            display: "flex",
            flexWrap: "wrap",
            position: "relative",
          }}
        >
          {/* decorative glow */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(244,160,32,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />

          {/* image */}
          <div style={{ flex: "1 1 280px", minHeight: "280px", position: "relative" }}>
            <img
              src="/images/whitep.png"
              alt="Milk Penda – Signature Sweet"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", minHeight: "280px" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,transparent 60%,#3d1c02 100%)" }} />
          </div>

          {/* text */}
          <div style={{ flex: "1 1 300px", padding: "clamp(32px,5vw,52px)", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 1 }}>
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "11px", fontWeight: "700", letterSpacing: "0.2em", color: "#f4a020", textTransform: "uppercase", marginBottom: "14px", display: "block" }}>★ Signature Creation</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: "800", fontSize: "clamp(24px,3.5vw,38px)", color: "#fff", lineHeight: "1.2", marginBottom: "16px" }}>
              Our Legendary<br />Milk Penda
            </h2>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.78)", lineHeight: "1.8", marginBottom: "28px" }}>
              The crown jewel of Jalaram Sweet. Made from slow-reduced whole milk, hand-shaped with a touch of cardamom and saffron, every Milk Penda melts softly on your tongue — a timeless celebration of purity and perfection.
            </p>
            <Link
              to="/products"
              style={{
                display: "inline-block",
                fontFamily: "'Poppins',sans-serif",
                fontWeight: "700",
                fontSize: "14px",
                color: "#3d1c02",
                background: "linear-gradient(135deg,#f4a020,#fda085)",
                borderRadius: "50px",
                padding: "13px 32px",
                textDecoration: "none",
                boxShadow: "0 6px 24px rgba(244,160,32,0.45)",
                alignSelf: "flex-start",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(244,160,32,0.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(244,160,32,0.45)"; }}
            >
              Shop Our Sweets →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
