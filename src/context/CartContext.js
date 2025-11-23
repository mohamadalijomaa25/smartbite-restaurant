import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const placeOrder = () => {
    if (cartItems.length === 0) return null;

    const orderId = Date.now().toString(); 
    const newOrder = {
      id: orderId,
      items: cartItems,
      total: cartTotal,
      createdAt: new Date().toISOString(),
      status: "received", 
    };

    setOrders((prev) => [...prev, newOrder]);
    clearCart();
    return orderId;
  };

  const getOrderById = (id) => orders.find((o) => o.id === id);

 
  const advanceOrderStatus = (orderId) => {
    const statuses = ["received", "preparing", "out-for-delivery", "completed"];

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        const currentIndex = statuses.indexOf(order.status);
        if (currentIndex === -1 || currentIndex === statuses.length - 1) {
         
          return order;
        }

        const nextStatus = statuses[currentIndex + 1];
        return { ...order, status: nextStatus };
      })
    );
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    placeOrder,
    getOrderById,
    advanceOrderStatus, 
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
