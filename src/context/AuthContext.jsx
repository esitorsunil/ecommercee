import { createContext, useReducer, useEffect, useContext } from 'react';

const initialState = {
  authToken: null,
  user: null,
  isLoading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        authToken: action.payload.token,
        user: action.payload.user,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        authToken: null,
        user: null,
        isLoading: false,
      };
    case 'LOAD_USER':
      return {
        ...state,
        authToken: action.payload.token,
        user: action.payload.user,
        isLoading: false,
      };
    case 'FINISH_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      dispatch({
        type: 'LOAD_USER',
        payload: {
          token,
          user: JSON.parse(userData),
        },
      });
    } else {
      dispatch({ type: 'FINISH_LOADING' });
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: 'LOGIN',
      payload: { token, user },
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        authToken: state.authToken,
        user: state.user,
        login,
        logout,
        isAuthenticated: !!state.authToken,
        isLoading: state.isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
