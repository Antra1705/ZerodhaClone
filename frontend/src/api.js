import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3002",
  withCredentials: true,
});

// Automatically attach JWT token to headers if present in localStorage or cookies
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || document.cookie.match(/token=([^;]+)/)?.[1];
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

