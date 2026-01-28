import React from 'react';

const About = () => {
    return (
        <div className="flex flex-col min-h-screen bg-background-dark font-display text-slate-100 relative overflow-x-hidden schematic-bg">
            <div className="fixed inset-0 digital-grid pointer-events-none"></div>

            <main className="flex-1 flex flex-col max-w-[1400px] mx-auto w-full px-6 py-10 gap-8 relative z-10">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                        <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Status: Core_Extraction_Running</p>
                    </div>
                    <h1 className="text-white text-5xl font-black leading-tight tracking-tighter uppercase cursor-default">
                        System_Profile_Deep_Scan
                    </h1>
                    <p className="text-slate-500 text-sm font-medium">INDEX: 001 // SOURCE: HUMAN_MODULE_V4 // ACCESS: PUBLIC</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-3 flex flex-col gap-6">
                        <div className="relative">
                            <div className="glitch-portrait w-full aspect-[4/5] rounded border border-primary/30 bg-[#0f0f0f] relative overflow-hidden shadow-[0_0_20px_rgba(242,108,13,0.2)]">
                                <img alt="Developer Portrait" className="w-full h-full object-cover opacity-80 mix-blend-luminosity grayscale contrast-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9nnIJhVZTA2tNi6gcd6LF2obYk_kSJ05IrP1yGnUsKUOSFSWRG3ZmRTZbwppF7cQjOIxcpXHeIVc2x2gHuX80_YHzfSX_sJqz30-Ms586ZkE9BSmhPMWIdp0ajoVhdnU6qvcWmtdddvlJP7SM3f_AOIvGlcO2Y0MGWA9xWb3dFnJKtbfcygjJoL0IPn-9MQgzAIJHexmgxAvyy51hrwCZzdamKhIk0wMmtcSqJ2yNGu49_2-wr28iYe8n7SsM3R8LMFij_rKVjQ" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                                <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoNHYxSDB6IiBmaWxsPSJyZ2JhKDAsIDAsIDAsIDAuMSkiLz48L3N2Zz4=')] pointer-events-none"></div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-[10px] font-mono text-primary uppercase tracking-tighter">Bio_Signal: Active</p>
                                    <h3 className="text-white font-bold tracking-widest">USER_ID: ALEX_HART</h3>
                                </div>
                            </div>
                            <div className="absolute -top-2 -right-2 bg-primary text-background-dark text-[10px] font-bold px-2 py-1 rotate-12">
                                VERIFIED_CORE
                            </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-5 rounded">
                            <h4 className="text-primary text-xs font-black tracking-[0.2em] mb-4 uppercase flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">fingerprint</span>
                                SYSTEM_PROFILE
                            </h4>
                            <p className="text-slate-400 text-xs font-mono leading-relaxed">
                                &gt; Senior Full-Stack Architect specialized in reactive UI environments and high-throughput backend orchestration.
                                <br /><br />
                                &gt; Mission: Bridging the gap between speculative design and technical execution within the digital frontier.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-6 flex flex-col gap-8">
                        <div className="bg-white/5 border border-white/10 p-6 rounded relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                <span className="material-symbols-outlined text-8xl">precision_manufacturing</span>
                            </div>
                            <h3 className="text-white text-sm font-bold tracking-[0.3em] mb-6 uppercase border-l-2 border-primary pl-4">CORE_SPECIFICATIONS</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-mono uppercase">
                                        <span className="text-slate-300">Frontend_Architecture</span>
                                        <span className="text-primary">94%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[94%] shadow-[0_0_10px_rgba(242,108,13,0.5)]"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-mono uppercase">
                                        <span className="text-slate-300">Neural_Logic (AI/ML)</span>
                                        <span className="text-primary">78%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[78%] shadow-[0_0_10px_rgba(242,108,13,0.5)]"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-mono uppercase">
                                        <span className="text-slate-300">Data_Systems</span>
                                        <span className="text-primary">89%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[89%] shadow-[0_0_10px_rgba(242,108,13,0.5)]"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-mono uppercase">
                                        <span className="text-slate-300">DevOps_Synthesis</span>
                                        <span className="text-primary">82%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[82%] shadow-[0_0_10px_rgba(242,108,13,0.5)]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h3 className="text-white text-sm font-bold tracking-[0.3em] uppercase border-l-2 border-primary pl-4">CHRONOLOGICAL_LOG</h3>
                            <div className="flex flex-col gap-8 ml-4">
                                <div className="relative group">
                                    <div className="absolute -left-[25px] top-1 size-4 bg-background-dark border-2 border-primary rounded-full z-10 group-hover:bg-primary transition-colors"></div>
                                    <div className="absolute -left-[17px] top-5 bottom-[-35px] w-[2px] bg-primary/20"></div>
                                    <div className="bg-white/5 border border-white/10 p-5 rounded hover:shadow-[0_0_15px_rgba(242,108,13,0.4)] hover:border-primary/50 transition-all cursor-crosshair">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="text-white text-sm font-bold tracking-widest">LEAD_SYSTEM_ARCHITECT</h4>
                                                <p className="text-primary text-[10px] font-mono">NEURAL_DYNAMICS_INC</p>
                                            </div>
                                            <span className="text-slate-500 text-[10px] font-mono">2021 — PRESENT</span>
                                        </div>
                                        <p className="text-slate-400 text-xs leading-relaxed">Pioneered scalable microservices architecture for real-time data visualization. Managed a team of 12 operators across global nodes.</p>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <div className="absolute -left-[25px] top-1 size-4 bg-background-dark border-2 border-primary rounded-full z-10 group-hover:bg-primary transition-colors"></div>
                                    <div className="absolute -left-[17px] top-5 bottom-[-35px] w-[2px] bg-primary/20"></div>
                                    <div className="bg-white/5 border border-white/10 p-5 rounded hover:shadow-[0_0_15px_rgba(242,108,13,0.4)] hover:border-primary/50 transition-all cursor-crosshair">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="text-white text-sm font-bold tracking-widest">FULL_STACK_INTEGRATOR</h4>
                                                <p className="text-primary text-[10px] font-mono">CYBER_CORE_SOLUTIONS</p>
                                            </div>
                                            <span className="text-slate-500 text-[10px] font-mono">2018 — 2021</span>
                                        </div>
                                        <p className="text-slate-400 text-xs leading-relaxed">Engineered secure payment gateways and encrypted communication protocols using TypeScript and Rust.</p>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <div className="absolute -left-[25px] top-1 size-4 bg-background-dark border-2 border-primary rounded-full z-10 group-hover:bg-primary transition-colors"></div>
                                    <div className="bg-white/5 border border-white/10 p-5 rounded hover:shadow-[0_0_15px_rgba(242,108,13,0.4)] hover:border-primary/50 transition-all cursor-crosshair">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="text-white text-sm font-bold tracking-widest">ACADEMIC_DEPLOYMENT</h4>
                                                <p className="text-primary text-[10px] font-mono">POLYTECHNIC_GRID_UNIV</p>
                                            </div>
                                            <span className="text-slate-500 text-[10px] font-mono">2014 — 2018</span>
                                        </div>
                                        <p className="text-slate-400 text-xs leading-relaxed">BS in Computer Science. Specialized in High-Performance Computing and Distributed Systems.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3 flex flex-col gap-6">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
                            <h4 className="text-white text-xs font-black tracking-[0.2em] mb-6 uppercase text-center">TECH_STACK_MODULE</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { icon: 'javascript', label: 'REACT_JS' },
                                    { icon: 'terminal', label: 'NODE_CORE' },
                                    { icon: 'database', label: 'MONGODB' },
                                    { icon: 'cloud', label: 'AWS_CLOUD' },
                                    { icon: 'settings_ethernet', label: 'PYTHON_OS' },
                                    { icon: 'security', label: 'K8S_ORCH' },
                                ].map((stack) => (
                                    <div key={stack.label} className="flex flex-col items-center justify-center gap-3 p-4 rounded border border-white/10 bg-white/5 hover:border-primary transition-colors group cursor-default">
                                        <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">{stack.icon}</span>
                                        <span className="text-[9px] font-bold tracking-widest text-slate-400">{stack.label}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <div className="flex flex-col gap-4">
                                    <h5 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Auxiliary_Tools</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {['DOCKER', 'REDIS', 'GRAPHQL', 'NEXT.JS', 'POSTGRES'].map((tool) => (
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
                            <h4 className="text-white text-xs font-bold tracking-[0.3em] uppercase">SYSTEM_STATE</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-mono border-b border-white/10 pb-1">
                                    <span className="text-slate-500 uppercase">Capacity:</span>
                                    <span className="text-primary">85%_LOAD</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-mono border-b border-white/10 pb-1">
                                    <span className="text-slate-500 uppercase">Sync:</span>
                                    <span className="text-primary">ACTIVE</span>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-500 font-mono mt-2 leading-relaxed italic">
                                &gt; System.ready? (true)
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default About;

