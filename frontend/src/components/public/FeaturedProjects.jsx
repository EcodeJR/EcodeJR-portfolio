import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import Button from '../common/Button';
import Loader from '../common/Loader';
import api from '../../services/api';

const FeaturedProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/portfolio');
                // Filter featured projects and limit to 3
                const featured = res.data.data.filter(p => p.isFeatured).slice(0, 3);
                setProjects(featured);
            } catch (err) {
                console.error('Error fetching featured projects:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Featured Projects
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Check out some of my recent work.
                    </p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))
                    ) : (
                        <div className="col-span-3 text-center text-gray-500">
                            No featured projects found.
                        </div>
                    )}
                </div>

                <div className="mt-12 text-center">
                    <Link to="/projects">
                        <Button variant="outline">View All Projects</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProjects;
