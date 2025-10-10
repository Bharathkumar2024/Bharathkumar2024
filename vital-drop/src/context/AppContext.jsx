import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { mockData } from '../data';
import { v4 as uuidv4 } from 'uuid';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [hospitals, setHospitals] = useState(() => load('hospitals', mockData.hospitals));
  const [donors, setDonors] = useState(() => load('donors', mockData.donors));
  const [bloodBanks, setBloodBanks] = useState(() => load('bloodBanks', mockData.bloodBanks));
  const [emergencyQueue, setEmergencyQueue] = useState(() => load('emergencyQueue', mockData.emergencyQueue));
  const [notifications, setNotifications] = useState(() => load('notifications', []));

  const [auth, setAuth] = useState(() => load('auth', {
    hospital: { isAuthenticated: false, userId: null },
    donor: { isAuthenticated: false, userId: null },
    bank: { isAuthenticated: false, userId: null },
  }));

  useEffect(() => save('hospitals', hospitals), [hospitals]);
  useEffect(() => save('donors', donors), [donors]);
  useEffect(() => save('bloodBanks', bloodBanks), [bloodBanks]);
  useEffect(() => save('emergencyQueue', emergencyQueue), [emergencyQueue]);
  useEffect(() => save('notifications', notifications), [notifications]);
  useEffect(() => save('auth', auth), [auth]);

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(`vd_${key}`);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(`vd_${key}`, JSON.stringify(value));
    } catch {}
  }

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  function addNotification({ title, message, roleTargets = ['donor','bank','hospital'], meta }) {
    const created = roleTargets.map(role => ({ id: uuidv4(), title, message, role, read: false, createdAt: new Date().toISOString(), meta }));
    setNotifications(prev => [...created, ...prev]);
  }

  function markNotificationRead(id) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  function submitEmergencyRequest({ requesterRole, requesterId, bloodType, unitsRequired }) {
    const newReq = {
      id: uuidv4(),
      requesterRole,
      requesterId,
      bloodType,
      unitsRequired,
      createdAt: new Date().toISOString(),
      acknowledgements: [],
      status: 'OPEN',
    };
    setEmergencyQueue(prev => [newReq, ...prev]);
    addNotification({
      title: 'Emergency Request',
      message: `${bloodType} needed (${unitsRequired} units). Respond if available.`,
      roleTargets: ['donor', 'bank'],
      meta: { emergencyId: newReq.id },
    });
    return newReq.id;
  }

  function acknowledgeEmergency({ emergencyId, responderRole, responderId, unitsPledged }) {
    setEmergencyQueue(prev => prev.map(e => e.id === emergencyId ? {
      ...e,
      acknowledgements: [...e.acknowledgements, { responderRole, responderId, unitsPledged, at: new Date().toISOString() }],
    } : e));
  }

  function updatePatient(hospitalId, index, updated) {
    setHospitals(prev => prev.map(h => {
      if (h.id !== hospitalId) return h;
      const patients = [...h.patients];
      patients[index] = { ...patients[index], ...updated };
      return { ...h, patients };
    }));
  }

  function createSendRecord(bankId, record) {
    setBloodBanks(prev => prev.map(b => b.id === bankId ? { ...b, sendRecords: [{ id: uuidv4(), ...record }, ...b.sendRecords] } : b));
    setHospitals(prev => prev.map(h => h.id === record.hospitalId ? { ...h, receivedRecords: [{ id: uuidv4(), ...record }, ...(h.receivedRecords || [])] } : h));
    addNotification({
      title: 'Dispatch Notice',
      message: `Blood dispatched to ${record.hospitalName}`,
      roleTargets: ['hospital'],
      meta: { hospitalId: record.hospitalId },
    });
  }

  function login(role, userId) {
    setAuth(prev => ({ ...prev, [role]: { isAuthenticated: true, userId } }));
  }

  function logout(role) {
    setAuth(prev => ({ ...prev, [role]: { isAuthenticated: false, userId: null } }));
  }

  const value = {
    hospitals,
    donors,
    bloodBanks,
    emergencyQueue,
    notifications,
    unreadCount,
    addNotification,
    markNotificationRead,
    submitEmergencyRequest,
    acknowledgeEmergency,
    updatePatient,
    createSendRecord,
    auth,
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
