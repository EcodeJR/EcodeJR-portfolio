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
        <div className="max-w-[1400px] mx-auto p-4 sm:p-8 lg:p-12 relative animate-in fade-in duration-500">
            <header className="flex flex-wrap items-end justify-between gap-6 mb-12 border-b border-white/5 pb-8">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-primary">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#FF5F00]"></span>
                        <p className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase">Operational Status: Active</p>
                    </div>
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tighter uppercase italic glitch-text">User_Identity // <span className="text-slate-500">{user?.name || 'Dashboard'}</span></h2>
                    <p className="font-mono text-xs text-slate-500 uppercase tracking-widest">Connection_Protocol: <span className="text-primary/80 italic">Neural_Link_v3.42</span></p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button className="flex items-center justify-center gap-2 rounded-sm h-11 px-6 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all w-full sm:w-auto">
                        <span className="material-symbols-outlined text-lg">sensors</span>
                        <span>Sync_Feed</span>
                    </button>
                    <Link to="/contact" className="flex items-center justify-center gap-2 rounded-sm h-11 px-8 bg-primary text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(255,95,31,0.3)] w-full sm:w-auto">
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
                            <p className="text-white text-2xl font-black uppercase italic group-hover:text-primary transition-colors">
                                {projects[0]?.status || 'Idle'}
                            </p>
                        </div>
                        <span className="text-primary material-symbols-outlined text-3xl">precision_manufacturing</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[10px]">
                        <span className="text-primary font-bold">[{projects[0]?.status === 'in_progress' ? 'RUNNING' : 'STANDBY'}]</span>
                        <span className="text-slate-500">Stability at 99.8%</span>
                    </div>
                </div>
                <div className="tech-border flex flex-col gap-6 p-6 bg-surface-dark/40 group hover:bg-surface-dark/60 transition-all">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="text-slate-500 text-[10px] font-mono font-bold uppercase tracking-widest mb-1">Compute_Progress</p>
                            <p className="text-white text-3xl font-black uppercase italic group-hover:text-[#00F0FF] transition-colors">
                                {projects[0]?.progressPercentage || 0}.00%
                            </p>
                        </div>
                        <span className="text-[#00F0FF] material-symbols-outlined text-3xl">data_exploration</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.6)] animate-pulse" style={{ width: `${projects[0]?.progressPercentage || 0}%` }}></div>
                    </div>
                </div>
                <div className="tech-border flex flex-col gap-6 p-6 bg-surface-dark/40 group hover:bg-surface-dark/60 transition-all">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="text-slate-500 text-[10px] font-mono font-bold uppercase tracking-widest mb-1">Next_Threshold</p>
                            <p className="text-white text-2xl font-black uppercase italic group-hover:text-primary transition-colors">
                                {projects[0]?.milestones?.find(m => m.status === 'not_started')?.name || 'FINAL_SYNC'}
                            </p>
                        </div>
                        <span className="text-primary material-symbols-outlined text-3xl">radar</span>
                    </div>
                    <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">Estimated_Deployment</p>
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
                        <span className="text-primary font-bold uppercase">{projects[0]?.currentMilestone || 'PHASE_UNKNOWN'}</span>
                        <span className="text-slate-700">/</span>
                        <span className="text-slate-400 uppercase tracking-widest">{projects[0]?.status === 'in_progress' ? 'In_Transit' : 'Standby'}</span>
                    </div>
                </div>
                <div className="relative pt-8 pb-4 px-2">
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-0 h-[2px] linear-path-active -translate-y-1/2" style={{ width: `${projects[0]?.progressPercentage || 0}%` }}></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
                        {projects[0]?.milestones?.map((m, idx) => (
                            <div key={idx} className={`relative flex flex-col items-center ${m.status === 'not_started' ? 'opacity-30' : ''}`}>
                                <div className={`size-4 rounded-sm rotate-45 border mb-6 relative z-10 flex items-center justify-center ${m.status === 'completed' ? 'bg-primary border-primary shadow-[0_0_10px_#FF5F1F]' :
                                    m.status === 'in_progress' ? 'bg-black border-2 border-primary shadow-[0_0_15px_#FF5F1F] animate-pulse' :
                                        'bg-white/5 border-white/20'
                                    }`}>
                                    {m.status === 'completed' && <span className="material-symbols-outlined text-[10px] text-black font-bold -rotate-45">check</span>}
                                    {m.status === 'in_progress' && <div className="size-1.5 bg-primary rounded-full shadow-[0_0_5px_white]"></div>}
                                </div>
                                <div className="text-center">
                                    <p className={`text-[10px] font-bold uppercase tracking-widest ${m.status === 'in_progress' ? 'text-primary' : 'text-white'}`}>{m.name}</p>
                                    <p className="text-slate-600 font-mono text-[9px] mt-1 uppercase">
                                        {m.status === 'completed' ? `LOGGED: ${new Date(m.completedDate).toLocaleDateString().replace(/\//g, '.')}` :
                                            m.status === 'in_progress' ? 'ACTIVE_PROCESS' : 'QUEUED'}
                                    </p>
                                </div>
                            </div>
                        ))}
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
                                            <div className="flex items-center justify-between font-mono text-[9px] uppercase">
                                                <span className="text-slate-500">ID: {p._id.substring(0, 8)}</span>
                                                <span className="text-primary font-bold">{p.progressPercentage}%</span>
                                            </div>
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
                                <p className="text-[9px] font-mono text-primary/60 uppercase mt-1">LATEST_SIGNAL</p>
                            </div>
                        </div>
                        <div className="flex gap-4 relative">
                            <div className="size-[15px] rounded-sm bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] z-10 flex items-center justify-center rotate-45">
                                <span className="material-symbols-outlined text-[10px] text-black font-bold -rotate-45">payments</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-[11px] font-bold text-white uppercase tracking-widest italic">Ledger_Updated</p>
                                <p className="text-[10px] font-mono text-slate-500">Inv_#1042 // Settlement_Complete</p>
                                <p className="text-[9px] font-mono text-slate-600 uppercase mt-1">SYNCED</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Submission Section */}
            <div className="tech-border bg-surface-dark/20 p-8 mb-12 relative overflow-hidden">
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                    <h3 className="text-white text-xs font-bold uppercase tracking-[0.4em] font-mono">Submit_Performance_Review.exe</h3>
                    <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">Status: Awaiting_Feedback</span>
                    </div>
                </div>

                <ReviewForm />
            </div>
        </div>
    );
};

const ReviewForm = () => {
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/testimonials', { rating, review });
            setSubmitted(true);
        } catch (err) {
            console.error('Error submitting review:', err);
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="py-12 text-center flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="size-16 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary mb-2">
                    <span className="material-symbols-outlined text-3xl">verified</span>
                </div>
                <h4 className="text-white font-bold uppercase tracking-widest italic">Review_Logged_Successfully</h4>
                <p className="text-slate-500 font-mono text-xs uppercase tracking-wider max-w-md mx-auto">Your feedback has been encrypted and sent to Central Command for validation. It will be visible once approved.</p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="text-primary font-mono text-[10px] uppercase tracking-widest mt-4 hover:underline"
                >
                    Submit_Another_Entry
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
            <div className="space-y-4">
                <label className="block text-[10px] font-mono tracking-widest text-slate-500 uppercase">Performance_Rating (1-5)</label>
                <div className="flex gap-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={`size-10 border transition-all flex items-center justify-center ${rating >= star
                                    ? 'bg-primary border-primary text-black shadow-[0_0_15px_rgba(255,95,31,0.4)]'
                                    : 'bg-transparent border-white/10 text-slate-600 hover:border-primary/50'
                                }`}
                        >
                            <span className="material-symbols-outlined text-xl">star</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <label className="block text-[10px] font-mono tracking-widest text-slate-500 uppercase">Review_Data_String</label>
                <textarea
                    required
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="ENTER_FEEDBACK_TEXT_HERE..."
                    className="w-full h-32 bg-black/40 border border-white/10 p-4 text-xs font-mono text-white placeholder:text-slate-700 focus:border-primary/50 focus:outline-none transition-all resize-none"
                />
            </div>

            <button
                disabled={loading}
                className="flex items-center justify-center gap-2 h-12 px-10 bg-primary text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-[0_0_30px_rgba(255,95,31,0.2)] disabled:opacity-50"
            >
                {loading ? 'UPLOADING...' : 'TRANSMIT_REVIEW'}
            </button>
        </form>
    );
};

export default ClientDashboard;
