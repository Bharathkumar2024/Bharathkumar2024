import React from 'react';
import { AppBar, Badge, Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import '../../styles/animations.css';

export default function Layout({ role, children }) {
  const { unreadCount, logout } = useApp();

  return (
    <Box className="vd-red-bg" sx={{ minHeight: '100vh', color: '#fff' }}>
      <AppBar position="static" sx={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
              Vital Drop
            </Link>
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={() => logout(role)} aria-label="logout">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ pt: 3, pb: 8 }}>
        {children}
      </Container>
    </Box>
  );
}
