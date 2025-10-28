import React, { useMemo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useNotifications } from './NotificationContext';

const NotificationBell: React.FC = () => {
  const { notifications, unreadCount, acknowledge, push } = useNotifications();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton color="inherit" aria-label="notifications" onClick={handleOpen}>
        <Badge badgeContent={unreadCount} color="error" className={unreadCount ? 'notification-blink' : ''}>
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': { width: 360, maxWidth: '90vw' } }}>
        <Box px={2} py={1}>
          <Typography fontWeight={700}>Notifications</Typography>
        </Box>
        <Divider />
        {notifications.length === 0 && (
          <MenuItem disabled>No notifications</MenuItem>
        )}
        {notifications.map((n) => (
          <Box key={n.id} px={2} py={1} sx={{ opacity: n.acknowledged ? 0.6 : 1 }}>
            <Typography fontWeight={700} color={n.type === 'emergency' ? 'error' : 'inherit'}>{n.title}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>{n.message}</Typography>
            <Box display="flex" gap={1}>
              {n.actions?.map((a) => (
                <Button key={a.id} size="small" variant={a.id === 'respond' ? 'contained' : 'outlined'} color={a.id === 'respond' ? 'success' : 'inherit'} onClick={() => {
                  acknowledge(n.id);
                  if (a.id === 'respond') {
                    push({ id: Math.random().toString(36).slice(2), title: 'Response sent', message: 'Thanks for responding to the emergency.', type: 'success', createdAt: Date.now(), acknowledged: true });
                  }
                }}>{a.label}</Button>
              ))}
              <Button size="small" onClick={() => acknowledge(n.id)}>Mark Read</Button>
            </Box>
            <Divider sx={{ mt: 1 }} />
          </Box>
        ))}
      </Menu>
    </>
  );
};

export default NotificationBell;
