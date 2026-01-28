import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProjectCard from '../components/public/ProjectCard';
import Loader from '../components/common/Loader';
import api from '../services/api';

const ProjectsGallery = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'E-commerce', 'SaaS', 'Landing Page', 'Portfolio', 'Mobile App', 'Other'];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/portfolio');
                setProjects(res.data.data);
                setFilteredProjects(res.data.data);
            } catch (err) {
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (filter === 'All') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(p => p.projectType === filter));
        }
    }, [filter, projects]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                            My Portfolio
                        </h1>
                        <p className="mt-4 text-xl text-gray-500">
                            A collection of my best work and side projects.
                        </p>
                    </div>

                    {/* Filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === category
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <Loader />
                    ) : (
                        <>
                            {filteredProjects.length > 0 ? (
                                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {filteredProjects.map((project) => (
                                        <ProjectCard key={project._id} project={project} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 text-lg">
                                    No projects found in this category.
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProjectsGallery;
