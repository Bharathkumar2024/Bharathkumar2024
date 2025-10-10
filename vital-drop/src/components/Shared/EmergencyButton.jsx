import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import { useApp } from '../../context/AppContext';
import { bloodTypes } from '../../data';

export default function EmergencyButton({ role, requesterId }) {
  const [open, setOpen] = useState(false);
  const [bloodType, setBloodType] = useState('O+');
  const [units, setUnits] = useState(1);
  const { submitEmergencyRequest } = useApp();

  function handleSubmit(e) {
    e.preventDefault();
    submitEmergencyRequest({ requesterRole: role, requesterId, bloodType, unitsRequired: Number(units) });
    setOpen(false);
  }

  return (
    <>
      <Button className="vd-pulse-button" variant="contained" color="error" onClick={() => setOpen(true)}>
        EMERGENCY REQUEST
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 380, bgcolor: '#111', color: '#fff', p: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Emergency Request</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Blood Type</InputLabel>
              <Select label="Blood Type" value={bloodType} onChange={e => setBloodType(e.target.value)}>
                {bloodTypes.map(bt => <MenuItem key={bt} value={bt}>{bt}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField type="number" label="Units Required" value={units} onChange={e => setUnits(e.target.value)} inputProps={{ min: 1 }} />
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" color="inherit" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained" color="error">Submit</Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
