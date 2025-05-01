import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import './App.css';

function App() {
  // Vérifier si l'utilisateur est connecté en vérifiant la présence d'un utilisateur dans sessionStorage
  const isAuthenticated = () => {
    return sessionStorage.getItem('user') !== null;
  };

  return (
    <Router>
      <Routes>
        {/* Routes d'authentification */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/aboutUs" element={<SignUp />} /> {/** a modifier */ }

        {/* Route protégée pour le dashboard */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} 
        />

       <Route 
          path="/user" 
          element={isAuthenticated() ? <User /> : <Navigate to="/login" />} 
        />




        
        {/* Rediriger l'utilisateur vers login s'il n'est pas authentifié */}
        <Route path="/" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
        
        {/* Rediriger les routes inconnues vers login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;