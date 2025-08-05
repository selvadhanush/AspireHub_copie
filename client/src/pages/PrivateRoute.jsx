// components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // FIXED here

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
