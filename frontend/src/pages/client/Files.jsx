import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const Files = () => {
    const { user } = useAuth();
    const [project, setProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const res = await api.get('/projects');
                const allProjects = res.data.data;
                setProjects(allProjects);

                if (allProjects.length > 0) {
                    // Try to keep currently selected project or default to newest
                    const mostRecent = allProjects[0];
                    setProject(mostRecent);
                }
            } catch (err) {
                console.error('Error fetching project assets:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjectData();
    }, []);

    const handleProjectChange = async (projectId) => {
        const selected = projects.find(p => p._id === projectId);
        if (selected) {
            setLoading(true);
            try {
                const res = await api.get(`/projects/${selected._id}`);
                setProject(res.data.data);
            } catch (err) {
                console.error('Error switching project:', err);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || !project) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            await api.post(`/projects/${project._id}/files`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // Refresh project data
            const res = await api.get(`/projects/${project._id}`);
            setProject(res.data.data);
            alert('File uploaded successfully to Project Vault.');
        } catch (err) {
            console.error('Upload failed:', err);
            alert(err.response?.data?.message || 'Failed to upload asset');
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteFile = async (file) => {
        if (!window.confirm(`Are you sure you want to delete "${file.name}"? This action cannot be undone.`)) return;

        try {
            if (file.system === 2) {
                // System 2 - Standalone File document
                await api.delete(`/files/${file._id}`);
            } else {
                // System 1 - Embedded in ClientProject
                await api.delete(`/projects/${project._id}/files/${file._id}`);
            }

            // Refresh project data
            const res = await api.get(`/projects/${project._id}`);
            setProject(res.data.data);
            alert('File deleted successfully.');
        } catch (err) {
            console.error('Deletion failed:', err);
            alert(err.response?.data?.message || 'Failed to delete asset');
        }
    };

    if (loading) return <div className="p-20 text-center font-mono text-primary animate-pulse">VAULT_SYNCHRONIZING...</div>;

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
                    <div className="flex flex-col gap-1">
                        <p className="font-mono text-xs text-slate-500 uppercase tracking-widest">Active_Node: <span className="text-primary/80">{project?.projectName || 'NONE'}</span></p>
                        {project?._id && <p className="font-mono text-[8px] text-slate-700 uppercase">SYS_UID: {project._id}</p>}
                    </div>
                </div>

                {projects.length > 1 && (
                    <div className="flex flex-col gap-2 min-w-[200px]">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Switch_Channel</label>
                        <select
                            value={project?._id || ''}
                            onChange={(e) => handleProjectChange(e.target.value)}
                            className="bg-black/40 border border-white/10 text-primary font-mono text-xs p-3 rounded-lg outline-none focus:border-primary/50 transition-all uppercase"
                        >
                            {projects.map(p => (
                                <option key={p._id} value={p._id} className="bg-surface-dark">
                                    {p.projectName} ({p._id.slice(-6)})
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </header>

            {/* Storage Status */}
            <div className="tech-border flex flex-col gap-6 p-8 mb-12 bg-surface-dark/50 backdrop-blur-sm">
                <div className="flex flex-wrap gap-8 justify-between items-end">
                    <div>
                        <h3 className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-2 font-mono">Neural Assets Loaded</h3>
                        <p className="text-3xl font-black tracking-tighter text-white uppercase italic">{project?.files?.length || 0} Assets <span className="text-slate-600 text-lg font-normal">Stored</span></p>
                    </div>
                    <div className="flex flex-col items-end">
                        <p className="text-green-500 text-[10px] font-mono uppercase tracking-widest mb-1 shadow-[0_0_10px_rgba(34,197,94,0.2)]">System Status: Optimal</p>
                        <p className="text-slate-500 text-[9px] font-mono uppercase">Sync_Cycle: Active</p>
                    </div>
                </div>
                <div className="rounded-full bg-white/5 h-1.5 overflow-hidden border border-white/5">
                    <div className="h-full rounded-full bg-primary shadow-[0_0_15px_rgba(249,107,6,0.5)] w-full"></div>
                </div>
            </div>

            {/* Upload Area */}
            <div className="mb-12 group">
                <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                />
                <div
                    onClick={() => fileInputRef.current.click()}
                    className={`flex flex-col items-center justify-center border-2 border-dashed ${uploading ? 'border-primary animate-pulse transition-all' : 'border-white/10 hover:border-primary/50'} transition-all duration-500 rounded-3xl p-16 bg-white/[0.02] cursor-pointer relative overflow-hidden`}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="size-20 rounded-full border border-white/5 flex items-center justify-center mb-6 group-hover:border-primary/30 transition-all group-hover:scale-110">
                        <span className="material-symbols-outlined text-4xl text-primary transition-transform">
                            {uploading ? 'sync' : 'cloud_upload'}
                        </span>
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-[0.4em] text-white">
                        {uploading ? 'UPLOADING_BYTE_STREAM...' : 'Initialize_Upload'}
                    </h3>
                    <p className="text-slate-500 text-[10px] font-mono uppercase mt-3 tracking-widest italic">Target node: {project?.projectName || 'Select a project'}</p>
                </div>
            </div>

            {/* Project Assets */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-primary">data_object</span>
                        <h2 className="text-2xl font-black leading-tight tracking-tighter uppercase italic text-white underline decoration-primary/20 underline-offset-8">Project_Assets</h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {project?.files?.map((file, i) => (
                        <div key={file._id} className="group tech-border p-6 bg-surface-dark/30 hover:bg-primary/5 transition-all cursor-crosshair relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2">
                                {(user?.role === 'admin' || file.uploadedBy === user?._id) && (
                                    <button
                                        onClick={() => handleDeleteFile(file)}
                                        className="size-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-white hover:text-red-500 transition-colors"
                                        title="Delete Asset"
                                    >
                                        <span className="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                )}
                                <a
                                    href={file.system === 2
                                        ? `${import.meta.env.VITE_API_URL?.replace('/api', '')}${file.fileUrl}`
                                        : `${import.meta.env.VITE_API_URL}/upload/raw/${file.mediaId}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="size-8 rounded-full bg-primary text-black flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                                    download={file.name}
                                >
                                    <span className="material-symbols-outlined text-sm">download</span>
                                </a>
                            </div>
                            <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-black/40 border border-white/5 flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-5xl text-slate-800 group-hover:text-primary transition-colors duration-500">
                                    {file.name.endsWith('pdf') ? 'picture_as_pdf' :
                                        file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? 'image' :
                                            file.name.endsWith('zip') ? 'folder_zip' : 'description'}
                                </span>
                            </div>
                            <div>
                                <h4 className="text-white text-xs font-bold truncate tracking-widest uppercase mb-2 group-hover:text-primary transition-colors">{file.name}</h4>
                                <div className="flex justify-between items-center">
                                    <p className="text-slate-500 text-[9px] font-mono tracking-tighter uppercase">
                                        {(file.size / 1024).toFixed(1)} KB // {new Date(file.uploadedAt).toLocaleDateString().replace(/\//g, '.')}
                                        {file.system === 2 && <span className="ml-2 text-cyan-500/50">[LEGACY]</span>}
                                    </p>
                                    <span className="text-[8px] font-mono text-primary/60 border border-primary/20 px-1 rounded uppercase">Stored</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {(!project || project.files.length === 0) && (
                        <div className="col-span-full py-20 text-center font-mono text-[10px] text-slate-600 uppercase tracking-[0.4em]">
                            Registry_Clear // No_Assets_Detected
                        </div>
                    )}
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
