import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronRight, UserCircle, Clock, FileDown, ShieldAlert } from 'lucide-react';
import { employees } from '../data/mockData';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function EmployeeMonitoring() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-full gap-6">
            {/* Main Table Area */}
            <div className={twMerge(clsx("flex-1 transition-all duration-300", selectedEmployee ? "w-2/3" : "w-full"))}>
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold border-b border-gray-800 pb-2">Employee Monitoring</h1>
                    <div className="flex space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search employees..."
                                className="bg-cyber-800 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="bg-cyber-800 border border-gray-700 p-2 rounded-lg hover:bg-cyber-700 text-gray-400 hover:text-white transition-colors">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="glass-panel rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-300">
                            <thead className="text-xs uppercase bg-cyber-800/50 text-gray-400 border-b border-gray-700">
                                <tr>
                                    <th className="px-6 py-4">Employee ID</th>
                                    <th className="px-6 py-4">Name / Role</th>
                                    <th className="px-6 py-4">Department</th>
                                    <th className="px-6 py-4">Risk Score</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployees.map((emp, index) => (
                                    <motion.tr
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        key={emp.id}
                                        className="border-b border-gray-800 hover:bg-cyber-800/50 transition-colors cursor-pointer"
                                        onClick={() => setSelectedEmployee(emp)}
                                    >
                                        <td className="px-6 py-4 font-mono text-cyber-blue">{emp.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-100">{emp.name}</div>
                                            <div className="text-xs text-gray-500">{emp.role}</div>
                                        </td>
                                        <td className="px-6 py-4">{emp.department}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <span className={clsx(
                                                    "w-2 h-2 rounded-full",
                                                    emp.riskLevel === 'High' ? 'bg-cyber-danger glow-danger' :
                                                        emp.riskLevel === 'Medium' ? 'bg-cyber-warning' : 'bg-cyber-success'
                                                )}></span>
                                                <span className={
                                                    emp.riskLevel === 'High' ? 'text-cyber-danger font-bold' :
                                                        emp.riskLevel === 'Medium' ? 'text-cyber-warning' : 'text-gray-400'
                                                }>{emp.riskScore}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={clsx(
                                                "px-2 py-1 text-xs rounded-full border",
                                                emp.status === 'Active' ? 'bg-cyber-success/10 border-cyber-success/20 text-cyber-success' :
                                                    emp.status === 'Investigating' ? 'bg-cyber-warning/10 border-cyber-warning/20 text-cyber-warning' :
                                                        'bg-gray-800 border-gray-700 text-gray-400'
                                            )}>
                                                {emp.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button className="text-gray-400 hover:text-cyber-neon transition-colors">
                                                <ChevronRight className="w-5 h-5 inline" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Behavior Profile Side Panel */}
            <AnimatePresence>
                {selectedEmployee && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="w-1/3 glass-panel rounded-xl flex flex-col overflow-hidden h-fit sticky top-6"
                    >
                        <div className="p-6 border-b border-gray-800 flex justify-between items-start bg-cyber-800/30">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-cyber-700 flex items-center justify-center text-cyber-blue">
                                    <UserCircle className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-100">{selectedEmployee.name}</h3>
                                    <p className="text-sm text-cyber-neon font-mono">{selectedEmployee.id}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedEmployee(null)}
                                className="text-gray-500 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-cyber-900 border border-gray-800 p-4 rounded-lg">
                                    <div className="text-xs text-gray-500 mb-1 flex items-center"><ShieldAlert className="w-3 h-3 mr-1" /> Risk Score</div>
                                    <div className={clsx("text-2xl font-bold", selectedEmployee.riskLevel === 'High' ? "text-cyber-danger" : selectedEmployee.riskLevel === 'Medium' ? 'text-cyber-warning' : 'text-cyber-success')}>
                                        {selectedEmployee.riskScore}/100
                                    </div>
                                </div>
                                <div className="bg-cyber-900 border border-gray-800 p-4 rounded-lg">
                                    <div className="text-xs text-gray-500 mb-1 flex items-center"><Clock className="w-3 h-3 mr-1" /> Last Login</div>
                                    <div className="text-sm font-medium text-gray-300">
                                        {new Date(selectedEmployee.lastLogin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-gray-400 mb-3 border-b border-gray-800 pb-2">Behavior Analytics</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500 flex items-center"><Clock className="w-4 h-4 mr-2 text-cyber-blue" /> Typical Hours</span>
                                        <span className="text-gray-300">09:00 - 17:00</span>
                                    </li>
                                    <li className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500 flex items-center"><Search className="w-4 h-4 mr-2 text-cyber-blue" /> Most Accessed</span>
                                        <span className="text-gray-300 font-mono text-xs bg-cyber-800 px-2 py-1 rounded">Customer DB</span>
                                    </li>
                                    <li className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500 flex items-center"><FileDown className="w-4 h-4 mr-2 text-cyber-blue" /> Avg Downloads/Day</span>
                                        <span className="text-gray-300">12 files</span>
                                    </li>
                                </ul>
                            </div>

                            {selectedEmployee.riskLevel === 'High' && (
                                <div className="bg-cyber-danger/10 border border-cyber-danger/30 p-4 rounded-lg">
                                    <h4 className="text-cyber-danger text-sm font-bold flex items-center mb-2">
                                        <AlertTriangle className="w-4 h-4 mr-2" /> Recent Anomalies
                                    </h4>
                                    <ul className="text-xs text-danger-200 space-y-2 list-disc list-inside text-gray-300">
                                        <li>Logged in at 02:13 AM (Off-hours)</li>
                                        <li>Downloaded 500+ records in 10 mins</li>
                                    </ul>
                                    <button className="mt-4 w-full bg-cyber-danger hover:bg-red-600 text-white py-2 rounded-md text-sm font-medium transition-colors shadow-lg shadow-red-500/20">
                                        Open Case
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
