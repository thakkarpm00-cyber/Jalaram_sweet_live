import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const navbarStyles = `
  .nav-desktop { display: flex; align-items: center; gap: 8px; }
  .nav-hamburger { display: none; align-items: center; gap: 16px; }
  @media (max-width: 767px) {
    .nav-desktop { display: none !important; }
    .nav-hamburger { display: flex !important; }
  }
`;

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutsideMenu = (e) => {
      if (showMenu && menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => document.removeEventListener("mousedown", handleClickOutsideMenu);
  }, [showMenu]);

  const navLinks = ["Home", "About", "Products", "Contact"];

  return (
    <>
      <style>{navbarStyles}</style>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          transition: "all 0.4s ease",
          background: scrolled
            ? "rgba(253, 246, 236, 0.92)"
            : "rgba(253, 246, 236, 0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? "1px solid rgba(244, 160, 32, 0.3)"
            : "1px solid rgba(244, 160, 32, 0.1)",
          boxShadow: scrolled
            ? "0 4px 30px rgba(244, 160, 32, 0.15)"
            : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            height: "96px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* logo */}
          <Link
            to="/"
            onClick={() => setShowMenu(false)}
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
          >
            <img
              src="/images/logo3.png"
              alt="Jalaram Sweets logo"
              style={{
                height: "135px", // Increased logo height substantially
                width: "auto",
                transition: "transform 0.3s ease",
                filter: "drop-shadow(0 2px 4px rgba(244,160,32,0.4)) hue-rotate(-10deg) saturate(1.3)",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="nav-desktop">
            {navLinks.map((item) => {
              const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
              return (
                <NavLink
                  key={item}
                  to={path}
                  style={({ isActive }) => ({
                    padding: "8px 18px",
                    borderRadius: "50px",
                    fontSize: "0.9rem",
                    fontWeight: isActive ? "600" : "500",
                    fontFamily: "'Poppins', sans-serif",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    color: isActive ? "white" : "#7b3f00",
                    background: isActive
                      ? "linear-gradient(135deg, #f4a020, #e04e2c)"
                      : "transparent",
                    boxShadow: isActive ? "0 4px 15px rgba(244, 160, 32, 0.4)" : "none",
                    letterSpacing: "0.02em",
                  })}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.getAttribute("aria-current")) {
                      e.currentTarget.style.background = "rgba(244, 160, 32, 0.12)";
                      e.currentTarget.style.color = "#e8890c";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.getAttribute("aria-current")) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#7b3f00";
                    }
                  }}
                >
                  {item}
                </NavLink>
              );
            })}
          </nav>

          {/* Mobile: Hamburger */}
          <div className="nav-hamburger">
            <button
              onClick={() => setShowMenu(!showMenu)}
              style={{ background: "none", border: "none", color: "#7b3f00", cursor: "pointer" }}
            >
              <GiHamburgerMenu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {showMenu && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "rgba(61,28,2,0.5)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowMenu(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        ref={menuRef}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "280px",
          background: "linear-gradient(180deg, #fdf6ec 0%, #ffecd2 100%)",
          zIndex: 1001,
          transform: showMenu ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "-8px 0 40px rgba(61,28,2,0.2)",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <img
            src="/images/logo3.png"
            alt="logo"
            style={{
              height: "65px", // Increased Mobile Drawer logo
              width: "auto",
              filter: "drop-shadow(0 2px 4px rgba(244,160,32,0.4)) hue-rotate(-10deg) saturate(1.3)"
            }}
          />
          <button onClick={() => setShowMenu(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#7b3f00" }}>
            <IoMdClose size={26} />
          </button>
        </div>

        <nav style={{ flex: 1 }}>
          {navLinks.map((item) => {
            const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
            return (
              <NavLink
                key={item}
                to={path}
                onClick={() => setShowMenu(false)}
                style={({ isActive }) => ({
                  display: "block",
                  padding: "14px 20px",
                  marginBottom: "8px",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  fontFamily: "'Poppins', sans-serif",
                  textDecoration: "none",
                  color: isActive ? "white" : "#7b3f00",
                  background: isActive ? "linear-gradient(135deg, #f4a020, #e04e2c)" : "rgba(244,160,32,0.08)",
                  boxShadow: isActive ? "0 4px 15px rgba(244,160,32,0.35)" : "none",
                  transition: "all 0.3s ease",
                })}
              >
                {item}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
