import React from 'react';
import { Box, Card, CardActionArea, CardContent, Container, Grid, Typography } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import { useNavigate } from 'react-router-dom';
import '../../styles/animations.css';

function RoleCard({ title, description, icon, to }) {
  const navigate = useNavigate();
  return (
    <Card className="vd-glow-border vd-role-card vd-float" sx={{ background: 'rgba(255,255,255,0.04)', color: '#fff', borderRadius: 3 }}>
      <CardActionArea onClick={() => navigate(to)} sx={{ p: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {icon}
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{title}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>{description}</Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1, opacity: 0.9 }}>
            <Typography variant="body2">Proceed</Typography>
            <span className="vd-blink-title" aria-hidden>➜</span>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function LandingPage() {
  return (
    <Box className="vd-red-bg" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', color: '#fff', mb: 6 }}>
          <Typography variant="h2" className="vd-blink-title" sx={{ fontWeight: 800, letterSpacing: 1 }}>
            Vital Drop
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.95 }}>
            Connecting hospitals, donors, and blood banks to save lives in real time.
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <RoleCard
              title="Hospitals"
              description="Admit, track, and request blood support."
              icon={<LocalHospitalIcon fontSize="large" />}
              to="/hospital/auth"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RoleCard
              title="Donors"
              description="Respond to urgent needs nearby."
              icon={<BloodtypeIcon fontSize="large" />}
              to="/donor/auth"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RoleCard
              title="Blood Banks"
              description="Manage stock, dispatches, and compliance."
              icon={<StoreMallDirectoryIcon fontSize="large" />}
              to="/bank/auth"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
