import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import DashboardOverview from './pages/DashboardOverview';
import EmployeeMonitoring from './pages/EmployeeMonitoring';
import RiskAlerts from './pages/RiskAlerts';
import BehaviorAnalytics from './pages/BehaviorAnalytics';
import InvestigationCases from './pages/InvestigationCases';
import SystemLogs from './pages/SystemLogs';
import Settings from './pages/Settings';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';

function App() {
    const [appState, setAppState] = useState('landing'); // 'landing', 'login', 'dashboard'
    const [currentTab, setCurrentTab] = useState('dashboard');
    const [adminUser, setAdminUser] = useState(null);

    const renderDashboardContent = () => {
        switch (currentTab) {
            case 'dashboard':
                return <DashboardOverview />;
            case 'employees':
                return <EmployeeMonitoring />;
            case 'alerts':
                return <RiskAlerts />;
            case 'analytics':
                return <BehaviorAnalytics />;
            case 'cases':
                return <InvestigationCases />;
            case 'logs':
                return <SystemLogs />;
            case 'settings':
                return <Settings />;
            default:
                return (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <h2 className="text-2xl font-semibold">Section under construction</h2>
                    </div>
                );
        }
    };

    if (appState === 'landing') {
        return <LandingPage onNavigate={(state) => setAppState(state)} />;
    }

    if (appState === 'login') {
        return <AdminLogin onLoginSuccess={(user) => {
            setAdminUser(user);
            setAppState('dashboard');
        }} onBack={() => setAppState('landing')} />;
    }

    return (
        <Layout currentTab={currentTab} setCurrentTab={setCurrentTab}>
            {renderDashboardContent()}
        </Layout>
    );
}

export default App;
