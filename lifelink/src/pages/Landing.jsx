import { Box, Grid, Typography, Card, CardActionArea, CardContent } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { useNavigate } from 'react-router-dom';
import ParallaxBackground from '../components/shared/ParallaxBackground.jsx';

function AccessCard({ icon, title, description, to }) {
  const navigate = useNavigate();
  return (
    <Card className="wave-card glow-hover" sx={{ borderRadius: 3, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)' }}>
      <CardActionArea onClick={() => navigate(to)} sx={{ p: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {icon}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{title}</Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>{description}</Typography>
              <Typography variant="body2" className="blink-arrow" sx={{ mt: 1, color: 'rgba(255,255,255,0.9)' }}>Enter</Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function Landing() {
  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', display: 'grid', placeItems: 'center', px: 2, py: 8 }}>
      <ParallaxBackground />
      <Box className="container" sx={{ textAlign: 'center' }}>
        <Typography className="vital-drop" component="h1" sx={{ fontSize: { xs: '2.25rem', md: '3.2rem' }, mb: 1 }}>
          Vital Drop
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 5 }}>
          Connecting hospitals, donors, and blood banks to save lives in real time.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <AccessCard
              icon={<LocalHospitalIcon color="error" sx={{ fontSize: 40 }} />}
              title="Hospitals"
              description="Manage admitted patients, request blood, track fulfillment."
              to="/auth/hospital"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AccessCard
              icon={<VolunteerActivismIcon color="error" sx={{ fontSize: 40 }} />}
              title="Donors"
              description="Respond to emergencies, manage your donor profile."
              to="/auth/donor"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <AccessCard
              icon={<Inventory2Icon color="error" sx={{ fontSize: 40 }} />}
              title="Blood Banks"
              description="Manage stock, shipments, and safety records."
              to="/auth/blood-bank"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
