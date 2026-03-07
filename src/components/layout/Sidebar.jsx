import React from 'react';
import {
    LayoutDashboard,
    Users,
    AlertTriangle,
    Activity,
    ShieldAlert,
    FileText,
    Settings
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Sidebar({ currentTab, setCurrentTab }) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'employees', label: 'Employee Monitoring', icon: Users },
        { id: 'alerts', label: 'Risk Alerts', icon: AlertTriangle },
        { id: 'analytics', label: 'Behavior Analytics', icon: Activity },
        { id: 'cases', label: 'Investigation Cases', icon: ShieldAlert },
        { id: 'logs', label: 'System Logs', icon: FileText },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="w-64 bg-cyber-800 border-r border-gray-800 flex flex-col h-full">
            <div className="p-6 flex items-center space-x-3">
                <ShieldAlert className="w-8 h-8 text-cyber-neon" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyber-neon to-cyber-blue">
                    BankSec AI
                </span>
            </div>

            <div className="flex-1 px-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentTab(item.id)}
                        className={twMerge(
                            clsx(
                                'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                                currentTab === item.id
                                    ? 'bg-cyber-blue/10 text-cyber-neon glow-neon border border-cyber-blue/30'
                                    : 'text-gray-400 hover:bg-cyber-700/50 hover:text-gray-200'
                            )
                        )}
                    >
                        <item.icon className={clsx('w-5 h-5', currentTab === item.id ? 'text-cyber-neon' : 'text-gray-400')} />
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
            </div>

            <div className="p-4 border-t border-gray-800 text-xs text-gray-500 flex items-center justify-between">
                <span>v1.1.1</span>
                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-cyber-success mr-2"></span>System Online</span>
            </div>
        </div>
    );
}
