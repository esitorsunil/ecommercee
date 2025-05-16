import React, { createContext, useContext, useReducer, useEffect } from 'react';

const SearchContext = createContext();

const initialState = {
  products: [],
  query: '',
  showDropdown: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'SET_SHOW_DROPDOWN':
      return { ...state, showDropdown: action.payload };
    case 'RESET_QUERY':
      return { ...state, query: '', showDropdown: false };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch products once on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=100');
        const data = await res.json();
        dispatch({ type: 'SET_PRODUCTS', payload: data.products || [] });
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
