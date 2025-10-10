import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom'
import NotificationBell from '../components/NotificationBell'

export default function Layout({ title = 'Dashboard', showEmergency = false, onEmergency }) {
  const navigate = useNavigate()

  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: '#1a0000', color: '#fff' }}>
      <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.3)' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textShadow: '0 0 8px rgba(255,0,0,0.5)' }}>
            <RouterLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Vital Drop</RouterLink>
          </Typography>
          <NotificationBell />
          {showEmergency && (
            <Button className="pulse-red" color="error" variant="contained" sx={{ ml: 2 }} onClick={onEmergency}>
              EMERGENCY REQUEST
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  )
}
