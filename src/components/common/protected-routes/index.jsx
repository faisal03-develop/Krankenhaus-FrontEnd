import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../../../main';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useContext(Context);
  
  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  
  if (requiredRole && user?.role !== requiredRole) {
  
    if (user?.role === 'admin') {
      toast.error('Access denied. user cannot access this page.');
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user?.role === 'doctor') {
      toast.error('Access denied. user cannot access this page.');
      return <Navigate to="/doctor/dashboard" replace />;
    } else if (user?.role === 'patient') {
      toast.error('Access denied. user cannot access this page.');
      return <Navigate to="/patient/dashboard" replace />;
    } else {
      toast.error('Access denied. user cannot access this page.');
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;