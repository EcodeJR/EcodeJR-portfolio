import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedProjects = () => {
    // This assumes we'll eventually feed real data here, but for now matching the static HTML design
    return (
        <section className="py-32 bg-[#050505]" id="projects">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="mb-20">
                    <h2 className="text-primary font-bold text-xs tracking-[0.5em] uppercase mb-6 text-center">Case_Studies</h2>
                    <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter uppercase text-center leading-none">Deployment<br />Archive</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 group">
                        <div className="relative tech-card overflow-hidden bg-surface-dark aspect-[16/9] border border-white/10 group-hover:border-primary transition-all">
                            <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA722uZsj18eT32JNat-YqDCEqPyJtt0OXuROfdqi9xDUfoA3_csADh0p5Oc9O3o8sDsPgWXqWr5MmJINN3fsx7dei4zC_jgq-eXTBfgyScevhN0eDjb-exLh1qjlt9whamde24OamqGSrFBDFuR5iByuJbjs2TpzJdURYbR6Ssudj4pG-WMN65hWrypPURWFVCq7PXcOKaD7iQLHWk-NGcRVhNo7GIvTkkvVY0-eX2ybOHvDXvTT3bRUuxCOpCYp65pOl3Yibwpw')" }}></div>
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                                <div>
                                    <div className="flex gap-2 mb-4">
                                        <span className="text-[10px] font-bold px-3 py-1 rounded-full border border-primary text-primary bg-primary/10">SOCKET.IO</span>
                                        <span className="text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 text-white bg-white/5">CHART.JS</span>
                                    </div>
                                    <h4 className="text-4xl font-display font-bold uppercase tracking-tighter">DATA_STREAM_X</h4>
                                </div>
                                <Link to="/projects/1" className="bg-white text-black size-16 rounded-full flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-all duration-500">
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-4 group">
                        <div className="relative tech-card h-full overflow-hidden bg-surface-dark border border-white/10 group-hover:border-primary transition-all p-8 flex flex-col">
                            <div className="aspect-square bg-cover bg-center rounded-2xl mb-8 grayscale group-hover:grayscale-0 transition-all" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCCmRzu1BE4KKtKLFJzfuYX1GAoCnNXxfq3mX7teDlctJO3XjvVcTfgH8leXGgbs04qM3igRKx8EwMJ_kgdHSh5PjBJ078_eLEOZiouN486EODTzsvgnK97apsnPnLQegpLGgrx16ifBSVX9P-o5_1CGWmtuTXHKTppRg2MSzodnMH58u-mhaYqPW5AB9ccnyvA0q7JSGUjDH20CpWWyesBYiBpQ32BDfMq66BETRPA24EPd0Q1UVN2-QkQiDLkIVS8yG-qf6XK5w')" }}></div>
                            <div className="mt-auto">
                                <span className="text-[10px] font-bold text-primary tracking-widest block mb-2 uppercase">Enterprise_SaaS</span>
                                <h4 className="text-2xl font-display font-bold uppercase tracking-tighter mb-4">PLATFORM_ZERO</h4>
                                <p className="text-zinc-500 text-sm mb-6">Scalable RBAC infrastructure for 100k+ users.</p>
                                <div className="w-full h-[1px] bg-white/10 group-hover:bg-primary transition-all"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
