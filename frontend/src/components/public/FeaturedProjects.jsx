import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const FeaturedProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProjects = async () => {
            try {
                const res = await api.get('/portfolio/featured');
                setProjects(res.data.data);
            } catch (err) {
                console.error('Failed to load featured projects', err);
            } finally {
                setLoading(false);
            }
        };
        fetchFeaturedProjects();
    }, []);

    // Show loading state
    if (loading) {
        return (
            <section className="py-32 bg-[#050505]" id="projects">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="mb-20">
                        <h2 className="text-primary font-bold text-xs tracking-[0.5em] uppercase mb-6 text-center">Case_Studies</h2>
                        <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter uppercase text-center leading-none">Deployment<br />Archive</h3>
                    </div>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-primary text-sm font-mono uppercase tracking-widest">Loading_Projects...</div>
                    </div>
                </div>
            </section>
        );
    }

    // If no featured projects, don't render the section
    if (projects.length === 0) {
        return null;
    }

    // Get first project (large card) and remaining projects (smaller cards)
    const [mainProject, ...otherProjects] = projects;

    return (
        <section className="py-32 bg-[#050505]" id="projects">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="mb-20">
                    <h2 className="text-primary font-bold text-xs tracking-[0.5em] uppercase mb-6 text-center">Case_Studies</h2>
                    <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter uppercase text-center leading-none">Deployment<br />Archive</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Main Featured Project */}
                    {mainProject && (
                        <div className="lg:col-span-8 group">
                            <div className="relative tech-card overflow-hidden bg-surface-dark aspect-[16/9] border border-white/10 group-hover:border-primary transition-all">
                                <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: `url('${mainProject.imageUrl}')` }}></div>
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                                    <div>
                                        <div className="flex gap-2 mb-4 flex-wrap">
                                            {mainProject.technologies.slice(0, 3).map((tech, idx) => (
                                                <span key={idx} className={`text-[10px] font-bold px-3 py-1 rounded-full border ${idx === 0 ? 'border-primary text-primary bg-primary/10' : 'border-white/20 text-white bg-white/5'}`}>
                                                    {tech.toUpperCase()}
                                                </span>
                                            ))}
                                        </div>
                                        <h4 className="text-4xl font-display font-bold uppercase tracking-tighter">{mainProject.title}</h4>
                                    </div>
                                    <Link to={`/projects/${mainProject._id}`} className="bg-white text-black size-16 rounded-full flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-all duration-500">
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Secondary Featured Project */}
                    {otherProjects.length > 0 && (
                        <div className="lg:col-span-4 group">
                            <div className="relative tech-card h-full overflow-hidden bg-surface-dark border border-white/10 group-hover:border-primary transition-all p-8 flex flex-col">
                                <div className="aspect-square bg-cover bg-center rounded-2xl mb-8 grayscale group-hover:grayscale-0 transition-all" style={{ backgroundImage: `url('${otherProjects[0].imageUrl}')` }}></div>
                                <div className="mt-auto">
                                    <span className="text-[10px] font-bold text-primary tracking-widest block mb-2 uppercase">{otherProjects[0].category}</span>
                                    <h4 className="text-2xl font-display font-bold uppercase tracking-tighter mb-4">{otherProjects[0].title}</h4>
                                    <p className="text-zinc-500 text-sm mb-6">{otherProjects[0].briefDescription || otherProjects[0].description.substring(0, 60) + '...'}</p>
                                    <Link to={`/projects/${otherProjects[0]._id}`} className="w-full h-[1px] bg-white/10 group-hover:bg-primary transition-all block"></Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Additional Projects Row (if more than 2) */}
                {otherProjects.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                        {otherProjects.slice(1, 4).map((project) => (
                            <Link key={project._id} to={`/projects/${project._id}`} className="group">
                                <div className="relative tech-card overflow-hidden bg-surface-dark border border-white/10 group-hover:border-primary transition-all p-6 flex flex-col h-full">
                                    <div className="aspect-video bg-cover bg-center rounded-xl mb-6 grayscale group-hover:grayscale-0 transition-all" style={{ backgroundImage: `url('${project.imageUrl}')` }}></div>
                                    <span className="text-[10px] font-bold text-primary tracking-widest block mb-2 uppercase">{project.category}</span>
                                    <h4 className="text-xl font-display font-bold uppercase tracking-tighter mb-3">{project.title}</h4>
                                    <p className="text-zinc-500 text-xs mb-4 flex-grow">{project.briefDescription || project.description.substring(0, 80) + '...'}</p>
                                    <div className="w-full h-[1px] bg-white/10 group-hover:bg-primary transition-all"></div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedProjects;
