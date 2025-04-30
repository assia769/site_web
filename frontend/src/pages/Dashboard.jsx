// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
// import StatsOverview from '../components/StatsOverview';
// import RecipesChart from '../components/RecipesChart';
// import RatingsChart from '../components/RatingsChart';
// import PopularRecipesTable from '../components/PopularRecipesTable';
// import UserActivityChart from '../components/UserActivityChart';
// import { 
//   fetchStats, 
//   fetchPostsPerMonth, 
//   fetchRatingsDistribution, 
//   fetchPopularRecipes, 
//   fetchUserActivity,
//   logout 
// } from '../services/api';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({
//     posts: 0,
//     likes: 0,
//     saves: 0,
//     reports: 0
//   });
  
//   const [postsData, setPostsData] = useState([]);
//   const [ratingsData, setRatingsData] = useState([]);
//   const [popularRecipes, setPopularRecipes] = useState([]);
//   const [userActivity, setUserActivity] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeChart, setActiveChart] = useState('posts'); // 'posts', 'ratings', 'popular', 'users'

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // Utiliser les fonctions d'API pour récupérer les données
//         const statsData = await fetchStats();
//         setStats(statsData);
        
//         const postsData = await fetchPostsPerMonth();
//         setPostsData(postsData);
        
//         const ratingsData = await fetchRatingsDistribution();
//         setRatingsData(ratingsData);
        
//         const recipesData = await fetchPopularRecipes();
//         setPopularRecipes(recipesData);
        
//         const usersData = await fetchUserActivity();
//         setUserActivity(usersData);
        
//         setLoading(false);
//       } catch (error) {
//         console.error("Erreur lors du chargement des données du dashboard:", error);
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   // Fonction de déconnexion améliorée
//   const handleLogout = async () => {
//     try {
//       const result = await logout();
//       if (result.success) {
//         // Rediriger vers la page de connexion
//         navigate('/login');
//       }
//     } catch (error) {
//       console.log("Erreur lors de la déconnexion:", error);
//       // Forcer la redirection même en cas d'erreur
//       // (déconnexion côté client seulement)
//       //navigate('/login');
//     }
//   };

//   const renderActiveChart = () => {
//     switch (activeChart) {
//       case 'posts':
//         return <RecipesChart postsData={postsData} />;
//       case 'ratings':
//         return <RatingsChart ratingsData={ratingsData} />;
//       case 'popular':
//         return <PopularRecipesTable recipes={popularRecipes} />;
//       case 'users':
//         return <UserActivityChart userData={userActivity} />;
//       default:
//         return <RecipesChart postsData={postsData} />;
//     }
//   };

//   if (loading) {
//     return <div className="loading">Chargement des données...</div>;
//   }

//   return (
//     <div className="dashboard">
//       <Header />
      
//       <div className="container">
        
//         <StatsOverview stats={stats} />
        
//         <div className="chart-buttons">
//           <button
//             className="btn-green"
//             onClick={() => setActiveChart('posts')}
//           >
//             Recettes par mois
//           </button>
//           <button
//             className="btn-green"
//             onClick={() => setActiveChart('ratings')}
//           >
//             Distribution des notes
//           </button>
//           <button
//             className="btn-green"
//             onClick={() => setActiveChart('popular')}
//           >
//             Recettes populaires
//           </button>
//           <button
//             className="btn-green"
//             onClick={() => setActiveChart('users')}
//           >
//             Activité des utilisateurs
//           </button>
//         </div>
        
//         <div className="chart-container">
//           {renderActiveChart()}
//         </div>
//          {/* Bouton de déconnexion à la fin du dashboard */}
//          <div className="logout-container" style={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           marginTop: '30px',
//           marginBottom: '20px'
//         }}>
//           <button 
//             className="btn-logout"
//             onClick={handleLogout}
//             style={{
//               backgroundColor: '#8b0000',
//               color: 'white',
//               padding: '10px 20px',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//               fontFamily: 'serif',
//               fontSize: '16px',
//               boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)'
//             }}
//           >
//             Déconnexion
//           </button>
        
       
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import RecipesChart from '../components/RecipesChart';
import RatingsChart from '../components/RatingsChart';
import PopularRecipesTable from '../components/PopularRecipesTable';
import UserActivityChart from '../components/UserActivityChart';
import { 
  fetchStats, 
  fetchPostsPerMonth, 
  fetchRatingsDistribution, 
  fetchPopularRecipes, 
  fetchUserActivity,
  logout 
} from '../services/api';

// Import des icônes sous forme de composants personnalisés
// pour éviter d'utiliser lucide-react

const FileTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const ThumbsUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
  </svg>
);

const BookmarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
);

const FlagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
    <line x1="4" y1="22" x2="4" y2="15"></line>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const LogOutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const Dashboard = () => {
  const navigate = useNavigate();
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
        // Utiliser les fonctions d'API pour récupérer les données
        const statsData = await fetchStats();
        setStats(statsData);
        
        const postsData = await fetchPostsPerMonth();
        setPostsData(postsData);
        
        const ratingsData = await fetchRatingsDistribution();
        setRatingsData(ratingsData);
        
        const recipesData = await fetchPopularRecipes();
        setPopularRecipes(recipesData);
        
        const usersData = await fetchUserActivity();
        setUserActivity(usersData);
        
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des données du dashboard:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Fonction de déconnexion améliorée
  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        // Rediriger vers la page de connexion
        navigate('/login');
      }
    } catch (error) {
      console.log("Erreur lors de la déconnexion:", error);
      // Forcer la redirection même en cas d'erreur
      // (déconnexion côté client seulement)
      //navigate('/login');
    }
  };

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
    return (
      <div className="loading-container" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <div className="loading-spinner" style={{ 
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #8b0000',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <span style={{ marginLeft: '15px', fontFamily: 'serif', fontSize: '18px' }}>
          Chargement des données...
        </span>
      </div>
    );
  }

  // Nouveau style pour les cartes de statistiques
  const statCardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  };

  // Fonction supprimée car remplacée par du code en ligne
  // const getIconForChart = (chartType) => {
  //   switch (chartType) {
  //     case 'posts':
  //       return <Calendar size={20} />;
  //     case 'ratings':
  //       return <Star size={20} />;
  //     case 'popular':
  //       return <Award size={20} />;
  //     case 'users':
  //       return <Users size={20} />;
  //     default:
  //       return null;
  //   }
  // }; 

  return (
    <div className="dashboard" style={{ 
      backgroundColor: '#8b0000',
      minHeight: '100vh',
      fontFamily: 'serif'
    }}>
      <Header />
      
      <div className="container" style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '20px' 
      }}>
        
        {/* StatsOverview modifié avec des icônes */}
        <div className="stats-overview" style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={statCardStyle} className="stat-card hover:shadow-lg">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#8b0000',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              marginBottom: '10px'
            }}>
              <FileTextIcon />
            </div>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: 'bold', 
              color: '#555',
              marginBottom: '5px'
            }}>
              Recettes
            </h3>
            <p style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#8b0000',
              margin: '0'
            }}>
              {stats.posts}
            </p>
          </div>

          <div style={statCardStyle} className="stat-card hover:shadow-lg">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#8b0000',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              marginBottom: '10px'
            }}>
              <ThumbsUpIcon />
            </div>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: 'bold', 
              color: '#555',
              marginBottom: '5px'
            }}>
              J'aime
            </h3>
            <p style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#8b0000',
              margin: '0'
            }}>
              {stats.likes}
            </p>
          </div>

          <div style={statCardStyle} className="stat-card hover:shadow-lg">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#8b0000',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              marginBottom: '10px'
            }}>
              <BookmarkIcon />
            </div>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: 'bold', 
              color: '#555',
              marginBottom: '5px'
            }}>
              Sauvegardées
            </h3>
            <p style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#8b0000',
              margin: '0'
            }}>
              {stats.saves}
            </p>
          </div>

          <div style={statCardStyle} className="stat-card hover:shadow-lg">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#8b0000',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              marginBottom: '10px'
            }}>
              <FlagIcon />
            </div>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: 'bold', 
              color: '#555',
              marginBottom: '5px'
            }}>
              Signalements
            </h3>
            <p style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#8b0000',
              margin: '0'
            }}>
              {stats.reports}
            </p>
          </div>
        </div>
        
        {/* Boutons de navigation améliorés */}
        <div className="chart-buttons" style={{ 
          display: 'flex', 
          justifyContent: 'center',
          gap: '15px',
          flexWrap: 'wrap',
          marginBottom: '25px'
        }}>
          {[
            { id: 'posts', label: 'Recettes par mois' },
            { id: 'ratings', label: 'Distribution des notes' },
            { id: 'popular', label: 'Recettes populaires' },
            { id: 'users', label: 'Activité des utilisateurs' }
          ].map(btn => (
            <button
              key={btn.id}
              className={`btn-chart ${activeChart === btn.id ? 'active' : ''}`}
              onClick={() => setActiveChart(btn.id)}
              style={{               

                backgroundColor: activeChart === btn.id ? '#8b0000' : 'green',
                color: activeChart === btn.id ? '#fff' : '#333',
                padding: '12px 20px',
                border: activeChart === btn.id ? 'none' : '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'serif',
                fontSize: '15px',
                fontWeight: '600',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
            >
              {btn.id === 'posts' && <CalendarIcon />}
              {btn.id === 'ratings' && <StarIcon />}
              {btn.id === 'popular' && <AwardIcon />}
              {btn.id === 'users' && <UsersIcon />}
              {btn.label}
            </button>
          ))}
        </div>
        
        {/* Conteneur du graphique amélioré */}
        <div className="chart-container" style={{ 
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '25px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          marginBottom: '30px'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <div style={{ 
              backgroundColor: '#8b0000',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px'
            }}>
              {activeChart === 'posts' && <CalendarIcon />}
              {activeChart === 'ratings' && <StarIcon />}
              {activeChart === 'popular' && <AwardIcon />}
              {activeChart === 'users' && <UsersIcon />}
            </div>
            <h2 style={{ 
              margin: '0',
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              {activeChart === 'posts' && 'Recettes publiées par mois'}
              {activeChart === 'ratings' && 'Distribution des évaluations'}
              {activeChart === 'popular' && 'Recettes les plus populaires'}
              {activeChart === 'users' && 'Activité des utilisateurs'}
            </h2>
          </div>
          {renderActiveChart()}
        </div>
        
        {/* Bouton de déconnexion amélioré */}
        <div className="logout-container" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginTop: '20px',
          marginBottom: '30px'
        }}>
          <button 
            className="btn-logout"
            onClick={handleLogout}
            style={{
              backgroundColor: 'green', 
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'serif',
              fontSize: '16px',
              fontWeight: '600',
              boxShadow: '0px 3px 8px rgba(139, 0, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#630000';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#8b0000';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <LogOutIcon />
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;