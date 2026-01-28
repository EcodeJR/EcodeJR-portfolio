import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ClientDashboard = () => {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/projects');
                setProjects(res.data.data);
            } catch (err) {
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="size-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                <p className="text-primary font-mono text-xs tracking-widest uppercase animate-pulse">Establishing Secure Uplink...</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-[1400px] mx-auto p-8 lg:p-12 relative animate-in fade-in duration-500">
            <header className="flex flex-wrap items-end justify-between gap-6 mb-12 border-b border-white/5 pb-8">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-primary">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#FF5F00]"></span>
                        <p className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase">Operational Status: Active</p>
                    </div>
                    <h2 className="text-white text-4xl lg:text-5xl font-black tracking-tighter uppercase italic glitch-text">User_Identity // <span className="text-slate-500">{user?.name || 'Dashboard'}</span></h2>
                    <p className="font-mono text-xs text-slate-500 uppercase tracking-widest">Connection_Protocol: <span className="text-primary/80 italic">Neural_Link_v3.42</span></p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 rounded-sm h-11 px-6 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
                        <span className="material-symbols-outlined text-lg">sensors</span>
                        <span>Sync_Feed</span>
                    </button>
                    <Link to="/contact" className="flex items-center gap-2 rounded-sm h-11 px-8 bg-primary text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(255,95,31,0.3)]">
                        <span className="material-symbols-outlined text-lg">message</span>
                        <span>Communicate</span>
                    </Link>
                </div>
            </header>

            {/* Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="tech-border flex flex-col gap-6 p-6 bg-surface-dark/40 group hover:bg-surface-dark/60 transition-all">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="text-slate-500 text-[10px] font-mono font-bold uppercase tracking-widest mb-1">State_Status</p>
                            <p className="text-white text-2xl font-black uppercase italic group-hover:text-primary transition-colors">Development</p>
                        </div>
                        <span className="text-primary material-symbols-outlined text-3xl">precision_manufacturing</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[10px]">
                        <span className="text-primary font-bold">[RUNNING]</span>
                        <span className="text-slate-500">Stability at 99.8%</span>
                    </div>
                </div>
                <div className="tech-border flex flex-col gap-6 p-6 bg-surface-dark/40 group hover:bg-surface-dark/60 transition-all">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="text-slate-500 text-[10px] font-mono font-bold uppercase tracking-widest mb-1">Compute_Progress</p>
                            <p className="text-white text-3xl font-black uppercase italic group-hover:text-[#00F0FF] transition-colors">65.00%</p>
                        </div>
                        <span className="text-[#00F0FF] material-symbols-outlined text-3xl">data_exploration</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.6)] animate-pulse" style={{ width: '65%' }}></div>
                    </div>
                </div>
                <div className="tech-border flex flex-col gap-6 p-6 bg-surface-dark/40 group hover:bg-surface-dark/60 transition-all">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="text-slate-500 text-[10px] font-mono font-bold uppercase tracking-widest mb-1">Next_Threshold</p>
                            <p className="text-white text-2xl font-black uppercase italic group-hover:text-primary transition-colors">Oct_24_2024</p>
                        </div>
                        <span className="text-primary material-symbols-outlined text-3xl">radar</span>
                    </div>
                    <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">Beta_Staging_Deployment</p>
                </div>
            </div>

            {/* Mission Roadmap */}
            <div className="tech-border bg-surface-dark/20 p-8 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <span className="material-symbols-outlined text-9xl">alt_route</span>
                </div>
                <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-4">
                    <h3 className="text-white text-sm font-bold uppercase tracking-[0.4em] font-mono">Mission_Roadmap.exe</h3>
                    <div className="flex items-center gap-4 text-[10px] font-mono">
                        <span className="text-primary font-bold">PHASE_03</span>
                        <span className="text-slate-700">/</span>
                        <span className="text-slate-400 uppercase tracking-widest">In_Transit</span>
                    </div>
                </div>
                <div className="relative pt-8 pb-4 px-2">
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-0 w-[60%] h-[2px] linear-path-active -translate-y-1/2"></div>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="relative flex flex-col items-center">
                            <div className="size-4 bg-primary rounded-sm rotate-45 border border-primary shadow-[0_0_10px_#FF5F1F] mb-6 relative z-10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[10px] text-black font-bold -rotate-45">check</span>
                            </div>
                            <div className="text-center">
                                <p className="text-white text-[10px] font-bold uppercase tracking-widest">Discovery</p>
                                <p className="text-slate-600 font-mono text-[9px] mt-1">LOGGED: 01.10</p>
                            </div>
                        </div>
                        <div className="relative flex flex-col items-center">
                            <div className="size-4 bg-primary rounded-sm rotate-45 border border-primary shadow-[0_0_10px_#FF5F1F] mb-6 relative z-10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[10px] text-black font-bold -rotate-45">check</span>
                            </div>
                            <div className="text-center">
                                <p className="text-white text-[10px] font-bold uppercase tracking-widest">Interface</p>
                                <p className="text-slate-600 font-mono text-[9px] mt-1">LOGGED: 01.28</p>
                            </div>
                        </div>
                        <div className="relative flex flex-col items-center">
                            <div className="size-6 bg-black rounded-sm rotate-45 border-2 border-primary shadow-[0_0_15px_#FF5F1F] mb-5 relative z-10 flex items-center justify-center animate-bounce duration-1000">
                                <div className="size-1.5 bg-primary rounded-full shadow-[0_0_5px_white]"></div>
                            </div>
                            <div className="text-center">
                                <p className="text-primary text-[11px] font-black uppercase tracking-[0.2em] italic">Development</p>
                                <p className="text-[#00F0FF] font-mono text-[9px] mt-1 animate-pulse">ACTIVE_PROCESS</p>
                            </div>
                        </div>
                        <div className="relative flex flex-col items-center opacity-30">
                            <div className="size-4 bg-white/5 rounded-sm rotate-45 border border-white/20 mb-6 relative z-10"></div>
                            <div className="text-center">
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Testing_QA</p>
                                <p className="text-slate-600 font-mono text-[9px] mt-1">QUEUED</p>
                            </div>
                        </div>
                        <div className="relative flex flex-col items-center opacity-30">
                            <div className="size-4 bg-white/5 rounded-sm rotate-45 border border-white/20 mb-6 relative z-10"></div>
                            <div className="text-center">
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Deployment</p>
                                <p className="text-slate-600 font-mono text-[9px] mt-1">EST_MAR_15</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Files and Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary text-sm">folder_open</span>
                            <h3 className="text-white text-xs font-bold uppercase tracking-[0.3em] font-mono">Encrypted_Assets</h3>
                        </div>
                        <Link to="/client/files" className="text-[9px] font-mono text-slate-500 hover:text-primary transition-colors flex items-center gap-1 group">
                            <span>OPEN_DIRECTORY</span>
                            <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projects.length > 0 ? (
                            projects.map(p => (
                                <Link to={`/client/projects/${p._id}`} key={p._id} className="group tech-border p-5 bg-surface-dark/30 hover:bg-primary/5 transition-all cursor-pointer">
                                    <div className="flex items-start gap-4">
                                        <div className="size-10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                                            <span className="material-symbols-outlined">dataset</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-xs text-white uppercase tracking-widest mb-1 truncate group-hover:text-primary transition-colors">{p.projectName || 'Project_Node'}</h4>
                                            <p className="font-mono text-[9px] text-slate-500 flex justify-between uppercase">
                                                <span>ID: {p._id.substring(0, 8)}</span>
                                                <span className="text-primary/60">{p.status}</span>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-2 text-center text-slate-600 text-[10px] uppercase tracking-widest font-mono py-12 bg-white/[0.02] border border-dashed border-white/10 rounded-sm">
                                <span className="material-symbols-outlined text-3xl mb-4 block opacity-20">inventory_2</span>
                                NO_ASSETS_FOUND_IN_CACHE
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-primary text-sm">history_edu</span>
                        <h3 className="text-white text-xs font-bold uppercase tracking-[0.3em] font-mono">System_Logs</h3>
                    </div>
                    <div className="flex flex-col gap-8 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/5">
                        <div className="flex gap-4 relative">
                            <div className="size-[15px] rounded-sm bg-primary shadow-[0_0_8px_#FF5F1F] z-10 flex items-center justify-center rotate-45">
                                <span className="material-symbols-outlined text-[10px] text-black font-bold -rotate-45">upload</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-[11px] font-bold text-white uppercase tracking-widest italic">New_Data_Upload</p>
                                <p className="text-[10px] font-mono text-slate-500">Asset_Staging_v3 // +4 Files</p>
                                <p className="text-[9px] font-mono text-primary/60 uppercase mt-1">T-Minus 3:00:00</p>
                            </div>
                        </div>
                        <div className="flex gap-4 relative">
                            <div className="size-[15px] rounded-sm bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] z-10 flex items-center justify-center rotate-45">
                                <span className="material-symbols-outlined text-[10px] text-black font-bold -rotate-45">payments</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-[11px] font-bold text-white uppercase tracking-widest italic">Ledger_Updated</p>
                                <p className="text-[10px] font-mono text-slate-500">Inv_#1042 // Settlement_Complete</p>
                                <p className="text-[9px] font-mono text-slate-600 uppercase mt-1">24H_ELAPSED</p>
                            </div>
                        </div>
                        <div className="flex gap-4 relative">
                            <div className="size-[15px] rounded-sm bg-white/20 border border-white/40 z-10 flex items-center justify-center rotate-45">
                                <span className="material-symbols-outlined text-[10px] text-white font-bold -rotate-45">terminal</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-[11px] font-bold text-white uppercase tracking-widest italic">Dev_Comm_Incoming</p>
                                <p className="text-[10px] font-mono text-slate-500 italic">"Optimized mobile view for checkout..."</p>
                                <p className="text-[9px] font-mono text-slate-600 uppercase mt-1">48H_ELAPSED</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
