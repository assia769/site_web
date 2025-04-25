// frontend/src/components/Header.jsx
import React from 'react';
const Header = () => {
  return (
    <header className="dashboard-header">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logoWeb.png" alt="Logo" style={{ height: '80px' }} />

            <h1>Dashboard Recettes Marocaines</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;