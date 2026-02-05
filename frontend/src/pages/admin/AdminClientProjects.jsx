import { useState, useEffect } from 'react';
import api from '../../services/api';
import ClientMessages from '../../components/client/ClientMessages';
import { getSafeDownloadUrl } from '../../utils/urlHelper';

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

    const handleDeleteFile = async (file) => {
        if (!selectedProject) return;
        if (!window.confirm(`Are you sure you want to delete "${file.name}"? This action cannot be undone.`)) return;

        try {
            if (file.system === 2) {
                // System 2 - Standalone File document
                await api.delete(`/files/${file._id}`);
            } else {
                // System 1 - Embedded in ClientProject
                await api.delete(`/projects/${selectedProject._id}/files/${file._id}`);
            }

            // Refresh project data
            const res = await api.get(`/projects/${selectedProject._id}`);
            setSelectedProject(res.data.data);

            // Also update main projects list for counts
            const listRes = await api.get('/projects');
            setProjects(listRes.data.data);

            alert('File deleted successfully.');
        } catch (err) {
            console.error('Deletion failed:', err);
            alert(err.response?.data?.message || 'Failed to delete asset');
        }
    };

    if (loading) return <div className="p-12 text-center text-primary font-mono animate-pulse">Scanning Neural Databanks...</div>;

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden p-4 sm:p-8 lg:p-12 animate-in fade-in duration-500">
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl sm:text-4xl font-black tracking-tighter text-white uppercase italic glitch-text flex flex-wrap gap-x-3">
                        Active_Deployments // <span className="text-primary">Client_Sync</span>
                    </h2>
                    <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed">
                        Real-time Project Synchronization Status // Node_Count: {projects.length}
                    </p>
                </div>
                <button
                    onClick={fetchProjects}
                    disabled={isSyncing}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-black transition-all rounded-sm font-mono text-[10px] uppercase font-bold disabled:opacity-50"
                >
                    <span className={`material-symbols-outlined text-sm ${isSyncing ? 'animate-spin' : ''}`}>sync</span>
                    {isSyncing ? 'SYNCING...' : 'Sync_Neural_Data'}
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10 flex-1 overflow-hidden">
                {/* Project Selector - Sidebar on Desktop, Top Scroll on Mobile */}
                <div className="lg:col-span-1 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2 min-h-0">
                    <p className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest mb-2 px-1">Active_Nodes</p>
                    {projects.map(p => (
                        <div
                            key={p._id}
                            onClick={() => handleProjectSelect(p)}
                            className={`p-5 tech-border cursor-pointer transition-all shrink-0 ${selectedProject?._id === p._id ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(255,95,31,0.1)]' : 'bg-surface-dark/40 border-white/5 hover:border-white/20'}`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-white font-bold text-[10px] uppercase tracking-widest truncate">{p.projectName}</h3>
                                <span className="text-[10px] font-mono text-primary font-bold">{p.progressPercentage}%</span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${p.progressPercentage}%` }}></div>
                            </div>
                            <div className="flex justify-between items-end mt-4">
                                <p className="text-[9px] text-zinc-500 font-mono uppercase truncate max-w-[120px]">{p.clientId?.name || 'Unknown'}</p>
                                {p.totalFiles > 0 && (
                                    <span className="text-[8px] font-mono text-cyan-400">[{p.totalFiles}_F]</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Unified Detail Context */}
                {selectedProject && (
                    <div className="lg:col-span-3 flex flex-col gap-8 overflow-y-auto custom-scrollbar pr-2">
                        {/* Status Matrix Header */}
                        <div className="tech-border bg-surface-dark/20 p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                            <div>
                                <div className="flex items-center gap-3 text-primary mb-2">
                                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                    <p className="text-[10px] font-mono font-bold tracking-widest uppercase">Synchronization_Active</p>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-black uppercase italic text-white leading-tight">Node // <span className="text-slate-500">{selectedProject.projectName}</span></h3>
                                <p className="text-[9px] font-mono text-slate-500 mt-2 uppercase tracking-tighter truncate max-w-full">GLOBAL_ID: {selectedProject._id}</p>
                            </div>
                            <div className="text-left sm:text-right border-l-2 sm:border-l-0 sm:border-r-2 border-primary/30 pl-4 sm:pl-0 sm:pr-4 py-1">
                                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Inferred_Phase</p>
                                <p className="text-primary font-black uppercase italic text-xl">{selectedProject.currentMilestone || 'INITIALIZING'}</p>
                            </div>
                        </div>

                        {/* Internal Content Grid */}
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                            {/* Main Process Content */}
                            <div className="xl:col-span-2 space-y-8">
                                {/* Process Matrix (Milestones) */}
                                <div className="tech-border bg-surface-dark/10 p-6 sm:p-8">
                                    <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                                        <span className="material-symbols-outlined text-primary">analytics</span>
                                        <h2 className="text-xs font-black text-white uppercase tracking-[0.3em]">Process_Matrix</h2>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                        {selectedProject.milestones.map((m) => (
                                            <div key={m._id} className="p-5 bg-black/40 border border-white/5 rounded-xl flex flex-col gap-4 hover:border-white/10 transition-all group">
                                                <div className="flex justify-between items-start text-[10px]">
                                                    <h4 className="text-white font-bold uppercase tracking-wider">{m.name}</h4>
                                                    <div className={`size-2 rounded-full shadow-[0_0_8px] ${m.status === 'completed' ? 'bg-green-500 shadow-green-500/50' :
                                                        m.status === 'in_progress' ? 'bg-primary shadow-primary/50 animate-pulse' :
                                                            'bg-slate-700'
                                                        }`} />
                                                </div>
                                                <select
                                                    value={m.status}
                                                    onChange={(e) => updateMilestone(selectedProject._id, m._id, e.target.value)}
                                                    className="bg-surface-dark border border-white/10 text-slate-300 text-[10px] font-mono uppercase p-2 focus:border-primary outline-none cursor-pointer hover:bg-surface-dark/80 transition-colors"
                                                >
                                                    <option value="not_started">Status: Standby</option>
                                                    <option value="in_progress">Status: Processing</option>
                                                    <option value="completed">Status: Optimized</option>
                                                    <option value="on_hold">Status: Suspended</option>
                                                </select>
                                                {m.completedDate && (
                                                    <p className="text-[8px] text-slate-600 font-mono italic">
                                                        Executed: {new Date(m.completedDate).toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Neural Uplink (Messages) */}
                                <div className="tech-border bg-surface-dark/10 p-6 sm:p-8">
                                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-primary">terminal</span>
                                            <h2 className="text-xs font-black text-white uppercase tracking-[0.3em]">Neural_Uplink</h2>
                                        </div>
                                        <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest hidden sm:inline-block">Comm_Channel_Active</span>
                                    </div>
                                    <ClientMessages projectId={selectedProject._id} />
                                </div>
                            </div>

                            {/* Sidebar Intelligence */}
                            <div className="xl:col-span-1 space-y-8">
                                {/* Metadata Node */}
                                <div className="tech-border p-6 sm:p-8 bg-surface-dark/40 relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-all"></div>
                                    <div className="flex items-center gap-3 mb-8">
                                        <span className="material-symbols-outlined text-primary">info</span>
                                        <h2 className="text-xs font-black text-white uppercase tracking-[0.3em]">Project_Intelligence</h2>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="bg-black/40 p-5 border border-white/5 rounded-sm">
                                            <p className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.2em] mb-2 font-bold">Inferred_Allocation</p>
                                            <p className="text-xl font-black text-white italic">{selectedProject.budget || 'N/A'}</p>
                                        </div>
                                        <div className="bg-black/40 p-5 border border-white/5 rounded-sm">
                                            <p className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.2em] mb-2 font-bold">Temporal_Bounds</p>
                                            <p className="text-lg font-bold text-white uppercase tracking-tight">{selectedProject.timeline || 'N/A'}</p>
                                        </div>
                                        <div className="bg-primary/5 p-5 border border-primary/20 rounded-sm">
                                            <p className="text-[9px] text-primary font-mono uppercase tracking-[0.2em] mb-2 font-black">Submission_Brief</p>
                                            <p className="text-[11px] text-slate-400 leading-relaxed font-mono line-clamp-6">{selectedProject.description}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Shared Registry (Files) */}
                                <div className="tech-border p-6 sm:p-8 bg-surface-dark/30">
                                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-primary">folder_managed</span>
                                            <h2 className="text-xs font-black text-white uppercase tracking-[0.3em]">Asset_Registry</h2>
                                        </div>
                                        <span className="text-[8px] font-mono text-cyan-400">[{selectedProject.files?.length || 0}_FILES]</span>
                                    </div>
                                    <div className="space-y-4">
                                        {selectedProject.files?.map((file) => (
                                            <div key={file._id} className="p-4 bg-black/40 border border-white/5 hover:border-primary/30 transition-all rounded-sm flex items-center justify-between gap-3 group">
                                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                                    <span className="material-symbols-outlined text-slate-600 group-hover:text-primary transition-colors text-lg shrink-0">
                                                        {file.name?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? 'image' : 'description'}
                                                    </span>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-[10px] font-bold text-white uppercase tracking-wider truncate" title={file.name}>{file.name}</p>
                                                        <p className="text-[8px] font-mono text-slate-600 uppercase whitespace-nowrap">
                                                            {(file.size / 1024).toFixed(0)}KB // {file.system === 2 ? 'EXT' : 'CORE'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1.5 shrink-0">
                                                    <button
                                                        onClick={() => handleDeleteFile(file)}
                                                        className="size-8 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                                                        title="Delete Asset"
                                                    >
                                                        <span className="material-symbols-outlined text-base">delete</span>
                                                    </button>
                                                    <a
                                                        href={getSafeDownloadUrl(file.fileUrl || `${import.meta.env.VITE_API_URL}/upload/raw/${file.mediaId}`, file.name)}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="size-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-black flex items-center justify-center transition-all"
                                                        title="Download Asset"
                                                    >
                                                        <span className="material-symbols-outlined text-base">download</span>
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                        {(!selectedProject.files || selectedProject.files.length === 0) && (
                                            <div className="text-center py-10 text-slate-700 font-mono text-[9px] uppercase border border-dashed border-white/5">
                                                Registry_Empty
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminClientProjects;
