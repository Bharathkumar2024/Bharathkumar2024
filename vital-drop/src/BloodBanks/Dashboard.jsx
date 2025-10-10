import { Box, Button, Chip, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { useData } from '../contexts/DataContext'
import { useAuth } from '../contexts/AuthContext'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts'
import { saveAs } from 'file-saver'
import Papa from 'papaparse'

export default function BloodBankDashboard() {
  const { data } = useData()
  const { user } = useAuth()
  const bank = data.bloodBanks.find((b) => b.bankID === (user?.id || 'BB-3001'))

  const totalCapacity = 100 // mock capacity baseline
  const totalUnits = bank.preservationList.reduce((sum, it) => sum + it.unitsAvailable, 0)
  const stockPct = Math.min(100, Math.round((totalUnits / totalCapacity) * 100))

  const stockByType = useMemo(() => {
    const map = new Map()
    bank.preservationList.forEach((it) => {
      map.set(it.bloodType, (map.get(it.bloodType) || 0) + it.unitsAvailable)
    })
    return Array.from(map.entries()).map(([type, units]) => ({ type, units }))
  }, [bank])

  function exportSendRecords() {
    const csv = Papa.unparse(bank.sendRecords)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'send-records.csv')
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Welcome, {bank?.name}</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Blood Stock %</Typography>
            <Box sx={{ mt: 1, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42, fontWeight: 800, textShadow: '0 0 10px rgba(255,0,0,0.4)' }}>{stockPct}%</Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">% Successful Sends (last 14 days)</Typography>
            <Box sx={{ height: 180 }}>
              <ResponsiveContainer>
                <LineChart data={bank.successSendStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Pending Shipments</Typography>
            <Typography variant="h3" sx={{ mt: 2 }}>{bank.sendRecords.filter((r) => !r.delivered).length}</Typography>
            <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={exportSendRecords}>Export Send Records (CSV)</Button>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Preservation Blood List (Inventory)</Typography>
        <Box sx={{ height: 220, mb: 2 }}>
          <ResponsiveContainer>
            <BarChart data={stockByType}>
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="units" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Stack spacing={1}>
          {bank.preservationList.map((it) => {
            const exp = new Date(it.expiryDate)
            const daysLeft = Math.ceil((exp - Date.now()) / (1000 * 60 * 60 * 24))
            const color = daysLeft < 0 ? 'error' : daysLeft <= 5 ? 'warning' : 'default'
            return (
              <Paper key={it.batchId} sx={{ p: 1.5, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, alignItems: 'center' }}>
                <Typography variant="body2">{it.bloodType}</Typography>
                <Typography variant="body2">{it.unitsAvailable}</Typography>
                <Typography variant="body2">{it.storage.tempC}°C / {it.storage.unit}</Typography>
                <Typography variant="body2">{new Date(it.collectionDate).toLocaleDateString()}</Typography>
                <Typography variant="body2">{exp.toLocaleDateString()}</Typography>
                <Typography variant="body2">{it.batchId}</Typography>
                <Chip size="small" color={color} label={it.status} />
              </Paper>
            )
          })}
        </Stack>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Shipment & Safety Send-Records</Typography>
        <Stack spacing={1}>
          {bank.sendRecords.map((r) => (
            <Paper key={r.id} sx={{ p: 1.5, display: 'grid', gridTemplateColumns: '1.3fr 1.1fr 1.3fr 1fr 1fr', gap: 1 }}>
              <Typography variant="body2">Hospital: {r.hospitalName} ({r.hospitalId})</Typography>
              <Typography variant="body2">Items: {r.items.map((i) => `${i.type}:${i.units}`).join(', ')}</Typography>
              <Typography variant="body2">When: {new Date(r.timestamp).toLocaleString()}</Typography>
              <Typography variant="body2">Transport: {r.transport.mode} {r.transport.tempC}°C</Typography>
              <Chip size="small" color={r.delivered ? 'success' : 'warning'} label={r.delivered ? 'Delivered' : 'Pending'} />
            </Paper>
          ))}
        </Stack>
      </Paper>
    </Stack>
  )
}
