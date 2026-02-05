import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../services/api';
import { getSafeUrl } from '../utils/urlHelper';

const ProjectsGallery = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        techStack: [],
        category: null,
        timeline: null,
        sortBy: 'NEWEST_FIRST'
    });

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/portfolio');
                setProjects(res.data.data);
            } catch (err) {
                console.error("Failed to load projects", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Get unique tech stacks and categories for dynamic filtering
    const { availableTech, availableCategories, availableYears } = React.useMemo(() => {
        const techSet = new Set();
        const categorySet = new Set();
        const yearSet = new Set();

        projects.forEach(project => {
            project.technologies?.forEach(tech => techSet.add(tech));
            if (project.projectType) categorySet.add(project.projectType);
            if (project.dateCompleted) {
                yearSet.add(new Date(project.dateCompleted).getFullYear().toString());
            }
        });

        return {
            availableTech: Array.from(techSet).sort(),
            availableCategories: Array.from(categorySet).sort(),
            availableYears: Array.from(yearSet).sort((a, b) => b - a)
        };
    }, [projects]);

    // Calculate counts for each filter option
    const filterCounts = React.useMemo(() => {
        const counts = {
            tech: {},
            category: {},
            timeline: {}
        };

        projects.forEach(project => {
            project.technologies?.forEach(tech => {
                counts.tech[tech] = (counts.tech[tech] || 0) + 1;
            });
            if (project.projectType) {
                counts.category[project.projectType] = (counts.category[project.projectType] || 0) + 1;
            }
            if (project.dateCompleted) {
                const year = new Date(project.dateCompleted).getFullYear().toString();
                counts.timeline[year] = (counts.timeline[year] || 0) + 1;
            }
        });

        return counts;
    }, [projects]);

    // Filtering and Sorting Logic
    const filteredProjects = React.useMemo(() => {
        let result = [...projects];

        // Filter by Tech Stack (OR logic: if project has ANY of the selected techs)
        if (filters.techStack.length > 0) {
            result = result.filter(project =>
                project.technologies?.some(tech => filters.techStack.includes(tech))
            );
        }

        // Filter by Category
        if (filters.category) {
            result = result.filter(project => project.projectType === filters.category);
        }

        // Filter by Timeline
        if (filters.timeline) {
            result = result.filter(project => {
                if (!project.dateCompleted) return false;
                return new Date(project.dateCompleted).getFullYear().toString() === filters.timeline;
            });
        }

        // Sorting
        result.sort((a, b) => {
            if (filters.sortBy === 'NEWEST_FIRST') {
                return new Date(b.dateCompleted || 0) - new Date(a.dateCompleted || 0);
            }
            if (filters.sortBy === 'OLDEST_FIRST') {
                return new Date(a.dateCompleted || 0) - new Date(b.dateCompleted || 0);
            }
            if (filters.sortBy === 'POPULARITY') {
                return (b.views || 0) - (a.views || 0);
            }
            return 0;
        });

        return result;
    }, [projects, filters]);

    const handleTechToggle = (tech) => {
        setFilters(prev => ({
            ...prev,
            techStack: prev.techStack.includes(tech)
                ? prev.techStack.filter(t => t !== tech)
                : [...prev.techStack, tech]
        }));
    };

    const resetFilters = () => {
        setFilters({
            techStack: [],
            category: null,
            timeline: null,
            sortBy: 'NEWEST_FIRST'
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-dark font-display text-slate-100 relative selection:bg-primary selection:text-black">
            <div className="fixed inset-0 digital-grid pointer-events-none"></div>

            <main className="flex-1 max-w-[1440px] mx-auto w-full flex flex-col md:flex-row gap-8 px-6 lg:px-10 py-10 relative z-10">
                <aside className="w-full md:w-72 flex-shrink-0 flex flex-col gap-6 h-fit md:sticky md:top-32">
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-6">
                        <div className="flex flex-col gap-1 mb-6">
                            <h1 className="text-xs font-bold uppercase tracking-[0.3em] text-primary font-mono">Filtering_Module</h1>
                            <div className="h-px w-12 bg-primary/50 mt-1"></div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-4 block">Tech_Stack</span>
                                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                    {availableTech.map(tech => (
                                        <label key={tech} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 cursor-pointer group hover:border-primary/30 transition-all">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={filters.techStack.includes(tech)}
                                                    onChange={() => handleTechToggle(tech)}
                                                    className="hidden"
                                                />
                                                <div className={`w-2 h-2 rounded-full ring-4 ring-primary/20 ${filters.techStack.includes(tech) ? 'bg-primary' : 'bg-white/20'}`}></div>
                                                <span className="text-xs font-mono uppercase tracking-widest text-white">{tech}</span>
                                            </div>
                                            <span className="text-[9px] font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                                                {filterCounts.tech[tech]?.toString().padStart(2, '0')}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-4 block">Category</span>
                                <div className="flex flex-col gap-2">
                                    {availableCategories.map(cat => (
                                        <label
                                            key={cat}
                                            className="flex items-center gap-3 p-2 cursor-pointer group"
                                            onClick={() => setFilters(prev => ({ ...prev, category: prev.category === cat ? null : cat }))}
                                        >
                                            <div className="w-4 h-4 border border-white/20 rounded-sm flex items-center justify-center group-hover:border-primary transition-all">
                                                <div className={`w-2 h-2 bg-primary transition-transform ${filters.category === cat ? 'scale-100' : 'scale-0'}`}></div>
                                            </div>
                                            <span className={`text-xs font-mono uppercase tracking-widest transition-colors ${filters.category === cat ? 'text-primary' : 'text-slate-400 group-hover:text-primary'}`}>
                                                {cat.replace(' ', '_')}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-4 block">Timeline</span>
                                <div className="flex flex-wrap gap-2">
                                    {availableYears.map(year => (
                                        <button
                                            key={year}
                                            onClick={() => setFilters(prev => ({ ...prev, timeline: prev.timeline === year ? null : year }))}
                                            className={`text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded-md transition-all ${filters.timeline === year
                                                    ? 'border border-primary text-primary bg-primary/5'
                                                    : 'border border-white/10 text-slate-500 hover:border-white/30'
                                                }`}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={resetFilters}
                            className="w-full mt-10 text-[10px] font-mono uppercase tracking-[0.2em] py-3 border border-white/10 hover:border-primary hover:text-primary transition-all rounded-xl"
                        >
                            RESET_FILTERS
                        </button>
                    </div>
                </aside>

                <div className="flex-1 flex flex-col gap-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-6 border-b border-white/10 pb-8">
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary font-bold">Directory</span>
                            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter italic">PROJECTS_GALLERY</h2>
                            <p className="font-mono text-[11px] text-slate-500 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary animate-pulse rounded-full"></span>
                                STATUS: {loading ? 'LOADING_OBJECTS' : 'OBJECTS_SYNCED'} ({filteredProjects.length})
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <select
                                    value={filters.sortBy}
                                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                                    className="appearance-none bg-background-dark border border-white/10 text-[10px] font-mono uppercase tracking-[0.2em] text-white rounded-xl px-6 py-3 pr-12 focus:ring-1 focus:ring-primary focus:border-primary w-full sm:w-56"
                                >
                                    <option value="NEWEST_FIRST">SORT:NEWEST_FIRST</option>
                                    <option value="OLDEST_FIRST">SORT:OLDEST_FIRST</option>
                                    <option value="POPULARITY">SORT:POPULARITY</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary text-lg">unfold_more</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="aspect-video bg-white/5 animate-pulse rounded-2xl border border-white/10"></div>
                            ))
                        ) : filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <Link to={`/projects/${project._id}`} key={project._id} className="group bg-module-bg border border-white/10 rounded-2xl overflow-hidden flex flex-col transition-all hover:shadow-[0_0_30px_rgba(255,95,0,0.1)] hover:border-primary/50 cursor-pointer">
                                    <div className="aspect-video w-full overflow-hidden relative border-b border-white/10">
                                        <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: `url('${getSafeUrl(project.imageUrl)}')` }}></div>
                                        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className={`absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border ${project.isPublished ? 'border-primary/30' : 'border-white/10'}`}>
                                            <span className={`text-[10px] font-mono uppercase tracking-[0.2em] ${project.isPublished ? 'text-primary' : 'text-slate-400'}`}>{project.isPublished ? 'LIVE_NODE' : 'OFFLINE'}</span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col gap-4">
                                        <div>
                                            <h3 className="font-bold text-xl uppercase tracking-tighter group-hover:text-primary transition-colors">{project.title}</h3>
                                            <p className="font-mono text-[10px] text-slate-500 mt-1">UUID: #{project._id.slice(-6).toUpperCase()}</p>
                                        </div>
                                        <p className="text-xs text-slate-400 font-mono leading-relaxed line-clamp-2">{project.description}</p>
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {project.technologies?.slice(0, 3).map((tag, index) => (
                                                <span key={index} className="text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-400">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <p className="font-mono text-slate-500 uppercase tracking-widest text-sm">NO_MATCHING_OBJECTS_FOUND</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination - Placeholder for now as it needs backend support or complex client logic */}
                    <div className="flex justify-center items-center gap-4 py-10">
                        <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-white/10 hover:border-primary hover:text-primary transition-all">
                            <span className="material-symbols-outlined">arrow_back_ios_new</span>
                        </button>
                        <div className="flex gap-2">
                            <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary text-black font-bold font-mono">01</button>
                        </div>
                        <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-white/10 hover:border-primary hover:text-primary transition-all">
                            <span className="material-symbols-outlined">arrow_forward_ios</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProjectsGallery;
