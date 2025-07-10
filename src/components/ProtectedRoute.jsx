import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const authToken = useSelector((state) => state.auth.authToken);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isAuthenticated = !!authToken;

  if (isLoading) return null;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
