import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Chip from '@mui/material/Chip';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { mockData } from '../../shared/data';
import { useNotifications } from '../../components/notification/NotificationContext';
import { v4 as uuid } from 'uuid';
import jsPDF from 'jspdf';

const COLORS = ['#ff4d6d', '#ff758f', '#ff8fa3', '#ffb3c1', '#c9184a', '#800f2f', '#a4133c', '#590d22'];

const BloodBankDashboard: React.FC = () => {
  const { preservationList, sendRecords, successSendStats } = mockData.bloodBanks[0];
  const { push } = useNotifications();

  const totalUnits = preservationList.reduce((acc, b) => acc + b.units, 0);
  const capacity = 500; // mock capacity
  const stockPct = Math.round((totalUnits / capacity) * 100);

  const stockByType = useMemo(() => {
    const map: Record<string, number> = {};
    for (const b of preservationList) map[b.bloodType] = (map[b.bloodType] || 0) + b.units;
    return Object.entries(map).map(([bloodType, units]) => ({ bloodType, units }));
  }, [preservationList]);

  const exportRecords = (type: 'csv' | 'pdf') => {
    if (type === 'csv') {
      const header = 'Hospital,Hospital ID,Blood Types,Units,Dispatch Time,Transport,Staff\n';
      const rows = sendRecords.map(r => `${r.hospitalName},${r.hospitalId},${r.items.map(i => i.type).join('+')},${r.items.reduce((a,i)=>a+i.units,0)},${r.timestamp},${r.transport},${r.staff}`).join('\n');
      const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'send-records.csv'; a.click();
      URL.revokeObjectURL(url);
    } else {
      const doc = new jsPDF();
      doc.text('Vital Drop — Send Records', 14, 16);
      let y = 24;
      sendRecords.slice(0, 20).forEach((r, idx) => {
        doc.text(`${idx+1}. ${r.hospitalName} (${r.hospitalId}) — ${r.items.map(i => i.type+':'+i.units).join(', ')} — ${r.timestamp}`, 14, y);
        y += 8;
      });
      doc.save('send-records.pdf');
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button className="pulse-btn" variant="contained" color="error" onClick={() => {
          push({ id: uuid(), title: 'Emergency Request', message: 'Blood Bank requested O- 6 units', type: 'emergency', createdAt: Date.now(), actions: [{ label: 'Respond', id: 'respond' }, { label: 'Ignore', id: 'ignore' }] });
          alert('Emergency broadcast sent (mock)');
        }}>EMERGENCY REQUEST</Button>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card className="glow-card"><CardContent>
            <Typography fontWeight={700}>Blood Stock %</Typography>
            <Typography variant="body2">Overall capacity: {stockPct}%</Typography>
            <Box sx={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie dataKey="value" data={[{ name: 'Stock', value: stockPct }, { name: 'Empty', value: 100 - stockPct }]} innerRadius={60} outerRadius={80} startAngle={90} endAngle={-270}>
                    <Cell fill="#ff4d6d" />
                    <Cell fill="#1b1b1d" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardContent></Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card className="glow-card"><CardContent>
            <Typography fontWeight={700}>% Successful Sends to Hospitals</Typography>
            <Typography variant="body2">Last 30 days</Typography>
            <Box sx={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={successSendStats}>
                  <XAxis dataKey="day" hide />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="successRate" fill="#ff4d6d" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent></Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card className="glow-card"><CardContent>
            <Typography fontWeight={700}>Pending Shipments</Typography>
            <Typography variant="h4">{mockData.bloodBanks[0].pendingShipments}</Typography>
          </CardContent></Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card className="glow-card"><CardContent>
            <Typography fontWeight={700} mb={1}>Preservation Blood List (Inventory)</Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Blood Type</TableCell>
                  <TableCell>Units Available</TableCell>
                  <TableCell>Storage Conditions</TableCell>
                  <TableCell>Collection Date</TableCell>
                  <TableCell>Expiry Date</TableCell>
                  <TableCell>Batch / Lot ID</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {preservationList.map((b, i) => (
                  <TableRow key={i} sx={{ backgroundColor: b.status === 'Expired' ? 'rgba(255,77,77,0.08)' : b.status === 'Near Expiry' ? 'rgba(255,214,10,0.08)' : 'transparent' }}>
                    <TableCell>{b.bloodType}</TableCell>
                    <TableCell>{b.units}</TableCell>
                    <TableCell>{b.storage}</TableCell>
                    <TableCell>{b.collected}</TableCell>
                    <TableCell>{b.expiry}</TableCell>
                    <TableCell>{b.batchId}</TableCell>
                    <TableCell>
                      <Chip size="small" label={b.status} color={b.status === 'Available' ? 'success' : b.status === 'Reserved' ? 'warning' : 'error'} variant="outlined" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent></Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card className="glow-card"><CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography fontWeight={700}>Shipment & Send-Records</Typography>
              <Box display="flex" gap={1}>
                <Button variant="outlined" color="inherit" onClick={() => exportRecords('csv')}>Export CSV</Button>
                <Button variant="outlined" color="inherit" onClick={() => exportRecords('pdf')}>Export PDF</Button>
              </Box>
            </Box>

            <Box mt={1}>
              {mockData.bloodBanks[0].sendRecords.map((r, idx) => (
                <Box key={idx} display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={1} p={1} sx={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <Typography variant="body2">{r.hospitalName} ({r.hospitalId})</Typography>
                  <Typography variant="body2">{r.items.map(i => `${i.type}:${i.units}`).join(', ')}</Typography>
                  <Typography variant="body2">{r.timestamp}</Typography>
                </Box>
              ))}
            </Box>
          </CardContent></Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BloodBankDashboard;
