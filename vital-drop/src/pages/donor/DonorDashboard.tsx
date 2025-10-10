import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import { useNotifications } from '../../components/notification/NotificationContext';

const DonorDashboard: React.FC = () => {
  const { notifications } = useNotifications();

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>Donor Dashboard</Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card className="glow-card"><CardContent>
            <Typography fontWeight={700}>Profile</Typography>
            <TextField size="small" label="Blood Group" defaultValue="O+" fullWidth sx={{ mt: 1 }} />
            <TextField size="small" label="Last Donation Date" type="date" defaultValue="2025-08-05" fullWidth InputLabelProps={{ shrink: true }} sx={{ mt: 1 }} />
            <TextField size="small" label="City" defaultValue="Metropolis" fullWidth sx={{ mt: 1 }} />
            <CardActions>
              <Button variant="contained" color="error">Save</Button>
            </CardActions>
          </CardContent></Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card className="glow-card"><CardContent>
            <Typography fontWeight={700}>Incoming Emergency Notifications</Typography>
            {notifications.filter(n => n.type === 'emergency').map(n => (
              <Box key={n.id} display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                <Typography variant="body2">{n.title}: {n.message}</Typography>
                <Box display="flex" gap={1}>
                  <Button size="small" variant="contained" color="success">Donate Now</Button>
                  <Button size="small" variant="outlined" color="inherit">Ignore</Button>
                </Box>
              </Box>
            ))}
          </CardContent></Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DonorDashboard;
