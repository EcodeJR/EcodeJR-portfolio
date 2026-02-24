import React from 'react';
import about_profile from '../assets/about_profile.jpeg';
import my_cv from '../assets/Emmanuel_Dalyop_CV.pdf';

const About = () => {
    return (
        <div className="flex flex-col min-h-screen bg-background-dark font-display text-slate-100 relative overflow-x-hidden schematic-bg">
            <div className="fixed inset-0 digital-grid pointer-events-none"></div>

            <main className="flex-1 flex flex-col max-w-[1400px] mx-auto w-full px-6 py-10 gap-8 relative z-10">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                        <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Hello 👋, <br /> And Welcome to my</p>
                    </div>
                    <h1 className="text-white text-3xl sm:text-5xl font-black leading-tight tracking-tighter uppercase cursor-default">
                        Developer Profile
                    </h1>
                    {/* <p className="text-slate-500 text-sm font-medium">INDEX: 001 || SOURCE: HUMAN_MODULE || ACCESS: PUBLIC</p> */}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-3 flex flex-col gap-6">
                        <div className="relative">
                            <div className="glitch-portrait w-full aspect-[4/5] rounded border border-primary/30 bg-[#0f0f0f] relative overflow-hidden shadow-[0_0_20px_rgba(242,108,13,0.2)]">
                                <img alt="Developer Portrait" className="w-full h-full object-cover opacity-80 mix-blend-luminosity grayscale contrast-125" src={about_profile} />
                                {/* "https://lh3.googleusercontent.com/aida-public/AB6AXuD9nnIJhVZTA2tNi6gcd6LF2obYk_kSJ05IrP1yGnUsKUOSFSWRG3ZmRTZbwppF7cQjOIxcpXHeIVc2x2gHuX80_YHzfSX_sJqz30-Ms586ZkE9BSmhPMWIdp0ajoVhdnU6qvcWmtdddvlJP7SM3f_AOIvGlcO2Y0MGWA9xWb3dFnJKtbfcygjJoL0IPn-9MQgzAIJHexmgxAvyy51hrwCZzdamKhIk0wMmtcSqJ2yNGu49_2-wr28iYe8n7SsM3R8LMFij_rKVjQ" */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                                <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoNHYxSDB6IiBmaWxsPSJyZ2JhKDAsIDAsIDAsIDAuMSkiLz48L3N2Zz4=')] pointer-events-none"></div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-[10px] font-mono text-primary uppercase tracking-tighter">Bio_Signal: Active</p>
                                    <h3 className="text-white font-bold tracking-widest">NAME: EMMANUEL DALYOP</h3>
                                </div>
                            </div>
                            <div className="absolute -top-2 -right-2 bg-primary text-background-dark text-[10px] font-bold px-2 py-1 rotate-12">
                                VERIFIED DEV
                            </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-5 rounded">
                            <h4 className="text-primary text-xs font-black tracking-[0.2em] mb-4 uppercase flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">fingerprint</span>
                                PROFILE
                            </h4>
                            <p className="text-slate-400 text-xs font-mono leading-relaxed mb-6">
                                &gt; I’m a Software Developer who enjoys building things from scratch, turning ideas into working products using MERN stack and any modern technology that fits and works. I focus on performance, scalability, and clean user experience.
                                <br /><br />
                                &gt; Mission: Creating software that solves real problems and delivers real value.
                            </p>

                            <a
                                href={my_cv}
                                download="Emmanuel_Dalyop_CV.pdf"
                                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary text-background-dark font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(242,108,13,0.3)] animate-pulse hover:animate-none"
                            >
                                <span className="material-symbols-outlined text-sm">download</span>
                                DOWNLOAD_CV
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-6 flex flex-col gap-8">
                        <div className="bg-white/5 border border-white/10 p-6 rounded relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                <span className="material-symbols-outlined text-8xl">precision_manufacturing</span>
                            </div>
                            <h3 className="text-white text-sm font-bold tracking-[0.3em] mb-6 uppercase border-l-2 border-primary pl-4">CORE SKILLS</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                                <div className="space-y-2">
                                    <div className="flex flex-col justify-between text-[10px] font-mono uppercase">
                                        <span className="text-slate-300">Frontend Architecture</span>
                                        <span className="text-slate-400">(React, State Management, Performance)</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[100%] shadow-[0_0_10px_rgba(242,108,13,0.5)]"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex flex-col justify-between text-[10px] font-mono uppercase">
                                        <span className="text-slate-300">Backend API Design</span>
                                        <span className="text-slate-400">(Node.js, Express)</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[100%] shadow-[0_0_10px_rgba(242,108,13,0.5)]"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex flex-col justify-between text-[10px] font-mono uppercase">
                                        <span className="text-slate-300">Database Design</span>
                                        <span className="text-slate-400">(MongoDB, Mongoose)</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[100%] shadow-[0_0_10px_rgba(242,108,13,0.5)]"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex flex-col justify-between text-[10px] font-mono uppercase">
                                        <span className="text-slate-300">Real-Time Systems</span>
                                        <span className="text-slate-400">(WebSockets)</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[100%] shadow-[0_0_10px_rgba(242,108,13,0.5)]"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex flex-col justify-between text-[10px] font-mono uppercase">
                                        <span className="text-slate-300">AI Integration</span>
                                        <span className="text-slate-400">(LLM APIs, Image Analysis)</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[100%] shadow-[0_0_10px_rgba(242,108,13,0.5)]"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex flex-col justify-between text-[10px] font-mono uppercase">
                                        <span className="text-slate-300">Authentication & Security</span>
                                        <span className="text-slate-400">(JWT, Role-Based Access)</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[100%] shadow-[0_0_10px_rgba(242,108,13,0.5)]"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex flex-col justify-between text-[10px] font-mono uppercase">
                                        <span className="text-slate-300">Cloud Deployment</span>
                                        <span className="text-slate-400">(Vercel, Production Builds)</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[100%] shadow-[0_0_10px_rgba(242,108,13,0.5)]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h3 className="text-white text-sm font-bold tracking-[0.3em] uppercase border-l-2 border-primary pl-4">Experience</h3>
                            <div className="flex flex-col gap-8 ml-4">
                                <div className="relative group">
                                    <div className="absolute -left-[25px] top-1 size-4 bg-background-dark border-2 border-primary rounded-full z-10 group-hover:bg-primary transition-colors"></div>
                                    <div className="absolute -left-[17px] top-5 bottom-[-35px] w-[2px] bg-primary/20"></div>
                                    <div className="bg-white/5 border border-white/10 p-5 rounded hover:shadow-[0_0_15px_rgba(242,108,13,0.4)] hover:border-primary/50 transition-all cursor-crosshair">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="text-white text-sm font-bold tracking-widest">FREELANCER</h4>
                                                <p className="text-primary text-[10px] font-mono">ECODEJR</p>
                                            </div>
                                            <span className="text-slate-500 text-[10px] font-mono">2021 — PRESENT</span>
                                        </div>
                                        <p className="text-slate-400 text-xs leading-relaxed">I design and build interactive frontend and scalable backend systems for real-time applications. Develop full-stack solutions, APIs, and WebSocket integrations, while leading a small team across multiple projects.</p>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <div className="absolute -left-[25px] top-1 size-4 bg-background-dark border-2 border-primary rounded-full z-10 group-hover:bg-primary transition-colors"></div>
                                    <div className="absolute -left-[17px] top-5 bottom-[-35px] w-[2px] bg-primary/20"></div>
                                    <div className="bg-white/5 border border-white/10 p-5 rounded hover:shadow-[0_0_15px_rgba(242,108,13,0.4)] hover:border-primary/50 transition-all cursor-crosshair">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="text-white text-sm font-bold tracking-widest">FULL_STACK_INTERN</h4>
                                                <p className="text-primary text-[10px] font-mono">SPUTNIK_TECH_HUB</p>
                                            </div>
                                            <span className="text-slate-500 text-[10px] font-mono">2022 — 2023</span>
                                        </div>
                                        <p className="text-slate-400 text-xs leading-relaxed">I built interactive UI/UX and Engineered secure backend systems and communication protocols using JavaScript and Node.js.</p>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <div className="absolute -left-[25px] top-1 size-4 bg-background-dark border-2 border-primary rounded-full z-10 group-hover:bg-primary transition-colors"></div>
                                    <div className="bg-white/5 border border-white/10 p-5 rounded hover:shadow-[0_0_15px_rgba(242,108,13,0.4)] hover:border-primary/50 transition-all cursor-crosshair">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="text-white text-sm font-bold tracking-widest">ACADEMIC_DEPLOYMENT</h4>
                                                <p className="text-primary text-[10px] font-mono">NASARAWA_STATE_UNIVERSITY_KEFFI</p>
                                            </div>
                                            <span className="text-slate-500 text-[10px] font-mono">2023 — 2025</span>
                                        </div>
                                        <p className="text-slate-400 text-xs leading-relaxed">BSc in Computer Science. <br /> Studied High-Performance Computing, Distributed Systems and Web Development.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3 flex flex-col gap-6">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
                            <h4 className="text-white text-xs font-black tracking-[0.2em] mb-6 uppercase text-center">TECH STACK</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { icon: 'javascript', label: 'REACT_JS' },
                                    { icon: 'terminal', label: 'NODE_JS' },
                                    { icon: 'database', label: 'MONGODB' },
                                    { icon: 'cloud', label: 'AWS_CLOUD' },
                                    { icon: 'settings_ethernet', label: 'PYTHON_OS' },
                                    { icon: 'security', label: 'JWT_AUTH' },
                                ].map((stack) => (
                                    <div key={stack.label} className="flex flex-col items-center justify-center gap-3 p-4 rounded border border-white/10 bg-white/5 hover:border-primary transition-colors group cursor-default">
                                        <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">{stack.icon}</span>
                                        <span className="text-[9px] font-bold tracking-widest text-slate-400">{stack.label}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <div className="flex flex-col gap-4">
                                    <h5 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Tools</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {['DOCKER', 'REDIS', 'GRAPHQL', 'NEXT.JS', 'TAILWINDCSS'].map((tool) => (
                                            <span key={tool} className="px-2 py-1 bg-white/5 border border-white/10 text-[9px] text-slate-400 font-mono">{tool}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 rounded border border-primary/20 bg-primary/5 flex flex-col gap-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-20">
                                <span className="material-symbols-outlined text-6xl">memory</span>
                            </div>
                            <h4 className="text-white text-xs font-bold tracking-[0.3em] uppercase">Status</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-mono border-b border-white/10 pb-1">
                                    <span className="text-slate-500 uppercase">Full-time roles:</span>
                                    <span className="text-primary">AVAILABLE</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-mono border-b border-white/10 pb-1">
                                    <span className="text-slate-500 uppercase">Contract roles:</span>
                                    <span className="text-primary">AVAILABLE</span>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-500 font-mono mt-2 leading-relaxed italic">
                                &gt; I am Open to opportunities
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default About;

