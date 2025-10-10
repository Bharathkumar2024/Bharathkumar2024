import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import HospitalAuth from './pages/auth/HospitalAuth.jsx';
import DonorAuth from './pages/auth/DonorAuth.jsx';
import BloodBankAuth from './pages/auth/BloodBankAuth.jsx';
import HospitalDashboard from './pages/HospitalDashboard.jsx';
import DonorDashboard from './pages/DonorDashboard.jsx';
import BloodBankDashboard from './pages/BloodBankDashboard.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { DataProvider } from './context/DataContext.jsx';
import Layout from './components/shared/Layout.jsx';

function AppRoutes() {
  const { role } = useAuth();

  useEffect(() => {
    document.title = 'LifeLink | Vital Drop';
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/auth/hospital" element={<HospitalAuth />} />
      <Route path="/auth/donor" element={<DonorAuth />} />
      <Route path="/auth/blood-bank" element={<BloodBankAuth />} />

      <Route
        path="/hospital/*"
        element={
          role === 'hospital' ? (
            <Layout role="hospital">
              <HospitalDashboard />
            </Layout>
          ) : (
            <Navigate to="/auth/hospital" replace />
          )
        }
      />

      <Route
        path="/donor/*"
        element={
          role === 'donor' ? (
            <Layout role="donor">
              <DonorDashboard />
            </Layout>
          ) : (
            <Navigate to="/auth/donor" replace />
          )
        }
      />

      <Route
        path="/blood-bank/*"
        element={
          role === 'bloodbank' ? (
            <Layout role="bloodbank">
              <BloodBankDashboard />
            </Layout>
          ) : (
            <Navigate to="/auth/blood-bank" replace />
          )
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppRoutes />
      </DataProvider>
    </AuthProvider>
  );
}
