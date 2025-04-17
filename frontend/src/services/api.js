// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const fetchStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard/stats`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw error;
  }
};

export const fetchPostsPerMonth = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard/posts-per-month`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données de publications par mois:', error);
    throw error;
  }
};

export const fetchRatingsDistribution = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard/ratings-distribution`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la distribution des évaluations:', error);
    throw error;
  }
};

export const fetchPopularRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard/popular-recipes`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des recettes populaires:', error);
    throw error;
  }
};

export const fetchUserActivity = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard/user-activity`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'activité des utilisateurs:', error);
    throw error;
  }
};