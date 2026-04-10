import React, { useState, useEffect } from 'react';
import { Shield, Home, Users, Clock, LogOut } from 'lucide-react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CustomerRecords from './pages/CustomerRecords';
import DownloadProgress from './pages/DownloadProgress';
import { logActivity } from './api/logActivity';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [employee, setEmployee] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (emp) => {
    setEmployee(emp);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    if (employee) {
      logActivity({
        employeeId: employee.id,
        action: 'LOGOUT',
        details: `${employee.name} logged out`,
        resource: 'Auth System',
      });
    }
    setEmployee(null);
    setCurrentPage('login');
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Show login page (no navbar)
  if (currentPage === 'login' || !employee) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const timeStr = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const dateStr = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Render internal pages with navbar
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage employee={employee} onNavigate={navigateTo} />;
      case 'records':
        return (
          <CustomerRecords
            employee={employee}
            onExportAll={() => navigateTo('download')}
          />
        );
      case 'download':
        return (
          <DownloadProgress
            employee={employee}
            onGoBack={() => navigateTo('records')}
          />
        );
      default:
        return <HomePage employee={employee} onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="portal-layout">
      {/* Top Navbar */}
      <nav className="portal-navbar">
        <div className="navbar-left">
          {/* Brand */}
          <div className="navbar-brand">
            <div className="navbar-logo">
              <Shield />
            </div>
            <span>SecureBank</span>
          </div>

          <div className="navbar-divider"></div>

          {/* Navigation Links */}
          <div className="navbar-links">
            <button
              className={`navbar-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => navigateTo('home')}
            >
              <Home size={15} /> Dashboard
            </button>
            <button
              className={`navbar-link ${currentPage === 'records' || currentPage === 'download' ? 'active' : ''}`}
              onClick={() => navigateTo('records')}
            >
              <Users size={15} /> Customer Records
            </button>
          </div>
        </div>

        <div className="navbar-right">
          {/* Live Clock */}
          <div className="navbar-time">
            <Clock />
            {timeStr} — {dateStr}
          </div>

          {/* User Info */}
          <div className="navbar-user">
            <div className="navbar-avatar">{employee.avatar}</div>
            <div className="navbar-user-info">
              <span className="navbar-user-name">{employee.name}</span>
              <span className="navbar-user-role">{employee.id} · {employee.department}</span>
            </div>
          </div>

          {/* Logout */}
          <button className="navbar-logout" onClick={handleLogout}>
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <main className="portal-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
