import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api';
import PropertyCard from '../components/PropertyCard';

const Favorites = () => {
  const { favorites } = useContext(AuthContext);
  const [favProperties, setFavProperties] = useState([]);

  useEffect(() => {
    const loadFavs = async () => {
      try {
        const { data } = await API.get('/properties');
        // Filter properties to only show the ones in the favorites list
        const filtered = data.filter(p => favorites.includes(p._id));
        setFavProperties(filtered);
      } catch (err) {
        console.error(err);
      }
    };
    loadFavs();
  }, [favorites]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
      {favProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {favProperties.map(prop => <PropertyCard key={prop._id} property={prop} />)}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">You haven't favorited any homes yet.</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;