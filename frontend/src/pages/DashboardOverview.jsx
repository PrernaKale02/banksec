import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, Users, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { api } from '../api/apiClient';

export default function DashboardOverview() {
    // Initial state matching the mock structure to prevent rendering errors before load
    const [stats, setStats] = useState({
        totalMonitored: 0,
        activeAlerts: 0,
        highRiskUsers: 0,
        suspiciousActivities: 0,
    });
    
    const [timeline, setTimeline] = useState([]);
    const [deptRisk, setDeptRisk] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsData, timelineData, riskData] = await Promise.all([
                    api.get('/api/dashboard/stats'),
                    api.get('/api/dashboard/timeline'),
                    api.get('/api/dashboard/department-risk')
                ]);
                
                setStats(statsData);
                setTimeline(timelineData);
                setDeptRisk(riskData);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            }
        };

        fetchDashboardData();
        const interval = setInterval(fetchDashboardData, 3000); // 3-second polling
        return () => clearInterval(interval);
    }, []);

    const statCards = [
        { label: 'Total Monitored', value: stats.totalMonitored, icon: Users, color: 'text-cyber-blue', bg: 'bg-cyber-blue/10' },
        { label: 'Active Alerts', value: stats.activeAlerts, icon: AlertTriangle, color: 'text-cyber-warning', bg: 'bg-cyber-warning/10', isFlashing: stats.activeAlerts > 0 },
        { label: 'High Risk Users', value: stats.highRiskUsers, icon: ShieldCheck, color: 'text-cyber-danger', bg: 'bg-cyber-danger/10' },
        { label: 'Suspicious Activities', value: stats.suspiciousActivities, icon: Activity, color: 'text-cyber-neon', bg: 'bg-cyber-neon/10' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold border-b border-gray-800 pb-2 inline-block flex items-center">
                    Security Overview
                    {stats.activeAlerts > 0 && <span className="ml-3 w-3 h-3 bg-cyber-warning rounded-full animate-ping"></span>}
                </h1>
                <div className="text-sm text-gray-400 bg-cyber-800 px-4 py-2 rounded-lg border border-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-cyber-success rounded-full mr-2"></span> Last updated: Live
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        className={`glass-panel rounded-xl p-6 flex items-center space-x-4 transition-colors ${stat.isFlashing ? 'border-cyber-warning shadow-[0_0_15px_rgba(255,170,0,0.15)] glow-warning' : 'hover:border-cyber-blue/50'}`}
                    >
                        <div className={`p-4 rounded-lg ${stat.bg}`}>
                            <stat.icon className={`w-8 h-8 ${stat.color} ${stat.isFlashing ? 'animate-pulse' : ''}`} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-3xl font-bold mt-1 text-gray-100">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    className="lg:col-span-2 glass-panel rounded-xl p-6"
                >
                    <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4">
                        <h2 className="text-lg font-semibold flex items-center">
                            <Activity className="w-5 h-5 mr-2 text-cyber-neon" /> Live Anomaly Timeline
                        </h2>
                    </div>
                    <div className="h-64">
                        {timeline.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={timeline}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                                    <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                                    <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#FFF' }}
                                        itemStyle={{ color: '#00F0FF' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="anomalies"
                                        stroke="#00F0FF"
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: '#0B1120', stroke: '#00F0FF', strokeWidth: 2 }}
                                        activeDot={{ r: 6, fill: '#00F0FF' }}
                                        isAnimationActive={false} // Disable animation on polling to prevent jank
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-500">Loading timeline data...</div>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    className="glass-panel rounded-xl p-6"
                >
                    <h2 className="text-lg font-semibold border-b border-gray-800 pb-4 mb-4">Department Risk Heatmap</h2>
                    <div className="space-y-4">
                        {deptRisk.map((dept, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-300">{dept.name}</span>
                                    <span className={dept.riskScore > 50 ? 'text-cyber-danger' : dept.riskScore > 20 ? 'text-cyber-warning' : 'text-cyber-success'}>
                                        Score: {dept.riskScore}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-1000 ${dept.riskScore > 50 ? 'bg-cyber-danger glow-danger' : dept.riskScore > 20 ? 'bg-cyber-warning' : 'bg-cyber-success'}`}
                                        style={{ width: `${dept.riskScore}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
