import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Box, Container, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../context/AuthContext.jsx';
import NotificationBell from './NotificationBell.jsx';
import EmergencyButton from './EmergencyButton.jsx';
import ParallaxBackground from './ParallaxBackground.jsx';

export default function Layout({ role, children }) {
  const { logout } = useAuth();
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      <ParallaxBackground />
      <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" className="vital-drop" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            Vital Drop
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {(role === 'hospital' || role === 'bloodbank') && (
              <EmergencyButton role={role} />
            )}
            <NotificationBell />
            <IconButton color="inherit" aria-label="logout" onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        {children}
      </Container>
    </Box>
  );
}
