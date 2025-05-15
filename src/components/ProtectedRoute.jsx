import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null; // or a loader/spinner

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;