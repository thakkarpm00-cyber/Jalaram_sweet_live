import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import {
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
  FaTrashAlt,
  FaSearch,
  FaFilter,
  FaCheck,
  FaTimesCircle,
  FaClock,
  FaLock,
  FaSignOutAlt,
  FaInbox,
  FaEye,
  FaTimes,
  FaExclamationTriangle,
  FaPhoneAlt,
} from "react-icons/fa";

/* ── Status badge ────────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const styles = {
    Pending: {
      bg: "rgba(244,160,32,0.12)",
      border: "rgba(244,160,32,0.4)",
      color: "#c17f00",
      icon: <FaClock style={{ fontSize: "11px" }} />,
    },
    Replied: {
      bg: "rgba(39,174,96,0.12)",
      border: "rgba(39,174,96,0.4)",
      color: "#1e7e48",
      icon: <FaCheck style={{ fontSize: "11px" }} />,
    },
    Rejected: {
      bg: "rgba(192,57,43,0.12)",
      border: "rgba(192,57,43,0.4)",
      color: "#c0392b",
      icon: <FaTimesCircle style={{ fontSize: "11px" }} />,
    },
  };
  const s = styles[status] || styles.Pending;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "4px 12px",
        borderRadius: "50px",
        background: s.bg,
        border: `1.5px solid ${s.border}`,
        color: s.color,
        fontFamily: "'Poppins',sans-serif",
        fontSize: "11px",
        fontWeight: "700",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {s.icon}
      {status || "Pending"}
    </span>
  );
};

/* ── Contact Card (row) ──────────────────────────────────────── */
const ContactCard = ({ contact, onDelete, onStatusChange, onView }) => {
  const [hovered, setHovered] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const formatDate = (ts) => {
    if (!ts) return "—";
    return new Date(ts).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this contact message?")) return;
    setDeleting(true);
    await onDelete(contact.id);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "linear-gradient(135deg,rgba(244,160,32,0.04),rgba(255,251,244,1))"
          : "#fff",
        border: hovered
          ? "1.5px solid rgba(244,160,32,0.35)"
          : "1.5px solid rgba(61,28,2,0.08)",
        borderRadius: "18px",
        padding: "20px 24px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr auto auto",
        alignItems: "center",
        gap: "16px",
        boxShadow: hovered
          ? "0 8px 32px rgba(244,160,32,0.10)"
          : "0 2px 10px rgba(61,28,2,0.05)",
        transition: "all 0.28s ease",
        cursor: "default",
      }}
    >
      {/* Name + Email */}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#f4a020,#e04e2c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <FaUser style={{ color: "#fff", fontSize: "13px" }} />
          </div>
          <p
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontWeight: "600",
              fontSize: "14px",
              color: "#3d1c02",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {contact.name}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <FaEnvelope style={{ color: "#f4a020", fontSize: "11px", flexShrink: 0 }} />
          <p
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: "12px",
              color: "#7b5e3a",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {contact.email}
          </p>
        </div>
        {contact.phone && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
            <FaPhoneAlt style={{ color: "#f4a020", fontSize: "10px", flexShrink: 0 }} />
            <p
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "12px",
                color: "#7b5e3a",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {contact.phone}
            </p>
          </div>
        )}
      </div>

      {/* Message preview */}
      <div style={{ minWidth: 0 }}>
        <p
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "13px",
            color: "#5a3e2b",
            lineHeight: "1.5",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {contact.message}
        </p>
      </div>

      {/* Date */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <FaCalendarAlt style={{ color: "#f4a020", fontSize: "11px", flexShrink: 0 }} />
        <p
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "12px",
            color: "#7b5e3a",
            whiteSpace: "nowrap",
          }}
        >
          {formatDate(contact.created_at)}
        </p>
      </div>

      {/* Status + Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "nowrap" }}>
        <StatusBadge status={contact.status} />
        <select
          value={contact.status || "Pending"}
          onChange={(e) => onStatusChange(contact.id, e.target.value)}
          style={{
            padding: "5px 8px",
            borderRadius: "8px",
            border: "1.5px solid rgba(61,28,2,0.15)",
            fontFamily: "'Poppins',sans-serif",
            fontSize: "11px",
            color: "#3d1c02",
            background: "#fdf6ec",
            cursor: "pointer",
            outline: "none",
          }}
        >
          <option value="Pending">Pending</option>
          <option value="Replied">Replied</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => onView(contact)}
          title="View full message"
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "10px",
            border: "1.5px solid rgba(61,28,2,0.12)",
            background: "rgba(244,160,32,0.08)",
            color: "#f4a020",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f4a020";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(244,160,32,0.08)";
            e.currentTarget.style.color = "#f4a020";
          }}
        >
          <FaEye style={{ fontSize: "13px" }} />
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          title="Delete"
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "10px",
            border: "1.5px solid rgba(192,57,43,0.20)",
            background: "rgba(192,57,43,0.06)",
            color: "#c0392b",
            cursor: deleting ? "wait" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            flexShrink: 0,
            opacity: deleting ? 0.5 : 1,
          }}
          onMouseEnter={(e) => {
            if (!deleting) {
              e.currentTarget.style.background = "#c0392b";
              e.currentTarget.style.color = "#fff";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(192,57,43,0.06)";
            e.currentTarget.style.color = "#c0392b";
          }}
        >
          <FaTrashAlt style={{ fontSize: "12px" }} />
        </button>
      </div>
    </div>
  );
};

/* ── Message Modal ───────────────────────────────────────────── */
const MessageModal = ({ contact, onClose }) => {
  if (!contact) return null;
  const formatDate = (ts) =>
    ts
      ? new Date(ts).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      : "—";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(61,28,2,0.55)",
        backdropFilter: "blur(6px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "40px",
          maxWidth: "560px",
          width: "100%",
          boxShadow: "0 24px 80px rgba(61,28,2,0.22)",
          position: "relative",
          animation: "modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "18px",
            right: "18px",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            border: "1.5px solid rgba(61,28,2,0.12)",
            background: "#fdf6ec",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#7b5e3a",
          }}
        >
          <FaTimes style={{ fontSize: "13px" }} />
        </button>

        <div
          style={{
            width: "54px",
            height: "54px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#f4a020,#e04e2c)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <FaEnvelope style={{ color: "#fff", fontSize: "20px" }} />
        </div>

        <p
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "10px",
            fontWeight: "700",
            letterSpacing: "0.18em",
            color: "#f4a020",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}
        >
          Contact Message
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            fontWeight: "800",
            fontSize: "24px",
            color: "#3d1c02",
            marginBottom: "24px",
          }}
        >
          {contact.name}
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              padding: "14px 18px",
              borderRadius: "12px",
              background: "#fdf6ec",
              border: "1.5px solid rgba(244,160,32,0.15)",
            }}
          >
            <p
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "10px",
                fontWeight: "700",
                letterSpacing: "0.12em",
                color: "#f4a020",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              Email
            </p>
            <p
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "14px",
                color: "#3d1c02",
              }}
            >
              {contact.email}
            </p>
          </div>

          {contact.phone && (
            <div
              style={{
                padding: "14px 18px",
                borderRadius: "12px",
                background: "#fdf6ec",
                border: "1.5px solid rgba(244,160,32,0.15)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "10px",
                  fontWeight: "700",
                  letterSpacing: "0.12em",
                  color: "#f4a020",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                Phone
              </p>
              <p
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "14px",
                  color: "#3d1c02",
                }}
              >
                {contact.phone}
              </p>
            </div>
          )}

          <div
            style={{
              padding: "14px 18px",
              borderRadius: "12px",
              background: "#fdf6ec",
              border: "1.5px solid rgba(244,160,32,0.15)",
            }}
          >
            <p
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "10px",
                fontWeight: "700",
                letterSpacing: "0.12em",
                color: "#f4a020",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              Received
            </p>
            <p
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "14px",
                color: "#3d1c02",
              }}
            >
              {formatDate(contact.created_at)}
            </p>
          </div>

          <div
            style={{
              padding: "18px",
              borderRadius: "12px",
              background: "#fdf6ec",
              border: "1.5px solid rgba(244,160,32,0.15)",
            }}
          >
            <p
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "10px",
                fontWeight: "700",
                letterSpacing: "0.12em",
                color: "#f4a020",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Message
            </p>
            <p
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "14px",
                color: "#3d1c02",
                lineHeight: "1.75",
                whiteSpace: "pre-wrap",
              }}
            >
              {contact.message}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <StatusBadge status={contact.status} />
          <a
            href={`mailto:${contact.email}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 22px",
              borderRadius: "50px",
              background: "linear-gradient(135deg,#f4a020,#e04e2c)",
              color: "#fff",
              fontFamily: "'Poppins',sans-serif",
              fontWeight: "700",
              fontSize: "13px",
              textDecoration: "none",
              boxShadow: "0 6px 20px rgba(244,160,32,0.35)",
            }}
          >
            <FaEnvelope style={{ fontSize: "12px" }} />
            Reply via Email
          </a>
        </div>
      </div>
    </div>
  );
};

/* ── Password Lock Screen ────────────────────────────────────── */
const LockScreen = ({ onUnlock }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onUnlock();
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#3d1c02 0%,#7b3f00 50%,#c87941 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.97)",
          borderRadius: "28px",
          padding: "52px 44px",
          maxWidth: "420px",
          width: "100%",
          boxShadow: "0 32px 96px rgba(61,28,2,0.40)",
          textAlign: "center",
          animation: "modalIn 0.4s ease",
        }}
      >
        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#f4a020,#e04e2c)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            boxShadow: "0 12px 36px rgba(244,160,32,0.40)",
          }}
        >
          <FaLock style={{ color: "#fff", fontSize: "26px" }} />
        </div>

        <p
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "10px",
            fontWeight: "700",
            letterSpacing: "0.22em",
            color: "#f4a020",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}
        >
          Jalaram Sweets
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display',serif",
            fontWeight: "900",
            fontSize: "28px",
            color: "#3d1c02",
            marginBottom: "8px",
          }}
        >
          Admin Portal
        </h1>
        <p
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "13px",
            color: "#7b5e3a",
            marginBottom: "32px",
            lineHeight: "1.6",
          }}
        >
          Enter the admin password to view contact messages
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Enter password"
            autoFocus
            style={{
              width: "100%",
              padding: "16px 20px",
              borderRadius: "14px",
              border: focused
                ? "2px solid #f4a020"
                : error
                  ? "2px solid #c0392b"
                  : "2px solid rgba(61,28,2,0.12)",
              fontFamily: "'Poppins',sans-serif",
              fontSize: "15px",
              color: "#3d1c02",
              background: "#fdf6ec",
              outline: "none",
              boxSizing: "border-box",
              boxShadow: focused ? "0 0 0 4px rgba(244,160,32,0.12)" : "none",
              transition: "all 0.25s ease",
              textAlign: "center",
              letterSpacing: "0.1em",
            }}
          />

          {error && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                borderRadius: "10px",
                background: "rgba(192,57,43,0.08)",
                border: "1.5px solid rgba(192,57,43,0.25)",
              }}
            >
              <FaExclamationTriangle style={{ color: "#c0392b", fontSize: "13px", flexShrink: 0 }} />
              <p
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "13px",
                  color: "#c0392b",
                  fontWeight: "500",
                }}
              >
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            style={{
              padding: "16px",
              borderRadius: "14px",
              border: "none",
              background: "linear-gradient(135deg,#f4a020,#e04e2c)",
              color: "#fff",
              fontFamily: "'Poppins',sans-serif",
              fontWeight: "700",
              fontSize: "15px",
              cursor: "pointer",
              letterSpacing: "0.04em",
              boxShadow: "0 8px 28px rgba(244,160,32,0.38)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 36px rgba(244,160,32,0.48)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(244,160,32,0.38)";
            }}
          >
            Unlock Dashboard
          </button>
        </form>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   CONTACT ADMIN PAGE
══════════════════════════════════════════════════════════════ */
function ContactAdmin() {
  const [unlocked, setUnlocked] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [error, setError] = useState("");

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError("Failed to fetch messages: " + error.message);
      } else {
        setContacts(data || []);
      }
    } catch (err) {
      setError("Unexpected error: " + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (unlocked) fetchContacts();
  }, [unlocked, fetchContacts]);

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error deleting: " + error.message);
    } else {
      setContacts((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const { error } = await supabase
      .from("contact_messages")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      alert("Error updating status: " + error.message);
    } else {
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      if (selectedContact?.id === id) {
        setSelectedContact((prev) => ({ ...prev, status: newStatus }));
      }
    }
  };

  const filtered = contacts.filter((c) => {
    const matchSearch =
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.message?.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "All" || (c.status || "Pending") === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: contacts.length,
    pending: contacts.filter((c) => !c.status || c.status === "Pending").length,
    replied: contacts.filter((c) => c.status === "Replied").length,
    rejected: contacts.filter((c) => c.status === "Rejected").length,
  };

  if (!unlocked) {
    return <LockScreen onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fffbf4" }}>
      {/* ── Header ─────────────────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(135deg,#3d1c02 0%,#7b3f00 60%,#c87941 100%)",
          padding: "116px clamp(20px,5vw,60px) 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative rings */}
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "280px", height: "280px", borderRadius: "50%", border: "1px solid rgba(244,160,32,0.13)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-40px", left: "10%", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle,rgba(244,160,32,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(244,160,32,0.15)", border: "1px solid rgba(244,160,32,0.40)", borderRadius: "50px", padding: "5px 14px", marginBottom: "14px", backdropFilter: "blur(6px)" }}>
              <FaInbox style={{ color: "#f4a020", fontSize: "11px" }} />
              <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: "700", fontSize: "10px", letterSpacing: "0.20em", color: "#f4a020", textTransform: "uppercase" }}>Admin Panel</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: "900", fontSize: "clamp(26px,4vw,44px)", color: "#fff", lineHeight: "1.1", marginBottom: "8px", textShadow: "0 2px 14px rgba(0,0,0,0.2)" }}>
              Contact{" "}
              <span style={{ background: "linear-gradient(135deg,#f4a020,#fda085)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Messages
              </span>
            </h1>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.70)" }}>
              View and manage all contact form submissions
            </p>
          </div>

          <button
            onClick={() => setUnlocked(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "50px",
              border: "1.5px solid rgba(255,255,255,0.25)",
              background: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.85)",
              fontFamily: "'Poppins',sans-serif",
              fontWeight: "600",
              fontSize: "13px",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
          >
            <FaSignOutAlt style={{ fontSize: "12px" }} />
            Lock
          </button>
        </div>

        {/* Stats */}
        <div style={{ maxWidth: "1200px", margin: "28px auto 0", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", position: "relative", zIndex: 1 }}>
          {[
            { label: "Total Messages", value: stats.total, color: "#fff", bg: "rgba(255,255,255,0.12)" },
            { label: "Pending", value: stats.pending, color: "#ffc857", bg: "rgba(255,200,87,0.15)" },
            { label: "Replied", value: stats.replied, color: "#6efaa1", bg: "rgba(110,250,161,0.12)" },
            { label: "Rejected", value: stats.rejected, color: "#ff8a8a", bg: "rgba(255,138,138,0.12)" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: stat.bg,
                borderRadius: "16px",
                padding: "18px 20px",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
              }}
            >
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "28px", fontWeight: "800", color: stat.color, lineHeight: "1" }}>
                {stat.value}
              </p>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.65)", marginTop: "4px", fontWeight: "500" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px clamp(20px,4vw,60px)" }}>

        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "24px", alignItems: "center" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: "1 1 280px" }}>
            <FaSearch style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#f4a020", fontSize: "13px" }} />
            <input
              type="text"
              placeholder="Search by name, email or message…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px 12px 42px",
                borderRadius: "14px",
                border: "1.5px solid rgba(61,28,2,0.12)",
                fontFamily: "'Poppins',sans-serif",
                fontSize: "13px",
                color: "#3d1c02",
                background: "#fff",
                outline: "none",
                boxSizing: "border-box",
                boxShadow: "0 2px 10px rgba(61,28,2,0.05)",
                transition: "border-color 0.22s ease",
              }}
              onFocus={(e) => { e.target.style.borderColor = "#f4a020"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(61,28,2,0.12)"; }}
            />
          </div>

          {/* Status filter */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <FaFilter style={{ color: "#f4a020", fontSize: "12px" }} />
            {["All", "Pending", "Replied", "Rejected"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "50px",
                  border: filterStatus === s ? "1.5px solid #f4a020" : "1.5px solid rgba(61,28,2,0.12)",
                  background: filterStatus === s ? "#f4a020" : "#fff",
                  color: filterStatus === s ? "#fff" : "#3d1c02",
                  fontFamily: "'Poppins',sans-serif",
                  fontWeight: "600",
                  fontSize: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Refresh */}
          <button
            onClick={fetchContacts}
            disabled={loading}
            style={{
              padding: "10px 20px",
              borderRadius: "14px",
              border: "1.5px solid rgba(61,28,2,0.12)",
              background: "#fff",
              color: "#3d1c02",
              fontFamily: "'Poppins',sans-serif",
              fontWeight: "600",
              fontSize: "13px",
              cursor: loading ? "wait" : "pointer",
              boxShadow: "0 2px 8px rgba(61,28,2,0.06)",
              opacity: loading ? 0.6 : 1,
              flexShrink: 0,
            }}
          >
            {loading ? "Loading…" : "↻ Refresh"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              padding: "16px 20px",
              borderRadius: "14px",
              background: "rgba(192,57,43,0.08)",
              border: "1.5px solid rgba(192,57,43,0.25)",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FaExclamationTriangle style={{ color: "#c0392b", flexShrink: 0 }} />
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "13px", color: "#c0392b", fontWeight: "500" }}>
              {error}
            </p>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  height: "84px",
                  borderRadius: "18px",
                  background: "linear-gradient(90deg,#f4ece1 25%,#fdf6ec 50%,#f4ece1 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.4s infinite",
                }}
              />
            ))}
          </div>
        )}

        {/* Table header */}
        {!loading && filtered.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr auto auto",
              gap: "16px",
              padding: "10px 24px",
              marginBottom: "8px",
            }}
          >
            {["Sender", "Message", "Date", "Status", "Actions"].map((h) => (
              <p
                key={h}
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "10px",
                  fontWeight: "700",
                  letterSpacing: "0.14em",
                  color: "#7b5e3a",
                  textTransform: "uppercase",
                }}
              >
                {h}
              </p>
            ))}
          </div>
        )}

        {/* Contact cards */}
        {!loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {filtered.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 20px",
                  borderRadius: "20px",
                  border: "2px dashed rgba(244,160,32,0.25)",
                  background: "rgba(255,251,244,0.6)",
                }}
              >
                <p style={{ fontSize: "42px", marginBottom: "12px" }}>📭</p>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "22px", fontWeight: "700", color: "#3d1c02", marginBottom: "8px" }}>
                  {search || filterStatus !== "All" ? "No results found" : "No messages yet"}
                </p>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "14px", color: "#7b5e3a" }}>
                  {search || filterStatus !== "All"
                    ? "Try adjusting your search or filter."
                    : "Contact form submissions will appear here."}
                </p>
              </div>
            ) : (
              filtered.map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                  onView={setSelectedContact}
                />
              ))
            )}
          </div>
        )}

        {/* Pagination info */}
        {!loading && filtered.length > 0 && (
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "12px", color: "#7b5e3a", marginTop: "20px", textAlign: "right" }}>
            Showing {filtered.length} of {contacts.length} messages
          </p>
        )}
      </div>

      {/* Message modal */}
      {selectedContact && (
        <MessageModal contact={selectedContact} onClose={() => setSelectedContact(null)} />
      )}

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default ContactAdmin;
