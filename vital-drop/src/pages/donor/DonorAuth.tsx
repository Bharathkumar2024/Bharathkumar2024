import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const DonorAuth: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  return (
    <Box maxWidth={560} mx="auto" className="glow-card" p={3}>
      <Typography variant="h5" mb={2} fontWeight={700}>Donor Access</Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} textColor="primary" indicatorColor="primary" sx={{ mb: 2 }}>
        <Tab label="Login (OTP)" />
        <Tab label="Signup" />
      </Tabs>

      {tab === 0 && (
        <Box display="grid" gap={2}>
          <TextField label="Email or Phone" fullWidth />
          {otpSent ? (
            <>
              <TextField label="Enter OTP" fullWidth />
              <Button variant="contained" color="error" onClick={() => navigate('/donor/dashboard')}>Verify & Login</Button>
            </>
          ) : (
            <Button variant="outlined" color="error" onClick={() => setOtpSent(true)}>Send OTP</Button>
          )}
        </Box>
      )}

      {tab === 1 && (
        <Box display="grid" gap={2}>
          <TextField label="Name" fullWidth />
          <TextField label="Blood Group" fullWidth />
          <TextField label="Last Donation Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
          <TextField label="City" fullWidth />
          <Button variant="contained" component="label" color="error">
            Upload Health Certificate
            <input type="file" hidden />
          </Button>
          <Button variant="contained" color="error" onClick={() => alert('Donor registered (mock)')}>Signup</Button>
        </Box>
      )}
    </Box>
  );
};

export default DonorAuth;
