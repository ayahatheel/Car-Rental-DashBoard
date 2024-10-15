import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    IconButton,
    Tooltip,
} from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const StyledContainer = styled(Container)({
    marginTop: '2rem',
    direction: 'rtl',
    textAlign: 'right',
    fontFamily: 'Tajawal, sans-serif',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
    },
});

const StyledTableCell = styled(TableCell)({
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
    color: '#333',
    borderBottom: '2px solid #ddd',
    textAlign: 'center',
    padding: '12px',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: '#e0e0e0',
    },
});

const StyledTableRow = styled(TableRow)({
    '&:nth-of-type(odd)': {
        backgroundColor: '#f9f9f9',
    },
    '&:hover': {
        backgroundColor: '#f1f1f1',
        cursor: 'pointer',
        transform: 'scale(1.02)',
        transition: 'all 0.2s ease',
    },
});

const StyledIconButton = styled(IconButton)({
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        transform: 'scale(1.1)',
        transition: 'all 0.2s ease',
    },
});

const Approve = () => {
    const [carRequests, setCarRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCarRequests = async () => {
            try {
                const response = await axios.get('https://x8ki-letl-twmt.n7.xano.io/api:YxBomh6q/car_req');
                setCarRequests(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching car requests:', error);
                setLoading(false);
            }
        };

        fetchCarRequests();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:YxBomh6q/car_req/${id}`);
            setCarRequests(carRequests.filter((request) => request.id !== id));
        } catch (error) {
            console.error('Error deleting car request:', error);
        }
    };

    const handleApprove = async (id) => {
        try {
            // Add your approve logic here
            console.log('Approved request with ID:', id);
        } catch (error) {
            console.error('Error approving car request:', error);
        }
    };

    return (
        <StyledContainer>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" gutterBottom>
                    لوحة طلبات تأجير السيارات
                </Typography>
            </Box>
            {loading ? (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper} sx={{ boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>تاريخ الإنشاء</StyledTableCell>
                                <StyledTableCell>اسم المستخدم</StyledTableCell>
                                <StyledTableCell>عدد الأيام</StyledTableCell>
                                <StyledTableCell>المطار</StyledTableCell>
                                <StyledTableCell>توصيل المكان</StyledTableCell>
                                <StyledTableCell>وصف المكان</StyledTableCell>
                                <StyledTableCell>شقة المكان</StyledTableCell>
                                <StyledTableCell>جواز السفر</StyledTableCell>
                                <StyledTableCell>بطاقة الهوية</StyledTableCell>
                                <StyledTableCell>الرسوم</StyledTableCell>
                                <StyledTableCell>تفاصيل اختيارية</StyledTableCell>
                                <StyledTableCell>اسم السيارة</StyledTableCell>
                                <StyledTableCell>سعر السيارة في اليوم</StyledTableCell>
                                <StyledTableCell>السعر الإجمالي</StyledTableCell>
                                <StyledTableCell>الإجراءات</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {carRequests.map((request) => (
                                <StyledTableRow key={request.id}>
                                    <TableCell>{new Date(request.created_at).toLocaleString()}</TableCell>
                                    <TableCell>{request.username}</TableCell>
                                    <TableCell>{request.daysnumber}</TableCell>
                                    <TableCell>{request.airport ? 'نعم' : 'لا'}</TableCell>
                                    <TableCell>{request.placedlivery ? 'نعم' : 'لا'}</TableCell>
                                    <TableCell>{request.placedesc}</TableCell>
                                    <TableCell>{request.placeapart}</TableCell>
                                    <TableCell>{request.pasport ? 'نعم' : 'لا'}</TableCell>
                                    <TableCell>{request.idcard ? 'نعم' : 'لا'}</TableCell>
                                    <TableCell>{request.fee}</TableCell>
                                    <TableCell>{request.optdetails}</TableCell>
                                    <TableCell>{request.carName}</TableCell>
                                    <TableCell>{request.carPricePerDay}</TableCell>
                                    <TableCell>{request.totalPrice}</TableCell>
                                    <TableCell>
                                        <Tooltip title="تسليم">
                                            <StyledIconButton
                                                color="success"
                                                onClick={() => handleApprove(request.id)}
                                                sx={{ color: 'green' }}
                                            >
                                                <CheckCircleIcon />
                                            </StyledIconButton>
                                        </Tooltip>
                                        <Tooltip title="حذف">
                                            <StyledIconButton
                                                color="error"
                                                onClick={() => handleDelete(request.id)}
                                                sx={{ color: 'red' }}
                                            >
                                                <DeleteIcon />
                                            </StyledIconButton>
                                        </Tooltip>
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </StyledContainer>
    );
};

export default Approve;
