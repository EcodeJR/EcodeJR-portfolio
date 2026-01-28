import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MilestoneTracker from '../../components/client/MilestoneTracker';
import ClientMessages from '../../components/client/ClientMessages';
import ClientFiles from '../../components/client/ClientFiles';
import Loader from '../../components/common/Loader';
import Badge from '../../components/common/Badge';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ClientProjectDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await api.get(`/projects/${id}`);
                setProject(res.data.data);
            } catch (err) {
                console.error('Error fetching project:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (loading) return (
        <div className="flex items-center justify-center h-[60vh]">
            <Loader />
        </div>
    );

    if (!project) return (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
            <span className="material-symbols-outlined text-6xl text-slate-800 animate-pulse">error</span>
            <h2 className="text-xl font-black uppercase tracking-widest text-white">Project_Not_Found</h2>
            <Link to="/client/dashboard" className="text-primary font-mono text-xs uppercase hover:underline">Return_to_Dashboard</Link>
        </div>
    );

    return (
        <div className="max-w-[1400px] mx-auto p-8 lg:p-12 relative animate-in fade-in duration-500">
            {/* Header Section */}
            <header className="flex flex-wrap items-end justify-between gap-8 mb-12 border-b border-white/5 pb-10">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <Link to="/client/dashboard" className="text-[10px] font-mono font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">Dashboard</Link>
                        <span className="text-slate-700 font-mono text-xs">/</span>
                        <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">{project.projectName}</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                        Node // <span className="text-slate-500">{project.projectName}</span>
                    </h1>
                    <div className="flex items-center gap-4 mt-2">
                        <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest border border-white/10 px-3 py-1 bg-white/5 rounded-full">{project.serviceType}</p>
                        <div className="flex items-center gap-2">
                            <span className="size-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#FF5F1F]"></span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Session_Active</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                    <Badge
                        variant={
                            project.status === 'completed' ? 'success' :
                                project.status === 'in_progress' ? 'primary' :
                                    project.status === 'on_hold' ? 'warning' : 'secondary'
                        }
                        className="text-[10px] px-6 py-2 rounded-full font-black uppercase tracking-[0.2em] italic border-none shadow-[0_0_20px_rgba(255,95,31,0.1)]"
                    >
                        {project.status.replace('_', ' ')}
                    </Badge>
                    <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Initialization: {new Date(project.createdAt).toLocaleDateString()}</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Process Content */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Process Matrix (formerly Milestone Tracker) */}
                    <div className="tech-border p-8 bg-surface-dark/30 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="material-symbols-outlined text-primary">analytics</span>
                            <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">Process_Matrix</h2>
                        </div>
                        <MilestoneTracker
                            milestones={project.milestones}
                            currentMilestone={project.currentMilestone}
                        />
                    </div>

                    {/* Uplink (formerly Messages) */}
                    <div className="tech-border p-8 bg-surface-dark/20 backdrop-blur-sm" id="messages">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">terminal</span>
                                <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">Neural_Uplink</h2>
                            </div>
                            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest animate-pulse">Comm_Link_Established</span>
                        </div>
                        <ClientMessages projectId={project._id} />
                    </div>
                </div>

                {/* Secondary Sidebar Content */}
                <div className="lg:col-span-1 space-y-10">
                    {/* Metadata Node */}
                    <div className="tech-border p-8 bg-surface-dark/50 backdrop-blur-md relative overflow-hidden group border-primary/10">
                        <div className="absolute top-0 left-0 w-0.5 h-full bg-primary/20 group-hover:bg-primary transition-all"></div>
                        <div className="flex items-center gap-3 mb-8">
                            <span className="material-symbols-outlined text-primary">info</span>
                            <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">Metadata_Node</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-black/40 p-5 rounded-sm border border-white/5">
                                <p className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.2em] mb-2 font-bold">Fiscal_Allocation</p>
                                <p className="text-xl font-black text-white italic">{project.budget}</p>
                            </div>
                            <div className="bg-black/40 p-5 rounded-sm border border-white/5">
                                <p className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.2em] mb-2 font-bold">Temporal_Bounds</p>
                                <p className="text-lg font-bold text-white uppercase tracking-tight">{project.timeline}</p>
                            </div>
                            <div className="bg-primary/5 p-5 rounded-sm border border-primary/20">
                                <p className="text-[9px] text-primary font-mono uppercase tracking-[0.2em] mb-2 font-black">Submission_Brief</p>
                                <p className="text-xs text-slate-400 leading-relaxed font-mono">{project.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Shared Registry (formerly ClientFiles) */}
                    <div className="tech-border p-8 bg-surface-dark/40 backdrop-blur-sm shadow-2xl">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="material-symbols-outlined text-primary">folder_managed</span>
                            <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">Shared_Registry</h2>
                        </div>
                        <ClientFiles projectId={project._id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientProjectDetail;
