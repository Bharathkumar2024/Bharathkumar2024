export const mockData = {
  hospitals: [
    {
      id: 'HSP-001',
      name: 'Central Care Hospital',
      location: 'Metro City',
      patients: [
        { name: 'John Carter', age: 42, room: 'A102', case: 'Surgery', blood: 'A+', units: 3, admittedDate: '2025-10-07', status: 'requesting' },
        { name: 'Emma Stone', age: 29, room: 'B210', case: 'Trauma', blood: 'O-', units: 2, admittedDate: '2025-10-05', status: 'requesting' },
        { name: 'Michael Chen', age: 55, room: 'C305', case: 'ICU', blood: 'B+', units: 4, admittedDate: '2025-10-01', status: 'received' },
        { name: 'Ava Patel', age: 36, room: 'A109', case: 'Maternity', blood: 'AB+', units: 1, admittedDate: '2025-10-09', status: 'requesting' },
        { name: 'Lucas Smith', age: 63, room: 'D410', case: 'Cardiac', blood: 'O+', units: 5, admittedDate: '2025-10-02', status: 'received' },
        { name: 'Sophia Rossi', age: 47, room: 'B115', case: 'Oncology', blood: 'A-', units: 2, admittedDate: '2025-10-06', status: 'requesting' },
        { name: 'Noah Kim', age: 33, room: 'C210', case: 'ER', blood: 'B-', units: 3, admittedDate: '2025-10-04', status: 'requesting' },
        { name: 'Mia Garcia', age: 24, room: 'A220', case: 'Orthopedics', blood: 'O+', units: 2, admittedDate: '2025-10-08', status: 'received' },
        { name: 'Ethan Brown', age: 39, room: 'D101', case: 'Surgery', blood: 'AB-', units: 1, admittedDate: '2025-10-03', status: 'received' },
        { name: 'Isabella Nguyen', age: 28, room: 'B320', case: 'ER', blood: 'A+', units: 2, admittedDate: '2025-10-05', status: 'requesting' }
      ]
    }
  ],
  donors: [
    { id: 'D-001', name: 'Alice', bloodGroup: 'O+', city: 'Metropolis', available: true },
    { id: 'D-002', name: 'Brian', bloodGroup: 'A-', city: 'Metropolis', available: false },
    { id: 'D-003', name: 'Chloe', bloodGroup: 'B+', city: 'Gotham', available: true }
  ],
  bloodBanks: [
    {
      bankId: 'BB-001',
      name: 'Metro Blood Bank',
      ownerName: 'Dr. Wayne',
      approvedCertificates: ['cert-iso9001.pdf', 'cert-safety-audit.pdf'],
      otpVerified: true,
      pendingShipments: 3,
      preservationList: [
        { bloodType: 'A+', units: 40, storage: 'Fridge F1 @ 4°C', collected: '2025-09-22', expiry: '2025-11-22', batchId: 'A+F1-0922', status: 'Available' },
        { bloodType: 'O-', units: 12, storage: 'Freezer Z2 @ -18°C', collected: '2025-09-02', expiry: '2025-10-15', batchId: 'O-Z2-0902', status: 'Near Expiry' },
        { bloodType: 'B+', units: 25, storage: 'Fridge F2 @ 4°C', collected: '2025-09-30', expiry: '2025-12-01', batchId: 'B+F2-0930', status: 'Available' },
        { bloodType: 'AB-', units: 5, storage: 'Freezer Z1 @ -18°C', collected: '2025-08-01', expiry: '2025-10-01', batchId: 'AB-Z1-0801', status: 'Expired' }
      ],
      sendRecords: [
        { hospitalName: 'Central Care Hospital', hospitalId: 'HSP-001', items: [{ type: 'A+', units: 3 }], timestamp: '2025-10-08 14:20', transport: 'Refrigerated Van', staff: 'Operator Lee' },
        { hospitalName: 'Westside Clinic', hospitalId: 'HSP-009', items: [{ type: 'O-', units: 2 }, { type: 'B+', units: 1 }], timestamp: '2025-10-07 10:12', transport: 'Courier', staff: 'Owner' }
      ],
      successSendStats: Array.from({ length: 30 }, (_, i) => ({ day: i+1, successRate: Math.round(60 + 30 * Math.random()) }))
    }
  ],
  emergencyQueue: [
    { id: 'E-001', origin: 'Hospital', bloodType: 'A+', units: 4, createdAt: Date.now() - 3600_000, acknowledgements: 2, pledgedUnits: 3 },
    { id: 'E-002', origin: 'BloodBank', bloodType: 'O-', units: 6, createdAt: Date.now() - 7200_000, acknowledgements: 1, pledgedUnits: 1 }
  ]
};
