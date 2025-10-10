import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import HospitalAuth from './components/Hospitals/HospitalAuth';
import DonorAuth from './components/Donors/DonorAuth';
import BloodBankAuth from './components/BloodBanks/BloodBankAuth';
import HospitalDashboard from './components/Hospitals/HospitalDashboard';
import DonorDashboard from './components/Donors/DonorDashboard';
import BloodBankDashboard from './components/BloodBanks/BloodBankDashboard';
import Layout from './components/Dashboard/Layout';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/hospital/auth" element={<HospitalAuth />} />
      <Route
        path="/hospital/dashboard"
        element={
          <Layout role="hospital">
            <HospitalDashboard />
          </Layout>
        }
      />

      <Route path="/donor/auth" element={<DonorAuth />} />
      <Route
        path="/donor/dashboard"
        element={
          <Layout role="donor">
            <DonorDashboard />
          </Layout>
        }
      />

      <Route path="/bank/auth" element={<BloodBankAuth />} />
      <Route
        path="/bank/dashboard"
        element={
          <Layout role="bank">
            <BloodBankDashboard />
          </Layout>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
