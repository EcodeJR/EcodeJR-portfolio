import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-background-dark border-t border-white/5 pt-32 pb-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-3xl font-display font-bold tracking-tighter mb-8 uppercase">ECODEJR</h2>
                        <p className="text-zinc-500 text-sm leading-relaxed mb-10 max-w-xs">
                            Architecting high-end digital experiences through the lens of futuristic aesthetics and performance.
                        </p>
                        <div className="flex gap-4">
                            <a className="size-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all" href="#"><span className="material-symbols-outlined text-lg">terminal</span></a>
                            <a className="size-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all" href="#"><span className="material-symbols-outlined text-lg">share</span></a>
                            <a className="size-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all" href="#"><span className="material-symbols-outlined text-lg">alternate_email</span></a>
                        </div>
                    </div>
                    <div>
                        <h6 className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase mb-8">Directories_</h6>
                        <ul className="flex flex-col gap-6 text-sm font-medium">
                            <li><Link className="hover:text-primary transition-colors uppercase tracking-widest" to="/projects">Projects</Link></li>
                            <li><Link className="hover:text-primary transition-colors uppercase tracking-widest" to="/services">Services</Link></li>
                            <li><Link className="hover:text-primary transition-colors uppercase tracking-widest" to="/about">Architecture</Link></li>
                            <li><Link className="hover:text-primary transition-colors uppercase tracking-widest" to="/contact">Connect</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase mb-8">System_</h6>
                        <ul className="flex flex-col gap-6 text-sm font-medium">
                            <li><Link className="hover:text-primary transition-colors uppercase tracking-widest" to="#">Terms</Link></li>
                            <li><Link className="hover:text-primary transition-colors uppercase tracking-widest" to="#">Privacy</Link></li>
                            <li><Link className="hover:text-primary transition-colors uppercase tracking-widest" to="#">Security</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase mb-8">Newsletter_</h6>
                        <p className="text-zinc-500 text-xs mb-6 uppercase tracking-wider">Join the future of engineering.</p>
                        <div className="relative group">
                            <input className="w-full bg-surface-dark border-white/10 focus:border-primary focus:ring-0 rounded-full px-6 py-4 text-sm transition-all pr-14 outline-none" placeholder="USER@TERMINAL" type="email" />
                            <button className="absolute right-2 top-2 size-10 rounded-full bg-primary flex items-center justify-center hover:bg-white transition-colors">
                                <span className="material-symbols-outlined text-black">send</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-[10px] text-zinc-600 font-bold tracking-widest uppercase">
                        © 2026 ECODEJR. ALL SYSTEMS OPERATIONAL.
                    </div>
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-bold tracking-widest">
                            <span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
                            LATENCY: 14MS
                        </div>
                        <div className="text-[10px] text-zinc-600 font-bold tracking-widest">
                            V.3.1.0_LATEST
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
