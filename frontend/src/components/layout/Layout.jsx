import React from 'react';
import { Sidebar } from './Sidebar';

export function Layout({ children, currentTab, setCurrentTab }) {
    return (
        <div className="flex h-screen overflow-hidden bg-cyber-900 text-white font-sans">
            <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#050B14]">
                <div className="px-8 py-6 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
