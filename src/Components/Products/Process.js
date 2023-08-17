import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const  CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const updateCartItem = (itemId, quantity) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      return updatedCartItems;
    });
  };

  const addToCart = (item) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        const updatedCartItems = prevCartItems.map((item) =>
          item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        return updatedCartItems;
      } else {
        return [...prevCartItems, { ...item, quantity: 1 }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, updateCartItem, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}