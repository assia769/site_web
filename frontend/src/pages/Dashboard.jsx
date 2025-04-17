// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import StatsOverview from '../components/StatsOverview';
import RecipesChart from '../components/RecipesChart';
import RatingsChart from '../components/RatingsChart';
import PopularRecipesTable from '../components/PopularRecipesTable';
import UserActivityChart from '../components/UserActivityChart';

const Dashboard = () => {
  const [stats, setStats] = useState({
    posts: 0,
    likes: 0,
    saves: 0,
    reports: 0
  });
  
  const [postsData, setPostsData] = useState([]);
  const [ratingsData, setRatingsData] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState('posts'); // 'posts', 'ratings', 'popular', 'users'

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsResponse = await axios.get('http://localhost:8000/api/dashboard/stats');
        setStats(statsResponse.data);
        
        const postsResponse = await axios.get('http://localhost:8000/api/dashboard/posts-per-month');
        setPostsData(postsResponse.data);
        
        const ratingsResponse = await axios.get('http://localhost:8000/api/dashboard/ratings-distribution');
        setRatingsData(ratingsResponse.data);
        
        const recipesResponse = await axios.get('http://localhost:8000/api/dashboard/popular-recipes');
        setPopularRecipes(recipesResponse.data);
        
        const usersResponse = await axios.get('http://localhost:8000/api/dashboard/user-activity');
        setUserActivity(usersResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des données du dashboard:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const renderActiveChart = () => {
    switch (activeChart) {
      case 'posts':
        return <RecipesChart postsData={postsData} />;
      case 'ratings':
        return <RatingsChart ratingsData={ratingsData} />;
      case 'popular':
        return <PopularRecipesTable recipes={popularRecipes} />;
      case 'users':
        return <UserActivityChart userData={userActivity} />;
      default:
        return <RecipesChart postsData={postsData} />;
    }
  };

  if (loading) {
    return <div className="loading">Chargement des données...</div>;
  }

  return (
    <div className="dashboard">
      <Header />
      <div className="container">
        <StatsOverview stats={stats} />
        
        <div className="chart-buttons">
          <button 
            className="btn-green" 
            onClick={() => setActiveChart('posts')}
          >
            Recettes par mois
          </button>
          <button 
            className="btn-green" 
            onClick={() => setActiveChart('ratings')}
          >
            Distribution des notes
          </button>
          <button 
            className="btn-green" 
            onClick={() => setActiveChart('popular')}
          >
            Recettes populaires
          </button>
          <button 
            className="btn-green" 
            onClick={() => setActiveChart('users')}
          >
            Activité des utilisateurs
          </button>
        </div>
        
        <div className="chart-container">
          {renderActiveChart()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;