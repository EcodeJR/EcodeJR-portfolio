import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Badge from '../components/common/Badge';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';
import api from '../services/api';
import { FaGithub, FaExternalLinkAlt, FaCalendar } from 'react-icons/fa';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await api.get(`/portfolio/${id}`);
                setProject(res.data.data);
            } catch (err) {
                setError('Project not found');
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

    if (error) return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">{error}</h2>
                    <Link to="/projects" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
                        &larr; Back to Projects
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Link to="/projects" className="text-primary-600 hover:text-primary-700 font-medium">
                            &larr; Back to Projects
                        </Link>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Hero Image */}
                        <div className="h-64 sm:h-96 w-full relative">
                            <img
                                src={project.heroImage || 'https://via.placeholder.com/1200x600?text=Project+Hero'}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                            {project.isFeatured && (
                                <div className="absolute top-4 right-4">
                                    <Badge variant="warning">Featured</Badge>
                                </div>
                            )}
                        </div>

                        <div className="p-8">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
                                    <div className="flex items-center mt-2 text-gray-500">
                                        <span className="mr-4">{project.projectType}</span>
                                        {project.dateCompleted && (
                                            <span className="flex items-center text-sm">
                                                <FaCalendar className="mr-1" />
                                                {new Date(project.dateCompleted).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    {project.liveDemoUrl && (
                                        <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                                            <Button>
                                                <FaExternalLinkAlt className="mr-2" /> Live Demo
                                            </Button>
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline">
                                                <FaGithub className="mr-2" /> Code
                                            </Button>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Technologies */}
                            <div className="mb-8">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                    Technologies Used
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map(tech => (
                                        <Badge key={tech} variant="primary">{tech}</Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="prose max-w-none text-gray-700">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Overview</h3>
                                <p className="mb-6 whitespace-pre-line">{project.fullDescription}</p>

                                {project.problemStatement && (
                                    <>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">The Problem</h3>
                                        <p className="mb-6 whitespace-pre-line">{project.problemStatement}</p>
                                    </>
                                )}

                                {project.solution && (
                                    <>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">The Solution</h3>
                                        <p className="mb-6 whitespace-pre-line">{project.solution}</p>
                                    </>
                                )}
                            </div>

                            {/* Image Gallery would go here */}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProjectDetail;
