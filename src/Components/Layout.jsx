import React from 'react';
import Routers from '../routers/Routers';
import { Box, CssBaseline, Drawer, Toolbar, List, ListItem, ListItemText, Divider, Typography, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Layout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', borderBottom: '1px solid #e0e0e0', mb: 2, bgcolor: 'white' }}>
          <Button variant="contained" sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: '#d32f2f' } }}>
            تسجيل الخروج
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              variant="outlined"
              placeholder="بحث..."
              size="small"
              sx={{ bgcolor: 'white', borderRadius: '4px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'gray' }, '&:hover fieldset': { borderColor: 'black' } } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Toolbar>
        <Routers />
      </Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'linear-gradient(to bottom, #ef5350, #ff867c)',
            color: '#fff',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar sx={{ minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" noWrap component="div">
            IraqiWheels
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {[
            { text: 'الرئيسية', path: 'home' },
            { text: 'قائمة السيارات', path: 'listing' },
            { text: 'طلبات التاجير', path: 'approve' },
            // { text: 'رفع سيارة', path: 'carform' },
            { text: ' رفع سيارة ', path: 'CarPostForm' }
          ].map((item, index) => (
            <ListItem button key={item.text} component={Link} to={`/${item.path}`}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Layout;
