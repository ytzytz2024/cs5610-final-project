// client/src/services/api.js

import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react"; // Import useAuth0 hook, not individual functions

// Create an axios instance with the base URL
const API = axios.create({
  // Use relative path for production and localhost for development
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Factory function to create authorized API instance with the token
// NOTE: This must be used within a component/hook where useAuth0 is available
export const createAuthorizedAPI = async () => {
  try {
    // Get the useAuth0 hook from the current context
    const { getAccessTokenSilently } = useAuth0();
    
    // Get token from Auth0
    const token = await getAccessTokenSilently();
    
    // Return a new instance with the token
    return axios.create({
      baseURL: import.meta.env.VITE_API_URL || '/api',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Failed to get access token', error);
    // Return regular API instance if token retrieval fails
    return API;
  }
};

// API services for recipes
export const RecipeService = {
  // Public endpoints - no auth needed
  getAllRecipes: () => API.get("/recipes"),
  getRecipeById: (id) => API.get(`/recipes/${id}`),
  searchRecipes: (query) => API.get(`/recipes/search?query=${query}`),
  getRecipesByUser: (userId) => API.get(`/recipes/user/${userId}`),
  
  // Protected endpoints - need auth token
  createRecipe: async (formData, getToken) => {
    const token = await getToken();
    return axios.post(
      `${API.defaults.baseURL}/recipes`, 
      formData, 
      { headers: { Authorization: `Bearer ${token}` }}
    );
  },
  updateRecipe: async (id, formData, getToken) => {
    const token = await getToken();
    return axios.put(
      `${API.defaults.baseURL}/recipes/${id}`, 
      formData, 
      { headers: { Authorization: `Bearer ${token}` }}
    );
  },
  deleteRecipe: async (id, getToken) => {
    const token = await getToken();
    return axios.delete(
      `${API.defaults.baseURL}/recipes/${id}`, 
      { headers: { Authorization: `Bearer ${token}` }}
    );
  },
};

// API services for users
export const UserService = {
  // All user endpoints need auth
  getProfile: async (getToken) => {
    const token = await getToken();
    return axios.get(
      `${API.defaults.baseURL}/users/profile`, 
      { headers: { Authorization: `Bearer ${token}` }}
    );
  },
  updateProfile: async (userData, getToken) => {
    const token = await getToken();
    return axios.put(
      `${API.defaults.baseURL}/users/profile`, 
      userData, 
      { headers: { Authorization: `Bearer ${token}` }}
    );
  },
  saveRecipe: async (recipeId, getToken) => {
    const token = await getToken();
    return axios.post(
      `${API.defaults.baseURL}/users/save-recipe`, 
      { recipeId }, 
      { headers: { Authorization: `Bearer ${token}` }}
    );
  },
  unsaveRecipe: async (recipeId, getToken) => {
    const token = await getToken();
    return axios.delete(
      `${API.defaults.baseURL}/users/unsave-recipe/${recipeId}`, 
      { headers: { Authorization: `Bearer ${token}` }}
    );
  },
  getSavedRecipes: async (getToken) => {
    const token = await getToken();
    return axios.get(
      `${API.defaults.baseURL}/users/saved-recipes`, 
      { headers: { Authorization: `Bearer ${token}` }}
    );
  },
};

// API services for reviews
export const ReviewService = {
  // Public endpoints - no auth needed
  getReviewsByRecipe: (recipeId) => API.get(`/reviews/recipe/${recipeId}`),
  getReviewsByUser: (userId) => API.get(`/reviews/user/${userId}`),
  getReviewById: (id) => API.get(`/reviews/${id}`),
  
  // Protected endpoints - need auth
  createReview: async (reviewData, getToken) => {
    const token = await getToken();
    return axios.post(
      `${API.defaults.baseURL}/reviews`, 
      reviewData, 
      { headers: { Authorization: `Bearer ${token}` }}
    );
  },
  updateReview: async (id, reviewData, getToken) => {
    const token = await getToken();
    return axios.put(
      `${API.defaults.baseURL}/reviews/${id}`, 
      reviewData, 
      { headers: { Authorization: `Bearer ${token}` }}
    );
  },
  deleteReview: async (id, getToken) => {
    const token = await getToken();
    return axios.delete(
      `${API.defaults.baseURL}/reviews/${id}`, 
      { headers: { Authorization: `Bearer ${token}` }}
    );
  },
};

// API services for restaurants
export const RestaurantService = {
  getNearbyRestaurants: (params) => API.get('/restaurants/nearby', { params }),
};

export default API;