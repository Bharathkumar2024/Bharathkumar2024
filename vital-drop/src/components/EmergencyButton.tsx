import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useNotifications } from './notification/NotificationContext';
import { v4 as uuid } from 'uuid';

const bloodTypes = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];

const EmergencyButton: React.FC<{ origin: 'Hospital'|'BloodBank' }>= ({ origin }) => {
  const [open, setOpen] = useState(false);
  const [bloodType, setBloodType] = useState('A+');
  const [units, setUnits] = useState(1);
  const { push } = useNotifications();

  const submit = () => {
    push({ id: uuid(), title: 'Emergency Request', message: `${origin} requests ${bloodType} (${units} units)`, type: 'emergency', createdAt: Date.now(), actions: [{ label: 'Respond', id: 'respond' }, { label: 'Ignore', id: 'ignore' }] });
    setOpen(false);
  };

  return (
    <>
      <Button className="pulse-btn" variant="contained" color="error" onClick={() => setOpen(true)} sx={{ position: 'fixed', right: 16, top: 16, zIndex: 20 }}>
        EMERGENCY REQUEST
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="glow-card" sx={{ p: 3, width: 400, maxWidth: '90vw', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography fontWeight={700} mb={2}>Emergency Request</Typography>
          <TextField select fullWidth label="Blood Type" value={bloodType} onChange={(e) => setBloodType(e.target.value)} sx={{ mb: 2 }}>
            {bloodTypes.map(bt => <MenuItem key={bt} value={bt}>{bt}</MenuItem>)}
          </TextField>
          <TextField fullWidth label="Units Required" type="number" value={units} onChange={(e) => setUnits(Number(e.target.value))} sx={{ mb: 2 }} />
          <Button fullWidth variant="contained" color="error" onClick={submit}>Send Broadcast</Button>
        </Box>
      </Modal>
    </>
  );
};

export default EmergencyButton;
