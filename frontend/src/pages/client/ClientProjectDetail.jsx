import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import MilestoneTracker from '../../components/client/MilestoneTracker';
import ClientMessages from '../../components/client/ClientMessages';
import ClientFiles from '../../components/client/ClientFiles';
import Loader from '../../components/common/Loader';
import Badge from '../../components/common/Badge';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ClientProjectDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview'); // overview, messages, files

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await api.get(`/projects/${id}`);
                setProject(res.data.data);
            } catch (err) {
                console.error('Error fetching project:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (loading) return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
                <Loader />
            </div>
            <Footer />
        </div>
    );

    if (!project) return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
                <Link to="/client/dashboard" className="text-primary-600 hover:text-primary-700">Back to Dashboard</Link>
            </div>
            <Footer />
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <Link to="/client/dashboard" className="text-gray-500 hover:text-gray-700 text-sm">Dashboard</Link>
                                    <span className="text-gray-300">/</span>
                                    <span className="text-gray-900 text-sm font-medium">{project.projectName}</span>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">{project.projectName}</h1>
                                <p className="text-gray-500">{project.serviceType}</p>
                            </div>
                            <div className="mt-4 md:mt-0 flex flex-col items-end">
                                <Badge
                                    variant={
                                        project.status === 'completed' ? 'success' :
                                            project.status === 'in_progress' ? 'primary' :
                                                project.status === 'on_hold' ? 'warning' : 'secondary'
                                    }
                                    className="text-sm px-3 py-1"
                                >
                                    {project.status.replace('_', ' ')}
                                </Badge>
                                <span className="text-sm text-gray-500 mt-2">
                                    Started: {new Date(project.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Tabs (Mobile only or simplified) */}

                            {/* Project Overview */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Progress & Milestones</h2>
                                <MilestoneTracker
                                    milestones={project.milestones}
                                    currentMilestone={project.currentMilestone}
                                />
                            </div>

                            {/* Messages */}
                            <div className="bg-white rounded-lg shadow-sm p-6 scroll-mt-20" id="messages">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Messages</h2>
                                <ClientMessages projectId={project._id} />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Project Info</h2>
                                <div className="space-y-4 text-sm">
                                    <div>
                                        <p className="text-gray-500">Budget</p>
                                        <p className="font-medium text-gray-900">{project.budget}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Timeline</p>
                                        <p className="font-medium text-gray-900">{project.timeline}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Description</p>
                                        <p className="text-gray-700 mt-1">{project.description}</p>
                                    </div>
                                </div>
                            </div>

                            <ClientFiles projectId={project._id} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ClientProjectDetail;
