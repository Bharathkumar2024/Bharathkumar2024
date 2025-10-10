import React from 'react';
import { Badge, IconButton, Menu, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useApp } from '../../context/AppContext';

export default function NotificationBell() {
  const { notifications, markNotificationRead, unreadCount } = useApp();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)} aria-label="notifications">
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {notifications.slice(0, 10).map(n => (
          <MenuItem key={n.id} onClick={() => markNotificationRead(n.id)}>
            {n.title}: {n.message}
          </MenuItem>
        ))}
        {notifications.length === 0 && <MenuItem disabled>No notifications</MenuItem>}
      </Menu>
    </>
  );
}
