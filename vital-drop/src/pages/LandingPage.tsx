import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';

const RoleCard: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void }>
= ({ icon, title, description, onClick }) => {
  return (
    <Card className="glow-card" onClick={onClick} sx={{ cursor: 'pointer' }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Box sx={{ color: 'error.main' }}>{icon}</Box>
          <Box>
            <Typography variant="h6" fontWeight={700}>{title}</Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>{description}</Typography>
            <Typography mt={1} className="arrow-blink" variant="body2">Enter</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box className="bg-waves" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Box className="container" sx={{ textAlign: 'center' }}>
        <Typography className="vital-title">Vital Drop</Typography>
        <Typography sx={{ mt: 1, mb: 4, color: 'rgba(255,255,255,0.85)' }}>
          Connecting hospitals, donors, and blood banks to save lives in real time.
        </Typography>

        <Grid container spacing={2} className="row md-3 sm-2">
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <RoleCard
              icon={<LocalHospitalIcon fontSize="large" />}
              title="Hospitals"
              description="Admit patients, request blood, manage records."
              onClick={() => navigate('/hospital/auth')}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <RoleCard
              icon={<VolunteerActivismIcon fontSize="large" />}
              title="Donors"
              description="Respond to emergencies and track your donations."
              onClick={() => navigate('/donor/auth')}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <RoleCard
              icon={<StoreMallDirectoryIcon fontSize="large" />}
              title="Blood Banks"
              description="Manage stock, shipments, and compliance."
              onClick={() => navigate('/bloodbank/auth')}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LandingPage;
