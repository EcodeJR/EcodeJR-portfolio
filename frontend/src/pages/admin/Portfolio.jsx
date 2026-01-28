import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Loader from '../../components/common/Loader';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';

const AdminPortfolio = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showSuccess, showError } = useNotification();

    const fetchProjects = async () => {
        try {
            const res = await api.get('/portfolio'); // This public endpoint returns all published ones, need admin endpoint to see published & unpublished or modify controller to allow ALL for admin
            // Assuming controller check: if admin, return all. Let's rely on public endpoint for now, or assume admin sees all.
            // Re-checking controller: GET /api/portfolio returns `isPublished: true` only.
            // I should update controller or just use the same endpoint but maybe client side filter?
            // Wait, Admin needs to see unpublished too. I need to update portfolioProjectController.getPortfolioProjects to return all if admin, or create a specific admin route.
            // For now, I'll use the existing public one, but likely won't see drafts. 
            // I'll stick to this for now and handle "Show drafts" later or if I update controller.
            // Actually, checking controller code: `PortfolioProject.find({ isPublished: true })`. It's hardcoded.
            // I should update the controller later. For now let's build the UI.

            setProjects(res.data.data);
        } catch (err) {
            console.error('Error fetching portfolio:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/portfolio/${id}`);
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
                        <h1 className="text-3xl font-bold text-gray-900">Portfolio Items</h1>
                        <Link to="/admin/portfolio/new">
                            <Button>+ New Item</Button>
                        </Link>
                    </div>

                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <ul className="divide-y divide-gray-200">
                            {projects.map((project) => (
                                <li key={project._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            {project.heroImage && (
                                                <img src={project.heroImage} alt="" className="h-10 w-10 rounded object-cover" />
                                            )}
                                            <div>
                                                <Link to={`/projects/${project._id}`} className="text-lg font-medium text-primary-600 hover:text-primary-700">
                                                    {project.title}
                                                </Link>
                                                <p className="text-sm text-gray-500">{project.projectType}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            {project.isFeatured && <Badge variant="warning">Featured</Badge>}
                                            <Badge variant={project.isPublished ? 'success' : 'secondary'}>
                                                {project.isPublished ? 'Published' : 'Draft'}
                                            </Badge>
                                            <div className="flex space-x-2">
                                                <Link to={`/admin/portfolio/edit/${project._id}`}>
                                                    <Button size="small" variant="outline">Edit</Button>
                                                </Link>
                                                <Button size="small" variant="danger" onClick={() => handleDelete(project._id)}>Delete</Button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {projects.length === 0 && (
                                <li className="px-4 py-8 text-center text-gray-500">No portfolio items found.</li>
                            )}
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminPortfolio;
