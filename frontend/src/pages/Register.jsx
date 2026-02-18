import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        company: ''
    });
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const { showSuccess, showError } = useNotification();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!formData.name || !formData.email || !formData.password) {
            showError('Missing Required Data Fields');
            setLoading(false);
            return;
        }

        try {
            await register(formData);
            showSuccess('NEW NODE REGISTERED SUCCESSFULLY');
        } catch (err) {
            showError(err.response?.data?.message || 'Registration Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-dark font-display text-slate-100 min-h-screen relative overflow-hidden schematic-bg flex flex-col items-center justify-center p-6">
            <div className="fixed inset-0 digital-grid pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none flex justify-center items-center overflow-hidden">
                <span className="material-symbols-outlined text-[600px] rotate-12">settings_input_component</span>
            </div>

            <div className="mb-8 flex flex-col items-center z-10">
                <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-4xl text-primary">hub</span>
                    <h1 className="text-2xl font-black tracking-[0.3em] text-white">NEW CLIENTS</h1>
                </div>
                {/* <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
                    <p className="text-[10px] font-mono text-primary/80 uppercase tracking-widest">Protocol: Node_Registration_v2.42</p>
                </div> */}
            </div>

            <div className="w-full max-w-xl bg-charcoal/80 border border-white/10 backdrop-blur-xl relative overflow-hidden z-10">
                <div className="h-1 w-full bg-primary/30 relative">
                    <div className="absolute inset-0 bg-primary w-1/3 shadow-[0_0_15px_rgba(242,108,13,0.8)]"></div>
                </div>

                <div className="p-8 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-white text-lg font-bold tracking-wide uppercase">REGISTER</h2>
                            <p className="text-slate-500 text-[10px] font-mono mt-1">SETUP NEW ACCOUNT...</p>
                        </div>
                        <div className="text-right">
                            <p className="text-primary text-xs font-mono font-bold">STEP: 01/01</p>
                        </div>
                    </div>
                </div>

                <form className="p-8 space-y-8" onSubmit={handleSubmit}>
                    <section className="space-y-6">
                        <div className="flex items-center gap-2 border-l-2 border-primary pl-4">
                            <h3 className="text-white text-xs font-black tracking-widest uppercase">IDENTITY</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">FullName</label>
                                <div className="relative group">
                                    <input
                                        className="bg-[#0f0f0f] border border-white/10 text-white text-xs font-mono px-4 py-3 w-full focus:ring-1 focus:ring-primary focus:border-primary border-primary/40 outline-none transition-all"
                                        placeholder="SURNAME FIRSTNAME"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className="material-symbols-outlined absolute right-3 top-3 text-primary text-sm">verified_user</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Email</label>
                                <div className="relative">
                                    <input
                                        className="bg-[#0f0f0f] border border-white/10 text-white text-xs font-mono px-4 py-3 w-full focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                                        placeholder="JOHN@GMAIL.COM"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className="material-symbols-outlined absolute right-3 top-3 text-slate-600 text-sm">alternate_email</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-2 border-l-2 border-white/20 pl-4">
                            <h3 className="text-white text-xs font-black tracking-widest uppercase">SECURITY</h3>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Password</label>
                            <input
                                className="bg-[#0f0f0f] border border-white/10 text-white text-xs font-mono px-4 py-3 w-full focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                                placeholder="••••••••••••"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-2 border-l-2 border-white/20 pl-4">
                            <h3 className="text-white text-xs font-black tracking-widest uppercase">PROJECT OWNER</h3>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Organization / Company</label>
                            <input
                                className="bg-[#0f0f0f] border border-white/10 text-white text-xs font-mono px-4 py-3 w-full focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                                placeholder="COMPANY / CLIENTS NAME"
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                            />
                        </div>
                    </section>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary py-4 text-white text-xs font-black tracking-[0.4em] uppercase hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(242,108,13,0.4)] flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10">{loading ? 'REGISTERING...' : 'REGISTER_NEW_NODE'}</span>
                            <span className="material-symbols-outlined relative z-10 text-sm group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
                            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                        </button>

                        <div className="mt-6 flex justify-between items-center">
                            <Link to="/login" className="text-[10px] font-mono text-slate-500 hover:text-primary transition-colors flex items-center gap-1 group">
                                <span className="material-symbols-outlined text-[12px] group-hover:-translate-x-1 transition-transform">chevron_left</span>
                                RETURN_TO_LOGIN
                            </Link>
                            {/* <div className="flex items-center gap-2 text-[9px] font-mono text-slate-600">
                                <span className="material-symbols-outlined text-xs">vpn_key</span>
                                256_BIT_ENCRYPTION_ACTIVE
                            </div> */}
                        </div>
                    </div>
                </form>

                {/* <div className="bg-white/[0.02] p-4 border-t border-white/5 flex justify-between items-center">
                    <div className="flex gap-4">
                        <span className="text-[8px] font-mono text-slate-500">LOC: 37.7749° N, 122.4194° W</span>
                        <span className="text-[8px] font-mono text-slate-500">ST: STABLE</span>
                    </div>
                    <div className="text-[8px] font-mono text-primary/50">
                        TERMINAL_AUTH_MODULE_SECURED
                    </div>
                </div> */}
            </div>

            {/* <div className="mt-8 flex gap-8 z-10">
                <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">System_Load</span>
                    <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-1/4 h-full bg-primary/40"></div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Latency</span>
                    <span className="text-[9px] font-mono text-primary">14ms</span>
                </div>
            </div> */}

            <div className="fixed top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-primary/20 m-4 pointer-events-none opacity-50"></div>
            <div className="fixed bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-primary/20 m-4 pointer-events-none opacity-50"></div>
        </div>
    );
};

export default Register;
