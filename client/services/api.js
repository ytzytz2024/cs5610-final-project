import axios from 'axios';

// Create an axios instance with the base URL
const API = axios.create({
  baseURL: 'http://localhost:5001/api',
});

// Add a request interceptor to include the authentication token in the headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API services for recipes
export const RecipeService = {
    getAllRecipes: () => API.get('/recipes'),
    getRecipeById: (id) => API.get(`/recipes/${id}`),
    searchRecipes: (query) => API.get(`/recipes/search?query=${query}`),
    createRecipe: (formData) => API.post('/recipes', formData),
    updateRecipe: (id, formData) => API.put(`/recipes/${id}`, formData),
    deleteRecipe: (id) => API.delete(`/recipes/${id}`),
    getRecipesByUser: (userId) => API.get(`/recipes/user/${userId}`),
  };