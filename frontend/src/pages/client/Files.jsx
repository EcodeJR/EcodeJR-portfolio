import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Files = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-[1400px] mx-auto p-8 lg:p-12 relative animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex flex-wrap items-end justify-between gap-6 mb-12 border-b border-white/5 pb-8">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-primary">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#FF5F00]"></span>
                        <p className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase">Security Level: Grade-A</p>
                    </div>
                    <h2 className="text-white text-4xl lg:text-5xl font-black tracking-tighter uppercase italic glitch-text">Encrypted // <span className="text-slate-500">Vault</span></h2>
                    <p className="font-mono text-xs text-slate-500 uppercase tracking-widest">Active_Node: <span className="text-primary/80">Project_Asset_Registry</span></p>
                </div>
                <div className="flex flex-col min-w-40 !h-12 max-w-sm">
                    <div className="flex w-full flex-1 items-stretch rounded-full h-full overflow-hidden border border-white/10 bg-black/40 px-6 backdrop-blur-md">
                        <div className="text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">search</span>
                        </div>
                        <input className="flex w-full min-w-0 flex-1 border-none bg-transparent focus:outline-0 focus:ring-0 h-full placeholder:text-zinc-600 px-4 text-xs font-mono uppercase" placeholder="QUERY_VAULT..." />
                    </div>
                </div>
            </header>

            {/* Storage Status */}
            <div className="tech-border flex flex-col gap-6 p-8 mb-12 bg-surface-dark/50 backdrop-blur-sm">
                <div className="flex flex-wrap gap-8 justify-between items-end">
                    <div>
                        <h3 className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-2 font-mono">Quantum Storage Capacity</h3>
                        <p className="text-3xl font-black tracking-tighter text-white uppercase italic">750.42 GB <span className="text-slate-600 text-lg font-normal">/ 1.00 TB</span></p>
                    </div>
                    <div className="flex flex-col items-end">
                        <p className="text-green-500 text-[10px] font-mono uppercase tracking-widest mb-1 shadow-[0_0_10px_rgba(34,197,94,0.2)]">System Status: Optimal</p>
                        <p className="text-slate-500 text-[9px] font-mono uppercase">Sync_Cycle: 4:00:00</p>
                    </div>
                </div>
                <div className="rounded-full bg-white/5 h-1.5 overflow-hidden border border-white/5">
                    <div className="h-full rounded-full bg-primary shadow-[0_0_15px_rgba(249,107,6,0.5)]" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><span className="size-1 bg-[#00F0FF] rounded-full"></span> Sector_001_Active</span>
                    <span>Direct_Neural_Link_Established</span>
                </div>
            </div>

            {/* Upload Area */}
            <div className="mb-12 group">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 hover:border-primary/50 transition-all duration-500 rounded-3xl p-16 bg-white/[0.02] cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="size-20 rounded-full border border-white/5 flex items-center justify-center mb-6 group-hover:border-primary/30 transition-all group-hover:scale-110">
                        <span className="material-symbols-outlined text-4xl text-primary transition-transform">cloud_upload</span>
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-[0.4em] text-white">Initialize_Upload</h3>
                    <p className="text-slate-500 text-[10px] font-mono uppercase mt-3 tracking-widest">Drag assets to the node or click to browse local memory</p>
                </div>
            </div>

            {/* Project Assets */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-primary">data_object</span>
                        <h2 className="text-2xl font-black leading-tight tracking-tighter uppercase italic text-white underline decoration-primary/20 underline-offset-8">Project_Assets</h2>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Registry: Alpha_Secure</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {['brand_guidelines.pdf', 'raw_footage_01.mp4', 'brief_v2.docx', 'logo_package.zip'].map((file, i) => (
                        <div key={i} className="group tech-border p-6 bg-surface-dark/30 hover:bg-primary/5 transition-all cursor-crosshair relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                                <button className="size-8 rounded-full bg-primary text-black flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                                    <span className="material-symbols-outlined text-sm">download</span>
                                </button>
                            </div>
                            <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-black/40 border border-white/5 flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-5xl text-slate-800 group-hover:text-primary transition-colors duration-500">
                                    {file.endsWith('pdf') ? 'picture_as_pdf' : file.endsWith('mp4') ? 'movie' : file.endsWith('zip') ? 'folder_zip' : 'description'}
                                </span>
                            </div>
                            <div>
                                <h4 className="text-white text-xs font-bold truncate tracking-widest uppercase mb-2 group-hover:text-primary transition-colors">{file}</h4>
                                <div className="flex justify-between items-center">
                                    <p className="text-slate-500 text-[9px] font-mono tracking-tighter uppercase">2.4 MB // JAN_28</p>
                                    <span className="text-[8px] font-mono text-primary/60 border border-primary/20 px-1 rounded">SECURE</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Shared Registry Status Footer */}
            <div className="mt-20 py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-mono text-slate-600 uppercase tracking-[0.3em]">
                <div className="flex gap-8">
                    <span className="flex items-center gap-2"><span className="size-1 bg-[#00F0FF]/50 rounded-full animate-pulse"></span> Last_Sync: {new Date().toLocaleDateString()}</span>
                    <span className="flex items-center gap-2"><span className="size-1 bg-[#00F0FF]/50 rounded-full animate-pulse"></span> Node: US-E4</span>
                </div>
                <div className="flex gap-8">
                    <a className="hover:text-primary transition-colors" href="#">Privacy_Protocol</a>
                    <a className="hover:text-primary transition-colors" href="#">Security_Layers</a>
                    <span className="text-slate-800">© 2026 CYBER_PORTAL</span>
                </div>
            </div>
        </div>
    );
};

export default Files;
