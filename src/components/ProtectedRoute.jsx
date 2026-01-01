import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../main';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useContext(Context);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required, check if user has that role
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to home or unauthorized page based on user role
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user?.role === 'doctor') {
      return <Navigate to="/doctor/dashboard" replace />;
    } else if (user?.role === 'patient') {
      return <Navigate to="/patient/dashboard" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;