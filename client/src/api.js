import axios from 'axios';

const getBaseURL = () => {
  // Prioritizes the Vercel environment variable
  let url = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  
  // Safety check: Ensures /api is always at the end
  if (url && !url.endsWith('/api')) {
    url = url.endsWith('/') ? `${url}api` : `${url}/api`;
  }
  
  return url;
};

const API = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true
});

// Interceptor to attach the JWT token to every request
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    try {
      const parsed = JSON.parse(userInfo);
      if (parsed && parsed.token) {
        req.headers.Authorization = `Bearer ${parsed.token}`;
      }
    } catch (e) {
      console.error("Token parse error during request");
    }
  }
  return req;
});

export default API;