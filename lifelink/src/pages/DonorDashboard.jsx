import { Box, Grid, Card, CardContent, Typography, Stack, Button, Chip, TextField } from '@mui/material';
import { useData } from '../context/DataContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useMemo, useState } from 'react';

export default function DonorDashboard() {
  const { data, acknowledgeEmergency } = useData();
  const { user } = useAuth();
  const emergencies = data.emergencyQueue;
  const [pledge, setPledge] = useState({});

  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card className="card"><CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>Incoming Emergency Notifications</Typography>
            <Stack spacing={1}>
              {emergencies.map(e => (
                <Box key={e.id} className="glow-hover" sx={{ p: 1.5, borderRadius: 2, border: '1px solid rgba(255,255,255,0.12)' }}>
                  <Typography sx={{ fontWeight: 700 }}>{e.bloodType} • Units requested {e.units} • From {e.requesterRole}</Typography>
                  <Typography variant="body2">Pledged {e.pledgedUnits} • Status {e.status}</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1, alignItems: 'center' }}>
                    <TextField size="small" type="number" label="Units" value={pledge[e.id] || ''} onChange={(ev) => setPledge(p => ({ ...p, [e.id]: ev.target.value }))} sx={{ width: 100 }} />
                    <Button variant="contained" color="error" onClick={() => acknowledgeEmergency(e.id, pledge[e.id] || 1)}>Donate Now</Button>
                    <Button variant="text" color="inherit">Ignore</Button>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="card"><CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>Your Profile</Typography>
            <Typography>Name: {user?.name || 'Donor'}</Typography>
            <Typography>Blood Group: {user?.bloodGroup || '—'}</Typography>
            <Typography>Location: {user?.city || '—'}</Typography>
            <Typography>Reputation: {user?.reputation || 70}</Typography>
          </CardContent></Card>
        </Grid>
      </Grid>
    </Box>
  );
}
