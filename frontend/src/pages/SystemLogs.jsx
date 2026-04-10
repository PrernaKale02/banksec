import React from 'react';
import { Database, Download, Filter, Search, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const mockLogs = [
    { id: 'LOG-8910', timestamp: '2023-11-20 02:14:05', level: 'CRITICAL', source: 'Auth Service', message: 'Multiple failed login attempts detected for EMP-112 from IP 192.168.1.50' },
    { id: 'LOG-8909', timestamp: '2023-11-20 02:13:42', level: 'WARNING', source: 'Data Export API', message: 'Large volume data export initiated by EMP-023. Size: 1.2GB' },
    { id: 'LOG-8908', timestamp: '2023-11-20 02:10:15', level: 'INFO', source: 'Session Manager', message: 'Session generated for EMP-023' },
    { id: 'LOG-8907', timestamp: '2023-11-20 02:05:00', level: 'INFO', source: 'System', message: 'Scheduled risk model retrain completed successfully in 45s' },
    { id: 'LOG-8906', timestamp: '2023-11-20 01:50:22', level: 'ERROR', source: 'Database Access', message: 'Connection timeout while querying legacy HR archive' },
    { id: 'LOG-8905', timestamp: '2023-11-20 01:45:11', level: 'CRITICAL', source: 'Auth Service', message: 'Unknown device login for EMP-112' },
    { id: 'LOG-8904', timestamp: '2023-11-20 01:30:00', level: 'INFO', source: 'System Backup', message: 'Incremental backup encrypted and stored' },
    { id: 'LOG-8903', timestamp: '2023-11-20 01:15:33', level: 'WARNING', source: 'File System', message: 'Unusual access pattern detected on \'/restricted/q3_financials\'' }
];

export default function SystemLogs() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center">
                        <Terminal className="w-6 h-6 mr-3 text-gray-400" /> System Logs
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Raw audit logs and system event feed.</p>
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
                    {mockLogs.map((log, idx) => (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
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
