import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { showSuccess, showError } = useNotification();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return showError('ERROR: Passwords do not match');
        }

        setLoading(true);
        try {
            await api.put(`/auth/resetpassword/${token}`, { password });
            showSuccess('SECURE_KEY_UPDATED: Re-Authentication Required');
            navigate('/login');
        } catch (err) {
            showError(err.response?.data?.message || 'ERROR: Invalid or Expired Token');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-dark font-display text-slate-100 min-h-screen relative overflow-hidden flex items-center justify-center">
            <div className="fixed inset-0 digital-grid pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-md p-1">
                <div className="bg-[#0f0f0f] border border-primary/30 rounded-lg glitch-border overflow-hidden">
                    <div className="bg-primary/10 border-b border-primary/30 p-6 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                            <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">Identity_Recovery</span>
                        </div>
                        <h1 className="text-primary text-2xl font-black tracking-[0.1em] md:tracking-[0.4em] uppercase">RESET_KEY</h1>
                    </div>

                    <form className="p-8 space-y-8" onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-mono tracking-widest text-slate-500 uppercase">NEW_SECURE_KEY</label>
                                <div className="relative">
                                    <input
                                        className="w-full bg-black/40 border border-primary/40 rounded py-3 px-4 text-sm font-mono text-white placeholder:text-slate-700 focus:border-primary focus:outline-none focus:shadow-[0_0_10px_rgba(242,108,13,0.4)] transition-all tracking-widest"
                                        placeholder="••••••••••••"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                    />
                                    <span className="absolute right-3 top-3 material-symbols-outlined text-primary/40 text-lg">vpn_key</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-mono tracking-widest text-slate-500 uppercase">CONFIRM_NEW_KEY</label>
                                <div className="relative">
                                    <input
                                        className="w-full bg-black/40 border border-primary/40 rounded py-3 px-4 text-sm font-mono text-white placeholder:text-slate-700 focus:border-primary focus:outline-none focus:shadow-[0_0_10px_rgba(242,108,13,0.4)] transition-all tracking-widest"
                                        placeholder="••••••••••••"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        minLength={6}
                                    />
                                    <span className="absolute right-3 top-3 material-symbols-outlined text-primary/40 text-lg">shield</span>
                                </div>
                            </div>
                        </div>

                        <button
                            className="w-full bg-primary py-4 text-black text-sm font-black tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(242,108,13,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'UPDATING...' : 'UPDATE_SECURE_KEY'}
                        </button>
                    </form>

                    <div className="px-8 pb-4 flex justify-between items-center opacity-30">
                        <div className="text-[8px] font-mono text-slate-400">VALIDATION: Strict</div>
                        <div className="text-[8px] font-mono text-slate-400 uppercase">Status: Identity_Pending</div>
                    </div>
                </div>

                <div className="absolute -top-4 -left-4 size-8 border-t-2 border-l-2 border-primary/20"></div>
                <div className="absolute -bottom-4 -right-4 size-8 border-b-2 border-r-2 border-primary/20"></div>
            </div>
        </div>
    );
};

export default ResetPassword;
