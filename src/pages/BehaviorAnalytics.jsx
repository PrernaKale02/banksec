import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, BarChart3, Clock } from 'lucide-react';

const topRiskyEmployees = [
    { name: 'EMP-023', score: 92 },
    { name: 'EMP-112', score: 78 },
    { name: 'EMP-089', score: 65 },
    { name: 'EMP-045', score: 45 },
    { name: 'EMP-134', score: 32 },
];

const anomalyTypes = [
    { name: 'Off-hours access', count: 45 },
    { name: 'Mass Download', count: 28 },
    { name: 'Multiple Fails', count: 18 },
    { name: 'Unauth Folder', count: 12 },
    { name: 'Geo-Anomaly', count: 5 },
];

export default function BehaviorAnalytics() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <h1 className="text-2xl font-bold flex items-center">
                    <Activity className="w-6 h-6 mr-3 text-cyber-neon" /> Behavior Analytics
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Risky Employees Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-panel p-6 rounded-xl"
                >
                    <h2 className="text-lg font-semibold flex items-center mb-6">
                        <ShieldAlert className="w-5 h-5 mr-2 text-cyber-danger" /> Top Risky Employees
                    </h2>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topRiskyEmployees} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" horizontal={false} />
                                <XAxis type="number" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                                <YAxis dataKey="name" type="category" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} width={80} />
                                <RechartsTooltip
                                    cursor={{ fill: '#111827' }}
                                    contentStyle={{ backgroundColor: '#0B1120', borderColor: '#374151', color: '#FFF' }}
                                />
                                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                                    {topRiskyEmployees.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.score > 80 ? '#EF4444' : entry.score > 40 ? '#F59E0B' : '#10B981'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Anomaly Distribution Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-6 rounded-xl"
                >
                    <h2 className="text-lg font-semibold flex items-center mb-6">
                        <BarChart3 className="w-5 h-5 mr-2 text-cyber-blue" /> Anomaly Distribution
                    </h2>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={anomalyTypes}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                                <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={60} />
                                <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                                <RechartsTooltip
                                    cursor={{ fill: '#111827' }}
                                    contentStyle={{ backgroundColor: '#0B1120', borderColor: '#374151', color: '#FFF' }}
                                />
                                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-panel p-6 rounded-xl"
                >
                    <h2 className="text-lg font-semibold flex items-center mb-4">
                        <Clock className="w-5 h-5 mr-2 text-cyber-warning" /> Unusual Login Heatmap Insights
                    </h2>
                    <p className="text-gray-400 text-sm mb-4">
                        AI analysis shows a 300% increase in unusual off-hours login attempts starting at 02:00 AM EST, primarily affecting the IT and Corporate departments. This correlates with the recent mass data export alerts.
                    </p>
                    <div className="bg-cyber-900 border border-gray-800 rounded-lg p-4 font-mono text-sm text-gray-300">
                        [AI_AGENT_NOTE]: Monitor active session tokens for EMP-023 and EMP-112. Recommended action is immediate session invalidation and password reset.
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
