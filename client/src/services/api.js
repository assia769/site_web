// frontend/src/services/api.js
import axios from 'axios';

// Configuration de base pour axios
const instance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json'
  }
});

// Add request interceptor to handle CSRF token
instance.interceptors.request.use(async (config) => {
  // Don't modify headers for file uploads
  if (config.data instanceof FormData) {
    return config;
  }

  // For other requests, set JSON content type
  config.headers['Content-Type'] = 'application/json';
  return config;
});

export const getCsrfToken = async () => {
  try {
    const response = await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true
    });
    return response;
  } catch (error) {
    console.error('Erreur lors de la récupération du token CSRF:', error);
    throw error;
  }
};

// Fonction utilitaire pour récupérer le token CSRF du cookie
export const getXsrfToken = () => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
  
  return token ? decodeURIComponent(token) : null;
};

// Fonctions d'authentification
export const login = async (email, password) => {
  try {
    // Récupérer d'abord le cookie CSRF
    await getCsrfToken();
    
    // Récupérer le token depuis le cookie
    const token = getXsrfToken();
    
    // Envoyer la requête de login avec le token dans l'en-tête
    const response = await instance.post('/api/login',
      { email, password },
      {
        headers: {
          'X-XSRF-TOKEN': token
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    // Récupérer d'abord le cookie CSRF
    await getCsrfToken();
    
    // Récupérer le token depuis le cookie
    const token = getXsrfToken();
    
    const response = await instance.post('/api/register', 
      userData,
      {
        headers: {
          'X-XSRF-TOKEN': token
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    throw error;
  }
};

export const logout = async () => {
  console.log("Début de la procédure de déconnexion");
  
  try {
    // Récupération du token d'authentification stocké
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (!token) {
      console.log("Aucun token trouvé, déconnexion locale uniquement");
      // Nettoyage local quand même
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      return { success: true, message: 'Déconnexion locale effectuée' };
    }
    
    console.log("Récupération du cookie CSRF...");
    // S'assurer d'avoir un token CSRF à jour
    await axios.get('/sanctum/csrf-cookie');
    console.log("Token CSRF récupéré: OUI (valeur non affichée pour sécurité)");
    
    console.log("Envoi de la requête de déconnexion...");
    // Configurer les en-têtes avec le token d'authentification
    const response = await axios.post('/api/logout', {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    // Nettoyage après déconnexion réussie
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    
    return response.data;
  } catch (error) {
    console.log("Erreur lors de la déconnexion:", error);
    console.log("Détails de la réponse:", error.response);
    
    // Dans le cas d'une erreur 401, on nettoie quand même localement
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      return { success: true, message: 'Déconnexion locale effectuée' };
    }
    
    throw error;
  }
};

// Fonctions existantes pour le dashboard
export const fetchStats = async () => {
  try {
    const response = await instance.get('/api/dashboard/stats');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw error;
  }
};

export const fetchPostsPerMonth = async () => {
  try {
    const response = await instance.get('/api/dashboard/posts-per-month');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données de publications par mois:', error);
    throw error;
  }
};

export const fetchRatingsDistribution = async () => {
  try {
    const response = await instance.get('/api/dashboard/ratings-distribution');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la distribution des évaluations:', error);
    throw error;
  }
};

export const fetchPopularRecipes = async () => {
  try {
    const response = await instance.get('/api/dashboard/popular-recipes');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des recettes populaires:', error);
    throw error;
  }
};

export const fetchUserActivity = async () => {
  try {
    const response = await instance.get('/api/dashboard/user-activity');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'activité des utilisateurs:', error);
    throw error;
  }
};
// Récupérer tous les utilisateurs
export const fetchUsers = async () => {
  try {
    const response = await fetch('/api/users');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des utilisateurs');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Supprimer un utilisateur
export const deleteUser = async (id) => {
  try {
    await getCsrfToken();
    const token = getXsrfToken();
    const authToken = localStorage.getItem('token') || sessionStorage.getItem('token');

    const response = await instance.delete(`/api/users/${id}`, {
      headers: {
        'X-XSRF-TOKEN': token,
        'Authorization': `Bearer ${authToken}`
      },
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Add profile picture update function
export const updateProfilePicture = async (userId, file) => {
  try {
    // Get CSRF token first
    await getCsrfToken();
    const token = getXsrfToken();

    const formData = new FormData();
    formData.append('profilpic_u', file);

    const response = await instance.put(`/api/userspic/${userId}`, formData, {
      headers: {
        'X-XSRF-TOKEN': token,
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error updating profile picture:', error);
    throw error;
  }
};

export { instance };