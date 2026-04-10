import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Clock, MapPin, Monitor, Filter, Search, FileText } from 'lucide-react';
import { alerts } from '../data/mockData';
import { clsx } from 'clsx';

export default function RiskAlerts() {
    const [filter, setFilter] = useState('All');

    const filteredAlerts = filter === 'All' ? alerts : alerts.filter(a => a.status === filter);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center">
                        <AlertTriangle className="w-6 h-6 mr-3 text-cyber-danger" /> System Alerts
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">AI-generated alerts based on behavioral anomalies</p>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="flex bg-cyber-800 rounded-lg p-1 border border-gray-700">
                        {['All', 'Open', 'Investigating', 'Resolved'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={clsx(
                                    "px-4 py-1.5 text-sm rounded-md transition-all",
                                    filter === tab
                                        ? "bg-cyber-900 text-white shadow-sm font-medium"
                                        : "text-gray-400 hover:text-gray-200"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredAlerts.map((alert, index) => (
                        <motion.div
                            key={alert.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-panel rounded-xl overflow-hidden border border-gray-800 hover:border-cyber-danger/50 transition-colors group flex flex-col"
                        >
                            <div className={clsx(
                                "h-1 w-full",
                                alert.riskScore > 80 ? "bg-cyber-danger" : alert.riskScore > 40 ? "bg-cyber-warning" : "bg-cyber-success"
                            )}></div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-xs font-mono text-gray-500 bg-gray-800 px-2 py-1 rounded">{alert.id}</span>
                                    <span className={clsx(
                                        "px-2 py-1 text-xs rounded-full border",
                                        alert.status === 'Open' ? 'bg-cyber-danger/10 border-cyber-danger/20 text-cyber-danger' :
                                            alert.status === 'Investigating' ? 'bg-cyber-warning/10 border-cyber-warning/20 text-cyber-warning' :
                                                'bg-gray-800 border-gray-700 text-gray-400'
                                    )}>
                                        {alert.status}
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-gray-100 flex items-center">
                                        {alert.action}
                                    </h3>
                                    <p className="text-sm text-cyber-blue font-mono mt-1">User: {alert.employeeId}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-6">
                                    <div className="flex items-center"><Clock className="w-3 h-3 mr-1 text-gray-500" /> {alert.time}</div>
                                    <div className="flex items-center"><Monitor className="w-3 h-3 mr-1 text-gray-500" /> WRK-2041</div>
                                </div>

                                <div className="bg-cyber-900 border border-gray-800 rounded-lg p-3 mt-auto">
                                    <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">AI Detection Reasons</div>
                                    <ul className="space-y-1">
                                        {alert.reasons.map((reason, i) => (
                                            <li key={i} className="text-sm text-gray-300 flex items-start">
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyber-warning mt-1.5 mr-2 flex-shrink-0"></span>
                                                {reason}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="p-4 border-t border-gray-800 bg-cyber-800/20 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="text-sm font-medium">Risk Score: <span className={alert.riskScore > 80 ? 'text-cyber-danger' : 'text-cyber-warning'}>{alert.riskScore}</span></div>
                                <button className="text-xs bg-cyber-blue hover:bg-blue-600 text-white px-3 py-1.5 rounded transition-colors">
                                    Investigate
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
