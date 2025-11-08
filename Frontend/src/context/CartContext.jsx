import React, { createContext, useContext, useState, useEffect } from "react";
import {
  addToCartAPI,
  getCartAPI,
  removeFromCartAPI,
  clearCartAPI,
  updateCartAPI, // Make sure this import is included
  processCheckout,
} from "../api/api";

// Create Context
const CartContext = createContext();

// Custom hook
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = "default-user";

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const cartData = await getCartAPI(userId);
      console.log("🛒 Fetched cart data:", cartData);
      setCart(cartData);
    } catch (error) {
      console.error("❌ Error fetching cart:", error);
      setError(error.message);
      setCart({ items: [], totalPrice: 0 });
    } finally {
      setLoading(false);
    }
  };

  // Add item
const addToCart = async (productId, replace = false) => {
  try {
    const result = await addToCartAPI({ 
      userId: "default-user", 
      productId, 
      quantity: 1,
      replace: false // Always increment for "Add to Cart" button
    });
    setCart(result);
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

const updateQuantity = async (productId, newQuantity) => {
  try {
    const result = await updateCartAPI({
      userId: "default-user",
      productId,
      quantity: newQuantity
    });
    setCart(result);
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
};

  // Remove item
  const removeFromCart = async (productId) => {
    try {
      setError(null);
      console.log("➖ Removing from cart:", productId);
      const result = await removeFromCartAPI({ userId, productId });
      console.log("✅ Remove from cart response:", result);
      setCart(result);
    } catch (error) {
      console.error("❌ Error removing from cart:", error);
      setError(error.message);
    }
  };

  // Clear all
  const clearCart = async () => {
    try {
      setError(null);
      console.log("🗑️ Clearing cart");
      await clearCartAPI(userId);
      setCart({ items: [], totalPrice: 0 });
    } catch (error) {
      console.error("❌ Error clearing cart:", error);
      setError(error.message);
    }
  };

  // Increment quantity (convenience method)
  const incrementQuantity = async (productId) => {
    const currentItem = cart.items.find(item => item.product?._id === productId);
    const currentQuantity = currentItem ? currentItem.quantity : 0;
    await updateQuantity(productId, currentQuantity + 1);
  };

  // Decrement quantity (convenience method)
  const decrementQuantity = async (productId) => {
    const currentItem = cart.items.find(item => item.product?._id === productId);
    const currentQuantity = currentItem ? currentItem.quantity : 0;
    if (currentQuantity > 0) {
      await updateQuantity(productId, currentQuantity - 1);
    }
  };

  // Checkout
  const checkout = async (paymentMethod = "COD") => {
    try {
      setError(null);
      const result = await processCheckout({ userId, paymentMethod });
      alert("✅ Checkout successful!");
      setCart({ items: [], totalPrice: 0 });
      return result;
    } catch (error) {
      console.error("❌ Checkout failed:", error);
      setError(error.message);
      throw error;
    }
  };

  const getItemCount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce(
      (total, item) => total + (item.product?.price || 0) * item.quantity,
      0
    );
  };

  // Get individual item quantity
  const getItemQuantity = (productId) => {
    if (!cart || !cart.items) return 0;
    const item = cart.items.find(item => item.product?._id === productId);
    return item ? item.quantity : 0;
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return getItemQuantity(productId) > 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
        fetchCart,
        getItemCount,
        getTotal,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        getItemQuantity,
        isInCart,
        clearError: () => setError(null)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};