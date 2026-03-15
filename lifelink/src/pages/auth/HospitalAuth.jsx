import { useState } from 'react';
import { Box, Tabs, Tab, TextField, Stack, Button, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function HospitalAuth() {
  const [tab, setTab] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [signup, setSignup] = useState({ name: '', location: '', hospitalId: '', verificationCode: '' });
  const [loginForm, setLoginForm] = useState({ id: '', password: '' });
  const [errors, setErrors] = useState({});

  const validateSignup = () => {
    const e = {};
    if (!signup.name.trim()) e.name = 'Required';
    if (!signup.location.trim()) e.location = 'Required';
    if (!signup.hospitalId.trim()) e.hospitalId = 'Required';
    if (!signup.verificationCode.trim()) e.verificationCode = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateLogin = () => {
    const e = {};
    if (!loginForm.id.trim()) e.id = 'Required';
    if (!loginForm.password.trim()) e.password = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignup = () => {
    if (!validateSignup()) return;
    login('hospital', { id: signup.hospitalId, name: signup.name });
    navigate('/hospital');
  };

  const handleLogin = () => {
    if (!validateLogin()) return;
    login('hospital', { id: loginForm.id });
    navigate('/hospital');
  };

  return (
    <Box className="container" sx={{ py: 4 }}>
      <Typography variant="h4" className="vital-drop" sx={{ mb: 2 }}>Hospital Access</Typography>
      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Login" />
        <Tab label="Signup" />
      </Tabs>
      {tab === 0 && (
        <Stack spacing={2}>
          <TextField label="Hospital ID" value={loginForm.id} onChange={e => setLoginForm(f => ({ ...f, id: e.target.value }))} error={!!errors.id} helperText={errors.id} />
          <TextField label="Password" type="password" value={loginForm.password} onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))} error={!!errors.password} helperText={errors.password} />
          <Button variant="contained" color="error" onClick={handleLogin}>Login</Button>
        </Stack>
      )}
      {tab === 1 && (
        <Stack spacing={2}>
          <TextField label="Hospital Name" value={signup.name} onChange={e => setSignup(s => ({ ...s, name: e.target.value }))} error={!!errors.name} helperText={errors.name} />
          <TextField label="Location" value={signup.location} onChange={e => setSignup(s => ({ ...s, location: e.target.value }))} error={!!errors.location} helperText={errors.location} />
          <TextField label="Unique Hospital ID" value={signup.hospitalId} onChange={e => setSignup(s => ({ ...s, hospitalId: e.target.value }))} error={!!errors.hospitalId} helperText={errors.hospitalId} />
          <TextField label="Verification Code" value={signup.verificationCode} onChange={e => setSignup(s => ({ ...s, verificationCode: e.target.value }))} error={!!errors.verificationCode} helperText={errors.verificationCode} />
          <Button variant="contained" color="error" onClick={handleSignup}>Create Account</Button>
        </Stack>
      )}
    </Box>
  );
}
