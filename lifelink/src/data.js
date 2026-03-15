// Mock data for LifeLink - Vital Drop
export const initialData = {
  hospitals: [
    {
      id: 'HOSP-001',
      name: 'CityCare General Hospital',
      location: 'Downtown',
      patients: [
        { id: 'P1', name: 'Ava Patel', age: 34, room: '403A', case: 'Post-op hemorrhage', bloodType: 'A+', unitsNeeded: 2, status: 'requesting', admittedDate: '2025-10-01' },
        { id: 'P2', name: 'Liam Chen', age: 28, room: '512B', case: 'Road trauma', bloodType: 'O-', unitsNeeded: 3, status: 'requesting', admittedDate: '2025-10-02' },
        { id: 'P3', name: 'Sophia Nguyen', age: 47, room: '221C', case: 'Leukemia transfusion', bloodType: 'AB+', unitsNeeded: 1, status: 'received', admittedDate: '2025-10-03' },
        { id: 'P4', name: 'Noah Kim', age: 65, room: '109A', case: 'Cardiac surgery', bloodType: 'B+', unitsNeeded: 2, status: 'requesting', admittedDate: '2025-10-04' },
        { id: 'P5', name: 'Emma Garcia', age: 39, room: '330D', case: 'Complicated delivery', bloodType: 'O+', unitsNeeded: 1, status: 'received', admittedDate: '2025-10-04' },
        { id: 'P6', name: 'Mason Rivera', age: 51, room: '220A', case: 'Liver surgery', bloodType: 'A-', unitsNeeded: 2, status: 'requesting', admittedDate: '2025-10-05' },
        { id: 'P7', name: 'Isabella Rossi', age: 22, room: '118B', case: 'Anemia crisis', bloodType: 'B-', unitsNeeded: 1, status: 'requesting', admittedDate: '2025-10-05' },
        { id: 'P8', name: 'Ethan Shah', age: 44, room: '411C', case: 'GI bleeding', bloodType: 'O+', unitsNeeded: 2, status: 'received', admittedDate: '2025-10-06' },
        { id: 'P9', name: 'Mia Alvarez', age: 31, room: '215A', case: 'Emergency C-section', bloodType: 'A+', unitsNeeded: 2, status: 'requesting', admittedDate: '2025-10-06' },
        { id: 'P10', name: 'Lucas Silva', age: 37, room: '510A', case: 'Splenectomy', bloodType: 'AB-', unitsNeeded: 1, status: 'requesting', admittedDate: '2025-10-07' },
      ],
    },
  ],
  donors: [
    { id: 'D1', name: 'Rahul Mehta', bloodGroup: 'O+', lastDonationDate: '2025-08-12', city: 'Downtown', phone: '+15550001', reputation: 78 },
    { id: 'D2', name: 'Priya Singh', bloodGroup: 'A-', lastDonationDate: '2025-09-05', city: 'Uptown', phone: '+15550002', reputation: 85 },
    { id: 'D3', name: 'Carlos Diaz', bloodGroup: 'B+', lastDonationDate: '2025-07-20', city: 'Midtown', phone: '+15550003', reputation: 67 },
  ],
  bloodBanks: [
    {
      id: 'BB-101',
      name: 'Lifeline Blood Bank',
      ownerName: 'Dr. Hana Lee',
      location: 'Midtown',
      approvedCertificates: ['who_cert.pdf', 'iso9001.pdf'],
      otpVerified: true,
      reputationScore: 92,
      preservationList: [
        { lotId: 'LOT-A1', bloodType: 'O+', unitsAvailable: 12, storage: { tempC: 4, unit: 'FR-01' }, collectionDate: '2025-09-25', expiryDate: '2025-11-25', status: 'Available' },
        { lotId: 'LOT-B2', bloodType: 'A+', unitsAvailable: 6, storage: { tempC: 4, unit: 'FR-03' }, collectionDate: '2025-09-20', expiryDate: '2025-11-10', status: 'Reserved' },
        { lotId: 'LOT-C3', bloodType: 'O-', unitsAvailable: 3, storage: { tempC: 4, unit: 'FR-04' }, collectionDate: '2025-09-18', expiryDate: '2025-10-20', status: 'Available' },
      ],
      sendRecords: [
        { id: 'SR-9001', hospitalId: 'HOSP-001', hospitalName: 'CityCare General Hospital', items: [{ type: 'O+', units: 2 }], dispatchedAt: '2025-10-07T10:23:00Z', transport: 'Refrigerated van', staff: 'Hana Lee', success: true },
      ],
      successSendStats: [
        { date: '2025-10-01', successRate: 0.8 },
        { date: '2025-10-02', successRate: 0.85 },
        { date: '2025-10-03', successRate: 0.88 },
        { date: '2025-10-04', successRate: 0.9 },
        { date: '2025-10-05', successRate: 0.86 },
        { date: '2025-10-06', successRate: 0.93 },
      ],
    },
  ],
  emergencyQueue: [
    { id: 'E1690', bloodType: 'O-', units: 3, requesterRole: 'hospital', createdAt: '2025-10-08T12:00:00Z', acknowledgements: [{ units: 1, at: '2025-10-08T12:05:00Z'}], pledgedUnits: 1, status: 'open' },
  ],
};
