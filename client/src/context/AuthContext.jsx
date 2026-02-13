import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('userInfo');
    const savedFavs = localStorage.getItem('favorites');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
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