import { useState } from 'react';
import { Box, Tabs, Tab, TextField, Stack, Button, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function DonorAuth() {
  const [tab, setTab] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [signup, setSignup] = useState({ name: '', bloodGroup: '', lastDonationDate: '', city: '', certificate: null });
  const [otpSent, setOtpSent] = useState(false);
  const [loginForm, setLoginForm] = useState({ contact: '', otp: '' });
  const [errors, setErrors] = useState({});

  const validateSignup = () => {
    const e = {};
    if (!signup.name.trim()) e.name = 'Required';
    if (!signup.bloodGroup.trim()) e.bloodGroup = 'Required';
    if (!signup.city.trim()) e.city = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const sendOtp = () => {
    if (!loginForm.contact.trim()) { setErrors({ contact: 'Enter email or phone' }); return; }
    setOtpSent(true);
  };

  const handleSignup = () => {
    if (!validateSignup()) return;
    login('donor', { name: signup.name, bloodGroup: signup.bloodGroup });
    navigate('/donor');
  };

  const handleLogin = () => {
    if (!otpSent) { setErrors({ otp: 'Send OTP first' }); return; }
    if (!loginForm.otp.trim()) { setErrors({ otp: 'Enter OTP' }); return; }
    login('donor', { contact: loginForm.contact });
    navigate('/donor');
  };

  return (
    <Box className="container" sx={{ py: 4 }}>
      <Typography variant="h4" className="vital-drop" sx={{ mb: 2 }}>Donor Access</Typography>
      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Login (OTP)" />
        <Tab label="Signup" />
      </Tabs>
      {tab === 0 && (
        <Stack spacing={2}>
          <TextField label="Email or Phone" value={loginForm.contact} onChange={e => setLoginForm(f => ({ ...f, contact: e.target.value }))} error={!!errors.contact} helperText={errors.contact} />
          <Stack direction="row" spacing={1}>
            <Button onClick={sendOtp} variant="outlined" color="error">Send OTP</Button>
            <TextField label="OTP" value={loginForm.otp} onChange={e => setLoginForm(f => ({ ...f, otp: e.target.value }))} error={!!errors.otp} helperText={errors.otp} />
            <Button onClick={handleLogin} variant="contained" color="error">Login</Button>
          </Stack>
        </Stack>
      )}
      {tab === 1 && (
        <Stack spacing={2}>
          <TextField label="Name" value={signup.name} onChange={e => setSignup(s => ({ ...s, name: e.target.value }))} error={!!errors.name} helperText={errors.name} />
          <TextField label="Blood Group" value={signup.bloodGroup} onChange={e => setSignup(s => ({ ...s, bloodGroup: e.target.value }))} error={!!errors.bloodGroup} helperText={errors.bloodGroup} />
          <TextField label="Last Donation Date" type="date" InputLabelProps={{ shrink: true }} value={signup.lastDonationDate} onChange={e => setSignup(s => ({ ...s, lastDonationDate: e.target.value }))} />
          <TextField label="City" value={signup.city} onChange={e => setSignup(s => ({ ...s, city: e.target.value }))} error={!!errors.city} helperText={errors.city} />
          <Button component="label" variant="outlined" color="error">
            Upload Health Certificate
            <input type="file" hidden onChange={e => setSignup(s => ({ ...s, certificate: e.target.files?.[0] ?? null }))} />
          </Button>
          {signup.certificate && <Typography variant="caption">{signup.certificate.name}</Typography>}
          <Button variant="contained" color="error" onClick={handleSignup}>Create Account</Button>
        </Stack>
      )}
    </Box>
  );
}
