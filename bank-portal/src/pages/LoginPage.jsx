import React, { useState } from 'react';
import { Shield, Lock } from 'lucide-react';
import { logActivity } from '../api/logActivity';
import { EMPLOYEES } from '../data/employees';

export default function LoginPage({ onLogin }) {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Short delay to simulate auth
    await new Promise((resolve) => setTimeout(resolve, 800));

    const employee = EMPLOYEES[employeeId.toUpperCase()];

    if (!employee || employee.password !== password) {
      setError('Invalid Employee ID or Password. Contact IT support if locked out.');
      setLoading(false);
      return;
    }

    // Get the current time for the log
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    // Send login activity log to backend
    await logActivity({
      employeeId: employee.id,
      action: 'LOGIN',
      details: `${employee.name} logged in at ${timeStr}`,
      resource: 'Auth System',
      dataVolumeMb: 0,
    });

    setLoading(false);
    onLogin(employee);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Brand Header */}
        <div className="login-brand">
          <div className="login-brand-icon">
            <Shield />
          </div>
          <h1>SecureBank India</h1>
          <p>Employee Intranet Portal</p>
        </div>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="employee-id">Employee ID</label>
            <input
              id="employee-id"
              type="text"
              placeholder="e.g. EMP-023"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span> Authenticating...
              </>
            ) : (
              <>
                <Lock size={16} /> Sign In to Portal
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          Authorized access only. All sessions are logged and monitored.
          <br />
          <span>SecureBank India Ltd.</span> — Information Security Division
        </div>
      </div>
    </div>
  );
}
