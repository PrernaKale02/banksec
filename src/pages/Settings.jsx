import React from 'react';
import { Settings as SettingsIcon, Shield, Bell, Key, Database, User, Laptop } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Settings() {
    return (
        <div className="space-y-6 max-w-5xl">
            <div className="border-b border-gray-800 pb-4">
                <h1 className="text-2xl font-bold flex items-center">
                    <SettingsIcon className="w-6 h-6 mr-3 text-gray-400" /> Platform Settings
                </h1>
                <p className="text-sm text-gray-500 mt-1">Configure AI thresholds, alerts, and system integrations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                {/* Vertical Navigation Tab list for settings */}
                <div className="col-span-1 space-y-1">
                    <button className="w-full text-left px-4 py-3 bg-cyber-blue/10 text-cyber-neon border-l-2 border-cyber-blue rounded-r-lg font-medium text-sm transition-colors flex items-center">
                        <Shield className="w-4 h-4 mr-3" /> AI Risk Models
                    </button>
                    <button className="w-full text-left px-4 py-3 text-gray-400 hover:bg-cyber-800/50 hover:text-gray-200 rounded-lg font-medium text-sm transition-colors flex items-center">
                        <Bell className="w-4 h-4 mr-3" /> Notifications
                    </button>
                    <button className="w-full text-left px-4 py-3 text-gray-400 hover:bg-cyber-800/50 hover:text-gray-200 rounded-lg font-medium text-sm transition-colors flex items-center">
                        <Database className="w-4 h-4 mr-3" /> Data Sources
                    </button>
                    <button className="w-full text-left px-4 py-3 text-gray-400 hover:bg-cyber-800/50 hover:text-gray-200 rounded-lg font-medium text-sm transition-colors flex items-center">
                        <User className="w-4 h-4 mr-3" /> User Roles
                    </button>
                    <button className="w-full text-left px-4 py-3 text-gray-400 hover:bg-cyber-800/50 hover:text-gray-200 rounded-lg font-medium text-sm transition-colors flex items-center">
                        <Key className="w-4 h-4 mr-3" /> API Keys
                    </button>
                    <button className="w-full text-left px-4 py-3 text-gray-400 hover:bg-cyber-800/50 hover:text-gray-200 rounded-lg font-medium text-sm transition-colors flex items-center">
                        <Laptop className="w-4 h-4 mr-3" /> System
                    </button>
                </div>

                {/* Settings Content Area */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-3 glass-panel rounded-xl p-6 space-y-8"
                >
                    <div>
                        <h2 className="text-lg font-semibold text-gray-100 border-b border-gray-800 pb-2 mb-4">Risk Threshold Configuration</h2>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-300">High Risk Alert Threshold</label>
                                    <span className="text-sm font-bold text-cyber-danger">80+</span>
                                </div>
                                <input type="range" min="0" max="100" defaultValue="80" className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyber-danger" />
                                <p className="text-xs text-gray-500 mt-2">Scores above this threshold will immediately flag user status as 'Investigating' and notify admins.</p>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-300">Medium Risk Warning Threshold</label>
                                    <span className="text-sm font-bold text-cyber-warning">40-79</span>
                                </div>
                                <input type="range" min="0" max="100" defaultValue="40" className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyber-warning" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-100 border-b border-gray-800 pb-2 mb-4">Anomaly Detection Models</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-cyber-900 border border-gray-800 rounded-lg">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-200">Behavioral Baseline Drift</h3>
                                    <p className="text-xs text-gray-500 mt-1">Detects deviations from user's historical 30-day activity pattern.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-success shadow-lg shadow-cyber-success/20"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-cyber-900 border border-gray-800 rounded-lg">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-200">Peer Group Outlier Analysis</h3>
                                    <p className="text-xs text-gray-500 mt-1">Compares user activity volume against similar role metrics.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-success shadow-lg shadow-cyber-success/20"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-cyber-900 border border-gray-800 rounded-lg">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-200">Off-Hours Login Heuristics</h3>
                                    <p className="text-xs text-gray-500 mt-1">Strict rule-set for access attempts outside defined corporate hours.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-success shadow-lg shadow-cyber-success/20"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                        <button className="bg-cyber-blue hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
                            Save Changes
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
