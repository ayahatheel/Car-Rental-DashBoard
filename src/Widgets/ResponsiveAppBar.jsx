import * as React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Toolbar, Typography, Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const pages = [
    { name: 'الصفحة الرئيسية', link: '/Homepage' },
    { name: 'عرض السيارات', link: '/Listing' },
    { name: 'الموافقة', link: '/Approve' },
    { name: 'رفع', link: '/CarForm' },
    { name: '44رفع', link: '/CarPostForm' },
    { name: 'تواصل معنا', link: '/Homepage' },
];

const DrawerStyled = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        backgroundColor: '#EFF5FD',
        color: 'black',
        fontFamily: 'Tajawal, sans-serif',
        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
        right: 0,
        left: 'auto',
    },
}));

const MainBox = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginRight: drawerWidth, // Adjust content to account for drawer width
}));

function ResponsiveAppBar() {
    const [open, setOpen] = React.useState(true);

    return (
        <Box sx={{ display: 'flex' }}>
            <MainBox component="main">
                <Outlet /> {/* This will render the routed component */}
            </MainBox>
            <DrawerStyled
                variant="persistent"
                anchor="right"
                open={open}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        IraqiWheels
                    </Typography>
                </Toolbar>
                <List>
                    {pages.map((page) => (
                        <ListItem button key={page.name} component={Link} to={page.link} sx={{ direction: 'rtl' }}>
                            <ListItemText primary={page.name} sx={{ textAlign: 'right', fontFamily: 'Tajawal, sans-serif' }} />
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ p: 2 }}>
                    <Button
                        component={Link}
                        to="/signup"
                        sx={{ color: 'white', width: '100%', backgroundColor: '#E90224', borderRadius: '10px', fontFamily: 'Tajawal, sans-serif' }}
                    >
                        تسجيل الخروج
                    </Button>
                </Box>
            </DrawerStyled>
        </Box>
    );
}

export default ResponsiveAppBar;
