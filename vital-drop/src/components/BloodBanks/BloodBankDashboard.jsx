import React, { useMemo, useState } from 'react';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { useApp } from '../../context/AppContext';
import EmergencyButton from '../Shared/EmergencyButton';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import ExportButtons from './ExportButtons';

export default function BloodBankDashboard() {
  const { bloodBanks, createSendRecord } = useApp();
  const bank = bloodBanks[0];
  const [sendForm, setSendForm] = useState({ hospitalId: 'HOSP-001', hospitalName: 'CityCare Hospital', bloodTypes: 'O+:2', staff: 'Operator: Lee' });

  const totalUnits = bank.preservationList.reduce((acc, b) => acc + (b.unitsAvailable || 0), 0);
  const capacity = 100; // mocked max
  const stockPercent = Math.min(100, Math.round((totalUnits / capacity) * 100));

  const stockByType = useMemo(() => {
    const map = new Map();
    bank.preservationList.forEach(b => {
      map.set(b.bloodType, (map.get(b.bloodType) || 0) + b.unitsAvailable);
    });
    return Array.from(map.entries()).map(([type, units]) => ({ type, units }));
  }, [bank.preservationList]);

  function handleDispatch() {
    const parts = sendForm.bloodTypes.split(',').map(s => s.trim());
    const parsed = parts.map(p => ({ type: p.split(':')[0], units: Number(p.split(':')[1] || 0) }));
    createSendRecord(bank.id, { hospitalId: sendForm.hospitalId, hospitalName: sendForm.hospitalName, bloodTypes: parsed, dispatchedAt: new Date().toISOString(), transport: 'Refrigerated van', staff: sendForm.staff, status: 'Delivered' });
  }

  return (
    <Box sx={{ color: '#fff' }}>
      <EmergencyButton role="bank" requesterId={bank.id} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ background: 'rgba(255,255,255,0.06)' }} className="vd-glow-border">
            <CardContent>
              <Typography variant="h6">Blood Stock %</Typography>
              <Typography variant="h3" color="error">{stockPercent}%</Typography>
              <Box sx={{ height: 160 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[{ name: 'Stock', value: stockPercent }]}> 
                    <XAxis dataKey="name" hide />
                    <YAxis domain={[0, 100]} hide />
                    <Tooltip />
                    <Bar dataKey="value" fill="#ef5350" radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ background: 'rgba(255,255,255,0.06)' }} className="vd-glow-border">
            <CardContent>
              <Typography variant="h6">% Successful Sends</Typography>
              <Box sx={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bank.successSendStats}>
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 1]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="successRate" stroke="#66bb6a" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ background: 'rgba(255,255,255,0.06)' }} className="vd-glow-border">
            <CardContent>
              <Typography variant="h6">Pending Shipments</Typography>
              <Typography variant="h3">{bank.sendRecords.filter(r => r.status !== 'Delivered').length}</Typography>
              <Typography variant="caption">Delivered: {bank.sendRecords.filter(r => r.status === 'Delivered').length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ background: 'rgba(255,255,255,0.06)' }} className="vd-glow-border">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Preservation Blood List (Inventory)</Typography>
              <Grid container spacing={2}>
                {bank.preservationList.map((b, idx) => (
                  <Grid key={idx} item xs={12} md={6} lg={4}>
                    <Box sx={{ border: '1px solid rgba(255,0,0,0.35)', borderRadius: 2, p: 2 }}>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <Chip size="small" label={b.status} color={b.status === 'Available' ? 'success' : (b.status === 'Reserved' ? 'warning' : 'default')} />
                        <Chip size="small" label={`Units: ${b.unitsAvailable}`} />
                        <Chip size="small" label={`Type: ${b.bloodType}`} />
                      </Stack>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{b.bloodType} — {b.unitsAvailable} units</Typography>
                      <Typography variant="body2">Storage: {b.storageTemp} • {b.storageCode}</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.85 }}>Collected: {b.collectionDate} • Exp: {b.expiryDate} • Batch: {b.batchId}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ background: 'rgba(255,255,255,0.06)' }} className="vd-glow-border">
            <CardContent>
              <Typography variant="h6">Send Records (Safety & Audit)</Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <TextField label="Hospital ID" size="small" value={sendForm.hospitalId} onChange={e => setSendForm({ ...sendForm, hospitalId: e.target.value })} />
                <TextField label="Hospital Name" size="small" value={sendForm.hospitalName} onChange={e => setSendForm({ ...sendForm, hospitalName: e.target.value })} />
                <TextField label="BloodTypes (e.g., O+:2,A+:1)" size="small" value={sendForm.bloodTypes} onChange={e => setSendForm({ ...sendForm, bloodTypes: e.target.value })} />
                <TextField label="Staff" size="small" value={sendForm.staff} onChange={e => setSendForm({ ...sendForm, staff: e.target.value })} />
                <Button variant="contained" color="error" onClick={handleDispatch}>Create Send Record</Button>
              </Stack>
              <Divider sx={{ my: 1 }} />
              <Grid container spacing={2}>
                {bank.sendRecords.map((r) => (
                  <Grid key={r.id} item xs={12} md={6}>
                    <Box sx={{ border: '1px solid rgba(255,0,0,0.35)', borderRadius: 2, p: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{r.hospitalName} ({r.hospitalId})</Typography>
                      <Typography variant="body2">Sent: {r.dispatchedAt}</Typography>
                      <Typography variant="body2">Staff: {r.staff} • {r.transport}</Typography>
                      <Typography variant="body2">Types: {r.bloodTypes.map(bt => `${bt.type}:${bt.units}`).join(', ')}</Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <ExportButtons record={r} />
                      </Stack>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
