import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  // Get user from localStorage
  const userStr = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  // Check if user is logged in
  if (!token || !userStr) {
    // Redirect to login page if not logged in
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    
    // Check if user is admin (by role or username)
    if (user.role === 'admin' || user.username === 'ShabeeCakeHub') {
      return children;
    } else {
      // Redirect to home if not admin
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    // If error parsing user, redirect to login
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedAdminRoute;

