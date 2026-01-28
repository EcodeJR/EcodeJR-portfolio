import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Loader from '../../components/common/Loader';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showSuccess, showError } = useNotification();

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

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure? This will delete the project and all related data.')) return;
        try {
            await api.delete(`/projects/${id}`);
            showSuccess('Project deleted');
            setProjects(projects.filter(p => p._id !== id));
        } catch (err) {
            showError('Failed to delete project');
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Client Projects</h1>
                        <Link to="/admin/projects/new">
                            <Button>+ New Project</Button>
                        </Link>
                    </div>

                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <ul className="divide-y divide-gray-200">
                            {projects.map((project) => (
                                <li key={project._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <Link to={`/client/projects/${project._id}`} className="text-lg font-medium text-primary-600 hover:text-primary-700">
                                                {project.projectName}
                                            </Link>
                                            <span className="text-sm text-gray-500">Client: {project.clientId?.name || 'Unknown'}</span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <Badge
                                                variant={
                                                    project.status === 'completed' ? 'success' :
                                                        project.status === 'in_progress' ? 'primary' :
                                                            project.status === 'on_hold' ? 'warning' : 'secondary'
                                                }
                                            >
                                                {project.status.replace('_', ' ')}
                                            </Badge>
                                            <div className="flex space-x-2">
                                                <Link to={`/admin/projects/edit/${project._id}`}>
                                                    <Button size="small" variant="outline">Edit</Button>
                                                </Link>
                                                <Button size="small" variant="danger" onClick={() => handleDelete(project._id)}>Delete</Button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {projects.length === 0 && (
                                <li className="px-4 py-8 text-center text-gray-500">No projects found.</li>
                            )}
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminProjects;
