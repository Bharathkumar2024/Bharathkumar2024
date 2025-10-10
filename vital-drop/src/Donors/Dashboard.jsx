import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material'
import { useNotifications } from '../contexts/NotificationContext'
import { useAuth } from '../contexts/AuthContext'

export default function DonorDashboard() {
  const { notifications, push } = useNotifications()
  const { user } = useAuth()

  function donateNow() {
    push({ title: 'Donation pledged', message: `${user?.name || 'Donor'} pledged to donate` })
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Welcome, {user?.name || 'Donor'}</Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Incoming emergency notifications</Typography>
        <Stack spacing={1}>
          {notifications.length === 0 && (
            <Typography variant="body2">No emergencies yet. You will see requests here.</Typography>
          )}
          {notifications.map((n) => (
            <Paper key={n.id} sx={{ p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle2">{n.title}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>{n.message}</Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <Button color="error" variant="contained" onClick={donateNow}>
                  Donate Now
                </Button>
                <Button color="inherit" variant="text">Ignore</Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Paper>
    </Stack>
  )
}
