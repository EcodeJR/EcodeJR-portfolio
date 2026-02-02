import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import api from '../services/api';
import Loader from '../components/common/Loader';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await api.get(`/portfolio/${id}`);
                setProject(res.data.data);
            } catch (err) {
                console.error("Failed to load project", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-background-dark text-primary"><Loader /></div>;
    if (!project) return <div className="min-h-screen flex items-center justify-center bg-background-dark text-white">PROJECT_NOT_FOUND</div>;


    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white transition-colors duration-300 min-h-screen flex flex-col">
            {/* Grid Overlay */}
            <div className="fixed inset-0 digital-grid pointer-events-none z-0 opacity-5"></div>

            <div className="relative flex-1 w-full flex-col group/design-root overflow-x-hidden z-10">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Hero Section */}
                    <div className="flex flex-1 justify-center z-10 pt-10">
                        <div className="layout-content-container flex flex-col w-full max-w-[1200px] flex-1">
                            <div className="@container px-4 md:px-6">
                                <div className="flex min-h-[520px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-6 pb-12 md:px-12 relative overflow-hidden group border border-white/10"
                                    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(18, 18, 18, 0.9) 100%), url("${project.imageUrl}")` }}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="flex flex-col gap-4 text-left max-w-3xl relative z-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary/20 border border-primary text-primary text-xs font-bold uppercase tracking-widest">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                            </span>
                                            Project_Live
                                        </div>
                                        <h1 className="text-white text-5xl md:text-7xl font-black leading-[1] tracking-tighter uppercase">
                                            {project.title}
                                        </h1>
                                        <p className="text-gray-300 text-base md:text-xl font-light leading-relaxed max-w-2xl">
                                            {project.briefDescription || project.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-4 relative z-10">
                                        {project.projectUrl && (
                                            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="flex min-w-[160px] cursor-pointer items-center justify-center rounded h-12 px-6 bg-primary text-white text-base font-bold uppercase tracking-wider hover:scale-105 transition-transform hover:shadow-[0_0_20px_rgba(255,95,0,0.4)]">
                                                <span className="truncate">Launch Live Demo</span>
                                            </a>
                                        )}
                                        {project.repoUrl && (
                                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex min-w-[160px] cursor-pointer items-center justify-center rounded h-12 px-6 bg-transparent border-2 border-primary text-primary text-base font-bold uppercase tracking-wider hover:bg-primary/10 transition-colors">
                                                <span className="truncate">Source Code</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex flex-1 justify-center py-10 z-10">
                        <div className="layout-content-container flex flex-col md:flex-row w-full max-w-[1200px] gap-8 px-4 md:px-6">
                            {/* Sidebar */}
                            <aside className="w-full md:w-1/4 flex flex-col gap-6">
                                <Link to="/projects" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-xs font-mono uppercase tracking-widest mb-4">
                                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                                    Back to Gallery
                                </Link>
                                <div className="flex flex-col justify-between bg-surface-dark border border-white/10 p-6 rounded-xl backdrop-blur-sm">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col">
                                            <h3 className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-1">Project Metadata</h3>
                                            <p className="text-gray-400 text-sm font-mono">Build_ID: {id || '001'}-STABLE</p>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-sm">memory</span> Tech Stack
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies.map(tag => (
                                                        <span key={tag} className="px-2 py-1 bg-white/5 border border-primary/30 rounded text-[10px] text-primary uppercase font-bold tracking-wider">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 uppercase mb-1 flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-sm">person</span> Role
                                                </p>
                                                <p className="text-white text-sm font-medium">{project.client || 'Internal'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 uppercase mb-1 flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-sm">calendar_today</span> Timeline
                                                </p>
                                                <p className="text-white text-sm font-medium">{new Date(project.createdAt).getFullYear()}</p>
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                                            {project.repoUrl && (
                                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg h-10 w-full bg-white/5 border border-white/10 text-white hover:border-primary transition-colors text-sm font-bold uppercase">
                                                    <span className="material-symbols-outlined text-lg">code</span>
                                                    GitHub Repo
                                                </a>
                                            )}
                                            <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
                                                <span>STATUS:</span>
                                                <span className="text-green-500">{project.isPublished ? 'LIVE' : 'DRAFT'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>

                            {/* Main Content */}
                            <main className="w-full md:w-3/4 flex flex-col gap-10">
                                {/* Section: Problem */}
                                <section className="bg-white/5 border-l-4 border-primary p-6 md:p-8 rounded-r-xl">
                                    <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight tracking-tight uppercase mb-4 flex items-center gap-3">
                                        <span className="text-primary text-sm font-mono">[01]</span> The Problem Statement
                                    </h2>
                                    <p className="text-gray-300 text-lg font-light leading-relaxed">
                                        {project.problemStatement || project.description}
                                    </p>
                                </section>

                                {/* Section: Solution */}
                                <section className="flex flex-col gap-6">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                        <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight uppercase flex items-center gap-3">
                                            <span className="text-primary text-sm font-mono">[02]</span> Approach & Solution
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-4">
                                            <p className="text-gray-400 text-base leading-relaxed">
                                                {project.solution || 'Solution details coming soon...'}
                                            </p>
                                            <div className="p-4 bg-black/50 border border-white/10 rounded-lg font-mono text-sm overflow-hidden group">
                                                <div className="flex justify-between mb-2 text-xs text-gray-600 border-b border-white/10 pb-1">
                                                    <span>renderer.config.js</span>
                                                    <span className="text-primary">CORE_SYSTEM</span>
                                                </div>
                                                <pre className="text-primary/80 overflow-x-auto custom-scrollbar"><code>{`const initRenderer = () => {
  const gpu = new WebGL2({
    antiAlias: true,
    precision: 'highp'
  });
  
  // Glitch vertex shader
  gpu.inject(glitchShader);
  
  return gpu.mount('#canvas-root');
}`}</code></pre>
                                            </div>
                                        </div>
                                        <div className="rounded-xl overflow-hidden border border-white/10 group relative h-64 md:h-auto">
                                            <img alt="Architecture" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" src={project.imageUrl} />
                                            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                                            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 border border-white/10 rounded">
                                                <p className="text-[10px] font-mono text-primary uppercase">Schema_Visualization_042</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Section: Results */}
                                {/* Section: Results (Optional / Remove if not in schema) */}
                                {/* For now keeping hidden as schema doesn't match mock data fully yet */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight uppercase mb-8 flex items-center gap-3">
                                    <span className="text-primary text-sm font-mono">[03]</span> MISSION_RESULTS
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-primary text-3xl font-black font-mono tracking-tighter">{project.results?.latency || '24ms'}</span>
                                        <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Latency_Reduc</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-primary text-3xl font-black font-mono tracking-tighter">{project.results?.fps || '60fps'}</span>
                                        <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Render_Speed</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-primary text-3xl font-black font-mono tracking-tighter">{project.results?.users || '10k+'}</span>
                                        <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Concurrent_Users</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-primary text-3xl font-black font-mono tracking-tighter">{project.results?.audit || 'A+'}</span>
                                        <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Design_Audit</span>
                                    </div>
                                </div>
                                <p className="mt-8 text-gray-400 font-light italic leading-relaxed border-t border-white/10 pt-6">
                                    "The level of detail and technical precision in the Synthetic OS interface sets a new benchmark for our internal tools architecture." — System Administrator
                                </p>

                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
