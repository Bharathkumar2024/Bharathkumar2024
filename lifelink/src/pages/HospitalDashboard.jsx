import { Box, Grid, Card, CardContent, Typography, Chip, LinearProgress, Stack, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useData } from '../context/DataContext.jsx';
import { useMemo, useState } from 'react';

function Metric({ label, value, total, color='error' }) {
  const pct = Math.round((value / total) * 100);
  return (
    <Card className="card">
      <CardContent>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>{label}</Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>{value}/{total} • {pct}%</Typography>
        <LinearProgress variant="determinate" value={pct} color={color} sx={{ height: 8, borderRadius: 8 }} />
      </CardContent>
    </Card>
  );
}

function PatientModal({ open, onClose, patient, onSave }) {
  const [form, setForm] = useState(patient);
  const handleSave = () => onSave(form);
  if (!patient) return null;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Patient</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ my: 1 }}>
          <TextField label="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <TextField label="Age" type="number" value={form.age} onChange={e => setForm(f => ({ ...f, age: Number(e.target.value) }))} />
          <TextField label="Room No." value={form.room} onChange={e => setForm(f => ({ ...f, room: e.target.value }))} />
          <TextField label="Case" value={form.case} onChange={e => setForm(f => ({ ...f, case: e.target.value }))} />
          <TextField label="Blood Type Needed" value={form.bloodType} onChange={e => setForm(f => ({ ...f, bloodType: e.target.value }))} />
          <TextField label="Units Required" type="number" value={form.unitsNeeded} onChange={e => setForm(f => ({ ...f, unitsNeeded: Number(e.target.value) }))} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="error">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function HospitalDashboard() {
  const { data, setData } = useData();
  const hospital = data.hospitals[0];
  const patients = hospital.patients.slice(0, 10);
  const needed = useMemo(() => patients.filter(p => p.status === 'requesting').length, [patients]);
  const received = patients.length - needed;

  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openEdit = (p) => { setSelected(p); setModalOpen(true); };
  const saveEdit = (updated) => {
    setData(prev => ({
      ...prev,
      hospitals: prev.hospitals.map(h => h.id === hospital.id
        ? { ...h, patients: h.patients.map(p => p.id === updated.id ? updated : p) }
        : h)
    }));
    setModalOpen(false);
  };

  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}><Metric label="Patients Needing Blood" value={needed} total={patients.length} color="error" /></Grid>
        <Grid item xs={12} md={6}><Metric label="Patients Who Received Blood" value={received} total={patients.length} color="success" /></Grid>

        <Grid item xs={12}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>Admitted Patients (Blood Needed)</Typography>
              <Box sx={{ display: 'flex', overflowX: 'auto', gap: 1, pb: 1 }}>
                {patients.map(p => (
                  <Chip key={p.id} label={`${p.name}`} color={p.status === 'requesting' ? 'error' : 'success'} variant="outlined" />
                ))}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={1}>
                {patients.map(p => (
                  <Box key={p.id} role="button" onClick={() => openEdit(p)} className="glow-hover" style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr 1fr'}, gap: 1, p: 1.5 }}>
                      <Typography sx={{ fontWeight: 700 }}>{p.name} • {p.age} • Room {p.room}</Typography>
                      <Typography variant="body2">Case: {p.case}</Typography>
                      <Typography variant="body2">Blood: {p.bloodType} • Units: {p.unitsNeeded}</Typography>
                      <Chip size="small" label={p.status === 'requesting' ? '🔴 Requesting' : '🟢 Received'} color={p.status === 'requesting' ? 'error' : 'success'} />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <PatientModal open={modalOpen} onClose={() => setModalOpen(false)} patient={selected} onSave={saveEdit} />
    </Box>
  );
}
