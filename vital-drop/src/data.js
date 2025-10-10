import dayjs from 'dayjs'

const randomId = () => Math.random().toString(36).slice(2, 9)

export const initialData = {
  hospitals: [
    {
      id: 'HSP-1001',
      name: 'CityCare General Hospital',
      location: 'Downtown',
      patients: [
        { id: randomId(), name: 'Aarav Patel', age: 42, roomNo: 'A-103', case: 'Post-op trauma', bloodTypeNeeded: 'O+', unitsRequired: 2, admittedDate: dayjs().subtract(2, 'day').toISOString(), status: 'requesting' },
        { id: randomId(), name: 'Priya Sharma', age: 31, roomNo: 'B-205', case: 'Thalassemia', bloodTypeNeeded: 'B+', unitsRequired: 1, admittedDate: dayjs().subtract(1, 'day').toISOString(), status: 'requesting' },
        { id: randomId(), name: 'Ishan Khan', age: 58, roomNo: 'C-112', case: 'Cardiac surgery', bloodTypeNeeded: 'A-', unitsRequired: 3, admittedDate: dayjs().subtract(3, 'day').toISOString(), status: 'received' },
        { id: randomId(), name: 'Neha Verma', age: 27, roomNo: 'D-301', case: 'Accident', bloodTypeNeeded: 'AB+', unitsRequired: 2, admittedDate: dayjs().subtract(6, 'hour').toISOString(), status: 'requesting' },
        { id: randomId(), name: 'Rohit Gupta', age: 36, roomNo: 'E-411', case: 'Dialysis', bloodTypeNeeded: 'O-', unitsRequired: 1, admittedDate: dayjs().subtract(4, 'day').toISOString(), status: 'received' },
        { id: randomId(), name: 'Sara Ali', age: 45, roomNo: 'F-515', case: 'Anemia', bloodTypeNeeded: 'A+', unitsRequired: 2, admittedDate: dayjs().subtract(5, 'day').toISOString(), status: 'requesting' },
        { id: randomId(), name: 'Kabir Das', age: 66, roomNo: 'G-209', case: 'GI bleeding', bloodTypeNeeded: 'B-', unitsRequired: 2, admittedDate: dayjs().subtract(12, 'hour').toISOString(), status: 'requesting' },
        { id: randomId(), name: 'Zara Shaikh', age: 19, roomNo: 'H-120', case: 'Post-delivery', bloodTypeNeeded: 'O+', unitsRequired: 1, admittedDate: dayjs().subtract(9, 'day').toISOString(), status: 'received' },
        { id: randomId(), name: 'Vihaan Rao', age: 52, roomNo: 'I-422', case: 'Bypass surgery', bloodTypeNeeded: 'AB-', unitsRequired: 2, admittedDate: dayjs().subtract(1, 'hour').toISOString(), status: 'requesting' },
        { id: randomId(), name: 'Ananya Iyer', age: 39, roomNo: 'J-214', case: 'Transfusion reaction', bloodTypeNeeded: 'A+', unitsRequired: 1, admittedDate: dayjs().subtract(7, 'day').toISOString(), status: 'requesting' },
      ],
      safetyLogs: [],
    },
  ],
  donors: [
    { id: 'DNR-2001', name: 'Rahul Mehta', bloodGroup: 'A+', city: 'Downtown', lastDonationDate: dayjs().subtract(60, 'day').toISOString(), available: true, reputation: 78 },
    { id: 'DNR-2002', name: 'Sneha Kapoor', bloodGroup: 'O+', city: 'Midtown', lastDonationDate: dayjs().subtract(90, 'day').toISOString(), available: true, reputation: 84 },
    { id: 'DNR-2003', name: 'Arjun Singh', bloodGroup: 'B-', city: 'Uptown', lastDonationDate: dayjs().subtract(120, 'day').toISOString(), available: false, reputation: 65 },
    { id: 'DNR-2004', name: 'Ishita Bose', bloodGroup: 'AB+', city: 'Downtown', lastDonationDate: dayjs().subtract(30, 'day').toISOString(), available: true, reputation: 72 },
    { id: 'DNR-2005', name: 'Nitin Kumar', bloodGroup: 'O-', city: 'Midtown', lastDonationDate: dayjs().subtract(10, 'day').toISOString(), available: false, reputation: 60 },
    { id: 'DNR-2006', name: 'Fatima Noor', bloodGroup: 'A-', city: 'Downtown', lastDonationDate: dayjs().subtract(150, 'day').toISOString(), available: true, reputation: 90 },
  ],
  bloodBanks: [
    {
      bankID: 'BB-3001',
      name: 'RedShield Blood Bank',
      ownerName: 'Vikram Desai',
      city: 'Downtown',
      approvedCertificates: ['ISO9001.pdf', 'Govt-Approval-2024.pdf'],
      otpVerified: true,
      preservationList: [
        { batchId: 'LOT-A1', bloodType: 'A+', unitsAvailable: 12, storage: { tempC: 4, unit: 'FR-01' }, collectionDate: dayjs().subtract(12, 'day').toISOString(), expiryDate: dayjs().add(18, 'day').toISOString(), status: 'Available' },
        { batchId: 'LOT-O1', bloodType: 'O+', unitsAvailable: 20, storage: { tempC: 3, unit: 'FR-02' }, collectionDate: dayjs().subtract(30, 'day').toISOString(), expiryDate: dayjs().add(10, 'day').toISOString(), status: 'Reserved' },
        { batchId: 'LOT-BN1', bloodType: 'B-', unitsAvailable: 5, storage: { tempC: 4, unit: 'FR-03' }, collectionDate: dayjs().subtract(35, 'day').toISOString(), expiryDate: dayjs().add(5, 'day').toISOString(), status: 'Available' },
        { batchId: 'LOT-AB2', bloodType: 'AB+', unitsAvailable: 4, storage: { tempC: 4, unit: 'FR-04' }, collectionDate: dayjs().subtract(40, 'day').toISOString(), expiryDate: dayjs().subtract(1, 'day').toISOString(), status: 'Expired' },
      ],
      sendRecords: [
        { id: randomId(), hospitalId: 'HSP-1001', hospitalName: 'CityCare General Hospital', items: [{ type: 'O+', units: 2 }], timestamp: dayjs().subtract(7, 'day').toISOString(), transport: { mode: 'Refrigerated Van', tempC: 4 }, staff: 'V. Desai', delivered: true },
      ],
      successSendStats: Array.from({ length: 14 }).map((_, i) => ({ date: dayjs().subtract(13 - i, 'day').format('MM-DD'), rate: Math.round(60 + Math.random() * 35) })),
    },
    {
      bankID: 'BB-3002',
      name: 'LifeFlow Blood Center',
      ownerName: 'Anjali Menon',
      city: 'Midtown',
      approvedCertificates: ['NABL-Cert.pdf'],
      otpVerified: false,
      preservationList: [
        { batchId: 'LOT-O2', bloodType: 'O-', unitsAvailable: 6, storage: { tempC: 3, unit: 'FF-01' }, collectionDate: dayjs().subtract(10, 'day').toISOString(), expiryDate: dayjs().add(15, 'day').toISOString(), status: 'Available' },
      ],
      sendRecords: [],
      successSendStats: Array.from({ length: 14 }).map((_, i) => ({ date: dayjs().subtract(13 - i, 'day').format('MM-DD'), rate: Math.round(50 + Math.random() * 40) })),
    },
  ],
  emergencyQueue: [
    // example: { id, source: 'hospital'|'bloodbank', sourceId, bloodType, units, createdAt, status: 'open'|'acknowledged'|'fulfilled', acknowledgements: [{ by: 'donor'|'bloodbank', id, units }] }
  ],
}
