import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NotificationBell from './notification/NotificationBell';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { NotificationContextProvider, useNotifications } from './notification/NotificationContext';

const HeaderBar: React.FC = () => {
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  const isLanding = location.pathname === '/';

  return (
    <AppBar position="sticky" color="transparent" elevation={0} className="bg-waves">
      <Toolbar sx={{ display: 'flex', gap: 2 }}>
        <Typography className="vital-title" variant="h6" sx={{ flexGrow: 1 }}>
          Vital Drop
        </Typography>
        {!isLanding && (
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
        )}
        <NotificationBell />
      </Toolbar>
    </AppBar>
  );
};

const SharedLayoutInner: React.FC = () => {
  return (
    <Box>
      <HeaderBar />
      <Box component="main" sx={{ p: { xs: 2, md: 3 } }}>
        <Outlet />
      </Box>
    </Box>
  );
};

const SharedLayout: React.FC = () => {
  return (
    <NotificationContextProvider>
      <SharedLayoutInner />
    </NotificationContextProvider>
  );
};

export default SharedLayout;
