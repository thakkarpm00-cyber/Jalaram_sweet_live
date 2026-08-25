import React, { useState, useMemo, useCallback } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { FaTrashAlt, FaShoppingBag, FaArrowLeft, FaLock } from "react-icons/fa";

/* ── quantity stepper ─────────────────────────────────────────── */
const QtyBtn = ({ onClick, children, disabled }) => {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: "32px", height: "32px",
        borderRadius: "50%", border: "none",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        background: h && !disabled
          ? "linear-gradient(135deg,#f4a020,#e04e2c)"
          : "rgba(244,160,32,0.12)",
        color: h && !disabled ? "#fff" : "#e04e2c",
        fontSize: "18px", fontWeight: "700", lineHeight: 1,
        transition: "all 0.2s ease",
        boxShadow: h && !disabled ? "0 4px 12px rgba(244,160,32,0.35)" : "none",
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
};

/* ── single cart row ────────────────────────────────────────────── */
const CartRow = ({ item, updateQuantity }) => {
  const id = item._id || item.id;
  const price = typeof item.price === "number"
    ? item.price
    : parseFloat(String(item.price).replace("₹", ""));
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "20px",
        borderRadius: "20px",
        background: hovered ? "rgba(244,160,32,0.04)" : "#fff",
        border: hovered
          ? "1.5px solid rgba(244,160,32,0.30)"
          : "1.5px solid rgba(61,28,2,0.07)",
        boxShadow: hovered
          ? "0 8px 28px rgba(244,160,32,0.10)"
          : "0 2px 12px rgba(61,28,2,0.05)",
        transition: "all 0.28s ease",
      }}
    >
      {/* Product image */}
      <div
        style={{
          width: "86px", height: "86px",
          borderRadius: "16px",
          overflow: "hidden",
          flexShrink: 0,
          background: "linear-gradient(135deg,#fdf6ec,#ffecd2)",
          boxShadow: "0 4px 14px rgba(61,28,2,0.10)",
        }}
      >
        <img
          src={`http://localhost:5546${item.image}`}
          alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          loading="lazy"
        />
      </div>

      {/* Item details */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4
          style={{
            fontFamily: "'Playfair Display',serif",
            fontWeight: "700", fontSize: "16px",
            color: "#3d1c02", marginBottom: "4px",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}
        >
          {item.name}
        </h4>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontWeight: "800", fontSize: "17px",
              background: "linear-gradient(135deg,#f4a020,#e04e2c)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}
          >
            ₹{price}
          </span>
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "11px", fontWeight: "600", color: "#27ae60", background: "rgba(39,174,96,0.10)", borderRadius: "50px", padding: "2px 8px" }}>
            per Kg
          </span>
        </div>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "12px", color: "#aaa", marginTop: "4px" }}>
          Subtotal: <strong style={{ color: "#7b5e3a" }}>₹{(price * (item.quantity || 1)).toLocaleString()}</strong>
        </p>
      </div>

      {/* Quantity stepper */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
        <QtyBtn
          onClick={() =>
            item.quantity > 1 ? updateQuantity(id, item.quantity - 1) : updateQuantity(id, 0)
          }
        >
          {item.quantity === 1 ? <FaTrashAlt style={{ fontSize: "12px" }} /> : "−"}
        </QtyBtn>
        <span
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontWeight: "700", fontSize: "16px",
            color: "#3d1c02", minWidth: "24px", textAlign: "center",
          }}
        >
          {item.quantity || 1}
        </span>
        <QtyBtn onClick={() => updateQuantity(id, (item.quantity || 1) + 1)}>
          +
        </QtyBtn>
      </div>
    </div>
  );
};

/* ── empty cart ──────────────────────────────────────────────────── */
const EmptyCart = () => (
  <div
    style={{
      textAlign: "center",
      padding: "80px 24px",
      background: "#fff",
      borderRadius: "24px",
      border: "2px dashed rgba(244,160,32,0.30)",
      boxShadow: "0 4px 24px rgba(61,28,2,0.05)",
    }}
  >
    <div style={{ fontSize: "72px", marginBottom: "20px", lineHeight: 1 }}>🛒</div>
    <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: "800", fontSize: "26px", color: "#3d1c02", marginBottom: "10px" }}>
      Your cart is empty!
    </h3>
    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "14px", color: "#7b5e3a", marginBottom: "28px", lineHeight: "1.7" }}>
      Looks like you haven't added any sweets yet.<br />Explore our collection and find your favourites.
    </p>
    <Link
      to="/products"
      style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        fontFamily: "'Poppins',sans-serif", fontWeight: "700", fontSize: "14px",
        color: "#fff",
        background: "linear-gradient(135deg,#f4a020,#e04e2c)",
        borderRadius: "50px", padding: "13px 32px",
        textDecoration: "none",
        boxShadow: "0 6px 24px rgba(244,160,32,0.40)",
        transition: "all 0.3s ease",
      }}
    >
      <FaShoppingBag /> Browse Sweets
    </Link>
  </div>
);

/* ── order placed success ────────────────────────────────────────── */
const OrderSuccess = ({ navigate }) => (
  <div style={{ textAlign: "center", padding: "80px 24px", background: "#fff", borderRadius: "24px", border: "2px solid rgba(39,174,96,0.25)", boxShadow: "0 4px 24px rgba(39,174,96,0.08)" }}>
    <div style={{ fontSize: "72px", marginBottom: "20px", lineHeight: 1 }}>🎉</div>
    <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: "800", fontSize: "26px", color: "#1e7e48", marginBottom: "10px" }}>
      Order Placed Successfully!
    </h3>
    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "14px", color: "#7b5e3a", marginBottom: "28px", lineHeight: "1.7" }}>
      Thank you for shopping with Jalaram Sweets!<br />Your order is confirmed and will be freshly prepared for you.
    </p>
    <button
      onClick={() => navigate("/products")}
      style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        fontFamily: "'Poppins',sans-serif", fontWeight: "700", fontSize: "14px",
        color: "#fff",
        background: "linear-gradient(135deg,#f4a020,#e04e2c)",
        borderRadius: "50px", padding: "13px 32px", border: "none",
        cursor: "pointer", boxShadow: "0 6px 24px rgba(244,160,32,0.40)",
      }}
    >
      <FaShoppingBag /> Continue Shopping
    </button>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   CART PAGE
══════════════════════════════════════════════════════════════ */
const CartPage = () => {
  const { cartItems, updateQuantity, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [checkoutHover, setCheckoutHover] = useState(false);
  const navigate = useNavigate();

  const calculateTotal = useMemo(
    () =>
      cartItems.reduce((total, item) => {
        const price =
          typeof item.price === "number"
            ? item.price
            : parseFloat(String(item.price).replace("₹", ""));
        return total + price * (item.quantity || 1);
      }, 0),
    [cartItems]
  );

  const handleCheckout = useCallback(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/myaccount");
      return;
    }

    const totalAmount = calculateTotal;
    const options = {
      key: "rzp_test_m6eCyTDiVxbg9Q",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Jalaram Sweet Rav",
      description: "Thank you for shopping with us!",
      image: "/logo.png",
      handler: async function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        const orderId = "ORDER_" + Date.now();
        const currentDate = new Date();
        try {
          const res = await fetch("http://localhost:5546/api/order/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId, userId: user.id,
              paymentId: response.razorpay_payment_id,
              items: cartItems, totalAmount,
              orderDate: currentDate,
              orderStatus: "Pending",
              updatedAt: currentDate,
            }),
          });
          if (res.ok) { clearCart(); setOrderPlaced(true); }
          else console.error("Failed to save order");
        } catch (error) {
          console.error("Error saving order:", error);
        }
      },
      prefill: { name: user.name, email: user.email, contact: user.contact || "9999999999" },
      theme: { color: "#f4a020" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }, [calculateTotal, cartItems, clearCart, navigate]);

  const totalItems = cartItems.reduce((s, i) => s + (i.quantity || 1), 0);

  return (
    <div style={{ background: "#fffbf4", minHeight: "100vh" }}>

      {/* ── Hero strip ── */}
      <section
        style={{
          position: "relative",
          marginTop: "96px",
          minHeight: "clamp(130px,16vw,200px)",
          background: "linear-gradient(135deg,#3d1c02 0%,#7b3f00 55%,#c87941 100%)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "260px", height: "260px", borderRadius: "50%", border: "1px solid rgba(244,160,32,0.15)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "40%", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle,rgba(244,160,32,0.09) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div style={{ padding: "clamp(28px,4vw,48px) clamp(24px,6vw,80px)", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(244,160,32,0.15)", border: "1px solid rgba(244,160,32,0.45)", borderRadius: "50px", padding: "5px 14px", marginBottom: "14px", backdropFilter: "blur(6px)" }}>
            <span>🛒</span>
            <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.18em", color: "#f4a020", textTransform: "uppercase" }}>Your Shopping Cart</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: "900", fontSize: "clamp(24px,4vw,44px)", color: "#fff", lineHeight: "1.15", textShadow: "0 2px 16px rgba(0,0,0,0.25)", marginBottom: "6px" }}>
            Review Your{" "}
            <span style={{ background: "linear-gradient(135deg,#f4a020,#fda085)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Order</span>
          </h1>
          {cartItems.length > 0 && (
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.72)" }}>
              {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart — ready to checkout
            </p>
          )}
        </div>
      </section>

      {/* ── Main content ── */}
      <div
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          padding: "clamp(40px,6vw,72px) clamp(20px,4vw,40px)",
        }}
      >
        {orderPlaced ? (
          <OrderSuccess navigate={navigate} />
        ) : cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(24px,4vw,40px)", alignItems: "flex-start" }}>

            {/* ── LEFT: Cart items ── */}
            <div style={{ flex: "1 1 420px", minWidth: 0 }}>
              {/* Back link */}
              <Link
                to="/products"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  fontFamily: "'Poppins',sans-serif", fontSize: "13px", fontWeight: "600",
                  color: "#7b5e3a", textDecoration: "none", marginBottom: "24px",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#f4a020"}
                onMouseLeave={e => e.currentTarget.style.color = "#7b5e3a"}
              >
                <FaArrowLeft style={{ fontSize: "11px" }} /> Continue Shopping
              </Link>

              {/* Section heading */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: "800", fontSize: "22px", color: "#3d1c02" }}>
                  Cart Items
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "12px", fontWeight: "600", color: "#f4a020", marginLeft: "10px", background: "rgba(244,160,32,0.12)", borderRadius: "50px", padding: "3px 10px" }}>
                    {totalItems}
                  </span>
                </h2>
                <button
                  onClick={() => clearCart()}
                  style={{
                    fontFamily: "'Poppins',sans-serif", fontSize: "12px", fontWeight: "600",
                    color: "#c0392b", background: "rgba(192,57,43,0.07)",
                    border: "1px solid rgba(192,57,43,0.20)", borderRadius: "50px",
                    padding: "5px 14px", cursor: "pointer", transition: "all 0.2s ease",
                    display: "flex", alignItems: "center", gap: "6px",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(192,57,43,0.14)"; e.currentTarget.style.borderColor = "rgba(192,57,43,0.35)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(192,57,43,0.07)"; e.currentTarget.style.borderColor = "rgba(192,57,43,0.20)"; }}
                >
                  <FaTrashAlt style={{ fontSize: "11px" }} /> Clear All
                </button>
              </div>

              {/* Items list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {cartItems.map((item) => (
                  <CartRow key={item._id || item.id} item={item} updateQuantity={updateQuantity} />
                ))}
              </div>
            </div>

            {/* ── RIGHT: Order Summary ── */}
            <div
              style={{
                flex: "0 1 340px",
                minWidth: "280px",
                position: "sticky",
                top: "96px",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: "24px",
                  border: "1.5px solid rgba(61,28,2,0.08)",
                  boxShadow: "0 8px 40px rgba(61,28,2,0.09)",
                  overflow: "hidden",
                }}
              >
                {/* Summary header */}
                <div
                  style={{
                    background: "linear-gradient(135deg,#3d1c02,#7b3f00)",
                    padding: "20px 24px",
                  }}
                >
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: "800", fontSize: "18px", color: "#fff", marginBottom: "2px" }}>
                    Order Summary
                  </h3>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.60)" }}>
                    {totalItems} item{totalItems !== 1 ? "s" : ""}
                  </p>
                </div>

                {/* Summary body */}
                <div style={{ padding: "24px" }}>
                  {/* Item breakdown */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                    {cartItems.map((item) => {
                      const id = item._id || item.id;
                      const price = typeof item.price === "number"
                        ? item.price
                        : parseFloat(String(item.price).replace("₹", ""));
                      return (
                        <div key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "13px", color: "#7b5e3a", flex: 1, paddingRight: "8px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {item.name}{" "}
                            <span style={{ color: "#bbb", fontSize: "11px" }}>×{item.quantity || 1}</span>
                          </span>
                          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "13px", fontWeight: "600", color: "#3d1c02", flexShrink: 0 }}>
                            ₹{(price * (item.quantity || 1)).toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Divider */}
                  <div style={{ height: "1px", background: "linear-gradient(90deg,transparent,rgba(244,160,32,0.35),transparent)", marginBottom: "16px" }} />

                  {/* Totals */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "13px", color: "#7b5e3a" }}>Subtotal</span>
                      <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "13px", fontWeight: "600", color: "#3d1c02" }}>₹{calculateTotal.toLocaleString()}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "13px", color: "#7b5e3a" }}>Delivery</span>
                      <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "13px", fontWeight: "600", color: "#27ae60" }}>Free</span>
                    </div>
                    <div style={{ height: "1px", background: "rgba(61,28,2,0.07)", margin: "4px 0" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: "700", fontSize: "17px", color: "#3d1c02" }}>Total</span>
                      <span
                        style={{
                          fontFamily: "'Playfair Display',serif", fontWeight: "800", fontSize: "22px",
                          background: "linear-gradient(135deg,#f4a020,#e04e2c)",
                          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        }}
                      >
                        ₹{calculateTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    onClick={handleCheckout}
                    onMouseEnter={() => setCheckoutHover(true)}
                    onMouseLeave={() => setCheckoutHover(false)}
                    style={{
                      width: "100%",
                      padding: "15px",
                      borderRadius: "50px",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'Poppins',sans-serif",
                      fontWeight: "700", fontSize: "15px",
                      letterSpacing: "0.04em",
                      color: "#fff",
                      background: checkoutHover
                        ? "linear-gradient(135deg,#e04e2c,#c0392b)"
                        : "linear-gradient(135deg,#f4a020,#e04e2c)",
                      boxShadow: checkoutHover
                        ? "0 10px 32px rgba(192,57,43,0.48)"
                        : "0 6px 24px rgba(244,160,32,0.42)",
                      transform: checkoutHover ? "translateY(-2px)" : "translateY(0)",
                      transition: "all 0.3s ease",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                    }}
                  >
                    <FaLock style={{ fontSize: "13px" }} />
                    Proceed to Checkout
                  </button>

                  {/* Trust badges */}
                  <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "18px", flexWrap: "wrap" }}>
                    {["🔒 Secure Pay", "✦ 100% Fresh", "🚚 Free Delivery"].map((badge) => (
                      <span
                        key={badge}
                        style={{
                          fontFamily: "'Poppins',sans-serif", fontSize: "10.5px", fontWeight: "600",
                          color: "#7b5e3a",
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(CartPage);
