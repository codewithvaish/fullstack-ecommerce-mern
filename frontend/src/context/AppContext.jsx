import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext(null);

const readJSON = (key, fallback) => {
  if (typeof window === "undefined") return fallback;

  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => readJSON("cart", []));
  const [wishlist, setWishlist] = useState(() => readJSON("wishlist", []));
  const [currentUser, setCurrentUser] = useState(() =>
    readJSON("currentUser", null)
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", String(isLoggedIn));
  }, [isLoggedIn]);


  const showToast = (message, type = "success") => {
    setToast({
      id: Date.now(),
      message,
      type,
    });
  };


  const clearToast = () => setToast(null);


  // CART FUNCTIONS

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item._id === product._id
      );

      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity,
        },
      ];
    });

    showToast(`${product.name} added to cart`);
  };


  const removeFromCart = (_id) => {
    setCart((prev) =>
      prev.filter((item) => item._id !== _id)
    );

    showToast("Item removed from cart");
  };


  const increaseQuantity = (_id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === _id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };


  const decreaseQuantity = (_id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === _id && item.quantity > 1
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };


  const clearCart = () => {
    setCart([]);
    showToast("Cart cleared");
  };


  // WISHLIST FUNCTIONS

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some(
        (item) => item._id === product._id
      );

      if (exists) {
        showToast("Removed from wishlist");

        return prev.filter(
          (item) => item._id !== product._id
        );
      }

      showToast("Added to wishlist");

      return [
        ...prev,
        product,
      ];
    });
  };


  const clearWishlist = () => {
    setWishlist([]);
    showToast("Wishlist cleared");
  };


  // AUTH FUNCTIONS

  const loginUser = (user, remember = false) => {
    setCurrentUser(user);
    setIsLoggedIn(true);

    if (remember) {
      localStorage.setItem(
        "rememberUser",
        user.email
      );
    } else {
      localStorage.removeItem("rememberUser");
    }

    showToast(`Welcome back, ${user.name}`);
  };


  const logoutUser = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);

    localStorage.removeItem("rememberUser");

    showToast("Logged out successfully");
  };


  const value = useMemo(
    () => ({
      cart,
      wishlist,

      currentUser,
      isLoggedIn,

      toast,

      cartCount: cart.reduce(
        (total, item) =>
          total + (item.quantity || 1),
        0
      ),

      wishlistCount: wishlist.length,


      showToast,
      clearToast,


      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,


      toggleWishlist,
      clearWishlist,


      loginUser,
      logoutUser,


      isWishlisted: (_id) =>
        wishlist.some(
          (item) => item._id === _id
        ),

      isInCart: (_id) =>
        cart.some(
          (item) => item._id === _id
        ),
    }),

    [
      cart,
      wishlist,
      currentUser,
      isLoggedIn,
      toast,
    ]
  );


  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}


export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useApp must be used inside AppProvider"
    );
  }

  return context;
}