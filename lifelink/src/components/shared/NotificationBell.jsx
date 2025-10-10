import { useMemo } from 'react';
import { IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useData } from '../../context/DataContext.jsx';

export default function NotificationBell() {
  const { notifications, markAllRead } = useData();
  const unread = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  return (
    <IconButton color="inherit" onClick={markAllRead} aria-label={`notifications ${unread} unread`}>
      <Badge badgeContent={unread} color="error" invisible={unread === 0}>
        <NotificationsIcon sx={{ animation: unread ? 'blink 1.2s steps(1,end) infinite' : 'none' }} />
      </Badge>
    </IconButton>
  );
}
