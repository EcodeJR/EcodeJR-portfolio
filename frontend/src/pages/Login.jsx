import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const { showSuccess, showError } = useNotification();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await login(formData); // login returns the response data
            showSuccess('ACCESS GRANTED: User_Ident Verified');

            // Redirect based on role
            if (res.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/client/dashboard');
            }
        } catch (err) {
            showError(err.response?.data?.message || 'ACCESS DENIED: Invalid Credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-dark font-display text-slate-100 min-h-screen relative overflow-hidden flex items-center justify-center">
            <div className="fixed inset-0 digital-grid pointer-events-none"></div>

            <div className="fixed top-0 left-10 h-full w-48 opacity-10 pointer-events-none overflow-hidden flex flex-col gap-4 py-10 font-mono text-[8px] text-primary">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i}>
                        <p>RECV_PKT: 0x8823_AF</p>
                        <p>SYNC_STATE: OK</p>
                        <p>ENCRYPTION_LAYER: 004</p>
                        <p>AUTH_PROTOCOL_V2.1</p>
                        <p>BUFFER_ID: 98122-A</p>
                        <p>LATENCY_CHECK: 12ms</p>
                    </div>
                ))}
            </div>

            <div className="relative z-10 w-full max-w-md p-1">
                <div className="bg-[#0f0f0f] border border-primary/30 rounded-lg glitch-border overflow-hidden">
                    <div className="bg-primary/10 border-b border-primary/30 p-6 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                            <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">Identity_Verification</span>
                        </div>
                        <h1 className="text-primary text-2xl font-black tracking-[0.1em] md:tracking-[0.4em] uppercase">ACCESS_PORTAL</h1>
                    </div>

                    <form className="p-8 space-y-8" onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-mono tracking-widest text-slate-500 uppercase">USER_IDENTIFIER (Email)</label>
                                <div className="relative">
                                    <input
                                        className="w-full bg-black/40 border border-primary/40 rounded py-3 px-4 text-sm font-mono text-white placeholder:text-slate-700 focus:border-primary focus:outline-none focus:shadow-[0_0_10px_rgba(242,108,13,0.4)] transition-all uppercase tracking-wider"
                                        placeholder="ENTER_ID_STRING"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className="absolute right-3 top-3 material-symbols-outlined text-primary/40 text-lg">alternate_email</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-mono tracking-widest text-slate-500 uppercase">SECURE_KEY (Password)</label>
                                <div className="relative">
                                    <input
                                        className="w-full bg-black/40 border border-primary/40 rounded py-3 px-4 text-sm font-mono text-white placeholder:text-slate-700 focus:border-primary focus:outline-none focus:shadow-[0_0_10px_rgba(242,108,13,0.4)] transition-all tracking-widest"
                                        placeholder="••••••••••••"
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className="absolute right-3 top-3 material-symbols-outlined text-primary/40 text-lg">vpn_key</span>
                                </div>
                            </div>
                        </div>

                        <button
                            className="w-full bg-primary py-4 text-black text-sm font-black tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(242,108,13,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'AUTHENTICATING...' : 'INITIATE_SESSION'}
                        </button>

                        <div className="flex items-center justify-between pt-4">
                            <Link className="text-[9px] font-mono tracking-widest text-slate-500 hover:text-primary transition-colors uppercase" to="/forgot-password">
                                &gt; FORGOT_KEY?
                            </Link>
                            <Link to="/register" className="text-[9px] font-mono tracking-widest text-slate-500 hover:text-primary transition-colors uppercase">
                                &gt; CREATE_ID
                            </Link>
                        </div>
                    </form>

                    <div className="px-8 pb-4 flex justify-between items-center opacity-30">
                        <div className="text-[8px] font-mono text-slate-400">ENCRYPTION: AES-256</div>
                        <div className="text-[8px] font-mono text-slate-400 uppercase">System: Ready_For_Handshake</div>
                    </div>
                </div>

                <div className="absolute -top-4 -left-4 size-8 border-t-2 border-l-2 border-primary/20"></div>
                <div className="absolute -bottom-4 -right-4 size-8 border-b-2 border-r-2 border-primary/20"></div>
            </div>

            <div className="fixed bottom-10 right-10 flex flex-col gap-2 items-end opacity-20 pointer-events-none">
                <div className="text-[10px] font-mono text-primary uppercase tracking-tighter flex items-center gap-2">
                    Node: 12.0.4.19 <span className="size-1 bg-primary"></span>
                </div>
                <div className="text-[10px] font-mono text-primary uppercase tracking-tighter flex items-center gap-2">
                    Status: Encrypted <span className="size-1 bg-primary"></span>
                </div>
            </div>
        </div>
    );
};

export default Login;
