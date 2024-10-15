import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const RecentActivity = () => {
  const activities = [
    'User logged in',
    'New car added',
    'Rental request approved',
    'Profile updated',
  ];

  return (
    <Box sx={{ p: 2, boxShadow: 1 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Recent Activity</Typography>
      <List>
        {activities.map((activity, index) => (
          <ListItem key={index}>
            <ListItemText primary={activity} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RecentActivity;
