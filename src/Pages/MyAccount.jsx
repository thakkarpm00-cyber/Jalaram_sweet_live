import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

/* ── Floating label input ─────────────────────────────────────── */
const FInput = ({ icon: Icon, label, type, value, onChange, required }) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div style={{ position: "relative", marginBottom: "20px" }}>
      <div
        style={{
          position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
          color: focused ? "#f4a020" : "rgba(61,28,2,0.35)",
          transition: "color 0.25s ease", zIndex: 1, pointerEvents: "none",
          fontSize: "14px",
        }}
      >
        <Icon />
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        placeholder=" "
        style={{
          width: "100%",
          padding: "22px 18px 8px 44px",
          fontFamily: "'Poppins',sans-serif",
          fontSize: "14px",
          color: "#3d1c02",
          background: focused ? "#fff" : "#fdf6ec",
          border: focused ? "2px solid #f4a020" : "2px solid rgba(61,28,2,0.10)",
          borderRadius: "14px",
          outline: "none",
          transition: "all 0.25s ease",
          boxSizing: "border-box",
          boxShadow: focused ? "0 0 0 4px rgba(244,160,32,0.10)" : "none",
        }}
      />
      <label
        style={{
          position: "absolute", left: "44px",
          top: active ? "8px" : "50%",
          transform: active ? "none" : "translateY(-50%)",
          fontFamily: "'Poppins',sans-serif",
          fontSize: active ? "10px" : "13.5px",
          fontWeight: active ? "700" : "400",
          color: active ? "#f4a020" : "rgba(61,28,2,0.40)",
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

export const MyAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnH, setBtnH] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5546/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.status && data.user && data.user.id) {
        toast.success("Login successful!");
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(login(data.user));
        navigate(`/dashboard/${data.user.id}`);
      } else if (data.message === "Password does not match") {
        toast.error("Incorrect password. Please try again.");
      } else if (data.message === "User not found") {
        toast.error("User not found. Please register first.");
      } else {
        toast.error("Invalid credentials.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
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
        style={{
          flex: "0 0 45%",
          background: "linear-gradient(145deg,#3d1c02 0%,#7b3f00 60%,#c87941 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 48px",
          position: "relative",
          overflow: "hidden",
        }}
        className="hidden md:flex"
      >
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", border: "1px solid rgba(244,160,32,0.15)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-100px", left: "-80px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle,rgba(244,160,32,0.10) 0%,transparent 70%)", pointerEvents: "none" }} />

        {/* Floating sweet emojis */}
        {["🍮", "🧁", "🍯", "🍬", "🎂"].map((e, i) => (
          <div key={i} style={{ position: "absolute", fontSize: "28px", opacity: 0.18, top: `${14 + i * 16}%`, left: `${6 + i * 12}%`, animation: `floatSweet${i} ${3 + i * 0.6}s ease-in-out infinite alternate`, pointerEvents: "none" }}>{e}</div>
        ))}

        {/* logo / brand */}
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>🍭</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: "900", fontSize: "32px", color: "#fff", marginBottom: "12px", lineHeight: "1.2" }}>
            Welcome Back to<br />
            <span style={{ background: "linear-gradient(135deg,#f4a020,#fda085)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Jalaram Sweets
            </span>
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.68)", lineHeight: "1.75", maxWidth: "280px", margin: "0 auto 32px" }}>
            Your favourite Indian mithai shop — handcrafted sweets made with love since 1991.
          </p>

          {/* Trust pills */}
          {["✦ No Preservatives", "🥛 Pure Ingredients", "🤲 Handcrafted Daily"].map((t) => (
            <div key={t} style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(244,160,32,0.14)", border: "1px solid rgba(244,160,32,0.35)", borderRadius: "50px", padding: "6px 14px", margin: "4px", backdropFilter: "blur(4px)" }}>
              <span style={{ fontSize: "12px", fontWeight: "600", color: "rgba(255,255,255,0.85)", letterSpacing: "0.04em" }}>{t}</span>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes floatSweet0{to{transform:translateY(-12px) rotate(8deg)}}
          @keyframes floatSweet1{to{transform:translateY(-16px) rotate(-6deg)}}
          @keyframes floatSweet2{to{transform:translateY(-10px) rotate(12deg)}}
          @keyframes floatSweet3{to{transform:translateY(-14px) rotate(-10deg)}}
          @keyframes floatSweet4{to{transform:translateY(-18px) rotate(5deg)}}
          @keyframes loginSpin{to{transform:rotate(360deg)}}
        `}</style>
      </div>

      {/* ── RIGHT form panel ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(32px,5vw,60px) clamp(24px,5vw,60px)",
        }}
      >
        <div style={{ width: "100%", maxWidth: "420px" }}>
          {/* Header */}
          <div style={{ marginBottom: "36px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(244,160,32,0.10)", border: "1px solid rgba(244,160,32,0.30)", borderRadius: "50px", padding: "5px 14px", marginBottom: "16px" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.18em", color: "#f4a020", textTransform: "uppercase" }}>Welcome Back</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: "900", fontSize: "clamp(26px,3.5vw,36px)", color: "#3d1c02", lineHeight: "1.2", marginBottom: "8px" }}>
              Sign in to your<br />account
            </h1>
            <p style={{ fontSize: "14px", color: "#7b5e3a", lineHeight: "1.7" }}>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "#f4a020", fontWeight: "700", textDecoration: "none" }}>
                Register here →
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <FInput icon={FaEnvelope} label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <FInput icon={FaLock} label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />

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
                  : "0 6px 24px rgba(244,160,32,0.42)",
                transform: btnH && !loading ? "translateY(-2px)" : "translateY(0)",
                transition: "all 0.3s ease",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                marginBottom: "28px",
              }}
            >
              {loading ? (
                <>
                  <span style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", animation: "loginSpin 0.8s linear infinite", display: "inline-block" }} />
                  Signing in…
                </>
              ) : (
                <>
                  <FaSignInAlt style={{ fontSize: "14px" }} /> Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(61,28,2,0.10)" }} />
            <span style={{ fontSize: "12px", color: "rgba(61,28,2,0.35)", fontWeight: "600" }}>OR</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(61,28,2,0.10)" }} />
          </div>

          <Link
            to="/register"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              padding: "13px",
              borderRadius: "50px",
              border: "2px solid rgba(244,160,32,0.35)",
              fontFamily: "'Poppins',sans-serif",
              fontWeight: "700",
              fontSize: "14px",
              color: "#f4a020",
              textDecoration: "none",
              textAlign: "center",
              transition: "all 0.25s ease",
              background: "transparent",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(244,160,32,0.06)"; e.currentTarget.style.borderColor = "rgba(244,160,32,0.60)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(244,160,32,0.35)"; }}
          >
            Create a New Account
          </Link>
        </div>
      </div>
    </div>
  );
};
