import { AuthProvider } from './AuthContext';
import { EditModeProvider } from './EditModeContext';
import { ProductProvider } from './ProductContext';
import { SearchProvider } from './SearchContext';

const providers = [
  AuthProvider,
  SearchProvider,
  ProductProvider,
  EditModeProvider,
];

const CombinedProviders = ({ children }) => {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
};

export default CombinedProviders;
