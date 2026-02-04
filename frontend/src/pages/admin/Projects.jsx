import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { getSafeUrl } from '../../utils/urlHelper';

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/portfolio/admin/all');
                setProjects(res.data.data);
            } catch (err) {
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        try {
            await api.delete(`/portfolio/${id}`);
            setProjects(projects.filter(p => p._id !== id));
        } catch (err) {
            console.error('Error deleting project:', err);
            alert('Failed to delete project');
        }
    };

    return (
        <div className="p-10 space-y-10 max-w-[1600px] mx-auto relative h-full flex flex-col">
            <header className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-10">
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">Project_Database // <span className="text-primary">Portfolio</span></h2>
                    <p className="font-mono text-[11px] text-slate-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary animate-pulse rounded-full"></span>
                        LOCAL_STORAGE: SYNCED // STATUS: STANDBY
                    </p>
                </div>
                <div className="flex items-center gap-6">
                    <Link to="/admin/projects/new" className="bg-primary hover:shadow-[0_0_20px_rgba(255,92,0,0.4)] text-black px-6 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 group">
                        <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform">add</span>
                        <span>INITIALIZE_PROJECT</span>
                    </Link>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                {loading ? (
                    <div className="flex justify-center p-12">
                        <div className="animate-spin size-8 border-2 border-primary rounded-full border-t-transparent"></div>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {projects.map(project => (
                            <div key={project._id} className="bg-charcoal/50 border border-white/10 p-4 lg:p-6 rounded-2xl flex items-center justify-between hover:border-primary/50 transition-all group backdrop-blur-sm">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-xl bg-black/50 overflow-hidden border border-white/10 relative">
                                        {project.imageUrl && <img src={getSafeUrl(project.imageUrl)} alt={project.title} className="w-full h-full object-cover" />}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-white tracking-tight">{project.title}</h3>
                                        <div className="flex items-center gap-4 mt-2">
                                            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">{project.category || project.projectType}</p>
                                            <div className="flex items-center gap-2">
                                                <span className={`size-1.5 rounded-full ${project.isPublished ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,44,44,0.5)]'}`}></span>
                                                <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-500">
                                                    {project.isPublished ? 'SYNCED' : 'OFFLINE'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                    <Link to={`/admin/projects/edit/${project._id}`} className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                                        <span className="material-symbols-outlined text-lg">edit</span>
                                    </Link>
                                    <button onClick={() => handleDelete(project._id)} className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all text-red-500/70">
                                        <span className="material-symbols-outlined text-lg">delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                        {projects.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 bg-charcoal/30 border border-dashed border-white/10 rounded-3xl">
                                <span className="material-symbols-outlined text-5xl text-slate-700 mb-4 animate-pulse">folder_off</span>
                                <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">DATABASE_EMPTY // NO_RECORDS_FOUND</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProjects;
