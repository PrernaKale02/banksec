import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Users, Globe, ChevronRight, Building, Landmark, Briefcase } from 'lucide-react';
import { clsx } from 'clsx';

export default function LandingPage({ onNavigate }) {
    const services = [
        {
            title: "Behavioral AI Analysis",
            description: "Deep-learning models establish baselines for employee behavior and detect micro-deviations in real-time.",
            icon: Activity,
            hoverIcon: "group-hover:text-blue-500",
            borderGlow: "hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]",
            iconGlow: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] group-hover:border-blue-500/50"
        },
        {
            title: "Live Heatmaps & Polling",
            description: "100% dynamic architecture updates department risk scores and system logs synchronously without refreshing.",
            icon: Globe,
            hoverIcon: "group-hover:text-orange-500",
            borderGlow: "hover:border-orange-500/50 hover:shadow-[0_0_40px_rgba(249,115,22,0.15)]",
            iconGlow: "group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] group-hover:border-orange-500/50"
        },
        {
            title: "Zero-Trust Enforcement",
            description: "Automatically flag or terminate active sessions when unauthorized bulk data exports are attempted.",
            icon: ShieldCheck,
            hoverIcon: "group-hover:text-indigo-400",
            borderGlow: "hover:border-indigo-400/50 hover:shadow-[0_0_40px_rgba(129,140,248,0.15)]",
            iconGlow: "group-hover:shadow-[0_0_20px_rgba(129,140,248,0.4)] group-hover:border-indigo-400/50"
        }
    ];

    const trustedBanks = [
        { name: "HDFC Bank", image: "/banks/hdfc_bank.png" },
        { name: "ICICI Bank", image: "/banks/icici_bank.png" },
        { name: "Axis Bank", image: "/banks/axis_bank.png" },
        { name: "SBI", image: "/banks/sbi.png" },
        { name: "HSBC", image: "/banks/hsbc.png" },
        { name: "Barclays", image: "/banks/barclays.png" },
        { name: "Citibank", image: "/banks/citibank.png" },
        { name: "Standard Chartered", image: "/banks/standard_chartered.png" }
    ];

    return (
        <div className="min-h-screen bg-[#070D16] text-white font-sans overflow-x-hidden relative">

            {/* Subtle Floating Particles Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-orange-500 rounded-full shadow-[0_0_10px_#F97316]"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                            opacity: Math.random() * 0.5 + 0.2
                        }}
                        animate={{
                            y: [null, Math.random() * -200 - 100],
                            opacity: [null, 0]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Upper Section Immersive Video Background */}
            <div className="absolute top-0 left-0 w-full h-screen z-0 overflow-hidden pointer-events-none">
                <video
                    src="/landing-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center"
                />

                {/* Cinematic Gradient Overlay: Subtle shadow only on the left for text readability, clear elsewhere */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#070D16]/80 via-transparent to-transparent"></div>

                {/* Vertical gradient to softly fade the very bottom boundary into the black background below */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#070D16]/20 via-transparent to-[#070D16]"></div>
            </div>

            {/* Navbar */}
            <nav className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <ShieldCheck className="w-8 h-8 text-orange-500" />
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600 tracking-wider">
                        BankSec AI
                    </span>
                </div>

            </nav>

            {/* Hero Section */}
            <main className="relative z-10 container mx-auto px-6 pt-32 pb-32 min-h-[85vh] flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
                    {/* Premium Typography Left Side */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-20 flex flex-col space-y-6"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight text-white tracking-tight drop-shadow-lg">
                            Institutional Grade <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 drop-shadow-[0_0_20px_rgba(249,115,22,0.6)]">
                                Fraud Prevention
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed drop-shadow-md font-light">
                            Real-time anomaly detection and zero-trust behavioral monitoring for secure enterprise environments.
                        </p>

                        <div className="pt-2">
                            <p className="text-[10px] md:text-xs text-gray-500/80 font-mono tracking-[0.2em] uppercase">
                                Trusted by simulated enterprise environments <span className="text-orange-500/50 mx-2">•</span> Real-time detection <span className="text-orange-500/50 mx-2">•</span> Zero-trust architecture
                            </p>
                        </div>
                    </motion.div>

                    {/* Right side empty for clear video visibility */}
                    <div className="hidden lg:block"></div>
                </div>

                {/* Premium Glassmorphism Bottom Center CTA */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30">
                    <button
                        onClick={() => onNavigate('login')}
                        className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-[#070D16] px-10 py-3.5 rounded-full font-bold tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] flex items-center shadow-2xl"
                    >
                        <span className="relative z-10 transition-colors duration-300">Access Dashboard</span>
                        {/* Internal hover glow flare */}
                        <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-out"></div>
                    </button>
                </div>
            </main>

            {/* Inline CSS for Marquee Animation */}
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
            `}</style>

            {/* Trusted By Section (Infinite Marquee) */}
            <section className="relative z-10 border-y border-gray-800/50 bg-gradient-to-b from-[#0B1320] to-[#090F1A] py-14 overflow-hidden flex flex-col items-center shadow-2xl">
                <p className="text-xs text-gray-500 uppercase tracking-[0.2em] font-semibold mb-8 text-center">
                    Trusted by Financial Institutions
                </p>

                {/* Marquee Wrapper */}
                <div className="relative w-full max-w-7xl mx-auto overflow-hidden group flex">
                    
                    {/* Left Edge Fade */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0B1320] to-transparent z-10 pointer-events-none"></div>
                    
                    {/* Right Edge Fade */}
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0B1320] to-transparent z-10 pointer-events-none"></div>

                    {/* Moving Track */}
                    <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
                        {[...trustedBanks, ...trustedBanks].map((bank, index) => (
                            <div
                                key={index}
                                className="px-12 flex items-center space-x-4 text-xl md:text-2xl font-bold font-sans tracking-tight text-gray-500 opacity-60 hover:opacity-100 hover:text-white transition-opacity duration-300 cursor-default whitespace-nowrap"
                            >
                                <img 
                                    src={bank.image} 
                                    alt={`${bank.name} logo`} 
                                    className="h-8 md:h-10 w-9 md:w-11 object-contain bg-white rounded-md p-1.5 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                                />
                                <span>{bank.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Features */}
            <section className="relative z-10 container mx-auto px-6 py-32 relative">
                
                {/* Stunning Premium Ambient Background Orbs */}
                <div className="absolute top-1/4 left-0 w-1/3 h-2/3 bg-indigo-600/15 blur-[150px] rounded-full pointer-events-none z-0"></div>
                <div className="absolute bottom-1/4 right-0 w-1/3 h-2/3 bg-orange-500/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

                <div className="relative z-10 text-center mb-24">
                    <h2 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500 drop-shadow-sm">
                        Unprecedented Visibility.
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-orange-500 mx-auto mt-6 mb-8 opacity-60 rounded-full"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
                        Our specialized services wrap your internal networks in a layer of predictive logic.
                    </p>
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
                            className={clsx("group bg-white/5 backdrop-blur-xl border border-white/5 p-8 lg:p-10 rounded-[2rem] transition-all duration-500 hover:-translate-y-3 flex flex-col", service.borderGlow)}
                        >
                            <div className={clsx("w-16 h-16 rounded-2xl bg-[#0B1320] border border-gray-800 flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 shadow-lg", service.iconGlow)}>
                                <service.icon className={clsx("w-8 h-8 text-gray-400 transition-colors duration-500", service.hoverIcon)} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white tracking-wide">{service.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm font-light">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Premium SaaS Footer */}
            <footer className="relative z-10 border-t border-gray-800/50 bg-[#0B1320] pt-20 pb-10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        {/* Brand Column */}
                        <div className="md:col-span-1">
                            <div className="flex items-center space-x-2 mb-6">
                                <ShieldCheck className="w-6 h-6 text-orange-500" />
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
                                    BankSec AI
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed mb-6">
                                Securing the financial sector with real-time anomaly detection and deep-learning behavioral analytics.
                            </p>
                            <div className="text-xs text-orange-500/60 font-mono tracking-widest uppercase">
                                STATUS: ONLINE
                            </div>
                        </div>

                        {/* Platform Column */}
                        <div>
                            <h4 className="text-white font-semibold mb-6">Platform</h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-sm text-gray-400 hover:text-orange-500 transition-colors">Behavioral AI</a></li>
                                <li><a href="#" className="text-sm text-gray-400 hover:text-orange-500 transition-colors">Live Heatmaps</a></li>
                                <li><a href="#" className="text-sm text-gray-400 hover:text-orange-500 transition-colors">Zero-Trust Enforcement</a></li>
                                <li><a href="#" className="text-sm text-gray-400 hover:text-orange-500 transition-colors">Dashboard Access</a></li>
                            </ul>
                        </div>

                        {/* Resources Column */}
                        <div>
                            <h4 className="text-white font-semibold mb-6">Resources</h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">API Integration</a></li>
                                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">System Architecture</a></li>
                                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Support Center</a></li>
                            </ul>
                        </div>

                        {/* Legal Column */}
                        <div>
                            <h4 className="text-white font-semibold mb-6">Company</h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Security Disclosure</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-xs text-gray-600">
                            &copy; {new Date().getFullYear()} BankSec AI Systems. All rights reserved. (Demo Simulation)
                        </p>
                        <div className="flex space-x-6 text-xs text-gray-600 font-mono uppercase">
                            <span>V 1.0.0</span>
                            <span className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2"></div> Systems Operational</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
