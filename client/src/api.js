import axios from 'axios';

// We manually check if the URL ends with /api to prevent the 404 you are seeing
const getBaseURL = () => {
  let url = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  
  // Hard fix: if the URL exists but doesn't end with /api, add it
  if (url && !url.endsWith('/api')) {
    url = url.endsWith('/') ? `${url}api` : `${url}/api`;
  }
  
  return url;
};

const API = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true
});

API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    try {
      const { token } = JSON.parse(userInfo);
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error("Token parse error");
    }
  }
  return req;
});

export default API;