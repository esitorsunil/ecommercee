import { ShippingProvider } from './AddressContext';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import { EditModeProvider } from './EditModeContext';
import { PaymentProvider } from './PaymentContext';
import { ProductProvider } from './ProductContext';
import { SearchProvider } from './SearchContext';

const providers = [
  AuthProvider,
  SearchProvider,
  ProductProvider,
  EditModeProvider,
  CartProvider,
  PaymentProvider,
  ShippingProvider
];

const CombinedProviders = ({ children }) => {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
};

export default CombinedProviders;
