import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  rememberMe: false,
  showPassword: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_REMEMBER_ME':
      return { ...state, rememberMe: action.payload };
    case 'TOGGLE_SHOW_PASSWORD':
      return { ...state, showPassword: !state.showPassword };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const value = {
    rememberMe: state.rememberMe,
    showPassword: state.showPassword,
    setRememberMe: (value) => dispatch({ type: 'TOGGLE_REMEMBER_ME', payload: value }),
    setShowPassword: () => dispatch({ type: 'TOGGLE_SHOW_PASSWORD' }),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
