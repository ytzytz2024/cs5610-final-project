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