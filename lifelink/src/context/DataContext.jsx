import { createContext, useContext, useMemo, useState, useEffect, useCallback } from 'react';
import { initialData } from '../data.js';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState(initialData);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {}, 30000);
    return () => clearInterval(interval);
  }, []);

  const createEmergency = useCallback(({ bloodType, units, requesterRole }) => {
    const emergency = {
      id: `E${Date.now()}`,
      bloodType,
      units: Number(units),
      requesterRole,
      createdAt: new Date().toISOString(),
      acknowledgements: [],
      pledgedUnits: 0,
      status: 'open',
    };
    setData(prev => ({ ...prev, emergencyQueue: [emergency, ...prev.emergencyQueue] }));
    setNotifications(prev => [
      { id: `N${Date.now()}`, type: 'emergency', title: 'Emergency Request', body: `${bloodType} • ${units} units`, read: false, createdAt: new Date().toISOString() },
      ...prev,
    ]);
  }, []);

  const acknowledgeEmergency = useCallback((emergencyId, units) => {
    setData(prev => ({
      ...prev,
      emergencyQueue: prev.emergencyQueue.map(e => e.id === emergencyId
        ? { ...e, acknowledgements: [...e.acknowledgements, { units, at: new Date().toISOString() }], pledgedUnits: e.pledgedUnits + Number(units) }
        : e)
    }));
  }, []);

  const markAllRead = useCallback(() => setNotifications(prev => prev.map(n => ({ ...n, read: true }))), []);

  const value = useMemo(() => ({ data, setData, notifications, markAllRead, createEmergency, acknowledgeEmergency }), [data, notifications, createEmergency, acknowledgeEmergency, markAllRead]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
