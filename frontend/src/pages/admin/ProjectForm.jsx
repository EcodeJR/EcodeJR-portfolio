import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../services/api';

const ProjectForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        client: '',
        imageUrl: '',
        image: null,
        technologies: '',
        projectUrl: '',
        repoUrl: '',
        displayOrder: 0,
        isPublished: false,
        results: {
            latency: '24ms',
            fps: '60fps',
            users: '10k+',
            audit: 'A+'
        }
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            const fetchProject = async () => {
                try {
                    const res = await api.get(`/portfolio/${id}`);
                    const p = res.data.data;
                    setFormData({
                        ...p,
                        technologies: p.technologies.join(', '), // Convert array to string
                        image: null // Reset file
                    });
                } catch (err) {
                    console.error("Error fetching project", err);
                }
            };
            fetchProject();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleNestedChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            results: {
                ...prev.results,
                [name]: value
            }
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = formData.imageUrl;

            // Handle Image Upload
            if (formData.image) {
                setUploading(true);
                const uploadData = new FormData();
                uploadData.append('image', formData.image);
                const uploadRes = await api.post('/upload', uploadData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                imageUrl = import.meta.env.VITE_API_URL.replace('/api', '') + uploadRes.data.filePath; // Construct full URL if needed, or store relative
                // Usually better to store relative path or full URL depending on implementation. 
                // server.js serves /uploads statically. 
                // If VITE_API_URL is http://localhost:5000/api, backend is at port 5000.
                // file path is /uploads/filename. 
                // So full URL is http://localhost:5000/uploads/filename
                // Let's assume we store the relative path or the full URL. 
                // Ideally, store relative and prepend base URL in frontend. 
                // But for simplicity, let's prepend the base URL here if we can.
                const backendUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
                imageUrl = `${backendUrl}${uploadRes.data.filePath}`;
                setUploading(false);
            }

            const payload = {
                ...formData,
                imageUrl,
                technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
            };
            delete payload.image; // Don't send file object in JSON

            if (isEditMode) {
                await api.put(`/portfolio/${id}`, payload);
            } else {
                await api.post('/portfolio', payload);
            }

            navigate('/admin/projects');
        } catch (err) {
            console.error('Error saving project:', err);
            alert('Failed to save project');
        } finally {
            setLoading(false);
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-dark text-white font-display flex items-center justify-center p-6 relative">
            <div className="absolute inset-0 pointer-events-none opacity-20 digital-grid"></div>

            <div className="w-full max-w-4xl bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden relative z-10">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h2 className="text-xl font-bold uppercase tracking-widest">{isEditMode ? 'Edit_Node' : 'Initialize_Node'}</h2>
                    <Link to="/admin/projects" className="text-slate-400 hover:text-white"><span className="material-symbols-outlined">close</span></Link>
                </div>

                <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Project Title</label>
                            <input name="title" value={formData.title} onChange={handleChange} required className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none" placeholder="NEURAL_NET_V1" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Category</label>
                            <input name="category" value={formData.category} onChange={handleChange} required className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none" placeholder="WEB_DEV" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Client</label>
                            <input name="client" value={formData.client} onChange={handleChange} className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none" placeholder="CYBER_CORP" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Technologies (Comma separated)</label>
                            <input name="technologies" value={formData.technologies} onChange={handleChange} className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none" placeholder="REACT, NODE, AI" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows="5" className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none resize-none" placeholder="System architecture details..." />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Project Image</label>
                            <input type="file" onChange={handleFileChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-xs text-slate-400" />
                            {formData.imageUrl && <p className="text-[10px] text-primary mt-1 truncate">Current: {formData.imageUrl}</p>}
                        </div>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} className="form-checkbox bg-transparent border-primary/50 text-primary rounded" />
                                <span className="text-sm font-mono uppercase">Publish_to_Feed</span>
                            </label>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-white/10">
                            <p className="text-[10px] font-mono text-primary uppercase">Performance_Metrics</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Latency</label>
                                    <input name="latency" value={formData.results?.latency} onChange={handleNestedChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-xs focus:border-primary focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">FPS</label>
                                    <input name="fps" value={formData.results?.fps} onChange={handleNestedChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-xs focus:border-primary focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Users</label>
                                    <input name="users" value={formData.results?.users} onChange={handleNestedChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-xs focus:border-primary focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Audit</label>
                                    <input name="audit" value={formData.results?.audit} onChange={handleNestedChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-xs focus:border-primary focus:outline-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                        <div>
                            <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Live URL</label>
                            <input name="projectUrl" value={formData.projectUrl} onChange={handleChange} className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none" placeholder="https://example.com" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Repo URL</label>
                            <input name="repoUrl" value={formData.repoUrl} onChange={handleChange} className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none" placeholder="https://github.com/..." />
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-4 border-t border-white/10 pt-6">
                        <Link to="/admin/projects" className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white">Cancel</Link>
                        <button type="submit" disabled={loading || uploading} className="px-8 py-3 bg-primary text-black font-black uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50">
                            {uploading ? 'Uploading...' : loading ? 'Saving...' : 'Execute_Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectForm;
