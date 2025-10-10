import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const HospitalAuth: React.FC = () => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  return (
    <Box maxWidth={560} mx="auto" className="glow-card" p={3}>
      <Typography variant="h5" mb={2} fontWeight={700}>Hospital Access</Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} textColor="error" indicatorColor="error" sx={{ mb: 2 }}>
        <Tab label="Login" />
        <Tab label="Signup" />
      </Tabs>

      {tab === 0 && (
        <Box display="grid" gap={2}>
          <TextField label="Hospital ID" fullWidth />
          <TextField label="Password" type="password" fullWidth />
          <Button variant="contained" color="error" className="pulse-btn" onClick={() => navigate('/hospital/dashboard')}>Login</Button>
        </Box>
      )}

      {tab === 1 && (
        <Box display="grid" gap={2}>
          <TextField label="Hospital Name" fullWidth />
          <TextField label="Location" fullWidth />
          <TextField label="Unique Hospital ID" fullWidth />
          <TextField label="Verification Code" fullWidth />
          <Button variant="contained" color="error" onClick={() => alert('Hospital registered (mock)')}>Signup</Button>
        </Box>
      )}
    </Box>
  );
};

export default HospitalAuth;
