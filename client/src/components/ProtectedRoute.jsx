import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // If no client is logged in, send them to login page
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;