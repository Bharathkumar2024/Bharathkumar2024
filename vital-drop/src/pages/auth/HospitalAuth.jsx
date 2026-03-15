import { Box, Button, Container, Tab, Tabs, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function HospitalAuth() {
  const [tab, setTab] = useState(0)
  const { setUser } = useAuth()
  const navigate = useNavigate()

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 2, color: '#fff' }}>Hospital Access</Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} textColor="secondary" indicatorColor="secondary" sx={{ mb: 3 }}>
        <Tab label="Login" />
        <Tab label="Signup" />
      </Tabs>
      {tab === 0 && (
        <Box sx={{ display: 'grid', gap: 2 }}>
          <TextField label="Hospital ID" variant="outlined" fullWidth />
          <TextField label="Password" type="password" variant="outlined" fullWidth />
          <Button variant="contained" color="error" onClick={() => { setUser({ role: 'hospital', id: 'HSP-1001', name: 'CityCare General Hospital' }); navigate('/hospital') }}>Login</Button>
        </Box>
      )}
      {tab === 1 && (
        <Box sx={{ display: 'grid', gap: 2 }}>
          <TextField label="Hospital Name" fullWidth />
          <TextField label="Location" fullWidth />
          <TextField label="Unique Hospital ID" fullWidth />
          <TextField label="Verification Code" fullWidth />
          <Button variant="contained" color="error" onClick={() => { setUser({ role: 'hospital', id: 'HSP-NEW', name: 'New Hospital' }); navigate('/hospital') }}>Signup</Button>
        </Box>
      )}
    </Container>
  )
}
