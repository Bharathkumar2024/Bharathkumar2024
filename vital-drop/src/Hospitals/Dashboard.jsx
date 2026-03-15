import { Box, Chip, Divider, Grid, LinearProgress, Modal, Paper, Stack, Typography, Button, TextField } from '@mui/material'
import { useMemo, useState } from 'react'
import { useData } from '../contexts/DataContext'
import { useAuth } from '../contexts/AuthContext'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts'

function percent(n, d) { return d === 0 ? 0 : Math.round((n / d) * 100) }

function ProgressBar({ value, color = '#ff4d4d' }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <LinearProgress variant="determinate" value={value} sx={{ flex: 1, height: 10, borderRadius: 5, '& .MuiLinearProgress-bar': { background: color } }} />
      <Typography variant="body2">{value}%</Typography>
    </Box>
  )
}

function PatientModal({ open, onClose, patient, onSave }) {
  const [form, setForm] = useState(patient || {})
  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 600, maxWidth: '90vw', p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Patient Details</Typography>
        <Stack spacing={2}>
          <TextField label="Name" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField label="Age" value={form.age || ''} onChange={(e) => setForm({ ...form, age: e.target.value })} />
          <TextField label="Room No." value={form.roomNo || ''} onChange={(e) => setForm({ ...form, roomNo: e.target.value })} />
          <TextField label="Case" value={form.case || ''} onChange={(e) => setForm({ ...form, case: e.target.value })} />
          <TextField label="Blood Type" value={form.bloodTypeNeeded || ''} onChange={(e) => setForm({ ...form, bloodTypeNeeded: e.target.value })} />
          <TextField label="Units Required" value={form.unitsRequired || ''} onChange={(e) => setForm({ ...form, unitsRequired: e.target.value })} />
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="contained" color="error" onClick={() => onSave(form)}>Save</Button>
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  )
}

export default function HospitalDashboard() {
  const { data, setData } = useData()
  const { user } = useAuth()
  const hospital = data.hospitals.find((h) => h.id === (user?.id || 'HSP-1001'))
  const patients = hospital?.patients?.slice(0, 10) || []

  const numNeed = patients.filter((p) => p.status === 'requesting').length
  const numReceived = patients.filter((p) => p.status === 'received').length

  const [selectedPatient, setSelectedPatient] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const dist = useMemo(() => {
    const map = new Map()
    patients.forEach((p) => {
      const key = p.bloodTypeNeeded
      map.set(key, (map.get(key) || 0) + 1)
    })
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }))
  }, [patients])

  function savePatient(updated) {
    setData((prev) => ({
      ...prev,
      hospitals: prev.hospitals.map((h) => h.id !== hospital.id ? h : {
        ...h,
        patients: h.patients.map((p) => p.id === updated.id ? updated : p)
      })
    }))
    setModalOpen(false)
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Welcome, {hospital?.name}</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Blood Needed Patients</Typography>
            <ProgressBar value={percent(numNeed, patients.length)} />
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1">Patients Who Received Blood</Typography>
            <ProgressBar value={percent(numReceived, patients.length)} color="#22c55e" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Blood Type Distribution</Typography>
            <Box sx={{ height: 220 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={dist} dataKey="value" nameKey="name" outerRadius={80}>
                    {dist.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={["#ef4444","#f97316","#eab308","#22c55e","#3b82f6","#a855f7","#ec4899","#14b8a6"][index % 8]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Patient Admitted List for Blood Needed</Typography>
        <Box sx={{ display: 'flex', overflowX: 'auto', gap: 1, pb: 1 }}>
          {patients.map((p) => (
            <Chip key={p.id} label={p.name} color={p.status === 'requesting' ? 'error' : 'success'} variant="outlined" />
          ))}
        </Box>
        <Divider sx={{ my: 1 }} />
        <Stack spacing={1}>
          {patients.map((p) => (
            <Paper key={p.id} sx={{ p: 1.5, display: 'grid', gridTemplateColumns: '1.4fr repeat(6, 1fr) 120px', gap: 1, alignItems: 'center' }}>
              <Typography>{p.name}</Typography>
              <Typography variant="body2">{p.age}</Typography>
              <Typography variant="body2">{p.roomNo}</Typography>
              <Typography variant="body2">{p.case}</Typography>
              <Typography variant="body2">{p.bloodTypeNeeded}</Typography>
              <Typography variant="body2">{p.unitsRequired}</Typography>
              <Typography variant="body2">{new Date(p.admittedDate).toLocaleDateString()}</Typography>
              <Chip size="small" label={p.status === 'requesting' ? '🔴 Requesting' : '🟢 Received'} color={p.status === 'requesting' ? 'error' : 'success'} />
              <Button onClick={() => { setSelectedPatient(p); setModalOpen(true) }}>View/Edit</Button>
            </Paper>
          ))}
        </Stack>
      </Paper>

      <PatientModal open={modalOpen} onClose={() => setModalOpen(false)} patient={selectedPatient} onSave={savePatient} />
    </Stack>
  )
}
