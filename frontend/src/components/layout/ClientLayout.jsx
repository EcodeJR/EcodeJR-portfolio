import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ClientLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const activeItem = "flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5 text-primary border-r-2 border-primary shadow-[0_0_15px_rgba(255,95,31,0.1)]";
    const normalItem = "flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-slate-400 grayscale";

    return (
        <div className="flex h-screen overflow-hidden bg-background-dark text-slate-300 font-sans tracking-tight">
            <div className="fixed inset-0 pointer-events-none" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 95, 31, 0.03) 0%, transparent 50%),
                 linear-gradient(rgba(242, 108, 13, 0.02) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(242, 108, 13, 0.02) 1px, transparent 1px)`,
                backgroundSize: '100% 100%, 40px 40px, 40px 40px'
            }}></div>

            {/* Sidebar */}
            <aside className="w-24 lg:w-72 shrink-0 h-full p-6 flex flex-col gap-8 bg-black/40 border-r border-white/5 backdrop-blur-md relative z-10 hidden md:flex">
                <div className="flex items-center gap-3 px-4 mb-4">
                    <Link to="/" className="relative group">
                        <div className="absolute -inset-1 bg-primary blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative aspect-square bg-cover rounded-sm size-10 border border-primary/50 flex items-center justify-center bg-black text-primary">
                            <span className="material-symbols-outlined">person</span>
                        </div>
                    </Link>
                    <div className="hidden lg:flex flex-col">
                        <h1 className="text-white text-sm font-bold tracking-widest font-mono uppercase italic">Nexus_OS</h1>
                        <p className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">Auth: {user?.name || 'Client'}</p>
                    </div>
                </div>
                <nav className="flex flex-col gap-4 p-4 flex-1 overflow-y-auto">
                    <NavLink to="/client/dashboard" className={({ isActive }) => isActive ? activeItem : normalItem}>
                        <span className="material-symbols-outlined text-[20px]">grid_view</span>
                        <p className="text-xs font-bold uppercase tracking-widest hidden lg:block">Dashboard</p>
                    </NavLink>
                    <NavLink to="/client/messages" className={({ isActive }) => isActive ? activeItem : normalItem}>
                        <span className="material-symbols-outlined text-[20px]">terminal</span>
                        <p className="text-xs font-bold uppercase tracking-widest hidden lg:block">Messages</p>
                    </NavLink>
                    <NavLink to="/client/files" className={({ isActive }) => isActive ? activeItem : normalItem}>
                        <span className="material-symbols-outlined text-[20px]">layers</span>
                        <p className="text-xs font-bold uppercase tracking-widest hidden lg:block">Archives</p>
                    </NavLink>
                    <NavLink to="/settings" className={({ isActive }) => (isActive ? activeItem : normalItem) + " mt-4 border-t border-white/5 pt-8"}>
                        <span className="material-symbols-outlined text-[20px]">settings</span>
                        <p className="text-xs font-bold uppercase tracking-widest hidden lg:block">Settings</p>
                    </NavLink>
                </nav>
                <div className="mt-auto space-y-4">
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 rounded-full h-12 border border-red-500/30 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
                        <span className="material-symbols-outlined text-sm">logout</span>
                        <span className="hidden lg:block">Disconnect</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Navigation */}
            <div className="md:hidden fixed top-6 left-6 right-6 z-[60] flex items-center justify-between">
                <Link to="/" className="w-10 h-10 rounded-sm bg-black border border-primary/50 flex items-center justify-center text-primary shadow-lg">
                    <span className="material-symbols-outlined">person</span>
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl text-white shadow-lg"
                >
                    <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                </button>
            </div>

            {/* Mobile Drawer */}
            <div className={`fixed inset-0 bg-background-dark/95 backdrop-blur-2xl z-50 transition-transform duration-500 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full p-10 pt-24 gap-8">
                    <p className="text-[10px] uppercase font-bold text-slate-500 font-mono tracking-[0.3em] border-b border-white/5 pb-4">Nexus_Navigation</p>
                    <nav className="flex flex-col gap-6">
                        <Link to="/client/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black italic tracking-tighter hover:text-primary transition-colors uppercase">Dashboard</Link>
                        <Link to="/client/messages" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black italic tracking-tighter hover:text-primary transition-colors uppercase">Messages</Link>
                        <Link to="/client/files" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black italic tracking-tighter hover:text-primary transition-colors uppercase">Archives</Link>
                        <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black italic tracking-tighter hover:text-primary transition-colors uppercase">Settings</Link>
                    </nav>
                    <div className="mt-auto border-t border-white/5 pt-8">
                        <button onClick={handleLogout} className="flex items-center gap-4 text-red-500 font-bold tracking-widest uppercase italic bg-red-500/10 w-full p-4 rounded-xl">
                            <span className="material-symbols-outlined">logout</span>
                            <span>Disconnect</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-black/20 relative z-10 custom-scrollbar pt-20 md:pt-0">
                {children}
            </main>
        </div>
    );
};

export default ClientLayout;
