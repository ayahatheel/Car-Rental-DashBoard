import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { Link, useNavigate } from 'react-router-dom';

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  if (!car) return null;

  const { id, Car_name, Seating_Capacity, price, car_fule, car_image, car_image2 } = car;

  const handleRentClick = () => {
    navigate(`/car/${id}`);
  };

  const carImageUrl = car_image ? car_image.url : '';
  const carImage2Url = car_image2 ? car_image2.url : '';

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', borderRadius: '16px', boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)', height: '100%' }}>
      <Link to={`/car/${id}?image1=${encodeURIComponent(carImageUrl)}&image2=${encodeURIComponent(carImage2Url)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardContent sx={{ flex: '1 1 auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <img src={carImageUrl} alt={Car_name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
          </Box>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontFamily: 'Tajawal, sans-serif' }}>
            {Car_name}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PeopleIcon style={{ opacity: 0.6 }} />
              <Typography variant="body2" sx={{ ml: 0.5 }}>{Seating_Capacity} ركاب</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocalGasStationIcon style={{ opacity: 0.6 }} />
              <Typography variant="body2" sx={{ ml: 0.5 }}>{car_fule}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">السعر</Typography>
            <Typography variant="h6">{price} دينار / يوم</Typography>
          </Box>
        </CardContent>
      </Link>
      <Button
        variant="contained"
        onClick={handleRentClick}
        sx={{
          color: 'white',
          width: '100%',
          backgroundColor: '#E90224',
          borderRadius: '0 0 16px 16px',
          fontFamily: 'Tajawal, sans-serif',
          padding: '10px 0',
          fontSize: '1em',
          '&:hover': {
            backgroundColor: '#ff0033',
          },
        }}
      >
        عرض التفاصيل→
      </Button>
    </Card>
  );
};

export default CarCard;
