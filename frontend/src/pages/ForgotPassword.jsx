import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { showSuccess, showError } = useNotification();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/auth/forgotpassword', { email });
            showSuccess('RECOVERY_LINK_SENT: Check Your Inbox');
            setEmail('');
        } catch (err) {
            showError(err.response?.data?.message || 'RECOVERY_FAILED: Invalid Email or Server Error');
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
                            <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">Recovery_Protocol</span>
                        </div>
                        <h1 className="text-primary text-2xl font-black tracking-[0.1em] md:tracking-[0.4em] uppercase">FORGOT_KEY</h1>
                    </div>

                    <form className="p-8 space-y-8" onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase leading-relaxed">
                                Enter your registered identifier to receive an encrypted recovery link.
                            </p>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-mono tracking-widest text-slate-500 uppercase">USER_IDENTIFIER (Email)</label>
                                <div className="relative">
                                    <input
                                        className="w-full bg-black/40 border border-primary/40 rounded py-3 px-4 text-sm font-mono text-white placeholder:text-slate-700 focus:border-primary focus:outline-none focus:shadow-[0_0_10px_rgba(242,108,13,0.4)] transition-all uppercase tracking-wider"
                                        placeholder="ENTER_ID_STRING"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <span className="absolute right-3 top-3 material-symbols-outlined text-primary/40 text-lg">alternate_email</span>
                                </div>
                            </div>
                        </div>

                        <button
                            className="w-full bg-primary py-4 text-black text-sm font-black tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(242,108,13,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'PROCESSING...' : 'SEND_RECOVERY_LINK'}
                        </button>

                        <div className="flex items-center justify-center pt-4">
                            <Link to="/login" className="text-[9px] font-mono tracking-widest text-slate-500 hover:text-primary transition-colors uppercase">
                                &gt; RETURN_TO_LOGIN
                            </Link>
                        </div>
                    </form>

                    <div className="px-8 pb-4 flex justify-between items-center opacity-30">
                        <div className="text-[8px] font-mono text-slate-400">ENCRYPTION: RSA-4096</div>
                        <div className="text-[8px] font-mono text-slate-400 uppercase">Status: Awaiting_Input</div>
                    </div>
                </div>

                <div className="absolute -top-4 -left-4 size-8 border-t-2 border-l-2 border-primary/20"></div>
                <div className="absolute -bottom-4 -right-4 size-8 border-b-2 border-r-2 border-primary/20"></div>
            </div>
        </div>
    );
};

export default ForgotPassword;
