import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

/* ── small reusable FooterLink ── */
const FooterLink = ({ to, children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <li>
      <NavLink
        to={to}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "14px",
          fontWeight: "400",
          color: hovered ? "#f4a020" : "rgba(255,255,255,0.70)",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          transition: "all 0.25s ease",
          paddingLeft: hovered ? "6px" : "0",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: hovered ? "#f4a020" : "rgba(244,160,32,0.45)",
            flexShrink: 0,
            transition: "background 0.25s ease",
          }}
        />
        {children}
      </NavLink>
    </li>
  );
};

/* ── column heading ── */
const ColHeading = ({ children }) => (
  <h3
    style={{
      fontFamily: "'Playfair Display', serif",
      fontWeight: "700",
      fontSize: "18px",
      color: "#fff",
      marginBottom: "20px",
      position: "relative",
      paddingBottom: "12px",
    }}
  >
    {children}
    {/* underline accent */}
    <span
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "32px",
        height: "2px",
        background: "linear-gradient(90deg,#f4a020,#e04e2c)",
        borderRadius: "1px",
      }}
    />
  </h3>
);

const Footer = () => {
  const [emailHover, setEmailHover] = useState(false);
  const [phoneHover, setPhoneHover] = useState(false);

  return (
    <footer
      style={{
        background: "linear-gradient(160deg, #2c1108 0%, #3d1c02 55%, #4a2204 100%)",
        color: "rgba(255,255,255,0.75)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── decorative blobs ── */}
      <div style={{ position: "absolute", top: "-80px", right: "-60px", width: "280px", height: "280px", borderRadius: "50%", background: "radial-gradient(circle, rgba(244,160,32,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "60px", left: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(224,78,44,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* ── top wave separator ── */}
      <div style={{ lineHeight: 0, position: "relative" }}>
        <svg
          viewBox="0 0 1440 54"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "100%", height: "54px" }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,32 C360,56 1080,4 1440,32 L1440,0 L0,0 Z"
            fill="#fdf6ec"
          />
        </svg>
      </div>

      {/* ── main content ── */}
      <div className="footer-grid">
        {/* ── Col 1: Brand ── */}
        <div>
          {/* logo + tagline */}
          <div style={{ marginBottom: "24px" }}>
            <img
              src="/images/logo3.png"
              alt="Jalaram Sweets"
              style={{
                height: "80px",
                width: "auto",
                marginBottom: "16px",
                filter: "brightness(0) invert(1) sepia(1) saturate(4) hue-rotate(5deg)",
                opacity: 0.92,
                display: "block",
              }}
            />
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "13px",
                color: "rgba(255,255,255,0.60)",
                lineHeight: "1.7",
                maxWidth: "260px",
              }}
            >
              Authentic Indian mithai handcrafted with love and pure ingredients — since 1991.
            </p>
          </div>

          {/* Social Icons */}
          <div style={{ marginTop: "20px" }}>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "14px" }}>Follow Us</p>
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                { Icon: FaFacebookF, label: "Facebook", href: "#" },
                { Icon: FaInstagram, label: "Instagram", href: "#" },
                { Icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/917874586314" },
              ].map(({ Icon, label, href }) => (
                <SocialBtn key={label} Icon={Icon} label={label} href={href} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Col 2: Quick Links ── */}
        <div>
          <ColHeading>Quick Links</ColHeading>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "11px" }}>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/about">Our Story</FooterLink>
            <FooterLink to="/products">Our Products</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
          </ul>
        </div>

        {/* ── Col 3: Contact Us ── */}
        <div>
          <ColHeading>Contact Us</ColHeading>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { icon: FaPhoneAlt, text: "+91 98259 47527", hover: phoneHover, setHover: setPhoneHover },
              { icon: FaEnvelope, text: "thakkarpm00@gmail.com", hover: emailHover, setHover: setEmailHover },
            ].map(({ icon: Icon, text, hover, setHover }) => (
              <li
                key={text}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "13px",
                  color: hover ? "#f4a020" : "rgba(255,255,255,0.70)",
                  cursor: "default",
                  transition: "color 0.25s ease",
                }}
              >
                <span
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background: hover ? "rgba(244,160,32,0.25)" : "rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.25s ease",
                  }}
                >
                  <Icon style={{ fontSize: "12px", color: hover ? "#f4a020" : "rgba(255,255,255,0.55)" }} />
                </span>
                <span style={{ wordBreak: "break-all" }}>{text}</span>
              </li>
            ))}
            <li
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "13px",
                color: "rgba(255,255,255,0.70)",
              }}
            >
              <span style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                <FaMapMarkerAlt style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }} />
              </span>
              Near BOI, Rav Moti, Rapar, Kachchh, Gujarat 370165
            </li>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "13px",
                color: "rgba(255,255,255,0.70)",
              }}
            >
              <span style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FaClock style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }} />
              </span>
              Daily 6:30 am – 3:30 pm
            </li>
          </ul>
        </div>

        {/* ── Col 4: Store Info ── */}
        <div>
          <ColHeading>Store Info</ColHeading>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
            <li style={{ fontFamily: "'Poppins',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.70)" }}>🌿 100% Pure Ingredients</li>
            <li style={{ fontFamily: "'Poppins',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.70)" }}>🚫 No Preservatives</li>
            <li style={{ fontFamily: "'Poppins',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.70)" }}>📦 Bulk Orders Welcome</li>
            <li style={{ fontFamily: "'Poppins',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.70)" }}>🏪 100% Vegetarian</li>
          </ul>
        </div>

      </div>

      {/* ── Divider ── */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(20px,4vw,48px)",
        }}
      >
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(244,160,32,0.35), transparent)" }} />
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "12.5px",
            color: "rgba(255,255,255,0.40)",
          }}
        >
          © {new Date().getFullYear()} Jalaram Sweet, Rav. All rights reserved.
        </p>

        <NavLink
          to="/admin/contacts"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "11px",
            color: "rgba(255,255,255,0.25)",
            textDecoration: "none",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
        >
          Admin Portal
        </NavLink>

      </div>
    </footer>
  );
};

/* ── Social icon button ── */
const SocialBtn = ({ Icon, label, href }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: hovered
          ? "linear-gradient(135deg,#f4a020,#e04e2c)"
          : "rgba(255,255,255,0.08)",
        border: hovered ? "1px solid transparent" : "1px solid rgba(255,255,255,0.15)",
        color: hovered ? "#fff" : "rgba(255,255,255,0.65)",
        fontSize: "14px",
        textDecoration: "none",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 6px 18px rgba(244,160,32,0.4)" : "none",
      }}
    >
      <Icon />
    </a>
  );
};

export default Footer;
