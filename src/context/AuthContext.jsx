import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  rememberMe: false,
  showPassword: false,
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
};
const authReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_REMEMBER_ME':
      return { ...state, rememberMe: action.payload };
    case 'TOGGLE_SHOW_PASSWORD':
      return { ...state, showPassword: !state.showPassword };
    case 'LOGIN':
      if (state.rememberMe) {
        localStorage.setItem('isAuthenticated', true);
      }
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      localStorage.removeItem('isAuthenticated');
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const value = {
  rememberMe: state.rememberMe,
  showPassword: state.showPassword,
  isAuthenticated: state.isAuthenticated,
  setRememberMe: (value) => dispatch({ type: 'TOGGLE_REMEMBER_ME', payload: value }),
  setShowPassword: () => dispatch({ type: 'TOGGLE_SHOW_PASSWORD' }),
  login: () => dispatch({ type: 'LOGIN' }),
  logout: () => dispatch({ type: 'LOGOUT' }),
};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
