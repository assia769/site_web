import axios from 'axios';

// Définissez l'URL de base pour toutes les requêtes API
axios.defaults.baseURL = 'http://localhost:8000'; 
// Configurez axios pour envoyer les cookies avec chaque requête (important pour l'authentification)
axios.defaults.withCredentials = true;

// Ajouter des intercepteurs pour la gestion globale des erreurs
axios.interceptors.response.use(
  response => response,
  error => {
    // Gérer les erreurs d'authentification globalement
    if (error.response && error.response.status === 401) {
      // Rediriger vers la page de login si non authentifié
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axios;