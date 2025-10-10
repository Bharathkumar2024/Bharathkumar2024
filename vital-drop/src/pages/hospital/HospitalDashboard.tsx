import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { mockData } from '../../shared/data';
import { useNotifications } from '../../components/notification/NotificationContext';
import { v4 as uuid } from 'uuid';

const HospitalDashboard: React.FC = () => {
  const patients = mockData.hospitals[0].patients;
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  const { push } = useNotifications();

  const total = patients.length;
  const need = patients.filter(p => p.status === 'requesting').length;
  const received = total - need;
  const needPct = Math.round((need / total) * 100);
  const recPct = 100 - needPct;

  const cols: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'age', headerName: 'Age', width: 90 },
    { field: 'room', headerName: 'Room No.', width: 120 },
    { field: 'case', headerName: 'Injury / Case', flex: 1 },
    { field: 'blood', headerName: 'Blood Type Needed', width: 170 },
    { field: 'units', headerName: 'Units Required', width: 140 },
    { field: 'admittedDate', headerName: 'Admission Date', width: 140 },
    {
      field: 'status', headerName: 'Status', width: 130, renderCell: (params) => (
        <Chip label={params.value === 'requesting' ? '🔴 Requesting' : '🟢 Received'} color={params.value === 'requesting' ? 'error' : 'success'} variant="outlined" />
      )
    }
  ];

  const rows = useMemo(() => patients.map((p, id) => ({ id, ...p })), [patients]);

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<any>({});

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button className="pulse-btn" variant="contained" color="error" onClick={() => {
          push({ id: uuid(), title: 'Emergency Request', message: 'Hospital requested immediate A+ 4 units', type: 'emergency', createdAt: Date.now(), actions: [{ label: 'Respond', id: 'respond' }, { label: 'Ignore', id: 'ignore' }] });
          alert('Emergency broadcast sent (mock)');
        }}>EMERGENCY REQUEST</Button>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card className="glow-card">
            <CardContent>
              <Typography fontWeight={700}>Blood Needed Patients</Typography>
              <Typography variant="body2">{need}/{total} → {needPct}%</Typography>
              <LinearProgress color="error" variant="determinate" value={needPct} sx={{ height: 10, borderRadius: 1, mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card className="glow-card">
            <CardContent>
              <Typography fontWeight={700}>Patients Who Received Blood</Typography>
              <Typography variant="body2">{received}/{total} → {recPct}%</Typography>
              <LinearProgress color="success" variant="determinate" value={recPct} sx={{ height: 10, borderRadius: 1, mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card className="glow-card">
            <CardContent>
              <Typography fontWeight={700} mb={1}>Patient Admitted List for Blood Needed</Typography>
              <div style={{ width: '100%', height: 420 }}>
                <DataGrid
                  rows={rows}
                  columns={cols}
                  onRowClick={(p) => { setEdit(p.row); setOpen(true); }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Box display="flex" gap={1} overflow="auto" p={1}>
            {patients.map((p, idx) => (
              <Chip key={idx} label={`${p.name} • ${p.status === 'requesting' ? '🔴' : '🟢'}`} color={p.status === 'requesting' ? 'error' : 'success'} variant="outlined" />
            ))}
          </Box>
        </Grid>
      </Grid>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="glow-card" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', p: 3, width: 520, maxWidth: '90vw', outline: 'none' }}>
          <Typography fontWeight={700} mb={2}>Patient Details</Typography>
          <Box display="grid" gap={1.5}>
            <TextField label="Name" value={edit.name || ''} onChange={(e) => setEdit((s: any) => ({ ...s, name: e.target.value }))} />
            <TextField label="Age" value={edit.age || ''} onChange={(e) => setEdit((s: any) => ({ ...s, age: e.target.value }))} />
            <TextField label="Room No." value={edit.room || ''} onChange={(e) => setEdit((s: any) => ({ ...s, room: e.target.value }))} />
            <TextField label="Injury / Case" value={edit.case || ''} onChange={(e) => setEdit((s: any) => ({ ...s, case: e.target.value }))} />
            <TextField label="Blood Type Needed" value={edit.blood || ''} onChange={(e) => setEdit((s: any) => ({ ...s, blood: e.target.value }))} />
            <TextField label="Units Required" value={edit.units || ''} onChange={(e) => setEdit((s: any) => ({ ...s, units: e.target.value }))} />
            <TextField label="Admission Date" value={edit.admittedDate || ''} onChange={(e) => setEdit((s: any) => ({ ...s, admittedDate: e.target.value }))} />
            <Button variant="contained" color="error" onClick={() => { alert('Saved to mock JSON'); setOpen(false); }}>Save</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default HospitalDashboard;
