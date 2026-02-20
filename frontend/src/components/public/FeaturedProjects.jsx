import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { getSafeUrl } from '../../utils/urlHelper';

const FeaturedProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

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

    const nextProject = () => {
        if (otherProjects.length <= 1) return;
        setCurrentIndex((prev) => (prev + 1) % otherProjects.length);
    };

    const prevProject = () => {
        if (otherProjects.length <= 1) return;
        setCurrentIndex((prev) => (prev - 1 + otherProjects.length) % otherProjects.length);
    };

    // Show loading state
    if (loading) {
        return (
            <section className="py-10 lg:py-32 bg-[#050505]" id="projects">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="mb-20">
                        <h2 className="text-primary font-bold text-xs tracking-[0.5em] uppercase mb-6 text-center">Case Studies</h2>
                        <h3 className="text-2xl md:text-5xl lg:text-7xl font-display font-bold tracking-tighter uppercase text-center leading-none">Deployed<br />Projects</h3>
                    </div>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-primary text-sm font-mono uppercase tracking-widest">Loading_Projects...</div>
                    </div>
                </div>
            </section>
        );
    }

    if (projects.length === 0) {
        return null;
    }

    const [mainProject, ...otherProjects] = projects;
    const currentSideProject = otherProjects[currentIndex];

    return (
        <section className="py-10 lg:py-32 bg-[#050505]" id="projects">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="mb-20">
                    <h2 className="text-primary font-bold text-xs tracking-[0.5em] uppercase mb-6 text-center">Case Studies</h2>
                    <h3 className="text-2xl md:text-7xl font-display font-bold tracking-tighter uppercase text-center leading-none">Deployed<br />Projects</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Main Featured Project */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {mainProject && (
                            <div className="group">
                                <div className="relative tech-card overflow-hidden bg-surface-dark aspect-[4/5] sm:aspect-[16/9] border border-white/10 group-hover:border-primary transition-all">
                                    <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: `url('${mainProject.imageUrl}')` }}></div>
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                                    <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex justify-between items-end">
                                        <div>
                                            <div className="flex gap-2 mb-4 flex-wrap">
                                                {mainProject.technologies.slice(0, 3).map((tech, idx) => (
                                                    <span key={idx} className={`text-[10px] font-bold px-3 py-1 rounded-full border ${idx === 0 ? 'border-primary text-primary bg-primary/10' : 'border-white/20 text-white bg-white/5'}`}>
                                                        {tech.toUpperCase()}
                                                    </span>
                                                ))}
                                            </div>
                                            <h4 className="text-xl sm:text-2xl md:text-4xl font-display font-bold uppercase tracking-tighter">{mainProject.title}</h4>
                                        </div>
                                        <Link to={`/projects/${mainProject._id}`} className="bg-white text-black size-12 sm:size-16 rounded-full flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-all duration-500">
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Arrows for Side Card */}
                        {otherProjects.length > 1 && (
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={prevProject}
                                    className="size-12 rounded-full border border-white/10 hover:border-primary hover:text-primary flex items-center justify-center transition-all bg-white/5 backdrop-blur-sm"
                                >
                                    <span className="material-symbols-outlined text-xl">west</span>
                                </button>
                                <button
                                    onClick={nextProject}
                                    className="size-12 rounded-full border border-white/10 hover:border-primary hover:text-primary flex items-center justify-center transition-all bg-white/5 backdrop-blur-sm"
                                >
                                    <span className="material-symbols-outlined text-xl">east</span>
                                </button>
                                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-2">
                                    {currentIndex + 1} / {otherProjects.length}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Secondary Featured Project (Dynamic Slider) */}
                    <div className="lg:col-span-4 transition-all duration-500">
                        {currentSideProject ? (
                            <div className="relative tech-card h-full overflow-hidden bg-surface-dark border border-white/10 hover:border-primary transition-all p-8 flex flex-col group animate-in fade-in slide-in-from-right-4 duration-500" key={currentSideProject._id}>
                                <div className="aspect-square bg-cover bg-center rounded-2xl mb-8 grayscale group-hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: `url('${getSafeUrl(currentSideProject.imageUrl)}')` }}></div>
                                <div className="mt-auto">
                                    <span className="text-[10px] font-bold text-primary tracking-widest block mb-2 uppercase">{currentSideProject.category}</span>
                                    <h4 className="text-2xl font-display font-bold uppercase tracking-tighter mb-4">{currentSideProject.title}</h4>
                                    <p className="text-zinc-500 text-sm mb-6 leading-relaxed line-clamp-3">{currentSideProject.briefDescription || currentSideProject.description}</p>
                                    <Link to={`/projects/${currentSideProject._id}`} className="inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest hover:text-primary transition-colors">
                                        View Project <span className="material-symbols-outlined text-sm">trending_flat</span>
                                    </Link>
                                    <div className="mt-6 w-full h-[1px] bg-white/10 group-hover:bg-primary transition-all"></div>
                                </div>
                            </div>
                        ) : (
                            <div className="tech-card h-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-zinc-600 font-mono text-xs uppercase tracking-widest">
                                End of Archive
                            </div>
                        )}
                    </div>
                </div>

                {/* View More Button */}
                <div className="mt-20 flex justify-center">
                    <Link
                        to="/projects"
                        className="group relative px-12 py-4 bg-white/5 border border-white/10 rounded-full overflow-hidden transition-all hover:border-primary/50"
                    >
                        <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.4em] text-white group-hover:text-primary transition-colors">
                            View All Projects
                        </span>
                        <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
