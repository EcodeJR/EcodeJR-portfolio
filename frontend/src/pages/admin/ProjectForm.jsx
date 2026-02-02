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
        briefDescription: '',
        fullDescription: '',
        problemStatement: '',
        solution: '',
        client: '',
        imageUrl: '',
        image: null,
        technologies: '',
        projectUrl: '',
        repoUrl: '',
        displayOrder: 0,
        isPublished: false,
        isFeatured: false,
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
                console.log("Starting image upload...");
                setUploading(true);
                const uploadData = new FormData();
                uploadData.append('image', formData.image);

                const uploadRes = await api.post('/upload', uploadData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                console.log("Upload successful:", uploadRes.data);

                // Safe URL construction
                const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const hostUrl = apiBaseUrl.replace('/api', '');
                imageUrl = `${hostUrl}${uploadRes.data.filePath}`;

                console.log("Constructed Image URL:", imageUrl);
                setUploading(false);
            }

            console.log("Preparing payload for save...");

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

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-mono text-primary uppercase tracking-[0.3em] border-b border-white/10 pb-2">Basic_Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Project Title *</label>
                                <input name="title" value={formData.title} onChange={handleChange} required className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none" placeholder="NEURAL_NET_V1" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Category *</label>
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
                    </div>

                    {/* Descriptions */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-mono text-primary uppercase tracking-[0.3em] border-b border-white/10 pb-2">Project_Descriptions</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Brief Description (For cards, max 200 chars)</label>
                                <textarea name="briefDescription" value={formData.briefDescription} onChange={handleChange} maxLength="200" rows="2" className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none resize-none" placeholder="Short project summary for listings..." />
                                <p className="text-[10px] text-slate-600 mt-1">{formData.briefDescription.length}/200 characters</p>
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Description (General overview)</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none resize-none" placeholder="General project description..." />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Problem Statement (Detail page section)</label>
                                <textarea name="problemStatement" value={formData.problemStatement} onChange={handleChange} rows="4" className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none resize-none" placeholder="What problem does this project solve? What challenges were addressed?" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Solution & Approach (Detail page section)</label>
                                <textarea name="solution" value={formData.solution} onChange={handleChange} rows="4" className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none resize-none" placeholder="How was the problem solved? What approach was taken?" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Full Description (Comprehensive details)</label>
                                <textarea name="fullDescription" value={formData.fullDescription} onChange={handleChange} rows="5" className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none resize-none" placeholder="Comprehensive project overview with all technical details..." />
                            </div>
                        </div>
                    </div>

                    {/* Media & URLs */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-mono text-primary uppercase tracking-[0.3em] border-b border-white/10 pb-2">Media_&_Links</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Project Image</label>
                                <input type="file" onChange={handleFileChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-xs text-slate-400" />
                                {formData.imageUrl && <p className="text-[10px] text-primary mt-1 truncate">Current: {formData.imageUrl}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Live URL</label>
                                <input name="projectUrl" value={formData.projectUrl} onChange={handleChange} className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none" placeholder="https://example.com" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Repo URL</label>
                                <input name="repoUrl" value={formData.repoUrl} onChange={handleChange} className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none" placeholder="https://github.com/..." />
                            </div>
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-mono text-primary uppercase tracking-[0.3em] border-b border-white/10 pb-2">Performance_Metrics</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Latency</label>
                                <input name="latency" value={formData.results?.latency} onChange={handleNestedChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-xs focus:border-primary focus:outline-none" placeholder="24ms" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">FPS</label>
                                <input name="fps" value={formData.results?.fps} onChange={handleNestedChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-xs focus:border-primary focus:outline-none" placeholder="60fps" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Users</label>
                                <input name="users" value={formData.results?.users} onChange={handleNestedChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-xs focus:border-primary focus:outline-none" placeholder="10k+" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Audit</label>
                                <input name="audit" value={formData.results?.audit} onChange={handleNestedChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-xs focus:border-primary focus:outline-none" placeholder="A+" />
                            </div>
                        </div>
                    </div>

                    {/* Settings */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-mono text-primary uppercase tracking-[0.3em] border-b border-white/10 pb-2">Visibility_Settings</h3>
                        <div className="flex flex-wrap gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} className="form-checkbox bg-transparent border-primary/50 text-primary rounded" />
                                <span className="text-sm font-mono uppercase">Publish_to_Gallery</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="form-checkbox bg-transparent border-primary/50 text-primary rounded" />
                                <span className="text-sm font-mono uppercase">Feature_on_Homepage</span>
                            </label>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
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
