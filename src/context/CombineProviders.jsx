// src/context/CombinedProviders.jsx
import React from 'react';
import { AuthProvider } from './AuthContext';
import { EditModeProvider } from './EditModeContext';
import { ProductProvider } from './ProductContext';

const CombinedProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ProductProvider>
      <EditModeProvider>
        {children}
      </EditModeProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default CombinedProviders;
