import React, { createContext, useState, useContext } from "react";

// Create the context
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// Context provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add a service to the cart
  const addToCart = (service) => {
    console.log("Adding to cart:", service);
    setCartItems([...cartItems, service]);
  };

  // Function to remove a service from the cart
  const removeFromCart = (serviceId) => {
    const updatedCart = cartItems.filter((item) => item.id !== serviceId);
    setCartItems(updatedCart);
    calculateTotalPrice();
    calculateTotalTime();
  };

  // Function to calculate the total cost
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };
  const calculateTotalTime = () => {
    return cartItems.reduce((duration, item) => duration + item.duration, 0);
  };

  // Context value
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    totalPrice: calculateTotalPrice(),
    totalTime: calculateTotalTime(),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
