import { Badge, IconButton, Menu, MenuItem, ListItemText } from '@mui/material'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import { useState } from 'react'
import { useNotifications } from '../contexts/NotificationContext'

export default function NotificationBell() {
  const { notifications, markAllRead } = useNotifications()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <>
      <IconButton
        color="inherit"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        className={unreadCount ? 'blink-soft' : ''}
        aria-label={`notifications (${unreadCount} unread)`}
      >
        <Badge color="error" badgeContent={unreadCount} overlap="circular">
          <NotificationsActiveIcon />
        </Badge>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {notifications.length === 0 && (
          <MenuItem disabled>No notifications</MenuItem>
        )}
        {notifications.slice(0, 10).map((n) => (
          <MenuItem key={n.id} sx={{ whiteSpace: 'normal', maxWidth: 360 }}>
            <ListItemText
              primary={n.title}
              secondary={n.message}
              primaryTypographyProps={{ fontWeight: n.read ? 400 : 700 }}
            />
          </MenuItem>
        ))}
        {notifications.length > 0 && (
          <MenuItem onClick={() => { markAllRead(); setAnchorEl(null) }}>Mark all as read</MenuItem>
        )}
      </Menu>
    </>
  )
}
