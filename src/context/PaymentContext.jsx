import React, { createContext, useReducer, useContext } from 'react';

const PaymentContext = createContext();

const initialState = {
  paymentMethod: '',
};

const init = () => {
  const stored = localStorage.getItem('selectedPaymentMethod');
  return { paymentMethod: stored || '' };
};

const paymentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PAYMENT_METHOD':
      localStorage.setItem('selectedPaymentMethod', action.payload); // persist in localStorage
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};

export const PaymentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paymentReducer, initialState, init);

  return (
    <PaymentContext.Provider value={{ state, dispatch }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => useContext(PaymentContext);
