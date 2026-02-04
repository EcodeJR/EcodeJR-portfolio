import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const activeItem = "pill-nav-item flex items-center gap-4 px-6 py-3 rounded-full bg-white/10 text-primary border-r-2 border-primary shadow-[0_0_15px_rgba(255,95,31,0.1)]";
    const normalItem = "pill-nav-item flex items-center gap-4 px-6 py-3 rounded-full hover:bg-white/5 text-slate-400 grayscale transition-all";

    return (
        <div className="flex h-screen overflow-hidden bg-background-dark text-slate-100 font-display selection:bg-primary selection:text-black">
            {/* Sidebar */}
            <aside className="w-72 p-6 flex flex-col justify-between shrink-0 bg-black/40 border-r border-white/5 backdrop-blur-xl hidden md:flex">
                <div>
                    <div className="flex items-center gap-3 mb-12 px-2">
                        <Link to="/" className="relative group">
                            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-transform">
                                <span className="material-symbols-outlined text-2xl">terminal</span>
                            </div>
                            <div className="absolute inset-0 bg-primary blur-lg opacity-30 group-hover:opacity-60 transition-opacity"></div>
                        </Link>
                        <div>
                            <h1 className="text-sm font-bold uppercase tracking-tighter text-white glitch-text">NEURAL_ADMIN</h1>
                            <p className="text-[10px] text-primary/80 tracking-widest leading-none">ROOT ACCESS GRANTED</p>
                        </div>
                    </div>
                    <nav className="space-y-4">
                        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] mb-4 ml-4">Core Systems</p>
                        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? activeItem : normalItem}>
                            <span className="material-symbols-outlined text-xl">grid_view</span>
                            <span className="text-sm font-display tracking-tight">OVERVIEW</span>
                        </NavLink>
                        <NavLink to="/admin/inquiries" className={({ isActive }) => isActive ? activeItem : normalItem}>
                            <span className="material-symbols-outlined text-xl">database</span>
                            <span className="text-sm font-display tracking-tight">INQUIRIES</span>
                        </NavLink>
                        <NavLink to="/admin/projects" className={({ isActive }) => isActive ? activeItem : normalItem}>
                            <span className="material-symbols-outlined text-xl">code_blocks</span>
                            <span className="text-sm font-display tracking-tight">PORTFOLIO</span>
                        </NavLink>
                        <NavLink to="/admin/client-projects" className={({ isActive }) => isActive ? activeItem : normalItem}>
                            <span className="material-symbols-outlined text-xl">sync</span>
                            <span className="text-sm font-display tracking-tight">CLIENT_SYNC</span>
                        </NavLink>
                    </nav>
                </div>
                <div className="space-y-6">
                    <div className="px-2 space-y-3">
                        <Link to="/settings" className="flex items-center gap-4 text-slate-500 hover:text-primary transition-colors text-xs font-display">
                            <span className="material-symbols-outlined text-lg">settings_input_component</span>
                            <span>SETTINGS</span>
                        </Link>
                        <button onClick={handleLogout} className="flex items-center gap-4 text-red-500/70 hover:text-red-500 transition-colors text-xs font-display w-full text-left">
                            <span className="material-symbols-outlined text-lg">power_settings_new</span>
                            <span>LOGOUT</span>
                        </button>
                    </div>
                    <div className="p-4 bg-charcoal/80 border border-white/5 rounded-2xl flex items-center gap-4">
                        <div className="relative">
                            <div className="size-10 rounded-full border border-primary/50 bg-white/10 flex items-center justify-center">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 size-3 bg-primary rounded-full border-2 border-charcoal"></div>
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold text-white tracking-tight uppercase truncate">{user?.name || 'Admin'}</p>
                            <p className="text-[9px] text-slate-500 truncate">NEURAL_ARCHITECT v4.2</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Navigation */}
            <div className="md:hidden fixed top-6 left-6 right-6 z-[60] flex items-center justify-between">
                <Link to="/" className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg">
                    <span className="material-symbols-outlined text-xl">terminal</span>
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white shadow-lg"
                >
                    <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                </button>
            </div>

            {/* Mobile Drawer */}
            <div className={`fixed inset-0 bg-background-dark/95 backdrop-blur-2xl z-50 transition-transform duration-500 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full p-10 pt-24 gap-8">
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.3em] border-b border-white/5 pb-4">System_Navigation</p>
                    <nav className="flex flex-col gap-6">
                        <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black italic tracking-tighter hover:text-primary transition-colors uppercase">Overview</Link>
                        <Link to="/admin/inquiries" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black italic tracking-tighter hover:text-primary transition-colors uppercase">Inquiries</Link>
                        <Link to="/admin/projects" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black italic tracking-tighter hover:text-primary transition-colors uppercase">Portfolio</Link>
                        <Link to="/admin/client-projects" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black italic tracking-tighter hover:text-primary transition-colors uppercase">Client_Sync</Link>
                        <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black italic tracking-tighter hover:text-primary transition-colors uppercase">Protocol_Settings</Link>
                    </nav>
                    <div className="mt-auto border-t border-white/5 pt-8">
                        <button onClick={handleLogout} className="flex items-center gap-4 text-red-500 font-bold tracking-widest uppercase italic bg-red-500/10 w-full p-4 rounded-xl">
                            <span className="material-symbols-outlined">power_settings_new</span>
                            <span>Terminate_Session</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative custom-scrollbar pt-24 md:pt-0">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
