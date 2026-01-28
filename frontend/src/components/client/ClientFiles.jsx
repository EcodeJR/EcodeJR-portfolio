import { useState, useEffect } from 'react';
import api from '../../services/api';
import Loader from '../common/Loader';
import { useNotification } from '../../context/NotificationContext';

const ClientFiles = ({ projectId }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const { showSuccess, showError } = useNotification();

    const fetchFiles = async () => {
        try {
            const res = await api.get(`/files/${projectId}`);
            setFiles(res.data.data);
        } catch (err) {
            console.error('Error fetching files:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [projectId]);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            showError('File Protocol Violation: Max size 5MB.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', 'requirement');

        setUploading(true);
        try {
            await api.post(`/files/${projectId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            showSuccess('ASSET INGESTED SUCCESSFULLY');
            fetchFiles();
        } catch (err) {
            showError(err.response?.data?.message || 'Ingestion Failed');
        } finally {
            setUploading(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center p-20">
            <Loader />
        </div>
    );

    return (
        <div className="bg-background-dark/30 border border-white/5 rounded-sm overflow-hidden backdrop-blur-md">
            <div className="bg-white/[0.02] px-6 py-4 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-sm">inventory_2</span>
                    <h3 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">Asset_Registry</h3>
                </div>
                <div>
                    <input
                        type="file"
                        id="file-upload-client"
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={uploading}
                    />
                    <label
                        htmlFor="file-upload-client"
                        className={`flex items-center gap-2 px-4 py-2 border border-primary/30 rounded-sm text-primary text-[9px] font-bold uppercase tracking-widest cursor-pointer hover:bg-primary hover:text-black transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        {uploading ? (
                            <>
                                <span className="material-symbols-outlined animate-spin text-sm">refresh</span>
                                <span>Ingesting...</span>
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-sm">upload</span>
                                <span>Inject_Asset</span>
                            </>
                        )}
                    </label>
                </div>
            </div>

            <div className="p-6">
                {files.length > 0 ? (
                    <div className="space-y-4">
                        {files.map((file) => (
                            <div key={file._id} className="group flex items-center justify-between p-4 bg-surface-dark/40 border border-white/5 hover:border-primary/20 transition-all rounded-sm">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 bg-black/40 border border-white/5 flex items-center justify-center text-slate-600 group-hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">description</span>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-bold text-white uppercase tracking-widest truncate max-w-[150px] lg:max-w-none">{file.fileName}</p>
                                        <p className="text-[9px] font-mono text-slate-500 uppercase flex gap-2 items-center mt-1">
                                            <span>{(file.fileSize / 1024).toFixed(1)} KB</span>
                                            <span className="size-0.5 bg-slate-700 rounded-full"></span>
                                            <span>{new Date(file.createdAt).toLocaleDateString()}</span>
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${file.fileUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-slate-500 hover:text-primary transition-all hover:scale-110"
                                    title="Download Asset"
                                >
                                    <span className="material-symbols-outlined text-xl">download</span>
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-slate-700 py-12 flex flex-col items-center gap-4">
                        <span className="material-symbols-outlined text-4xl opacity-10">folder_off</span>
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em]">Registry_is_empty</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientFiles;
