import { AuthProvider } from './AuthContext';
import { EditModeProvider } from './EditModeContext';
import { ProductProvider } from './ProductContext';
import { SearchProvider } from './SearchContext';

const CombinedProviders = ({ children }) => {
  return (
    <AuthProvider>
      <SearchProvider>
      <ProductProvider>
      <EditModeProvider>
        {children}
      </EditModeProvider>
      </ProductProvider>
      </SearchProvider>
    </AuthProvider>
  );
};

export default CombinedProviders;
