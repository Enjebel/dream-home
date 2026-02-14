import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('userInfo');
    const savedFavs = localStorage.getItem('favorites');
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('userInfo');
      }
    }
    
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs));
      } catch (e) {
        localStorage.removeItem('favorites');
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('favorites');
  };

  const toggleFavorite = (propertyId) => {
    const updatedFavs = favorites.includes(propertyId)
      ? favorites.filter(id => id !== propertyId)
      : [...favorites, propertyId];
    setFavorites(updatedFavs);
    localStorage.setItem('favorites', JSON.stringify(updatedFavs));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, favorites, toggleFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};