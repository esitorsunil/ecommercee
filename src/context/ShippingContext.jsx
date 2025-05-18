import React, { createContext, useReducer, useContext } from 'react';

const ShippingContext = createContext();

const initialState = {
  addresses: [],
  selectedAddress: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ADDRESS':
      return { ...state, addresses: [...state.addresses, action.payload] };
    case 'EDIT_ADDRESS':
      const updated = [...state.addresses];
      updated[action.payload.index] = action.payload.address;
      return { ...state, addresses: updated };
    case 'SET_SELECTED_ADDRESS':
      return { ...state, selectedAddress: action.payload };
    case 'LOAD_ADDRESSES':
      return action.payload;
    default:
      return state;
  }
};

export const ShippingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ShippingContext.Provider value={{ state, dispatch }}>
      {children}
    </ShippingContext.Provider>
  );
};

export const useShipping = () => useContext(ShippingContext);
