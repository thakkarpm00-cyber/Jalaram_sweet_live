import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser, FaEnvelope, FaPhone, FaLock, FaMapMarkerAlt,
  FaCity, FaMailBulk, FaVenusMars, FaCheckCircle,
} from "react-icons/fa";

/* ── Floating label input ─────────────────────────────────────── */
const FInput = ({ icon: Icon, label, type = "text", name, value, onChange, required }) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div style={{ position: "relative", flex: "1 1 180px" }}>
      <div style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: focused ? "#f4a020" : "rgba(61,28,2,0.30)", transition: "color 0.25s", fontSize: "13px", zIndex: 1, pointerEvents: "none" }}>
        <Icon />
      </div>
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
          padding: "20px 14px 6px 38px",
          fontFamily: "'Poppins',sans-serif",
          fontSize: "13.5px",
          color: "#3d1c02",
          background: focused ? "#fff" : "#fdf6ec",
          border: focused ? "2px solid #f4a020" : "2px solid rgba(61,28,2,0.09)",
          borderRadius: "14px",
          outline: "none",
          transition: "all 0.25s ease",
          boxSizing: "border-box",
          boxShadow: focused ? "0 0 0 4px rgba(244,160,32,0.09)" : "none",
        }}
      />
      <label
        style={{
          position: "absolute",
          left: "38px",
          top: active ? "7px" : "50%",
          transform: active ? "none" : "translateY(-50%)",
          fontFamily: "'Poppins',sans-serif",
          fontSize: active ? "9.5px" : "13px",
          fontWeight: active ? "700" : "400",
          color: active ? "#f4a020" : "rgba(61,28,2,0.38)",
          letterSpacing: active ? "0.09em" : "0",
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

/* ── Floating label select ────────────────────────────────────── */
const FSelect = ({ icon: Icon, label, name, value, onChange, options, required }) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div style={{ position: "relative", flex: "1 1 180px" }}>
      <div style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: focused ? "#f4a020" : "rgba(61,28,2,0.30)", transition: "color 0.25s", fontSize: "13px", zIndex: 1, pointerEvents: "none" }}>
        <Icon />
      </div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        style={{
          width: "100%",
          padding: "20px 14px 6px 38px",
          fontFamily: "'Poppins',sans-serif",
          fontSize: "13.5px",
          color: value ? "#3d1c02" : "transparent",
          background: focused ? "#fff" : "#fdf6ec",
          border: focused ? "2px solid #f4a020" : "2px solid rgba(61,28,2,0.09)",
          borderRadius: "14px",
          outline: "none",
          transition: "all 0.25s ease",
          boxSizing: "border-box",
          boxShadow: focused ? "0 0 0 4px rgba(244,160,32,0.09)" : "none",
          appearance: "none",
          cursor: "pointer",
        }}
      >
        <option value="" disabled />
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <label
        style={{
          position: "absolute",
          left: "38px",
          top: active ? "7px" : "50%",
          transform: active ? "none" : "translateY(-50%)",
          fontFamily: "'Poppins',sans-serif",
          fontSize: active ? "9.5px" : "13px",
          fontWeight: active ? "700" : "400",
          color: active ? "#f4a020" : "rgba(61,28,2,0.38)",
          letterSpacing: active ? "0.09em" : "0",
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

/* ── Section divider ──────────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "8px 0 16px" }}>
    <div style={{ height: "1.5px", width: "24px", background: "linear-gradient(to right,transparent,#f4a020)" }} />
    <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "10px", fontWeight: "700", letterSpacing: "0.20em", color: "#f4a020", textTransform: "uppercase" }}>{children}</span>
    <div style={{ flex: 1, height: "1.5px", background: "linear-gradient(to right,rgba(244,160,32,0.3),transparent)" }} />
  </div>
);

/* ══════════════════════════════════════════════════════════════ */
export const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [btnH, setBtnH] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    gender: "", street: "", city: "", pincode: "",
    password: "", confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5546/api/user/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        gender: formData.gender,
        street: formData.street,
        city: formData.city,
        pincode: formData.pincode,
        password: formData.password,
      });

      if (response.data.status) {
        toast.success("🎉 Registration successful!");
        try {
          await axios.post("http://localhost:5546/api/user/send-mail", {
            to: formData.email,
            subject: "Welcome to Jalaram Sweets!",
            html: `<p>Hi ${formData.firstName || ""},</p>
                   <p>Thank you for registering with Jalaram Sweets. We're excited to have you!</p>
                   <p>Best regards,<br/>Jalaram Sweets Team</p>`,
          });
          toast.success("✅ Welcome email sent.");
        } catch {
          toast.warning("Registration successful, but failed to send welcome email.");
        }
        setFormData({ firstName: "", lastName: "", phone: "", email: "", gender: "", street: "", city: "", pincode: "", password: "", confirmPassword: "" });
        setTimeout(() => navigate("/myaccount"), 1500);
      } else {
        toast.warning(response.data.message || "Registration failed!");
      }
    } catch {
      toast.error("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "'Poppins',sans-serif",
        paddingTop: "72px",
        background: "#fffbf4",
      }}
    >
      {/* ── LEFT decorative panel ── */}
      <div
        className="hidden md:flex"
        style={{
          flex: "0 0 38%",
          background: "linear-gradient(145deg,#3d1c02 0%,#7b3f00 60%,#c87941 100%)",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "300px", height: "300px", borderRadius: "50%", border: "1px solid rgba(244,160,32,0.15)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-60px", width: "260px", height: "260px", borderRadius: "50%", background: "radial-gradient(circle,rgba(244,160,32,0.10) 0%,transparent 70%)", pointerEvents: "none" }} />

        {["🍮", "🧁", "🍯", "🍬"].map((e, i) => (
          <div key={i} style={{ position: "absolute", fontSize: "26px", opacity: 0.16, top: `${12 + i * 20}%`, left: `${8 + i * 14}%`, animation: `regFloat${i} ${3 + i * 0.7}s ease-in-out infinite alternate`, pointerEvents: "none" }}>{e}</div>
        ))}

        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "52px", marginBottom: "16px" }}>🎊</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: "900", fontSize: "30px", color: "#fff", marginBottom: "12px", lineHeight: "1.2" }}>
            Join the<br />
            <span style={{ background: "linear-gradient(135deg,#f4a020,#fda085)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Sweet Family
            </span>
          </h2>
          <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.68)", lineHeight: "1.8", maxWidth: "260px", margin: "0 auto 28px" }}>
            Create your account and enjoy exclusive access to freshly prepared Indian sweets, order tracking, and more.
          </p>

          {[
            { emoji: "🎁", text: "Welcome email on sign-up" },
            { emoji: "📦", text: "Order tracking & history" },
            { emoji: "🛒", text: "Faster checkout experience" },
          ].map(({ emoji, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", padding: "10px 16px", marginBottom: "10px", textAlign: "left" }}>
              <span style={{ fontSize: "20px", flexShrink: 0 }}>{emoji}</span>
              <span style={{ fontSize: "13px", fontWeight: "500", color: "rgba(255,255,255,0.82)" }}>{text}</span>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes regFloat0{to{transform:translateY(-12px) rotate(8deg)}}
          @keyframes regFloat1{to{transform:translateY(-16px) rotate(-6deg)}}
          @keyframes regFloat2{to{transform:translateY(-10px) rotate(12deg)}}
          @keyframes regFloat3{to{transform:translateY(-14px) rotate(-10deg)}}
          @keyframes regSpin{to{transform:rotate(360deg)}}
        `}</style>
      </div>

      {/* ── RIGHT form panel ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "clamp(28px,4vw,52px) clamp(20px,4vw,52px)",
          overflowY: "auto",
        }}
      >
        <div style={{ width: "100%", maxWidth: "520px" }}>
          {/* Header */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(244,160,32,0.10)", border: "1px solid rgba(244,160,32,0.30)", borderRadius: "50px", padding: "5px 14px", marginBottom: "14px" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.18em", color: "#f4a020", textTransform: "uppercase" }}>New Account</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: "900", fontSize: "clamp(24px,3.5vw,34px)", color: "#3d1c02", lineHeight: "1.2", marginBottom: "8px" }}>
              Create Your Account
            </h1>
            <p style={{ fontSize: "13.5px", color: "#7b5e3a", lineHeight: "1.7" }}>
              Already have an account?{" "}
              <Link to="/myaccount" style={{ color: "#f4a020", fontWeight: "700", textDecoration: "none" }}>
                Sign in →
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Personal info */}
            <SectionLabel>Personal Info</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "14px" }}>
              <FInput icon={FaUser} label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
              <FInput icon={FaUser} label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "14px" }}>
              <FInput icon={FaPhone} label="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              <FInput icon={FaEnvelope} label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "14px" }}>
              <FSelect
                icon={FaVenusMars}
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other / Prefer not to say" },
                ]}
              />
            </div>

            {/* Address */}
            <SectionLabel>Delivery Address</SectionLabel>
            <div style={{ marginBottom: "14px" }}>
              <FInput icon={FaMapMarkerAlt} label="Street / Area" name="street" value={formData.street} onChange={handleChange} required />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "14px" }}>
              <FInput icon={FaCity} label="City" name="city" value={formData.city} onChange={handleChange} required />
              <FInput icon={FaMailBulk} label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} required />
            </div>

            {/* Password */}
            <SectionLabel>Secure Your Account</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "24px" }}>
              <FInput icon={FaLock} label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
              <FInput icon={FaLock} label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              onMouseEnter={() => setBtnH(true)}
              onMouseLeave={() => setBtnH(false)}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "50px",
                border: "none",
                cursor: loading ? "default" : "pointer",
                fontFamily: "'Poppins',sans-serif",
                fontWeight: "700",
                fontSize: "15px",
                letterSpacing: "0.04em",
                color: "#fff",
                background: loading
                  ? "rgba(61,28,2,0.20)"
                  : btnH
                    ? "linear-gradient(135deg,#e04e2c,#c0392b)"
                    : "linear-gradient(135deg,#f4a020,#e04e2c)",
                boxShadow: loading ? "none" : btnH
                  ? "0 8px 28px rgba(192,57,43,0.45)"
                  : "0 6px 24px rgba(244,160,32,0.40)",
                transform: btnH && !loading ? "translateY(-2px)" : "translateY(0)",
                transition: "all 0.3s ease",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                marginBottom: "20px",
              }}
            >
              {loading ? (
                <>
                  <span style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", animation: "regSpin 0.8s linear infinite", display: "inline-block" }} />
                  Creating Account…
                </>
              ) : (
                <>
                  <FaCheckCircle style={{ fontSize: "14px" }} /> Create Account
                </>
              )}
            </button>

            <p style={{ textAlign: "center", fontSize: "11.5px", color: "rgba(61,28,2,0.40)", lineHeight: "1.6" }}>
              By creating an account you agree to our{" "}
              <span style={{ color: "#f4a020", fontWeight: "600", cursor: "pointer" }}>Terms of Service</span>{" "}
              and{" "}
              <span style={{ color: "#f4a020", fontWeight: "600", cursor: "pointer" }}>Privacy Policy</span>.
            </p>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};
