// /frontend/src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api'
});

// Attach token automatically if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;