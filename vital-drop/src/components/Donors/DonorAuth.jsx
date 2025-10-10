import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Container, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function DonorAuth() {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({ name: '', bloodGroup: '', lastDonationDate: '', city: '', certificate: null, email: '', phone: '', otp: '' });
  const navigate = useNavigate();
  const { login } = useApp();

  function handleSignup(e) {
    e.preventDefault();
    navigate('/donor/dashboard');
  }

  function handleLogin(e) {
    e.preventDefault();
    login('donor', form.email || form.phone || 'D-001');
    navigate('/donor/dashboard');
  }

  return (
    <Box className="vd-red-bg" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Card sx={{ background: 'rgba(255,255,255,0.04)', color: '#fff' }} className="vd-glow-border">
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>Donor Access</Typography>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
              <Tab label="Login (Email/Phone + OTP)" />
              <Tab label="Signup" />
            </Tabs>
            {tab === 0 && (
              <Box component="form" onSubmit={handleLogin} sx={{ display: 'grid', gap: 2 }}>
                <TextField label="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
                <TextField label="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />
                <TextField label="OTP" onChange={e => setForm({ ...form, otp: e.target.value })} />
                <Button type="submit" variant="contained" color="error">Login</Button>
              </Box>
            )}
            {tab === 1 && (
              <Box component="form" onSubmit={handleSignup} sx={{ display: 'grid', gap: 2 }}>
                <TextField label="Name" required onChange={e => setForm({ ...form, name: e.target.value })} />
                <TextField label="Blood Group" required onChange={e => setForm({ ...form, bloodGroup: e.target.value })} />
                <TextField label="Last Donation Date" type="date" InputLabelProps={{ shrink: true }} onChange={e => setForm({ ...form, lastDonationDate: e.target.value })} />
                <TextField label="City" required onChange={e => setForm({ ...form, city: e.target.value })} />
                <Button component="label" variant="outlined" color="error">
                  Upload Health Certificate
                  <input type="file" hidden onChange={e => setForm({ ...form, certificate: e.target.files?.[0] })} />
                </Button>
                <Button type="submit" variant="contained" color="error">Create Account</Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
