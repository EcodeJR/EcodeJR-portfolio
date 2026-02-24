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
        imageUrl: '', // For backward compatibility / hero image
        previewImage: '',
        fullViewImage: '',
        images: [], // Gallery images URLs
        image: null, // File for imageUrl/hero
        previewFile: null,
        fullViewFile: null,
        galleryFiles: [],
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
                        image: null, // Reset file
                        previewFile: null,
                        fullViewFile: null,
                        galleryFiles: []
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
        const { name } = e.target;
        if (name === 'galleryFiles') {
            setFormData(prev => ({ ...prev, galleryFiles: [...prev.galleryFiles, ...Array.from(e.target.files)] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: e.target.files[0] }));
        }
    };

    const removeGalleryFile = (index) => {
        setFormData(prev => ({
            ...prev,
            galleryFiles: prev.galleryFiles.filter((_, i) => i !== index)
        }));
    };

    const removeExistingImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = formData.imageUrl;
            let previewImage = formData.previewImage;
            let fullViewImage = formData.fullViewImage;
            let galleryImages = [...(formData.images || [])];

            const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const hostUrl = apiBaseUrl.replace('/api', '');

            const uploadFile = async (file) => {
                const uploadData = new FormData();
                uploadData.append('image', file);
                const uploadRes = await api.post('/upload', uploadData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                const filePath = uploadRes.data.filePath;
                return filePath.startsWith('http') ? filePath : `${hostUrl}${filePath}`;
            };

            setUploading(true);

            // Handle Main Image Upload
            if (formData.image) {
                imageUrl = await uploadFile(formData.image);
            }

            // Handle Preview Image Upload
            if (formData.previewFile) {
                previewImage = await uploadFile(formData.previewFile);
            }

            // Handle Full View Image Upload
            if (formData.fullViewFile) {
                fullViewImage = await uploadFile(formData.fullViewFile);
            }

            // Handle Gallery Images Upload
            if (formData.galleryFiles && formData.galleryFiles.length > 0) {
                for (const file of formData.galleryFiles) {
                    const url = await uploadFile(file);
                    galleryImages.push(url);
                }
            }

            setUploading(false);

            const payload = {
                ...formData,
                imageUrl,
                previewImage,
                fullViewImage,
                images: galleryImages,
                technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
            };

            // Cleanup file objects before sending
            delete payload.image;
            delete payload.previewFile;
            delete payload.fullViewFile;
            delete payload.galleryFiles;

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
        <div className="min-h-screen bg-background-dark text-white font-display flex items-center justify-center p-4 sm:p-6 relative">
            <div className="absolute inset-0 pointer-events-none opacity-20 digital-grid"></div>

            <div className="w-full max-w-4xl bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden relative z-10 my-8">
                <div className="p-4 sm:p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h2 className="text-lg sm:text-xl font-bold uppercase tracking-widest truncate mr-4">{isEditMode ? 'Edit_Node' : 'Initialize_Node'}</h2>
                    <Link to="/admin/projects" className="text-slate-400 hover:text-white shrink-0"><span className="material-symbols-outlined">close</span></Link>
                </div>

                <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-8">
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
                            <div>
                                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Main Hero Image</label>
                                <input type="file" name="image" onChange={handleFileChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-xs text-slate-400" title="Primary image for the project detail header" />
                                {formData.imageUrl && <p className="text-[10px] text-primary mt-1 truncate">Current: {formData.imageUrl}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Preview Image (Home/Gallery Card)</label>
                                <input type="file" name="previewFile" onChange={handleFileChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-xs text-slate-400" title="Image displayed on the home page and project gallery cards" />
                                {formData.previewImage && <p className="text-[10px] text-primary mt-1 truncate">Current: {formData.previewImage}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Full Case Study View (Long Height Image)</label>
                                <input type="file" name="fullViewFile" onChange={handleFileChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-xs text-slate-400" title="Complete long image for the deep dive section" />
                                {formData.fullViewImage && <p className="text-[10px] text-primary mt-1 truncate">Current: {formData.fullViewImage}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Live URL (Demo)</label>
                                <input name="projectUrl" value={formData.projectUrl} onChange={handleChange} className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none" placeholder="https://example.com" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Repo URL (GitHub)</label>
                                <input name="repoUrl" value={formData.repoUrl} onChange={handleChange} className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm focus:border-primary focus:outline-none" placeholder="https://github.com/..." />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Project Page Archive (Multiple Gallery Images for Recruiters)</label>
                                <input type="file" name="galleryFiles" multiple onChange={handleFileChange} className="w-full bg-black/50 border border-white/20 rounded p-2 text-xs text-slate-400" title="Preview all important pages/screens of this project" />

                                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {/* Existing Gallery Images */}
                                    {formData.images && formData.images.map((url, idx) => (
                                        <div key={`existing-${idx}`} className="relative group aspect-video bg-surface-dark border border-white/10 rounded overflow-hidden">
                                            <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                            <button type="button" onClick={() => removeExistingImage(idx)} className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="material-symbols-outlined text-xs">delete</span>
                                            </button>
                                        </div>
                                    ))}
                                    {/* New Gallery Files */}
                                    {formData.galleryFiles && formData.galleryFiles.map((file, idx) => (
                                        <div key={`new-${idx}`} className="relative group aspect-video bg-primary/10 border border-primary/30 rounded overflow-hidden">
                                            <div className="w-full h-full flex items-center justify-center text-[10px] text-primary font-mono text-center p-2 truncate">
                                                {file.name}
                                            </div>
                                            <button type="button" onClick={() => removeGalleryFile(idx)} className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="material-symbols-outlined text-xs">delete</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
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
                    <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-white/10">
                        <Link to="/admin/projects" className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white text-center sm:text-left">Cancel_Operation</Link>
                        <button type="submit" disabled={loading || uploading} className="px-8 py-4 sm:py-3 bg-primary text-black font-black uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 w-full sm:w-auto">
                            {uploading ? 'UPLOADING...' : loading ? 'SAVING...' : 'EXECUTE_SAVE'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectForm;
