import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";

/* ── Floating label input ─────────────────────────────────────── */
const FloatingInput = ({ label, type = "text", name, value, onChange, required, wrapStyle }) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div style={{ position: "relative", width: "100%", ...wrapStyle }}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        placeholder=" "
        style={{
          width: "100%",
          padding: "20px 18px 8px",
          fontFamily: "'Poppins',sans-serif",
          fontSize: "14px",
          color: "#3d1c02",
          background: focused ? "#fff" : "#fdf6ec",
          border: focused
            ? "2px solid #f4a020"
            : "2px solid rgba(61,28,2,0.10)",
          borderRadius: "14px",
          outline: "none",
          transition: "all 0.25s ease",
          boxSizing: "border-box",
          boxShadow: focused ? "0 0 0 4px rgba(244,160,32,0.12)" : "none",
        }}
      />
      <label
        style={{
          position: "absolute",
          left: "18px",
          top: active ? "7px" : "50%",
          transform: active ? "translateY(0)" : "translateY(-50%)",
          fontFamily: "'Poppins',sans-serif",
          fontSize: active ? "10px" : "13.5px",
          fontWeight: active ? "700" : "400",
          color: active ? "#f4a020" : "rgba(61,28,2,0.45)",
          letterSpacing: active ? "0.08em" : "0",
          textTransform: active ? "uppercase" : "none",
          pointerEvents: "none",
          transition: "all 0.22s ease",
        }}
      >
        {label}
      </label>
    </div>
  );
};

/* ── Floating label textarea ──────────────────────────────────── */
const FloatingTextarea = ({ label, name, value, onChange, required }) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div style={{ position: "relative" }}>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={5}
        placeholder=" "
        style={{
          width: "100%",
          padding: "24px 18px 10px",
          fontFamily: "'Poppins',sans-serif",
          fontSize: "14px",
          color: "#3d1c02",
          background: focused ? "#fff" : "#fdf6ec",
          border: focused
            ? "2px solid #f4a020"
            : "2px solid rgba(61,28,2,0.10)",
          borderRadius: "14px",
          outline: "none",
          resize: "vertical",
          transition: "all 0.25s ease",
          boxSizing: "border-box",
          boxShadow: focused ? "0 0 0 4px rgba(244,160,32,0.12)" : "none",
        }}
      />
      <label
        style={{
          position: "absolute",
          left: "18px",
          top: active ? "9px" : "18px",
          fontFamily: "'Poppins',sans-serif",
          fontSize: active ? "10px" : "13.5px",
          fontWeight: active ? "700" : "400",
          color: active ? "#f4a020" : "rgba(61,28,2,0.45)",
          letterSpacing: active ? "0.08em" : "0",
          textTransform: active ? "uppercase" : "none",
          pointerEvents: "none",
          transition: "all 0.22s ease",
        }}
      >
        {label}
      </label>
    </div>
  );
};

/* ── Info card ────────────────────────────────────────────────── */
const InfoCard = ({ icon: Icon, title, lines, href, isWhatsapp }) => {
  const [hovered, setHovered] = useState(false);

  const cardContent = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "16px",
        padding: "22px 24px",
        borderRadius: "20px",
        background: hovered
          ? "linear-gradient(135deg,rgba(244,160,32,0.08),rgba(224,78,44,0.05))"
          : "#fff",
        border: hovered
          ? "1.5px solid rgba(244,160,32,0.40)"
          : "1.5px solid rgba(61,28,2,0.08)",
        boxShadow: hovered
          ? "0 12px 36px rgba(244,160,32,0.14)"
          : "0 3px 14px rgba(61,28,2,0.06)",
        transform: hovered ? "translateX(6px)" : "translateX(0)",
        transition: "all 0.32s cubic-bezier(0.34,1.56,0.64,1)",
        cursor: href ? "pointer" : "default",
        textDecoration: "none",
      }}
    >
      <div
        style={{
          width: "46px",
          height: "46px",
          borderRadius: "50%",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: hovered
            ? "linear-gradient(135deg,#f4a020,#e04e2c)"
            : "linear-gradient(135deg,rgba(244,160,32,0.15),rgba(224,78,44,0.08))",
          boxShadow: hovered ? "0 6px 18px rgba(244,160,32,0.40)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Icon
          style={{
            fontSize: "17px",
            color: hovered ? "#fff" : "#f4a020",
            transition: "color 0.3s ease",
          }}
        />
      </div>
      <div>
        <p
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "10px",
            fontWeight: "700",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#f4a020",
            marginBottom: "4px",
          }}
        >
          {title}
        </p>
        {lines.map((line, i) => (
          <p
            key={i}
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: "14px",
              color: "#3d1c02",
              fontWeight: i === 0 ? "500" : "400",
              lineHeight: "1.55",
            }}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
      {cardContent}
    </a>
  ) : cardContent;
};

/* ══════════════════════════════════════════════════════════════
   CONTACT PAGE
══════════════════════════════════════════════════════════════ */
function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setStatus("Please fill in all required fields.");
      setStatusType("error");
      return;
    }
    setSubmitting(true);
    setStatus("");
    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert([{ name: formData.name, email: formData.email, phone: formData.phone, message: formData.message }]);

      if (error) {
        console.error("Supabase error:", error);
        setStatus("Failed to send message. Please try again.");
        setStatusType("error");
      } else {
        setStatus("Your message has been sent. We'll get back to you soon!");
        setStatusType("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("Something went wrong. Please try again later.");
      setStatusType("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: "#fffbf4", minHeight: "100vh" }}>

      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          marginTop: "96px",
          minHeight: "clamp(180px,22vw,270px)",
          background: "linear-gradient(135deg,#3d1c02 0%,#7b3f00 55%,#c87941 100%)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* decorative rings */}
        <div style={{ position: "absolute", top: "-70px", right: "-70px", width: "320px", height: "320px", borderRadius: "50%", border: "1px solid rgba(244,160,32,0.15)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "10px", right: "10px", width: "210px", height: "210px", borderRadius: "50%", border: "1px solid rgba(244,160,32,0.12)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "30%", width: "220px", height: "220px", borderRadius: "50%", background: "radial-gradient(circle,rgba(244,160,32,0.09) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div style={{ padding: "clamp(36px,5vw,56px) clamp(24px,6vw,80px)", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(244,160,32,0.15)", border: "1px solid rgba(244,160,32,0.45)", borderRadius: "50px", padding: "6px 16px", marginBottom: "16px", backdropFilter: "blur(6px)" }}>
            <span style={{ fontSize: "13px" }}>✉️</span>
            <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.18em", color: "#f4a020", textTransform: "uppercase" }}>We'd Love to Hear from You</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: "900", fontSize: "clamp(28px,5vw,52px)", color: "#fff", lineHeight: "1.15", marginBottom: "12px", textShadow: "0 2px 16px rgba(0,0,0,0.25)" }}>
            Get in{" "}
            <span style={{ background: "linear-gradient(135deg,#f4a020,#fda085)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Touch
            </span>
          </h1>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(13px,1.5vw,15px)", color: "rgba(255,255,255,0.78)", maxWidth: "420px", lineHeight: "1.7" }}>
            Have a question, a bulk order inquiry, or just want to say hello? Drop us a message and we'll respond within the day.
          </p>
        </div>
      </section>

      {/* ── Main content ────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          padding: "clamp(48px,7vw,80px) clamp(20px,4vw,40px)",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(32px,5vw,60px)",
          alignItems: "flex-start",
        }}
      >

        {/* ── LEFT – Contact form ── */}
        <div style={{ flex: "1 1 380px", minWidth: 0 }}>
          {/* Section label */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <div style={{ height: "2px", width: "32px", background: "linear-gradient(to right,transparent,#f4a020)" }} />
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "11px", fontWeight: "700", letterSpacing: "0.20em", color: "#f4a020", textTransform: "uppercase" }}>Send a Message</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: "800", fontSize: "clamp(22px,3.5vw,36px)", color: "#3d1c02", lineHeight: "1.2", marginBottom: "8px" }}>
            We Would Love<br />to Hear from You
          </h2>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "14px", color: "#7b5e3a", lineHeight: "1.7", marginBottom: "32px" }}>
            Fill in the form below and our team will get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "stretch" }}>
            {/* Name – full width */}
            <FloatingInput label="Your Name" name="name" value={formData.name} onChange={handleChange} required />

            {/* Email + Phone – side by side */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <FloatingInput label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required wrapStyle={{ flex: "1 1 200px", width: "auto" }} />
              <FloatingInput label="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleChange} required wrapStyle={{ flex: "1 1 200px", width: "auto" }} />
            </div>

            <FloatingTextarea label="Your Message" name="message" value={formData.message} onChange={handleChange} required />

            {/* Submit button */}
            <button
              type="submit"
              disabled={submitting}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                alignSelf: "flex-start",
                padding: "14px 36px",
                borderRadius: "50px",
                border: "none",
                cursor: submitting ? "default" : "pointer",
                fontFamily: "'Poppins',sans-serif",
                fontWeight: "700",
                fontSize: "14px",
                letterSpacing: "0.04em",
                color: "#fff",
                background: submitting
                  ? "rgba(61,28,2,0.25)"
                  : btnHovered
                    ? "linear-gradient(135deg,#e04e2c,#c0392b)"
                    : "linear-gradient(135deg,#f4a020,#e04e2c)",
                boxShadow: submitting ? "none" : btnHovered
                  ? "0 8px 28px rgba(192,57,43,0.45)"
                  : "0 6px 24px rgba(244,160,32,0.40)",
                transform: btnHovered && !submitting ? "translateY(-2px)" : "translateY(0)",
                transition: "all 0.3s ease",
              }}
            >
              {submitting ? (
                <>
                  <span style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", animation: "ctaSpin 0.8s linear infinite", display: "inline-block" }} />
                  Sending…
                </>
              ) : (
                <>
                  <FaPaperPlane style={{ fontSize: "13px" }} />
                  Send Message
                </>
              )}
            </button>

            {/* Status message */}
            {status && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "14px 18px",
                  borderRadius: "14px",
                  background: statusType === "success"
                    ? "rgba(39,174,96,0.08)"
                    : "rgba(192,57,43,0.08)",
                  border: statusType === "success"
                    ? "1.5px solid rgba(39,174,96,0.30)"
                    : "1.5px solid rgba(192,57,43,0.30)",
                }}
              >
                {statusType === "success" && (
                  <FaCheckCircle style={{ color: "#27ae60", fontSize: "16px", marginTop: "2px", flexShrink: 0 }} />
                )}
                <p
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: "13.5px",
                    fontWeight: "500",
                    color: statusType === "success" ? "#1e7e48" : "#c0392b",
                    lineHeight: "1.5",
                  }}
                >
                  {status}
                </p>
              </div>
            )}
          </form>
        </div>

        {/* ── RIGHT – Info + Map ── */}
        <div style={{ flex: "1 1 300px", minWidth: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Section label */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
            <div style={{ height: "2px", width: "32px", background: "linear-gradient(to right,transparent,#f4a020)" }} />
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "11px", fontWeight: "700", letterSpacing: "0.20em", color: "#f4a020", textTransform: "uppercase" }}>Our Details</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: "800", fontSize: "clamp(22px,3vw,32px)", color: "#3d1c02", lineHeight: "1.2", marginBottom: "16px" }}>
            Find Us Anytime
          </h2>

          {/* Info cards */}
          <InfoCard
            icon={FaMapMarkerAlt}
            title="Store Address"
            lines={["Near BOI, Rav Moti, Rapar,", "Kachchh, Gujarat 370165"]}
          />
          <InfoCard
            icon={FaPhoneAlt}
            title="Call Us"
            lines={["+91 98259 47527"]}
            href="tel:+919825947527"
          />
          <InfoCard
            icon={FaEnvelope}
            title="Email"
            lines={["thakkarpm00@gmail.com"]}
            href="mailto:thakkarpm00@gmail.com"
          />
          <InfoCard
            icon={FaClock}
            title="Store Hours"
            lines={["Daily 6:30 am – 3:30 pm", "Fresh sweets prepared every morning"]}
          />
          <InfoCard
            icon={FaWhatsapp}
            title="WhatsApp"
            lines={["+91 78745 86314", "Quick replies during store hours"]}
            href="https://wa.me/917874586314"
          />

          {/* Map */}
          <div
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              border: "2px solid rgba(244,160,32,0.25)",
              boxShadow: "0 8px 32px rgba(61,28,2,0.12)",
              marginTop: "8px",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAfqJHFi3ghTFSuuW5pIudu9Fq2pvoJzwc&maptype=satellite&zoom=15&q=Jalaram%20Sweet(Rav),%20Rav%20moti,%20Gujarat%20370165"
              width="100%"
              height="200"
              style={{ display: "block", border: "none" }}
              allowFullScreen
              loading="lazy"
              title="Jalaram Sweets Location"
            />
          </div>
        </div>
      </div>

      {/* ── Bottom promise strip ─────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg,#3d1c02 0%,#7b3f00 100%)",
          padding: "clamp(28px,4vw,44px) clamp(24px,6vw,80px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(244,160,32,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
        <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: "700", fontSize: "clamp(18px,3vw,28px)", color: "#fff", position: "relative", zIndex: 1, marginBottom: "8px" }}>
          🍮 Freshly prepared every morning. No waiting, just sweetness.
        </p>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.65)", position: "relative", zIndex: 1 }}>
          Visit us at Rav Moti, Kachchh or reach out — we're always glad to help.
        </p>
      </section>

      <style>{`
        @keyframes ctaSpin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default Contact;
