import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Box, Typography, Grid, Paper, Divider, CircularProgress, Snackbar, Alert } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const CarDetails = () => {
    const { id } = useParams();
    const [carData, setCarData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:IzeJrQwI/carinfo/${id}`);
                setCarData(response.data);
            } catch (error) {
                console.error('Error fetching car data:', error);
                setError('حدث خطأ أثناء جلب بيانات السيارة');
            } finally {
                setLoading(false);
            }
        };

        fetchCarData();
    }, [id]);

    const handleEditClick = () => {
        navigate(`/car/edit/${id}`);
    };

    const handleDeleteClick = async () => {
        try {
            await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:IzeJrQwI/carinfo/${id}`);
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error deleting car data:', error);
            setError('حدث خطأ أثناء حذف بيانات السيارة');
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;

    return (
        <Paper elevation={3} sx={{ padding: 3, direction: "rtl", textAlign: "right", backgroundColor: 'transparent', border: 'transparent', boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)' }}>
            <Box sx={{ mb: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                width: "100%",
                                height: 150,
                                border: "1px dashed grey",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 1,
                                overflow: "hidden",
                            }}
                        >
                            {carData.car_image.url ? (
                                <img
                                    src={carData.car_image.url}
                                    alt="Car 1"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                    مكان الصورة
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                width: "100%",
                                height: 150,
                                border: "1px dashed grey",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 1,
                                overflow: "hidden",
                            }}
                        >
                            {carData.car_image2.url ? (
                                <img
                                    src={carData.car_image2.url}
                                    alt="Car 2"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                    مكان الصورة
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Typography variant="h5" sx={{ mt: 4, color: '#E90224', fontFamily: 'Tajawal, sans-serif' }}>{carData.catgories}</Typography>
            <Typography variant="h4" sx={{ mb: 4, fontFamily: 'Tajawal, sans-serif' }}>{carData.Car_name}</Typography>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <CalendarTodayIcon />
                <Typography variant="body1" component="span" sx={{ ml: 1, fontFamily: 'Tajawal, sans-serif' }}>
                    <strong>سنة الصنع:</strong> {carData.Year_of_Manufacture}
                </Typography>
            </Box>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <LocalGasStationIcon />
                <Typography variant="body1" component="span" sx={{ ml: 1, fontFamily: 'Tajawal, sans-serif' }}>
                    <strong>نوع الوقود:</strong> {carData.car_fule}
                </Typography>
            </Box>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <SettingsIcon />
                <Typography variant="body1" component="span" sx={{ ml: 1, fontFamily: 'Tajawal, sans-serif' }}>
                    <strong>نوع الناقل:</strong> {carData.transmission}
                </Typography>
            </Box>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <PeopleIcon />
                <Typography variant="body1" component="span" sx={{ ml: 1, fontFamily: 'Tajawal, sans-serif' }}>
                    <strong>سعة التواجد:</strong> {carData.Seating_Capacity}
                </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Tajawal, sans-serif' }}>الميزات والمرافق:</Typography>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon />
                <Typography variant="body1" component="span" sx={{ ml: 1, fontFamily: 'Tajawal, sans-serif' }}>
                    {carData.Features_and_Amenities}
                </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontFamily: 'Tajawal, sans-serif' }}>السعر</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <MonetizationOnIcon />
                    <Typography variant="body1" component="span" sx={{ ml: 1, fontFamily: 'Tajawal, sans-serif' }}>
                        {carData.price} دينار / يوم
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    sx={{
                        color: 'white',
                        backgroundColor: '#E90224',
                        borderRadius: '10px',
                        padding: '10px 20px',
                        fontSize: '1em',
                        fontFamily: 'Tajawal, sans-serif',
                        '&:hover': {
                            backgroundColor: '#ff0033',
                        },
                    }}
                    onClick={handleEditClick}
                >
                    تعديل
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        color: 'white',
                        backgroundColor: '#E90224',
                        borderRadius: '10px',
                        padding: '10px 20px',
                        fontSize: '1em',
                        fontFamily: 'Tajawal, sans-serif',
                        '&:hover': {
                            backgroundColor: '#ff0033',
                        },
                    }}
                    onClick={handleDeleteClick}
                >
                    حذف
                </Button>
            </Box>

            {success && (
                <Snackbar open={true} autoHideDuration={6000} onClose={() => setSuccess(false)}>
                    <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
                        تم حذف السيارة بنجاح!
                    </Alert>
                </Snackbar>
            )}

            {error && (
                <Snackbar open={true} autoHideDuration={6000} onClose={() => setError(null)}>
                    <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            )}
        </Paper>
    );
};

export default CarDetails;
