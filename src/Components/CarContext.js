import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const CarContext = createContext();

export const useCarContext = () => {
  return useContext(CarContext);
};

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('https://x8ki-letl-twmt.n7.xano.io/api:IzeJrQwI/carinfo');
        console.log('Fetched Cars:', response.data); // Add this line to log fetched data
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchCars();
  }, []);

  const handleFavoriteToggle = (id) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <CarContext.Provider value={{ cars, favorites, handleFavoriteToggle }}>
      {children}
    </CarContext.Provider>
  );
};
