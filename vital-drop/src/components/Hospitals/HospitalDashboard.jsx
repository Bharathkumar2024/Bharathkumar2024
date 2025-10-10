import React, { useMemo, useState } from 'react';
import { Box, Button, Card, CardContent, Chip, Grid, LinearProgress, Modal, Stack, Typography } from '@mui/material';
import { useApp } from '../../context/AppContext';
import EmergencyButton from '../Shared/EmergencyButton';
import { bloodTypes } from '../../data';

function PatientModal({ open, onClose, patient, onSave }) {
  const [form, setForm] = useState(patient || null);
  React.useEffect(() => setForm(patient), [patient]);
  if (!form) return null;
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 420, bgcolor: '#111', color: '#fff', p: 3, borderRadius: 2 }}>
        <Stack spacing={2}>
          <Typography variant="h6">Edit Patient</Typography>
          <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Age" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
          <input placeholder="Room No." value={form.roomNo} onChange={e => setForm({ ...form, roomNo: e.target.value })} />
          <input placeholder="Case" value={form.case} onChange={e => setForm({ ...form, case: e.target.value })} />
          <select value={form.bloodTypeNeeded} onChange={e => setForm({ ...form, bloodTypeNeeded: e.target.value })}>
            {bloodTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <input placeholder="Units Required" value={form.unitsRequired} onChange={e => setForm({ ...form, unitsRequired: e.target.value })} />
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" color="inherit" onClick={onClose}>Cancel</Button>
            <Button variant="contained" color="error" onClick={() => onSave(form)}>Save</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}

export default function HospitalDashboard() {
  const { hospitals, updatePatient } = useApp();
  const hospital = hospitals[0];
  const patients = hospital.patients.slice(0, 10);

  const needed = patients.filter(p => p.status === 'Requesting').length;
  const received = patients.filter(p => p.status === 'Received').length;
  const total = patients.length || 1;
  const neededPct = Math.round((needed / total) * 100);
  const receivedPct = Math.round((received / total) * 100);

  const [openIdx, setOpenIdx] = useState(-1);

  return (
    <Box sx={{ color: '#fff' }}>
      <EmergencyButton role="hospital" requesterId={hospital.id} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ background: 'rgba(255,255,255,0.06)' }} className="vd-glow-border">
            <CardContent>
              <Typography variant="h6">Blood Needed Patients</Typography>
              <Typography variant="body2">{needed}/{total} → {neededPct}%</Typography>
              <LinearProgress variant="determinate" value={neededPct} color="error" sx={{ height: 10, borderRadius: 5, mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ background: 'rgba(255,255,255,0.06)' }} className="vd-glow-border">
            <CardContent>
              <Typography variant="h6">Patients Who Received Blood</Typography>
              <Typography variant="body2">{received}/{total} → {receivedPct}%</Typography>
              <LinearProgress variant="determinate" value={receivedPct} color="success" sx={{ height: 10, borderRadius: 5, mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ background: 'rgba(255,255,255,0.06)' }} className="vd-glow-border">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Patient Admitted List (Blood Needed)</Typography>
              <Grid container spacing={2}>
                {patients.map((p, idx) => (
                  <Grid key={idx} item xs={12} md={6} lg={4}>
                    <Box sx={{ border: '1px solid rgba(255,0,0,0.35)', borderRadius: 2, p: 2, cursor: 'pointer' }} onClick={() => setOpenIdx(idx)}>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <Chip size="small" label={p.status === 'Requesting' ? '🔴 Requesting' : '🟢 Received'} color={p.status === 'Requesting' ? 'error' : 'success'} />
                        <Chip size="small" label={`Units: ${p.unitsRequired}`} />
                        <Chip size="small" label={`Type: ${p.bloodTypeNeeded}`} />
                      </Stack>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{p.name} • {p.age}</Typography>
                      <Typography variant="body2">Room {p.roomNo} • {p.case}</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.85 }}>Admitted: {p.admittedDate}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', p: 1 }}>
            {patients.map((p, idx) => (
              <Chip key={idx} label={`${p.name}`} color={p.status === 'Requesting' ? 'error' : 'success'} />
            ))}
          </Stack>
        </Grid>
      </Grid>

      <PatientModal
        open={openIdx >= 0}
        onClose={() => setOpenIdx(-1)}
        patient={openIdx >= 0 ? patients[openIdx] : null}
        onSave={(updated) => { updatePatient(hospital.id, openIdx, updated); setOpenIdx(-1); }}
      />
    </Box>
  );
}
