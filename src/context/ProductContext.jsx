import { createContext, useReducer } from 'react';

const ProductContext = createContext();

const initialState = {
  products: [],
  visibleProducts: [],
  page: 0,
  totalProducts: 0,
};

const productReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCTS':
      const updatedProducts = [...state.products, ...action.payload.products];
      return {
        ...state,
        products: updatedProducts,
        visibleProducts: updatedProducts,
        totalProducts: action.payload.total,
      };
    case 'INCREMENT_PAGE':
      return {
        ...state,
        page: state.page + 1,
      };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
