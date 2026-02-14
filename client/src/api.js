import axios from 'axios';

const API = axios.create({
  // This uses the Vercel variable which includes /api
  // Fallback to localhost if the variable isn't found
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Automatically adds the token to every request for protected routes
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    try {
      const { token } = JSON.parse(userInfo);
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Auth token parse error:", error);
    }
  }
  return req;
});

export default API;