import { Button } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useState } from 'react';
import EmergencyModal from '../widgets/EmergencyModal.jsx';

export default function EmergencyButton({ role }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button className="pulse-red" variant="contained" color="error" startIcon={<WarningAmberIcon />} onClick={() => setOpen(true)} sx={{ fontWeight: 700 }}>
        EMERGENCY REQUEST
      </Button>
      <EmergencyModal open={open} onClose={() => setOpen(false)} requesterRole={role} />
    </>
  );
}
