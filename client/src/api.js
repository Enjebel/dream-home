import axios from 'axios';

const API = axios.create({
  // This looks for the Vercel variable first; if it's not found, it falls back to localhost
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// This piece of code automatically adds your token to every request
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;