import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Stack } from '@mui/material';
import { useData } from '../../context/DataContext.jsx';

const BLOOD_TYPES = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];

export default function EmergencyModal({ open, onClose, requesterRole }) {
  const { createEmergency } = useData();
  const [form, setForm] = useState({ bloodType: 'O+', units: 1 });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!BLOOD_TYPES.includes(form.bloodType)) e.bloodType = 'Select a blood type';
    if (!form.units || Number(form.units) <= 0) e.units = 'Enter a positive number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    createEmergency({ ...form, requesterRole });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Emergency Request</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ my: 1 }}>
          <TextField select fullWidth label="Blood Type" value={form.bloodType}
            onChange={(e) => setForm(f => ({ ...f, bloodType: e.target.value }))}
            error={!!errors.bloodType} helperText={errors.bloodType}
          >
            {BLOOD_TYPES.map(bt => (<MenuItem key={bt} value={bt}>{bt}</MenuItem>))}
          </TextField>
          <TextField fullWidth type="number" label="Units Required" value={form.units}
            onChange={(e) => setForm(f => ({ ...f, units: e.target.value }))}
            error={!!errors.units} helperText={errors.units}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="error" onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
