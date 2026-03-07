export const employees = [
    { id: 'EMP-001', name: 'Alice Smith', role: 'Loan Officer', department: 'Retail Banking', lastLogin: '2023-11-20T08:15:00Z', riskScore: 12, riskLevel: 'Low', status: 'Active' },
    { id: 'EMP-023', name: 'Bob Johnson', role: 'Data Analyst', department: 'IT', lastLogin: '2023-11-20T02:13:00Z', riskScore: 92, riskLevel: 'High', status: 'Investigating' },
    { id: 'EMP-045', name: 'Charlie Davis', role: 'Branch Manager', department: 'Retail Banking', lastLogin: '2023-11-19T17:45:00Z', riskScore: 45, riskLevel: 'Medium', status: 'Active' },
    { id: 'EMP-088', name: 'Diana Prince', role: 'Investment Banker', department: 'Corporate', lastLogin: '2023-11-20T09:00:00Z', riskScore: 8, riskLevel: 'Low', status: 'Active' },
    { id: 'EMP-112', name: 'Evan Wright', role: 'System Admin', department: 'IT', lastLogin: '2023-11-20T01:45:00Z', riskScore: 78, riskLevel: 'High', status: 'Active' },
];

export const alerts = [
    { id: 'ALT-1001', employeeId: 'EMP-023', action: 'Bulk Data Export', time: '02:13 AM', riskScore: 92, reasons: ['Off-hours login', 'Unusual file download volume'], status: 'Open' },
    { id: 'ALT-1002', employeeId: 'EMP-112', action: 'Multiple Failed Logins', time: '01:45 AM', riskScore: 78, reasons: ['5 failed attempts', 'Accessing unusual server'], status: 'Investigating' },
    { id: 'ALT-1003', employeeId: 'EMP-045', action: 'Accessing unauthorized records', time: 'Previous Day', riskScore: 45, reasons: ['Attempted access to restricted folder'], status: 'Resolved' }
];

export const dashboardStats = {
    totalMonitored: 1245,
    activeAlerts: 14,
    highRiskUsers: 5,
    suspiciousActivities: 8,
};

export const timelineData = [
    { time: '00:00', anomalies: 1 },
    { time: '02:00', anomalies: 5 },
    { time: '04:00', anomalies: 2 },
    { time: '06:00', anomalies: 0 },
    { time: '08:00', anomalies: 1 },
    { time: '10:00', anomalies: 12 },
    { time: '12:00', anomalies: 3 },
    { time: '14:00', anomalies: 8 },
    { time: '16:00', anomalies: 4 },
    { time: '18:00', anomalies: 2 },
];

export const departmentRisk = [
    { name: 'IT', riskScore: 65 },
    { name: 'Corporate', riskScore: 25 },
    { name: 'Retail', riskScore: 15 },
    { name: 'HR', riskScore: 10 },
    { name: 'Finance', riskScore: 40 },
];
