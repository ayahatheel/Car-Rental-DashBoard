import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Typography, Paper } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const DashboardStats = () => {
  const [userCount, setUserCount] = useState(0);
  const [carCount, setCarCount] = useState(0);
  const [rentalRequestsCount, setRentalRequestsCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('https://x8ki-letl-twmt.n7.xano.io/api:IzeJrQwI/users');
        animateValue(setUserCount, response.data.length);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    const fetchCarCount = async () => {
      try {
        const response = await axios.get('https://x8ki-letl-twmt.n7.xano.io/api:IzeJrQwI/carinfo');
        animateValue(setCarCount, response.data.length);
      } catch (error) {
        console.error('Error fetching car count:', error);
      }
    };

    const fetchRentalRequestsCount = async () => {
      try {
        const response = await axios.get('https://x8ki-letl-twmt.n7.xano.io/api:YxBomh6q/car_req');
        animateValue(setRentalRequestsCount, response.data.length);
      } catch (error) {
        console.error('Error fetching rental requests count:', error);
      }
    };

    fetchUserCount();
    fetchCarCount();
    fetchRentalRequestsCount();
  }, []);

  const animateValue = (setter, endValue) => {
    let startValue = 0;
    const duration = 1000; // Duration of the animation in milliseconds
    const increment = endValue / (duration / 10);

    const timer = setInterval(() => {
      startValue += increment;
      if (startValue >= endValue) {
        setter(Math.floor(endValue));
        clearInterval(timer);
      } else {
        setter(Math.floor(startValue));
      }
    }, 10);
  };

  const cardsData = [
    {
      title: 'عدد المستخدمين',
      count: userCount,
      icon: <PeopleIcon fontSize="large" sx={{ color: '#d7d7d7', ml: 1 }} />,
      color: 'linear-gradient(82.59deg, #f44336 0%, #d32f2f 100%)'
    },
    {
      title: 'السيارات المتاحة',
      count: carCount,
      icon: <DirectionsCarIcon fontSize="large" sx={{ color: '#d7d7d7', ml: 1 }} />,
      color: 'linear-gradient(82.59deg, #e53935 0%, #b71c1c 100%)'
    },
    {
      title: 'طلبات التأجير',
      count: rentalRequestsCount,
      icon: <RequestQuoteIcon fontSize="large" sx={{ color: '#d7d7d7', ml: 1 }} />,
      color: 'linear-gradient(82.59deg, #ef5350 0%, #c62828 100%)'
    },
    {
      title: 'عائدات الإيجار',
      count: '6,40%',
      icon: <AttachMoneyIcon fontSize="large" sx={{ color: '#d7d7d7', ml: 1 }} />,
      color: 'linear-gradient(82.59deg, #f44336 0%, #d32f2f 100%)'
    }
  ];

  return (
    <Box sx={{ pt: 5 }}>
      <Grid container spacing={3}>
        {cardsData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                background: '#ffffff',
                boxShadow: '2px 10px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: '40px 25px 20px',
                height: '100%',
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '10px',
                  background: card.color
                }
              }}
            >
              <Typography variant="h6" sx={{ fontSize: '1.2em', fontWeight: 'bold', color: '#323c43' }}>
                {card.title}
                {card.icon}
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, fontSize: '2.5em', lineHeight: '64px', color: '#323c43' }}
              >
                {card.count}
              </Typography>
              {card.subInfo && (
                <Typography variant="body2" sx={{ fontSize: '1.18em', color: '#323c43' }}>
                  {card.subInfo}
                </Typography>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardStats;
