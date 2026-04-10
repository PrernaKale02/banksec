import React, { useState, useEffect } from 'react';
import { Database, Download, Filter, Search, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../api/apiClient';

export default function SystemLogs() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const data = await api.get('/api/activity/recent');
                // Map backend format to frontend format
                const formatted = data.map((log) => {
                    let level = 'INFO';
                    if (log.action === 'BULK_DATA_EXPORT') level = 'CRITICAL';
                    else if (log.action === 'FAILED_LOGIN') level = 'ERROR';
                    else if (log.data_volume_mb > 100) level = 'WARNING';

                    // Format timestamp
                    const ts = new Date(log.timestamp);
                    const timeStr = ts.toISOString().replace('T', ' ').substring(0, 19);

                    return {
                        id: `ACT-${log.id}`,
                        timestamp: timeStr,
                        level,
                        source: log.resource || 'System',
                        message: log.details || log.action
                    };
                });
                setLogs(formatted);
            } catch (error) {
                console.error("Failed to fetch logs:", error);
            }
        };

        fetchLogs();
        const interval = setInterval(fetchLogs, 3000); // Poll every 3s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center">
                        <Terminal className="w-6 h-6 mr-3 text-gray-400" /> System Logs
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Live raw audit logs and system event feed.</p>
                </div>
                <button className="bg-cyber-800 hover:bg-cyber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-700 flex items-center">
                    <Download className="w-4 h-4 mr-2" /> Export Logs
                </button>
            </div>

            <div className="glass-panel rounded-xl overflow-hidden flex flex-col h-[70vh]">
                <div className="p-4 border-b border-gray-800 flex justify-between bg-cyber-800/30">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search logs by IP, ID, or keyword..."
                            className="w-full bg-cyber-900 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue text-sm font-mono placeholder-gray-600"
                        />
                    </div>
                    <div className="flex space-x-2">
                        <button className="bg-cyber-900 border border-gray-700 px-3 py-2 rounded-lg hover:bg-cyber-800 text-gray-400 hover:text-white transition-colors flex items-center text-sm">
                            <Filter className="w-4 h-4 mr-2" /> Levels
                        </button>
                        <button className="bg-cyber-900 border border-gray-700 p-2 rounded-lg hover:bg-cyber-800 text-gray-400 hover:text-white transition-colors">
                            <Database className="w-5 h-5 flex items-center justify-center text-xs" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-auto bg-[#0A0F1A] p-4 text-sm font-mono font-medium tracking-tight">
                    {logs.map((log, idx) => (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0 }} // Removed stagger for performance on polling
                            key={log.id}
                            className="flex items-start py-2 border-b border-gray-800/50 hover:bg-gray-800/20 px-2 rounded group"
                        >
                            <span className="text-gray-500 min-w-[160px] whitespace-nowrap">{log.timestamp}</span>

                            <span className={`min-w-[100px] px-2 py-0.5 rounded text-xs mx-3 text-center ${log.level === 'CRITICAL' ? 'bg-cyber-danger/20 text-cyber-danger border border-cyber-danger/30' :
                                    log.level === 'WARNING' ? 'bg-cyber-warning/20 text-cyber-warning border border-cyber-warning/30' :
                                        log.level === 'ERROR' ? 'bg-red-900/40 text-red-400 border border-red-800/50' :
                                            'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20'
                                }`}>
                                {log.level}
                            </span>

                            <span className="text-gray-400 min-w-[140px] truncate">[{log.source}]</span>

                            <span className={`flex-1 break-words ml-2 ${log.level === 'CRITICAL' || log.level === 'ERROR' ? 'text-gray-200' : 'text-gray-400'
                                }`}>
                                {log.message}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
