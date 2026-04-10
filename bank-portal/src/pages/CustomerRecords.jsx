import React, { useEffect } from 'react';
import { Database, Download, Eye, AlertTriangle } from 'lucide-react';
import { logActivity } from '../api/logActivity';
import { CUSTOMERS, formatCurrency } from '../data/customers';

export default function CustomerRecords({ employee, onExportAll }) {
  // Log page access
  useEffect(() => {
    logActivity({
      employeeId: employee.id,
      action: 'PAGE_ACCESS',
      details: `${employee.name} accessed Customer Records database`,
      resource: 'Customer Records',
    });
  }, [employee]);

  const handleViewRecord = (customer) => {
    logActivity({
      employeeId: employee.id,
      action: 'VIEW_RECORD',
      details: `Viewed record for ${customer.name} (${customer.accountNo})`,
      resource: 'Customer Records',
      dataVolumeMb: 0.02,
    });
  };

  const handleExportSelected = () => {
    logActivity({
      employeeId: employee.id,
      action: 'DATA_EXPORT',
      details: `Exported selected customer records (3 records)`,
      resource: 'Customer Records',
      dataVolumeMb: 2.5,
    });
  };

  const handleExportAll = () => {
    // Send the critical log — this is the trigger!
    logActivity({
      employeeId: employee.id,
      action: 'BULK_DATA_EXPORT',
      details: `${employee.name} initiated bulk export of 15,000 customer records`,
      resource: 'Customer Database',
      dataVolumeMb: 1200,
    });

    // Navigate to download progress page
    onExportAll();
  };

  return (
    <div>
      {/* Page Header */}
      <div className="records-header">
        <h2>
          <Database size={22} />
          Customer Records
          <span className="count">15,847 records</span>
        </h2>
        <div className="records-actions">
          <button className="btn btn-secondary" onClick={handleExportSelected}>
            <Download size={15} />
            Export Selected
          </button>
          <button className="btn btn-danger" onClick={handleExportAll}>
            <AlertTriangle size={15} />
            Export All Records
          </button>
        </div>
      </div>

      {/* Records Table */}
      <div className="records-table-container">
        <table className="records-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Account Number</th>
              <th>Type</th>
              <th>Balance</th>
              <th>Branch</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((customer) => (
              <tr key={customer.id}>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{customer.id}</td>
                <td style={{ fontWeight: 600 }}>{customer.name}</td>
                <td className="account-no">{customer.accountNo}</td>
                <td>{customer.type}</td>
                <td className="balance">{formatCurrency(customer.balance)}</td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{customer.branch}</td>
                <td>
                  <span className={`status-badge ${customer.status.toLowerCase()}`}>
                    <span className="status-dot"></span>
                    {customer.status}
                  </span>
                </td>
                <td>
                  <button className="view-btn" onClick={() => handleViewRecord(customer)}>
                    <Eye size={13} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="records-footer">
          <span>Showing 15 of 15,847 records</span>
          <span>Displaying page 1 of 1,057</span>
        </div>
      </div>
    </div>
  );
}
