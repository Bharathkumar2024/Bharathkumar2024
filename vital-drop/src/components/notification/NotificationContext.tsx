import React, { createContext, useContext, useMemo, useState } from 'react';

export type Notification = {
  id: string;
  title: string;
  message: string;
  createdAt: number;
  acknowledged?: boolean;
  type?: 'emergency' | 'info' | 'success' | 'warning';
  actions?: Array<{ label: string; id: string }>; // e.g., Respond / Ignore
};

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  push: (n: Notification) => void;
  acknowledge: (id: string) => void;
  clear: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const push = (n: Notification) => setNotifications(prev => [n, ...prev]);
  const acknowledge = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, acknowledged: true } : n));
  const clear = () => setNotifications([]);

  const unreadCount = useMemo(() => notifications.filter(n => !n.acknowledged).length, [notifications]);

  const value = useMemo(() => ({ notifications, unreadCount, push, acknowledge, clear }), [notifications, unreadCount]);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationContextProvider');
  return ctx;
};
