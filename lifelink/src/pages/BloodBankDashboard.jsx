import { Box, Grid, Card, CardContent, Typography, Stack, Chip, TextField, MenuItem, Button } from '@mui/material';
import { useMemo, useState } from 'react';
import { useData } from '../context/DataContext.jsx';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const COLORS = ['#ff5a6a', '#ff7b86', '#ff9aa1', '#ffd4da', '#f5425a'];

export default function BloodBankDashboard() {
  const { data } = useData();
  const bank = data.bloodBanks[0];
  const [filters, setFilters] = useState({ type: 'All', expiry: 'All' });

  const totalCapacity = 100; // mock
  const totalUnits = bank.preservationList.reduce((sum, b) => sum + b.unitsAvailable, 0);
  const stockPct = Math.min(100, Math.round((totalUnits / totalCapacity) * 100));

  const stockByType = useMemo(() => {
    const map = new Map();
    bank.preservationList.forEach(b => map.set(b.bloodType, (map.get(b.bloodType) || 0) + b.unitsAvailable));
    return Array.from(map, ([type, units]) => ({ type, units }));
  }, [bank.preservationList]);

  const filtered = bank.preservationList.filter(item => {
    const typeOk = filters.type === 'All' || item.bloodType === filters.type;
    let expiryOk = true;
    if (filters.expiry === 'Near') {
      expiryOk = new Date(item.expiryDate) <= new Date(Date.now() + 7*24*3600*1000);
    }
    return typeOk && expiryOk;
  });

  const exportCSV = () => {
    const header = ['LotID','BloodType','Units','TempC','Unit','CollectionDate','ExpiryDate','Status'];
    const rows = filtered.map(i => [i.lotId, i.bloodType, i.unitsAvailable, i.storage.tempC, i.storage.unit, i.collectionDate, i.expiryDate, i.status]);
    const csv = [header, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'send-records.csv');
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Send Records', 14, 16);
    const rows = bank.sendRecords.map(r => [r.id, r.hospitalName, r.hospitalId, r.items.map(i => `${i.type}:${i.units}`).join(' '), r.dispatchedAt, r.staff, r.success ? 'Yes' : 'No']);
    doc.autoTable({ head: [['ID','Hospital','HospitalID','Items','DispatchedAt','Staff','Success']], body: rows, startY: 22 });
    doc.save('send-records.pdf');
  };

  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card className="card"><CardContent>
            <Typography variant="subtitle2">Blood Stock %</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800 }}>{stockPct}%</Typography>
            <Box sx={{ height: 160 }}>
              <ResponsiveContainer>
                <BarChart data={[{ name: 'Stock', value: stockPct }]}> 
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" />
                  <XAxis dataKey="name" stroke="#ccc" />
                  <YAxis domain={[0, 100]} stroke="#ccc" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#ff5a6a" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="card"><CardContent>
            <Typography variant="subtitle2">% Successful Sends</Typography>
            <Box sx={{ height: 160 }}>
              <ResponsiveContainer>
                <LineChart data={bank.successSendStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" />
                  <XAxis dataKey="date" stroke="#ccc" />
                  <YAxis domain={[0, 1]} tickFormatter={(v) => `${Math.round(v*100)}%`} stroke="#ccc" />
                  <Tooltip formatter={(v) => `${Math.round(v*100)}%`} />
                  <Line type="monotone" dataKey="successRate" stroke="#ff5a6a" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="card"><CardContent>
            <Typography variant="subtitle2">Pending Shipments</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800 }}>{bank.sendRecords.filter(r => !r.success).length}</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
              {bank.sendRecords.map(r => (
                <Chip key={r.id} label={r.id} color={r.success ? 'success' : 'warning'} size="small" />
              ))}
            </Stack>
          </CardContent></Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card className="card"><CardContent>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
              <TextField select label="Blood Type" value={filters.type} onChange={e => setFilters(f => ({ ...f, type: e.target.value }))} size="small" sx={{ minWidth: 140 }}>
                {['All','O+','O-','A+','A-','B+','B-','AB+','AB-'].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </TextField>
              <TextField select label="Expiry" value={filters.expiry} onChange={e => setFilters(f => ({ ...f, expiry: e.target.value }))} size="small" sx={{ minWidth: 140 }}>
                {['All','Near'].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </TextField>
              <Button onClick={exportCSV} variant="outlined" color="error">Export CSV</Button>
              <Button onClick={exportPDF} variant="outlined" color="error">Export PDF</Button>
            </Stack>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 1 }}>
              {bank.preservationList.filter(i => (filters.type === 'All' || i.bloodType === filters.type)).map(item => {
                const nearExpiry = new Date(item.expiryDate) <= new Date(Date.now() + 7*24*3600*1000);
                const expired = new Date(item.expiryDate) < new Date();
                return (
                  <Box key={item.lotId} className="glow-hover" sx={{ p: 1.5, borderRadius: 2, border: '1px solid rgba(255,255,255,0.12)', background: expired ? 'rgba(255,0,0,0.08)' : nearExpiry ? 'rgba(255,255,0,0.06)' : 'transparent' }}>
                    <Typography sx={{ fontWeight: 700 }}>{item.bloodType} • Units {item.unitsAvailable} • {item.status}</Typography>
                    <Typography variant="body2">Storage {item.storage.tempC}°C • {item.storage.unit} • Collected {item.collectionDate} • Expiry {item.expiryDate} • Lot {item.lotId}</Typography>
                  </Box>
                );
              })}
            </Box>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card className="card"><CardContent>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Stock by Blood Type</Typography>
            <Box sx={{ height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={stockByType}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" />
                  <XAxis dataKey="type" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Bar dataKey="units" fill="#ff5a6a" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
            <Typography variant="subtitle2" sx={{ mt: 2 }}>Reputation Score</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>{bank.reputationScore}</Typography>
          </CardContent></Card>
        </Grid>

        <Grid item xs={12}>
          <Card className="card"><CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>Send Records (Audit Trail)</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 1 }}>
              {bank.sendRecords.map(r => (
                <Box key={r.id} className="glow-hover" sx={{ p: 1.5, borderRadius: 2, border: '1px solid rgba(255,255,255,0.12)' }}>
                  <Typography sx={{ fontWeight: 700 }}>{r.id} • {r.hospitalName} ({r.hospitalId}) • {r.success ? 'Success' : 'Pending'}</Typography>
                  <Typography variant="body2">Items: {r.items.map(i => `${i.type}:${i.units}`).join(' ')} • Dispatched {r.dispatchedAt} • {r.transport} • Staff {r.staff}</Typography>
                </Box>
              ))}
            </Box>
          </CardContent></Card>
        </Grid>
      </Grid>
    </Box>
  );
}
