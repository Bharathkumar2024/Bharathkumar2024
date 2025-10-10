import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { useApp } from '../../context/AppContext';

export default function Notifications() {
  const { notifications, markNotificationRead } = useApp();
  return (
    <List sx={{ bgcolor: 'rgba(0,0,0,0.2)', color: '#fff' }}>
      {notifications.map(n => (
        <ListItem key={n.id} button onClick={() => markNotificationRead(n.id)}>
          <ListItemText primary={`${n.title} - ${n.message}`} secondary={n.createdAt} />
        </ListItem>
      ))}
    </List>
  );
}
