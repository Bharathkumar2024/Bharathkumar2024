import { useState } from 'react';
import { Box, Tabs, Tab, TextField, Stack, Button, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function BloodBankAuth() {
  const [tab, setTab] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [signup, setSignup] = useState({ bankName: '', ownerName: '', location: '', bankId: '', certificates: [] });
  const [otpSent, setOtpSent] = useState(false);
  const [useOtp, setUseOtp] = useState(false);
  const [loginForm, setLoginForm] = useState({ bankId: '', password: '', otp: '' });
  const [errors, setErrors] = useState({});

  const validateSignup = () => {
    const e = {};
    if (!signup.bankName.trim()) e.bankName = 'Required';
    if (!signup.ownerName.trim()) e.ownerName = 'Required';
    if (!signup.location.trim()) e.location = 'Required';
    if (!signup.bankId.trim()) e.bankId = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const sendOtp = () => {
    if (!loginForm.bankId.trim()) { setErrors({ bankId: 'Enter Bank ID first' }); return; }
    setOtpSent(true);
  };

  const handleSignup = () => {
    if (!validateSignup()) return;
    login('bloodbank', { id: signup.bankId, name: signup.bankName });
    navigate('/blood-bank');
  };

  const handleLogin = () => {
    if (useOtp) {
      if (!otpSent) { setErrors({ otp: 'Send OTP first' }); return; }
      if (!loginForm.otp.trim()) { setErrors({ otp: 'Enter OTP' }); return; }
    } else {
      if (!loginForm.bankId.trim()) { setErrors({ bankId: 'Required' }); return; }
      if (!loginForm.password.trim()) { setErrors({ password: 'Required' }); return; }
    }
    login('bloodbank', { id: loginForm.bankId });
    navigate('/blood-bank');
  };

  return (
    <Box className="container" sx={{ py: 4 }}>
      <Typography variant="h4" className="vital-drop" sx={{ mb: 2 }}>Blood Bank Access</Typography>
      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Login" />
        <Tab label="Signup" />
      </Tabs>
      {tab === 0 && (
        <Stack spacing={2}>
          <TextField label="Blood Bank ID" value={loginForm.bankId} onChange={e => setLoginForm(f => ({ ...f, bankId: e.target.value }))} error={!!errors.bankId} helperText={errors.bankId} />
          {!useOtp && (
            <TextField label="Password" type="password" value={loginForm.password} onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))} error={!!errors.password} helperText={errors.password} />
          )}
          {useOtp && (
            <Stack direction="row" spacing={1}>
              <Button onClick={sendOtp} variant="outlined" color="error">Send OTP</Button>
              <TextField label="OTP" value={loginForm.otp} onChange={e => setLoginForm(f => ({ ...f, otp: e.target.value }))} error={!!errors.otp} helperText={errors.otp} />
            </Stack>
          )}
          <Stack direction="row" spacing={1}>
            <Button variant="text" color="error" onClick={() => setUseOtp(v => !v)}>{useOtp ? 'Use Password' : 'Use OTP'}</Button>
            <Button variant="contained" color="error" onClick={handleLogin}>Login</Button>
          </Stack>
        </Stack>
      )}
      {tab === 1 && (
        <Stack spacing={2}>
          <TextField label="Blood Bank Name" value={signup.bankName} onChange={e => setSignup(s => ({ ...s, bankName: e.target.value }))} error={!!errors.bankName} helperText={errors.bankName} />
          <TextField label="Owner Name" value={signup.ownerName} onChange={e => setSignup(s => ({ ...s, ownerName: e.target.value }))} error={!!errors.ownerName} helperText={errors.ownerName} />
          <TextField label="Location / City" value={signup.location} onChange={e => setSignup(s => ({ ...s, location: e.target.value }))} error={!!errors.location} helperText={errors.location} />
          <TextField label="Unique Blood Bank ID" value={signup.bankId} onChange={e => setSignup(s => ({ ...s, bankId: e.target.value }))} error={!!errors.bankId} helperText={errors.bankId} />
          <Button component="label" variant="outlined" color="error">
            Upload Approved Certificates
            <input type="file" multiple hidden onChange={e => setSignup(s => ({ ...s, certificates: Array.from(e.target.files ?? []) }))} />
          </Button>
          {signup.certificates.length > 0 && (
            <Typography variant="caption">{signup.certificates.map(f => f.name).join(', ')}</Typography>
          )}
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" color="error" onClick={() => setOtpSent(true)}>{otpSent ? 'OTP Sent' : 'Send OTP'}</Button>
            <Button variant="contained" color="error" onClick={handleSignup}>Create Account</Button>
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
