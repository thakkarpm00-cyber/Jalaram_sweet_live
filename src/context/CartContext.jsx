import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Cookies from "js-cookie";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [userId, setUserId] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.id || "guest";
  });

  const storageKey = `cart_${userId}`;
  const isLoggedIn = userId !== "guest";

  const getStoredCart = useCallback(() => {
    if (isLoggedIn) {
      const cookieData = Cookies.get(storageKey);
      return cookieData ? JSON.parse(cookieData) : [];
    } else {
      const localData = localStorage.getItem(storageKey);
      return localData ? JSON.parse(localData) : [];
    }
  }, [isLoggedIn, storageKey]);

  const [cartItems, setCartItems] = useState(getStoredCart);

  useEffect(() => {
    const handleUserChange = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const newUserId = storedUser?.id || "guest";
      setUserId(newUserId);
    };

    window.addEventListener("storage", handleUserChange);
    return () => window.removeEventListener("storage", handleUserChange);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      Cookies.set(storageKey, JSON.stringify(cartItems), { expires: 7 });
    } else {
      localStorage.setItem(storageKey, JSON.stringify(cartItems));
    }
  }, [cartItems, storageKey, isLoggedIn]);

  const getItemId = useCallback((item) => item._id || item.id, []);

  const addToCart = useCallback(
    (product) => {
      const productId = getItemId(product);
      setCartItems((prev) => {
        const exists = prev.find((item) => getItemId(item) === productId);
        if (exists) {
          return prev.map((item) =>
            getItemId(item) === productId
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
    },
    [getItemId]
  );

  const removeFromCart = useCallback(
    (id) => {
      setCartItems((prev) => prev.filter((item) => getItemId(item) !== id));
    },
    [getItemId]
  );

  const updateQuantity = useCallback(
    (id, qty) => {
      setCartItems((prev) =>
        prev
          .map((item) =>
            getItemId(item) === id ? { ...item, quantity: qty } : item
          )
          .filter((item) => item.quantity > 0)
      );
    },
    [getItemId]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    if (isLoggedIn) {
      Cookies.remove(storageKey);
    } else {
      localStorage.removeItem(storageKey);
    }
  }, [isLoggedIn, storageKey]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
    }),
    [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
