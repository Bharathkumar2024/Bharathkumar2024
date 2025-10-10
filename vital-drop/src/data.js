export const mockData = {
  hospitals: [
    {
      id: 'HOSP-001',
      name: 'CityCare Hospital',
      location: 'Metropolis',
      patients: [
        { name: 'Ava Patel', age: 32, roomNo: '301A', case: 'Post-op hemorrhage', bloodTypeNeeded: 'A+', unitsRequired: 3, status: 'Requesting', admittedDate: '2025-10-01' },
        { name: 'Liam Chen', age: 45, roomNo: '214B', case: 'Accident trauma', bloodTypeNeeded: 'O-', unitsRequired: 4, status: 'Requesting', admittedDate: '2025-10-03' },
        { name: 'Sophia Garcia', age: 29, roomNo: '118C', case: 'Anemia crisis', bloodTypeNeeded: 'B+', unitsRequired: 2, status: 'Received', admittedDate: '2025-10-04' },
        { name: 'Noah Schmidt', age: 56, roomNo: '507', case: 'Cardiac surgery', bloodTypeNeeded: 'AB+', unitsRequired: 2, status: 'Requesting', admittedDate: '2025-10-05' },
        { name: 'Mia Rossi', age: 38, roomNo: '402', case: 'Maternity', bloodTypeNeeded: 'O+', unitsRequired: 1, status: 'Received', admittedDate: '2025-10-02' },
        { name: 'Ethan Brown', age: 64, roomNo: '609', case: 'GI bleed', bloodTypeNeeded: 'A-', unitsRequired: 3, status: 'Requesting', admittedDate: '2025-10-06' },
        { name: 'Isabella Khan', age: 22, roomNo: '215', case: 'Sickle cell crisis', bloodTypeNeeded: 'B-', unitsRequired: 2, status: 'Requesting', admittedDate: '2025-10-07' },
        { name: 'Lucas Müller', age: 47, roomNo: '410', case: 'Liver transplant', bloodTypeNeeded: 'O+', unitsRequired: 5, status: 'Requesting', admittedDate: '2025-10-08' },
        { name: 'Olivia Martin', age: 35, roomNo: '122', case: 'Emergency C-section', bloodTypeNeeded: 'AB-', unitsRequired: 1, status: 'Received', admittedDate: '2025-10-05' },
        { name: 'James Wilson', age: 50, roomNo: '333', case: 'Orthopedic surgery', bloodTypeNeeded: 'A+', unitsRequired: 2, status: 'Requesting', admittedDate: '2025-10-09' },
      ],
      receivedRecords: [],
    },
  ],
  donors: [
    { id: 'D-001', name: 'Emily Clark', bloodGroup: 'A+', lastDonationDate: '2025-08-15', city: 'Metropolis', availability: true, reputation: 78 },
    { id: 'D-002', name: 'Raj Verma', bloodGroup: 'O-', lastDonationDate: '2025-09-10', city: 'Metropolis', availability: true, reputation: 92 },
    { id: 'D-003', name: 'Sara Lee', bloodGroup: 'B+', lastDonationDate: '2025-07-22', city: 'Gotham', availability: false, reputation: 54 },
    { id: 'D-004', name: 'Mohammed Ali', bloodGroup: 'AB+', lastDonationDate: '2025-06-30', city: 'Metropolis', availability: true, reputation: 66 },
    { id: 'D-005', name: 'John Park', bloodGroup: 'O+', lastDonationDate: '2025-09-27', city: 'Star City', availability: true, reputation: 85 },
    { id: 'D-006', name: 'Zoe Kim', bloodGroup: 'A-', lastDonationDate: '2025-05-02', city: 'Metropolis', availability: false, reputation: 40 },
  ],
  bloodBanks: [
    {
      id: 'BB-001',
      name: 'LifeBank Central',
      ownerName: 'Dr. Anita Rao',
      location: 'Metropolis',
      bankID: 'BB-001',
      approvedCertificates: ['WHO-Compliance.pdf', 'ISO-9001-Cert.pdf'],
      otpVerified: true,
      preservationList: [
        { bloodType: 'A+', unitsAvailable: 18, storageTemp: '4°C', storageCode: 'FR-01', collectionDate: '2025-09-25', expiryDate: '2025-11-20', batchId: 'BATCH-A1', status: 'Available' },
        { bloodType: 'O-', unitsAvailable: 6, storageTemp: '-20°C', storageCode: 'FZ-02', collectionDate: '2025-09-28', expiryDate: '2025-11-25', batchId: 'BATCH-O1', status: 'Reserved' },
        { bloodType: 'B+', unitsAvailable: 11, storageTemp: '4°C', storageCode: 'FR-03', collectionDate: '2025-10-01', expiryDate: '2025-11-29', batchId: 'BATCH-B1', status: 'Available' },
        { bloodType: 'AB+', unitsAvailable: 3, storageTemp: '4°C', storageCode: 'FR-02', collectionDate: '2025-09-20', expiryDate: '2025-10-15', batchId: 'BATCH-AB1', status: 'Available' },
        { bloodType: 'O+', unitsAvailable: 24, storageTemp: '-20°C', storageCode: 'FZ-01', collectionDate: '2025-10-03', expiryDate: '2025-12-01', batchId: 'BATCH-O2', status: 'Available' },
      ],
      sendRecords: [
        { id: 'SR-1001', hospitalId: 'HOSP-001', hospitalName: 'CityCare Hospital', bloodTypes: [{ type: 'O+', units: 4 }], dispatchedAt: '2025-10-05T10:35:00Z', transport: 'Refrigerated van', staff: 'Operator: Lee', status: 'Delivered' },
      ],
      successSendStats: [
        { date: '2025-09-30', successRate: 0.7 },
        { date: '2025-10-01', successRate: 0.8 },
        { date: '2025-10-02', successRate: 0.76 },
        { date: '2025-10-03', successRate: 0.82 },
        { date: '2025-10-04', successRate: 0.85 },
        { date: '2025-10-05', successRate: 0.9 },
      ],
    },
  ],
  emergencyQueue: [],
};

export const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
