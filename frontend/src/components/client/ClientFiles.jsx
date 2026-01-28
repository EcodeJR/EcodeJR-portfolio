import { useState, useEffect } from 'react';
import api from '../../services/api';
import Loader from '../common/Loader';
import Button from '../common/Button';
import { useNotification } from '../../context/NotificationContext';
import { FaFile, FaDownload, FaUpload } from 'react-icons/fa';

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

        // Check size limit (e.g., 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showError('File is too large. Max size is 5MB.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', 'requirement'); // Default category

        setUploading(true);
        try {
            await api.post(`/files/${projectId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            showSuccess('File uploaded successfully');
            fetchFiles();
        } catch (err) {
            showError(err.response?.data?.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="bg-white rounded-lg border overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                <h3 className="font-medium text-gray-700">Project Files</h3>
                <div>
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={uploading}
                    />
                    <label htmlFor="file-upload">
                        <Button
                            size="small"
                            variant="outline"
                            as="span"
                            isLoading={uploading}
                            onClick={(e) => uploading && e.preventDefault()}
                        >
                            <FaUpload className="mr-2" /> Upload
                        </Button>
                    </label>
                </div>
            </div>

            <div className="p-4">
                {files.length > 0 ? (
                    <div className="space-y-3">
                        {files.map((file) => (
                            <div key={file._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                <div className="flex items-center">
                                    <FaFile className="text-gray-400 mr-3 h-5 w-5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 truncate max-w-xs">{file.fileName}</p>
                                        <p className="text-xs text-gray-500">
                                            {(file.fileSize / 1024).toFixed(1)} KB • {new Date(file.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${file.fileUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-600 hover:text-primary-800 p-2"
                                >
                                    <FaDownload />
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-6">
                        No files uploaded yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientFiles;
