import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, User, ChevronLeft, Fingerprint } from 'lucide-react';
import { api } from '../api/apiClient';
import { clsx } from 'clsx';

export default function AdminLogin({ onLoginSuccess, onBack }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const data = await api.post('/api/auth/login', {
                username,
                password,
                token
            });
            onLoginSuccess(data.admin);
        } catch (err) {
            setError(err.detail || 'Authentication failed. Unauthorized access.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050B14] flex flex-col items-center justify-center relative overflow-hidden font-sans">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-cyber-blue opacity-20 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-cyber-danger opacity-10 blur-[150px] rounded-full pointer-events-none"></div>

            <button 
                onClick={onBack}
                className="absolute top-8 left-8 flex items-center text-gray-500 hover:text-white transition-colors"
            >
                <ChevronLeft className="w-5 h-5 mr-1" /> Back to Home
            </button>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="glass-panel p-10 rounded-2xl border border-gray-800 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                    {/* Top edge glow */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent opacity-50"></div>
                    
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-16 h-16 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center mb-4 shadow-lg shadow-cyber-blue/20">
                            <ShieldCheck className="w-8 h-8 text-cyber-blue" />
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-wide">SECURE ACCESS</h2>
                        <p className="text-xs text-gray-500 tracking-widest mt-1 font-mono uppercase">BankSec AI Protocol</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-cyber-danger/10 border border-cyber-danger/50 text-cyber-danger text-sm p-3 rounded-lg text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div>
                            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">Admin ID</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input 
                                    type="text" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-[#0B1120] border border-gray-700 text-white rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue transition-colors placeholder-gray-600"
                                    placeholder="Enter system ID"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">Passcode</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#0B1120] border border-gray-700 text-white rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue transition-colors placeholder-gray-600 font-mono tracking-widest text-lg"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold flex items-center justify-between">
                                <span>2FA Security Token</span>
                                <span className="text-[10px] text-cyber-warning bg-cyber-warning/10 px-2 py-0.5 rounded">MOCK DATA OPTIONAL</span>
                            </label>
                            <div className="relative">
                                <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input 
                                    type="text" 
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    className="w-full bg-[#0B1120] border border-gray-700 text-white rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue transition-colors placeholder-gray-600 font-mono"
                                    placeholder="XXXX-XXXX-XXXX"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full mt-8 bg-cyber-blue hover:bg-blue-600 text-white font-bold py-3.5 rounded-lg transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] flex items-center justify-center space-x-2"
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                <span>Authenticate</span>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
