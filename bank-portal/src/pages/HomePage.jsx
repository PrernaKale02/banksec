import React, { useEffect } from 'react';
import { Users, FileText, FolderLock, ArrowRight, TrendingUp, Building2, Clock, Activity } from 'lucide-react';
import { logActivity } from '../api/logActivity';

export default function HomePage({ employee, onNavigate }) {
  // Send activity log on page load
  useEffect(() => {
    logActivity({
      employeeId: employee.id,
      action: 'PAGE_ACCESS',
      details: `${employee.name} accessed employee dashboard`,
      resource: 'Employee Dashboard',
    });
  }, [employee]);

  return (
    <div>
      {/* Welcome Header */}
      <div className="home-header">
        <h1 className="home-welcome">
          Welcome back, <span>{employee.name}</span>
        </h1>
        <p className="home-subtitle">
          {employee.role} — {employee.department} Department
        </p>
      </div>

      {/* Status Banner */}
      <div className="home-banner">
        <div className="home-banner-text">
          <h3>System Status: All Services Operational</h3>
          <p>Core banking, payment gateway, and internal systems are running smoothly.</p>
        </div>
        <div className="home-banner-badge">
          <span className="dot"></span>
          All Systems Online
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="home-cards">
        <div className="home-card" onClick={() => onNavigate('records')}>
          <div className="home-card-icon blue">
            <Users />
          </div>
          <h3>Customer Records</h3>
          <p>View, search, and export customer account data and transaction histories.</p>
          <div className="home-card-arrow">
            Access Records <ArrowRight size={14} />
          </div>
        </div>

        <div className="home-card" onClick={() => {
          logActivity({
            employeeId: employee.id,
            action: 'PAGE_ACCESS',
            details: `${employee.name} viewed Financial Reports section`,
            resource: 'Financial Reports',
          });
        }}>
          <div className="home-card-icon green">
            <FileText />
          </div>
          <h3>Financial Reports</h3>
          <p>Access quarterly reports, P&L statements, and regulatory filings.</p>
          <div className="home-card-arrow">
            View Reports <ArrowRight size={14} />
          </div>
        </div>

        <div className="home-card" onClick={() => {
          logActivity({
            employeeId: employee.id,
            action: 'PAGE_ACCESS',
            details: `${employee.name} viewed HR Files section`,
            resource: 'HR Files',
          });
        }}>
          <div className="home-card-icon amber">
            <FolderLock />
          </div>
          <h3>HR Files</h3>
          <p>Employee records, payroll data, and internal HR documentation.</p>
          <div className="home-card-arrow">
            Open Files <ArrowRight size={14} />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="home-stats">
        <div className="stat-card">
          <div className="stat-card-label">Total Customers</div>
          <div className="stat-card-value">15,847</div>
          <div className="stat-card-sub">Across all branches</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Active Accounts</div>
          <div className="stat-card-value">14,203</div>
          <div className="stat-card-sub">92.1% activation rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Today's Transactions</div>
          <div className="stat-card-value">3,421</div>
          <div className="stat-card-sub">₹24.7 Cr processed</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Pending Reviews</div>
          <div className="stat-card-value">12</div>
          <div className="stat-card-sub">3 high-priority</div>
        </div>
      </div>
    </div>
  );
}
