import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const initialState = {
  items: [], // { id, title, price, quantity, image, thumbnail }
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case 'REMOVE_FROM_CART': {
      const existing = state.items.find(item => item.id === action.payload);
      if (!existing) return state;

      if (existing.quantity === 1) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload),
        };
      } else {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => dispatch({ type: 'ADD_TO_CART', payload: item });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ cart: state, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
