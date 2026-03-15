import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNotifications } from '../contexts/NotificationContext'

const bloodTypes = ['A+','A-','B+','B-','AB+','AB-','O+','O-']

export default function EmergencyModal({ open, onClose }) {
  const [type, setType] = useState('O+')
  const [units, setUnits] = useState(1)
  const { push } = useNotifications()

  function submit() {
    push({ title: 'Emergency Request', message: `Need ${units} units of ${type}. Respond if available.` })
    onClose?.()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={{ position: 'absolute', top: '12%', left: '50%', transform: 'translateX(-50%)', width: 520, maxWidth: '92vw', p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>EMERGENCY REQUEST</Typography>
        <Stack spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Blood Type</InputLabel>
            <Select label="Blood Type" value={type} onChange={(e) => setType(e.target.value)}>
              {bloodTypes.map((bt) => (<MenuItem key={bt} value={bt}>{bt}</MenuItem>))}
            </Select>
          </FormControl>
          <TextField type="number" label="Units Required" value={units} onChange={(e) => setUnits(Number(e.target.value || 0))} />
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="contained" color="error" onClick={submit}>Submit</Button>
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  )
}
