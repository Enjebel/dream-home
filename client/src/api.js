import axios from 'axios';

// This logic ensures the /api suffix is ALWAYS present
const getBaseURL = () => {
  const envURL = import.meta.env.VITE_API_URL;
  if (envURL) return envURL;
  
  // Fallback for local development
  return 'http://localhost:5000/api';
};

const API = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true
});

// Add the token to every request automatically
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    try {
      const parsed = JSON.parse(userInfo);
      if (parsed && parsed.token) {
        req.headers.Authorization = `Bearer ${parsed.token}`;
      }
    } catch (e) {
      console.error("Token parse error");
    }
  }
  return req;
});

export default API;