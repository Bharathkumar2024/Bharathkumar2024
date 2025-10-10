import { Box, Button, Container, Tab, Tabs, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function DonorAuth() {
  const [tab, setTab] = useState(0)
  const { setUser } = useAuth()
  const navigate = useNavigate()

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 2, color: '#fff' }}>Donor Access</Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} textColor="secondary" indicatorColor="secondary" sx={{ mb: 3 }}>
        <Tab label="Login" />
        <Tab label="Signup" />
      </Tabs>
      {tab === 0 && (
        <Box sx={{ display: 'grid', gap: 2 }}>
          <TextField label="Email or Phone" fullWidth />
          <Button variant="contained" color="error" onClick={() => { /* simulate OTP verified */ setUser({ role: 'donor', id: 'DNR-2002', name: 'Sneha Kapoor' }); navigate('/donor') }}>Send OTP</Button>
        </Box>
      )}
      {tab === 1 && (
        <Box sx={{ display: 'grid', gap: 2 }}>
          <TextField label="Name" fullWidth />
          <TextField label="Blood Group" fullWidth />
          <TextField label="Last Donation Date" fullWidth />
          <TextField label="City" fullWidth />
          <Button variant="contained" color="error">Upload Health Certificate</Button>
          <Button variant="contained" color="error" onClick={() => { setUser({ role: 'donor', id: 'DNR-NEW', name: 'New Donor' }); navigate('/donor') }}>Signup</Button>
        </Box>
      )}
    </Container>
  )
}
