import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const userData = localStorage.getItem('devburger:userData');
  const token = userData ? JSON.parse(userData).token : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
