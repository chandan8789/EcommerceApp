import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add To Cart

  const addToCart = product => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);

      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          selected: true,
        },
      ];
    });
  };

  // Quantity Update

  const updateQuantity = (id, type) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQuantity =
              type === 'plus' ? item.quantity + 1 : item.quantity - 1;

            return {
              ...item,
              quantity: newQuantity,
            };
          }

          return item;
        })
        .filter(item => item.quantity > 0),
    );
  };

  // Single Item Select / Unselect

  const toggleSelect = id => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              selected: !item.selected,
            }
          : item,
      ),
    );
  };

  // Select All

  const selectAll = () => {
    setCartItems(prev =>
      prev.map(item => ({
        ...item,
        selected: true,
      })),
    );
  };

  // Deselect All

  const deselectAll = () => {
    setCartItems(prev =>
      prev.map(item => ({
        ...item,
        selected: false,
      })),
    );
  };

  // Remove Item

  const removeFromCart = id => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Selected Items

  const selectedItems = cartItems.filter(item => item.selected);

  // Total Amount

  const totalAmount = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Total Quantity (Header Badge)

  const totalCartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        toggleSelect,
        selectAll,
        deselectAll,
        removeFromCart,
        selectedItems,
        totalAmount,
        totalCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
