import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Container, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function HospitalAuth() {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({ name: '', location: '', hospitalId: '', code: '', password: '' });
  const navigate = useNavigate();
  const { login } = useApp();

  function handleSignup(e) {
    e.preventDefault();
    navigate('/hospital/dashboard');
  }

  function handleLogin(e) {
    e.preventDefault();
    login('hospital', form.hospitalId || 'HOSP-001');
    navigate('/hospital/dashboard');
  }

  return (
    <Box className="vd-red-bg" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Card sx={{ background: 'rgba(255,255,255,0.04)', color: '#fff' }} className="vd-glow-border">
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>Hospital Access</Typography>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
              <Tab label="Login" />
              <Tab label="Signup" />
            </Tabs>
            {tab === 0 && (
              <Box component="form" onSubmit={handleLogin} sx={{ display: 'grid', gap: 2 }}>
                <TextField label="Hospital ID" variant="outlined" required onChange={e => setForm({ ...form, hospitalId: e.target.value })} />
                <TextField label="Password" type="password" variant="outlined" required onChange={e => setForm({ ...form, password: e.target.value })} />
                <Button type="submit" variant="contained" color="error">Login</Button>
              </Box>
            )}
            {tab === 1 && (
              <Box component="form" onSubmit={handleSignup} sx={{ display: 'grid', gap: 2 }}>
                <TextField label="Hospital Name" required onChange={e => setForm({ ...form, name: e.target.value })} />
                <TextField label="Location" required onChange={e => setForm({ ...form, location: e.target.value })} />
                <TextField label="Unique Hospital ID" required onChange={e => setForm({ ...form, hospitalId: e.target.value })} />
                <TextField label="Verification Code" required onChange={e => setForm({ ...form, code: e.target.value })} />
                <Button type="submit" variant="contained" color="error">Create Account</Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
