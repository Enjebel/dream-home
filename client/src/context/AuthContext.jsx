import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Load user data from localStorage on initial app load
  useEffect(() => {
    const savedUser = localStorage.getItem('userInfo');
    const savedFavs = localStorage.getItem('favorites');
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user info:", error);
        localStorage.removeItem('userInfo');
      }
    }
    
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs));
      } catch (error) {
        console.error("Failed to parse favorites:", error);
        localStorage.removeItem('favorites');
      }
    }
  }, []);

  // Login handler: Saves user and token to localStorage
  const login = (userData) => {
    if (userData) {
      setUser(userData);
      localStorage.setItem('userInfo', JSON.stringify(userData));
    }
  };

  // Logout handler: Clears all session data
  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('favorites');
  };

  // Toggle favorite logic
  const toggleFavorite = (propertyId) => {
    let updatedFavs;
    if (favorites.includes(propertyId)) {
      updatedFavs = favorites.filter(id => id !== propertyId);
    } else {
      updatedFavs = [...favorites, propertyId];
    }
    setFavorites(updatedFavs);
    localStorage.setItem('favorites', JSON.stringify(updatedFavs));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, favorites, toggleFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};