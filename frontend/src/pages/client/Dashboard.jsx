import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ClientProjectCard from '../../components/client/ClientProjectCard';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

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
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
                <Loader />
            </div>
            <Footer />
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                            <p className="mt-1 text-gray-500">Welcome back, {user?.name}</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <Link to="/contact">
                                <Button>Start New Project</Button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats Overview could go here */}

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Projects</h2>
                        {projects.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {projects.map((project) => (
                                    <ClientProjectCard key={project._id} project={project} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow p-6 text-center">
                                <p className="text-gray-500 mb-4">You don't have any active projects yet.</p>
                                <Link to="/contact">
                                    <Button variant="outline">Request a Quote</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ClientDashboard;
