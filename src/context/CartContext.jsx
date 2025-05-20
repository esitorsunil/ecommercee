import { createContext, useReducer, useContext, useEffect } from 'react';
const CartContext = createContext();

const initialState = {
  items: [],
  isGift: false,
  giftMessage: '',
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE_CART':
      return { ...state, ...action.payload };

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
      return { items: [], isGift: false, giftMessage: '' };

    case 'TOGGLE_GIFT':
      return { ...state, isGift: !state.isGift };

    case 'SET_GIFT_MESSAGE':
      return { ...state, giftMessage: action.payload };

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      dispatch({ type: 'INITIALIZE_CART', payload: JSON.parse(storedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (item) => {
    const simplified = {
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image || item.thumbnail,
    };
    dispatch({ type: 'ADD_TO_CART', payload: simplified });
  };

  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const toggleGiftPack = () => dispatch({ type: 'TOGGLE_GIFT' });
  const setGiftMessage = (message) => dispatch({ type: 'SET_GIFT_MESSAGE', payload: message });

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        clearCart,
        toggleGiftPack,
        setGiftMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
