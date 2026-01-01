import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const getAdminToken = () => {
    const cookies = document.cookie.split(';');
    const adminTokenCookie = cookies.find(cookie => 
      cookie.trim().startsWith('adminToken=')
    );
    return adminTokenCookie ? adminTokenCookie.split('=')[1] : null;
  };

  const adminToken = getAdminToken();
  
  return adminToken ? children : <Navigate to="/login" replace />;
};

export default AdminProtectedRoute;