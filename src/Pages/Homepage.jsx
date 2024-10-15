import React from 'react';
import CarCard from '../Widgets/CarCard';
import { useCarContext } from '../Components/CarContext';
import DashboardStats from '../Widgets/DashboardStats';
import { Box, Typography, Grid } from '@mui/material';
import Calendar from '../Widgets/Calendar';
// import TaskList from '../Widgets/TaskList';
import TaskAdd from '../Widgets/TaskAdd';
import { TaskProvider } from './TaskContext';

const HomePage = () => {
  const { cars, favorites, handleFavoriteToggle } = useCarContext();

  return (
    <TaskProvider>
      <Box sx={{ p: 1 }}>
        <DashboardStats />
        {/* <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontFamily: 'Tajawal, sans-serif' }}>
          لوحة القيادة
        </Typography> */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            
            <TaskAdd />
          </Grid>
          <Grid item xs={12} md={9}>
            <Calendar />
          </Grid>
          <Grid item xs={12} sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontFamily: 'Tajawal, sans-serif' }}>
              السيارات المتاحة للإيجار
            </Typography>
            <Grid container spacing={2}>
              {cars.map((car) => (
                <Grid item xs={12} sm={6} md={4} key={car.id}>
                  <CarCard
                    car={car}
                    onFavoriteToggle={handleFavoriteToggle}
                    isFavorited={favorites.has(car.id)}
                    className="car-card"
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </TaskProvider>
  );
};

export default HomePage;
