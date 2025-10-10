import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const BloodBankAuth: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  return (
    <Box maxWidth={680} mx="auto" className="glow-card" p={3}>
      <Typography variant="h5" mb={2} fontWeight={700}>Blood Bank Access</Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} textColor="primary" indicatorColor="primary" sx={{ mb: 2 }}>
        <Tab label="Login" />
        <Tab label="Signup" />
      </Tabs>

      {tab === 0 && (
        <Box display="grid" gap={2}>
          <TextField label="Bank ID" fullWidth />
          <TextField label="Password (or use OTP)" type="password" fullWidth />
          <Button variant="contained" color="error" onClick={() => navigate('/bloodbank/dashboard')}>Login</Button>
          <Box display="flex" gap={1}>
            <TextField label="Phone/Email" fullWidth />
            {otpSent ? (
              <>
                <TextField label="Enter OTP" fullWidth />
                <Button variant="contained" color="error" onClick={() => navigate('/bloodbank/dashboard')}>Verify & Login</Button>
              </>
            ) : (
              <Button variant="outlined" color="error" onClick={() => setOtpSent(true)}>Send OTP</Button>
            )}
          </Box>
        </Box>
      )}

      {tab === 1 && (
        <Box display="grid" gap={2}>
          <TextField label="Blood Bank Name" fullWidth />
          <TextField label="Owner Name" fullWidth />
          <TextField label="Location / City" fullWidth />
          <TextField label="Unique Blood Bank ID" fullWidth />
          <Button variant="contained" component="label" color="error">
            Upload Approved Certificates
            <input type="file" multiple hidden onChange={(e) => {
              const names = Array.from(e.target.files || []).map(f => f.name);
              alert('Certificates uploaded: ' + names.join(', '));
            }} />
          </Button>
          <Box display="flex" gap={1}>
            <TextField label="Phone/Email for OTP" fullWidth />
            {otpSent ? (
              <>
                <TextField label="Enter OTP" fullWidth />
                <Button variant="contained" color="error" onClick={() => alert('Bank verified (mock)')}>Verify OTP</Button>
              </>
            ) : (
              <Button variant="outlined" color="error" onClick={() => setOtpSent(true)}>Send OTP</Button>
            )}
          </Box>
          <Button variant="contained" color="error" onClick={() => alert('Blood Bank registered (mock)')}>Signup</Button>
        </Box>
      )}
    </Box>
  );
};

export default BloodBankAuth;
