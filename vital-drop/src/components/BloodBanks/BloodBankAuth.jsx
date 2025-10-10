import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Container, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function BloodBankAuth() {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({ name: '', ownerName: '', city: '', bankId: '', certificates: [], otp: '', password: '' });
  const navigate = useNavigate();
  const { login } = useApp();

  function handleSignup(e) {
    e.preventDefault();
    navigate('/bank/dashboard');
  }

  function handleLogin(e) {
    e.preventDefault();
    login('bank', form.bankId || 'BB-001');
    navigate('/bank/dashboard');
  }

  return (
    <Box className="vd-red-bg" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Card sx={{ background: 'rgba(255,255,255,0.04)', color: '#fff' }} className="vd-glow-border">
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>Blood Bank Access</Typography>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
              <Tab label="Login (ID+Password or OTP)" />
              <Tab label="Signup" />
            </Tabs>
            {tab === 0 && (
              <Box component="form" onSubmit={handleLogin} sx={{ display: 'grid', gap: 2 }}>
                <TextField label="Blood Bank ID" required onChange={e => setForm({ ...form, bankId: e.target.value })} />
                <TextField label="Password (optional)" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
                <TextField label="OTP (optional)" onChange={e => setForm({ ...form, otp: e.target.value })} />
                <Button type="submit" variant="contained" color="error">Login</Button>
              </Box>
            )}
            {tab === 1 && (
              <Box component="form" onSubmit={handleSignup} sx={{ display: 'grid', gap: 2 }}>
                <TextField label="Blood Bank Name" required onChange={e => setForm({ ...form, name: e.target.value })} />
                <TextField label="Owner Name" required onChange={e => setForm({ ...form, ownerName: e.target.value })} />
                <TextField label="Location / City" required onChange={e => setForm({ ...form, city: e.target.value })} />
                <TextField label="Unique Blood Bank ID" required onChange={e => setForm({ ...form, bankId: e.target.value })} />
                <Button component="label" variant="outlined" color="error">
                  Upload Approved Certificates
                  <input type="file" multiple hidden onChange={e => setForm({ ...form, certificates: Array.from(e.target.files || []) })} />
                </Button>
                <Typography variant="caption">
                  {form.certificates.map(f => f.name).join(', ')}
                </Typography>
                <TextField label="OTP Verification" onChange={e => setForm({ ...form, otp: e.target.value })} />
                <Button type="submit" variant="contained" color="error">Create Account</Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
