// frontend/src/components/StatsOverview.jsx
import React from 'react';

const StatsOverview = ({ stats }) => {
  return (
    <div className="stats-grid">
      <div className="stats-card">
        <h3>Total des recettes</h3>
        <p>{stats.posts}</p>
      </div>
      <div className="stats-card">
        <h3>Total des j'aime</h3>
        <p>{stats.likes}</p>
      </div>
      <div className="stats-card">
        <h3>Recettes enregistrées</h3>
        <p>{stats.saves}</p>
      </div>
      <div className="stats-card">
        <h3>Signalements</h3>
        <p>{stats.reports}</p>
      </div>
    </div>
  );
};

export default StatsOverview;