import React from 'react';
import { ShieldCheck, Search, Filter, Plus, FileText, MessagesSquare } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const cases = [
    { id: 'CASE-2023-A01', employee: 'EMP-023 (Bob Johnson)', alertType: 'Bulk Data Export', riskScore: 92, status: 'Open', investigator: 'Unassigned', date: '2023-11-20' },
    { id: 'CASE-2023-B14', employee: 'EMP-112 (Evan Wright)', alertType: 'Multiple Failed Logins', riskScore: 78, status: 'In Progress', investigator: 'Sarah Connor', date: '2023-11-20' },
    { id: 'CASE-2023-C45', employee: 'EMP-045 (Charlie Davis)', alertType: 'Unauthorized Access', riskScore: 45, status: 'Closed', investigator: 'Mike Stone', date: '2023-11-19' },
    { id: 'CASE-2023-A02', employee: 'EMP-011 (Unknown)', alertType: 'Suspicious IP Login', riskScore: 85, status: 'Open', investigator: 'Sarah Connor', date: '2023-11-18' },
];

export default function InvestigationCases() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center">
                        <ShieldCheck className="w-6 h-6 mr-3 text-cyber-blue" /> Investigation Cases
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Track and manage active fraud investigations.</p>
                </div>
                <button className="bg-cyber-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20 flex items-center">
                    <Plus className="w-4 h-4 mr-2" /> New Case
                </button>
            </div>

            <div className="glass-panel rounded-xl overflow-hidden">
                <div className="p-4 border-b border-gray-800 flex justify-between bg-cyber-800/30">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search cases..."
                            className="w-full bg-cyber-900 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue text-sm"
                        />
                    </div>
                    <div className="flex space-x-2">
                        <button className="bg-cyber-900 border border-gray-700 p-2 rounded-lg hover:bg-cyber-800 text-gray-400 hover:text-white transition-colors">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <table className="w-full text-left text-sm text-gray-300">
                    <thead className="text-xs uppercase bg-cyber-800/50 text-gray-400 border-b border-gray-700">
                        <tr>
                            <th className="px-6 py-4">Case ID</th>
                            <th className="px-6 py-4">Employee</th>
                            <th className="px-6 py-4">Alert Type</th>
                            <th className="px-6 py-4">Risk Score</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Investigator</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cases.map((c, idx) => (
                            <motion.tr
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                key={c.id}
                                className="border-b border-gray-800 hover:bg-cyber-800/50 transition-colors"
                            >
                                <td className="px-6 py-4 font-mono text-cyber-blue text-xs uppercase">{c.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-200">{c.employee}</td>
                                <td className="px-6 py-4">{c.alertType}</td>
                                <td className="px-6 py-4">
                                    <span className={c.riskScore > 80 ? 'text-cyber-danger font-bold' : c.riskScore > 40 ? 'text-cyber-warning' : 'text-cyber-success'}>
                                        {c.riskScore}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "px-2 py-1 text-xs rounded-full border",
                                        c.status === 'Open' ? 'bg-cyber-danger/10 border-cyber-danger/20 text-cyber-danger' :
                                            c.status === 'In Progress' ? 'bg-cyber-warning/10 border-cyber-warning/20 text-cyber-warning' :
                                                'bg-gray-800 border-gray-700 text-gray-400'
                                    )}>
                                        {c.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-400">{c.investigator}</td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center space-x-3">
                                        <button className="text-gray-500 hover:text-cyber-blue transition-colors" title="View Details">
                                            <FileText className="w-4 h-4" />
                                        </button>
                                        <button className="text-gray-500 hover:text-cyber-neon transition-colors" title="Add Note">
                                            <MessagesSquare className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
