import { useState, useEffect } from 'react';
import api from '../../services/api';
import ClientMessages from '../../components/client/ClientMessages';

const AdminClientProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setIsSyncing(true);
        try {
            const res = await api.get('/projects');
            setProjects(res.data.data);

            // If a project is already selected, update it from the list or fetch it specifically
            if (selectedProject) {
                const updated = res.data.data.find(p => p._id === selectedProject._id);
                if (updated) {
                    // Fetch full details for the selected one to get the latest files
                    const detailRes = await api.get(`/projects/${selectedProject._id}`);
                    setSelectedProject(detailRes.data.data);
                }
            } else if (res.data.data.length > 0 && !selectedProject) {
                // Initialize with first project only if none selected
                const detailRes = await api.get(`/projects/${res.data.data[0]._id}`);
                setSelectedProject(detailRes.data.data);
            }
        } catch (err) {
            console.error('Error fetching projects:', err);
        } finally {
            setLoading(false);
            setTimeout(() => setIsSyncing(false), 600);
        }
    };

    const handleProjectSelect = async (project) => {
        try {
            // Set loading or small indicator? Just fetch.
            const res = await api.get(`/projects/${project._id}`);
            setSelectedProject(res.data.data);
        } catch (err) {
            console.error('Error selecting project:', err);
        }
    };

    const updateMilestone = async (projectId, milestoneId, newStatus) => {
        try {
            await api.put(`/projects/${projectId}/milestones/${milestoneId}`, { status: newStatus });
            // Refresh local state
            fetchProjects();
        } catch (err) {
            console.error('Update failed:', err);
            alert('Failed to update stage status');
        }
    };

    if (loading) return <div className="p-12 text-center text-primary font-mono animate-pulse">Scanning Neural Databanks...</div>;

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden p-8 lg:p-12 animate-in fade-in duration-500">
            <header className="flex flex-wrap items-center justify-between gap-6 mb-10">
                <div className="flex flex-col gap-2">
                    <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic glitch-text">Active_Deployments // <span className="text-primary">Client_Sync</span></h2>
                    <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Real-time Project Synchronization Status</p>
                </div>
                <button
                    onClick={fetchProjects}
                    disabled={isSyncing}
                    className="flex items-center gap-2 px-6 py-2 bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-black transition-all rounded-sm font-mono text-[10px] uppercase font-bold disabled:opacity-50"
                >
                    <span className={`material-symbols-outlined text-sm ${isSyncing ? 'animate-spin' : ''}`}>sync</span>
                    {isSyncing ? 'SYNCING...' : 'Sync_Neural_Data'}
                </button>
            </header>

            {/* Diagnostic Alert */}
            {projects.length > 0 && (
                <div className="mb-8 p-4 bg-cyan-950/30 border border-cyan-500/20 rounded-lg flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
                    <div className="flex gap-6">
                        <span className="text-cyan-400">Total_Nodes: {projects.length}</span>
                        <span className="text-cyan-400">Projects_with_Assets: {projects.filter(p => p.files?.length > 0).length}</span>
                        <span className="text-cyan-400">Global_Asset_Count: {projects.reduce((sum, p) => sum + (p.files?.length || 0), 0)}</span>
                    </div>
                    {projects.some(p => p.files?.length > 0) && (
                        <div className="flex items-center gap-2 text-primary animate-pulse">
                            <span className="material-symbols-outlined text-sm">priority_high</span>
                            <span>Assets_Detected_in_Cluster</span>
                        </div>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 flex-1 overflow-hidden">
                {/* Project Selector */}
                <div className="lg:col-span-1 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
                    {projects.map(p => (
                        <div
                            key={p._id}
                            onClick={() => handleProjectSelect(p)}
                            className={`p-6 tech-border cursor-pointer transition-all ${selectedProject?._id === p._id ? 'bg-primary/10 border-primary' : 'bg-surface-dark/40 border-white/5 hover:border-white/20'}`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-white font-bold text-sm uppercase tracking-widest truncate max-w-[150px]">{p.projectName}</h3>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-mono text-primary font-bold">{p.progressPercentage}%</span>
                                    {p.totalFiles > 0 && (
                                        <span className="text-[8px] font-mono text-cyan-400 mt-1">[{p.totalFiles} ASSETS]</span>
                                    )}
                                </div>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${p.progressPercentage}%` }}></div>
                            </div>
                            <p className="text-[9px] text-slate-500 font-mono mt-4 uppercase">Client: {p.clientId?.name}</p>
                            <p className="text-[7px] text-slate-700 font-mono mt-1 uppercase">Node_ID: {p._id}</p>
                        </div>
                    ))}
                </div>

                {/* Status Control */}
                {selectedProject && (
                    <div className="lg:col-span-2 tech-border bg-surface-dark/20 p-8 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-center border-b border-white/5 pb-6">
                            <div>
                                <h3 className="text-white text-2xl font-black uppercase italic">{selectedProject.projectName}</h3>
                                <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase">NODE_ID: {selectedProject._id}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-mono text-slate-500 uppercase">Current_Phase</p>
                                <p className="text-primary font-black uppercase italic text-lg">{selectedProject.currentMilestone || 'INITIALIZING'}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {selectedProject.milestones.map((m) => (
                                <div key={m._id} className="p-6 bg-black/40 border border-white/5 rounded-xl flex flex-col gap-4 hover:border-white/10 transition-all">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-white text-xs font-bold uppercase tracking-wider">{m.name}</h4>
                                        <div className={`size-2 rounded-full shadow-[0_0_8px] ${m.status === 'completed' ? 'bg-green-500 shadow-green-500/50' :
                                            m.status === 'in_progress' ? 'bg-primary shadow-primary/50' :
                                                'bg-slate-700'
                                            }`} />
                                    </div>
                                    <select
                                        value={m.status}
                                        onChange={(e) => updateMilestone(selectedProject._id, m._id, e.target.value)}
                                        className="bg-surface-dark border border-white/10 text-slate-300 text-[10px] font-mono uppercase p-2 focus:border-primary outline-none"
                                    >
                                        <option value="not_started">Status: Standby</option>
                                        <option value="in_progress">Status: Processing</option>
                                        <option value="completed">Status: Optimized</option>
                                        <option value="on_hold">Status: Suspended</option>
                                    </select>
                                    {m.completedDate && (
                                        <p className="text-[9px] text-slate-600 font-mono italic">
                                            Executed: {new Date(m.completedDate).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Assets Section */}
                        <div className="mt-10 border-t border-white/5 pt-10">
                            {/* Raw Data Toggle (Debug) */}
                            <details className="mb-4 group">
                                <summary className="text-[7px] text-slate-800 cursor-pointer uppercase font-mono hover:text-primary transition-colors">RAW_PROJECT_PAYLOAD</summary>
                                <pre className="mt-2 p-4 bg-black/60 rounded text-[8px] text-green-500 overflow-x-auto font-mono">
                                    {JSON.stringify(selectedProject, null, 2)}
                                </pre>
                            </details>
                            <div className="flex items-center gap-3 mb-8">
                                <span className="material-symbols-outlined text-primary">inventory_2</span>
                                <h3 className="text-white text-sm font-bold uppercase tracking-[0.4em] font-mono">Project_Assets // Link_Established</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {selectedProject.files?.map((file) => (
                                    <div key={file._id} className="p-4 bg-black/40 border border-white/5 hover:border-primary/30 transition-all rounded-xl flex items-center justify-between group">
                                        <div className="flex items-center gap-4 min-w-0">
                                            <span className="material-symbols-outlined text-slate-600 group-hover:text-primary transition-colors">
                                                {file.name?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? 'image' : 'description'}
                                            </span>
                                            <div className="truncate">
                                                <p className="text-[10px] font-bold text-white uppercase tracking-wider truncate">{file.name}</p>
                                                <p className="text-[8px] font-mono text-slate-500 uppercase">
                                                    {(file.size / 1024).toFixed(1)} KB
                                                    {file.system === 2 && <span className="ml-2 text-cyan-500/50">[LEGACY_FS]</span>}
                                                </p>
                                            </div>
                                        </div>
                                        <a
                                            href={
                                                file.system === 2 && file.fileUrl
                                                    ? `${import.meta.env.VITE_API_URL?.replace('/api', '')}${file.fileUrl}`
                                                    : file.mediaId
                                                        ? `${import.meta.env.VITE_API_URL}/upload/raw/${file.mediaId}`
                                                        : '#'
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                            className={`size-8 rounded-full ${file.fileUrl || file.mediaId ? 'bg-primary/10 text-primary hover:bg-primary hover:text-black' : 'bg-slate-800 text-slate-600 cursor-not-allowed'} flex items-center justify-center transition-all`}
                                            download={file.name}
                                            onClick={(e) => {
                                                if (!file.fileUrl && !file.mediaId) {
                                                    e.preventDefault();
                                                    alert('File URL not available. This file may have been uploaded incorrectly.');
                                                }
                                            }}
                                        >
                                            <span className="material-symbols-outlined text-sm">download</span>
                                        </a>
                                    </div>
                                ))}
                                {(!selectedProject.files || selectedProject.files.length === 0) && (
                                    <div className="col-span-full py-10 text-center text-slate-600 font-mono text-[9px] uppercase tracking-widest border border-dashed border-white/5 rounded-xl">
                                        NO_ASSETS_SYNCED_FOR_THIS_NODE
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Neural Uplink (Chat) Section */}
                        <div className="mt-10 border-t border-white/5 pt-10">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">terminal</span>
                                    <h3 className="text-white text-sm font-bold uppercase tracking-[0.4em] font-mono">Neural_Uplink // Comm_Channel</h3>
                                </div>
                                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest animate-pulse">Secure_Link_Active</span>
                            </div>
                            <ClientMessages projectId={selectedProject._id} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminClientProjects;
