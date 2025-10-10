import React from 'react';
import { Box, Card, CardContent, Grid, Stack, Button, Typography } from '@mui/material';
import { useApp } from '../../context/AppContext';

export default function DonorDashboard() {
  const { emergencyQueue, acknowledgeEmergency, auth } = useApp();

  function respondTo(emergencyId) {
    acknowledgeEmergency({ emergencyId, responderRole: 'donor', responderId: auth?.donor?.userId || 'D-001', unitsPledged: 1 });
  }

  return (
    <Box sx={{ color: '#fff' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ background: 'rgba(255,255,255,0.06)' }} className="vd-glow-border">
            <CardContent>
              <Typography variant="h6">Incoming Emergencies</Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {emergencyQueue.map((e) => (
                  <Grid key={e.id} item xs={12} md={6} lg={4}>
                    <Box sx={{ border: '1px solid rgba(255,0,0,0.35)', borderRadius: 2, p: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{e.bloodType} • {e.unitsRequired} units</Typography>
                      <Typography variant="body2">Requested by: {e.requesterRole.toUpperCase()}</Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Button size="small" variant="contained" color="error" onClick={() => respondTo(e.id)}>Respond</Button>
                        <Button size="small" variant="outlined" color="inherit">Ignore</Button>
                      </Stack>
                    </Box>
                  </Grid>
                ))}
                {emergencyQueue.length === 0 && (
                  <Grid item xs={12}><Typography>No emergencies yet.</Typography></Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
