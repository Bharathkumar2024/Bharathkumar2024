import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing.jsx'
import HospitalAuth from './pages/auth/HospitalAuth.jsx'
import DonorAuth from './pages/auth/DonorAuth.jsx'
import BloodBankAuth from './pages/auth/BloodBankAuth.jsx'
import Layout from './Dashboard/Layout.jsx'
import HospitalDashboard from './Hospitals/Dashboard.jsx'
import BloodBankDashboard from './BloodBanks/Dashboard.jsx'
import DonorDashboard from './Donors/Dashboard.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/auth/hospital" element={<HospitalAuth />} />
        <Route path="/auth/donor" element={<DonorAuth />} />
        <Route path="/auth/bloodbank" element={<BloodBankAuth />} />

        <Route element={<Layout showEmergency /> }>
          <Route path="/hospital" element={<HospitalDashboard />} />
          <Route path="/bloodbank" element={<BloodBankDashboard />} />
          <Route path="/donor" element={<DonorDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
