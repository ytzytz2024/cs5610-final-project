import axios from "axios";

// Create an axios instance with the base URL
const API = axios.create({
  // Use relative path for production and localhost for development
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Add a request interceptor to include the authentication token in the headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API services for recipes
export const RecipeService = {
  getAllRecipes: () => API.get("/recipes"),
  getRecipeById: (id) => API.get(`/recipes/${id}`),
  searchRecipes: (query) => API.get(`/recipes/search?query=${query}`),
  createRecipe: (formData) => API.post("/recipes", formData),
  updateRecipe: (id, formData) => API.put(`/recipes/${id}`, formData),
  deleteRecipe: (id) => API.delete(`/recipes/${id}`),
  getRecipesByUser: (userId) => API.get(`/recipes/user/${userId}`),
};

// API services for users
export const UserService = {
  register: (userData) => API.post("/users/register", userData),
  login: (credentials) => API.post("/users/login", credentials),
  getProfile: () => API.get("/users/profile"),
  updateProfile: (userData) => API.put("/users/profile", userData),
  saveRecipe: (recipeId) => API.post("/users/save-recipe", { recipeId }),
  unsaveRecipe: (recipeId) => API.delete(`/users/unsave-recipe/${recipeId}`),
  getSavedRecipes: () => API.get("/users/saved-recipes"),
};

// API services for reviews
export const ReviewService = {
  getReviewsByRecipe: (recipeId) => API.get(`/reviews/recipe/${recipeId}`),
  createReview: (reviewData) => API.post("/reviews", reviewData),
  updateReview: (id, reviewData) => API.put(`/reviews/${id}`, reviewData),
  deleteReview: (id) => API.delete(`/reviews/${id}`),
};

// API services for restaurants
export const RestaurantService = {
  getNearbyRestaurants: (params) => API.get('/restaurants/nearby', { params }),
};

export default API;