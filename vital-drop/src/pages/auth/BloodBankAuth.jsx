import { Box, Button, Container, Tab, Tabs, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function BloodBankAuth() {
  const [tab, setTab] = useState(0)
  const { setUser } = useAuth()
  const navigate = useNavigate()

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 2, color: '#fff' }}>Blood Bank Access</Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} textColor="secondary" indicatorColor="secondary" sx={{ mb: 3 }}>
        <Tab label="Login" />
        <Tab label="Signup" />
      </Tabs>
      {tab === 0 && (
        <Box sx={{ display: 'grid', gap: 2 }}>
          <TextField label="Bank ID or Email/Phone" fullWidth />
          <TextField label="Password (optional if OTP)" type="password" fullWidth />
          <Button variant="contained" color="error" onClick={() => { setUser({ role: 'bloodbank', id: 'BB-3001', name: 'RedShield Blood Bank' }); navigate('/bloodbank') }}>Login</Button>
          <Button variant="outlined" color="error" onClick={() => { setUser({ role: 'bloodbank', id: 'BB-3001', name: 'RedShield Blood Bank' }); navigate('/bloodbank') }}>Login via OTP</Button>
        </Box>
      )}
      {tab === 1 && (
        <Box sx={{ display: 'grid', gap: 2 }}>
          <TextField label="Blood Bank Name" fullWidth />
          <TextField label="Owner Name" fullWidth />
          <TextField label="Location / City" fullWidth />
          <TextField label="Unique Blood Bank ID" fullWidth />
          <Button variant="contained" color="error">Upload Approved Certificates</Button>
          <Button variant="contained" color="error">Send OTP</Button>
          <TextField label="Enter OTP" fullWidth />
          <Button variant="contained" color="error" onClick={() => { setUser({ role: 'bloodbank', id: 'BB-NEW', name: 'New Blood Bank' }); navigate('/bloodbank') }}>Signup</Button>
        </Box>
      )}
    </Container>
  )
}
