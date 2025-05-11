import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRole }) => {
  // Vérifier si l'utilisateur est connecté et a le bon rôle
  const isAuthenticated = sessionStorage.getItem('user') !== null;
  const userRole = sessionStorage.getItem('role');
  
  // Si pas authentifié, rediriger vers login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Si un rôle spécifique est requis et que l'utilisateur n'a pas ce rôle
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Si tout va bien, afficher le composant enfant
  return <Outlet />;
};

export default ProtectedRoute;