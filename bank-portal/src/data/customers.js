/**
 * Fake customer records for the demo.
 * Shown in the Customer Records table — the employee "exports" these.
 */
export const CUSTOMERS = [
  { id: 1, name: 'Ravi Mehta', accountNo: 'SECB-0045-2198', type: 'Savings', balance: 1245000, branch: 'Mumbai HQ', phone: '+91 98XXX-XXXXX', status: 'Active' },
  { id: 2, name: 'Priya Nair', accountNo: 'SECB-0045-3301', type: 'Current', balance: 3780000, branch: 'Chennai Central', phone: '+91 87XXX-XXXXX', status: 'Active' },
  { id: 3, name: 'Amit Sharma', accountNo: 'SECB-0012-7756', type: 'Savings', balance: 567800, branch: 'Delhi NCR', phone: '+91 99XXX-XXXXX', status: 'Active' },
  { id: 4, name: 'Sunita Deshmukh', accountNo: 'SECB-0078-1120', type: 'Fixed Deposit', balance: 8900000, branch: 'Pune Koregaon', phone: '+91 70XXX-XXXXX', status: 'Active' },
  { id: 5, name: 'Vikram Reddy', accountNo: 'SECB-0034-5589', type: 'Current', balance: 12340000, branch: 'Hyderabad IT', phone: '+91 81XXX-XXXXX', status: 'Active' },
  { id: 6, name: 'Ananya Iyer', accountNo: 'SECB-0091-2203', type: 'Savings', balance: 234500, branch: 'Bangalore HSR', phone: '+91 96XXX-XXXXX', status: 'Dormant' },
  { id: 7, name: 'Rajesh Kumar', accountNo: 'SECB-0067-8845', type: 'Salary', balance: 189000, branch: 'Mumbai Andheri', phone: '+91 88XXX-XXXXX', status: 'Active' },
  { id: 8, name: 'Deepika Joshi', accountNo: 'SECB-0023-4412', type: 'Savings', balance: 4562000, branch: 'Jaipur Central', phone: '+91 93XXX-XXXXX', status: 'Active' },
  { id: 9, name: 'Karthik Menon', accountNo: 'SECB-0056-9971', type: 'Current', balance: 7823000, branch: 'Kochi Marine', phone: '+91 77XXX-XXXXX', status: 'Active' },
  { id: 10, name: 'Neha Gupta', accountNo: 'SECB-0089-3367', type: 'Fixed Deposit', balance: 15000000, branch: 'Delhi Connaught', phone: '+91 85XXX-XXXXX', status: 'Active' },
  { id: 11, name: 'Suresh Patil', accountNo: 'SECB-0041-6623', type: 'Savings', balance: 345600, branch: 'Nagpur Civil', phone: '+91 92XXX-XXXXX', status: 'Active' },
  { id: 12, name: 'Kavita Rao', accountNo: 'SECB-0072-1198', type: 'Current', balance: 2190000, branch: 'Bangalore MG', phone: '+91 79XXX-XXXXX', status: 'Frozen' },
  { id: 13, name: 'Arjun Singh', accountNo: 'SECB-0015-8854', type: 'Salary', balance: 156000, branch: 'Lucknow Hazrat', phone: '+91 94XXX-XXXXX', status: 'Active' },
  { id: 14, name: 'Meera Pillai', accountNo: 'SECB-0098-2240', type: 'Savings', balance: 890000, branch: 'Trivandrum East', phone: '+91 86XXX-XXXXX', status: 'Active' },
  { id: 15, name: 'Rohit Agarwal', accountNo: 'SECB-0033-7789', type: 'Current', balance: 5670000, branch: 'Kolkata Park St', phone: '+91 91XXX-XXXXX', status: 'Active' },
];

/**
 * Format balance as Indian Rupees.
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
