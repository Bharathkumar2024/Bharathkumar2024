import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null); // 'hospital' | 'donor' | 'bloodbank'
  const [user, setUser] = useState(null);

  const login = (nextRole, profile) => {
    setRole(nextRole);
    setUser(profile);
  };

  const logout = () => {
    setRole(null);
    setUser(null);
  };

  const value = useMemo(() => ({ role, user, login, logout }), [role, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
