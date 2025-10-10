import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HospitalAuth from './pages/hospital/HospitalAuth';
import HospitalDashboard from './pages/hospital/HospitalDashboard';
import DonorAuth from './pages/donor/DonorAuth';
import DonorDashboard from './pages/donor/DonorDashboard';
import BloodBankAuth from './pages/bloodbank/BloodBankAuth';
import BloodBankDashboard from './pages/bloodbank/BloodBankDashboard';
import SharedLayout from './components/SharedLayout';

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<SharedLayout />}>        
        <Route path="/" element={<LandingPage />} />
        <Route path="/hospital/auth" element={<HospitalAuth />} />
        <Route path="/hospital/dashboard" element={<HospitalDashboard />} />

        <Route path="/donor/auth" element={<DonorAuth />} />
        <Route path="/donor/dashboard" element={<DonorDashboard />} />

        <Route path="/bloodbank/auth" element={<BloodBankAuth />} />
        <Route path="/bloodbank/dashboard" element={<BloodBankDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
