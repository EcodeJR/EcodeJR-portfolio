import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';

const Footer = () => {
    return (
        <footer className="bg-background-dark border-t border-white/5 pt-20 md:pt-32 pb-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-32">
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-3xl font-display font-bold tracking-tighter mb-8 uppercase">EMMANUEL DALYOP (ECODEJR)</h2>
                        <p className="text-zinc-500 text-sm leading-relaxed mb-10 max-w-xs">
                            Architecting high-end digital experiences through the lens of futuristic aesthetics and performance.
                        </p>
                        <a href="https://wa.me/2347051242451" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500 hover:text-white rounded-full transition-all font-bold tracking-widest text-xs uppercase mb-10">
                            <FaWhatsapp className="text-lg" /> Message on WhatsApp
                        </a>
                        <div className="flex gap-4">
                            <a target="_blank" href="https://www.linkedin.com/in/emmanuel-dalyop-5b6a1b178?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="size-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all"><FaLinkedin className="text-lg" /></a>
                            <a target="_blank" href="https://github.com/EcodeJR" className="size-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all"><FaGithub className="text-lg" /></a>
                            <a target="_blank" href="https://twitter.com/EcodeJR" className="size-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all"><FaTwitter className="text-lg" /></a>
                        </div>
                    </div>
                    <div>
                        <h6 className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase mb-8">Directories_</h6>
                        <ul className="flex flex-col gap-6 text-sm font-medium">
                            <li><Link className="hover:text-primary transition-colors uppercase tracking-widest" to="/projects">Projects</Link></li>
                            <li><Link className="hover:text-primary transition-colors uppercase tracking-widest" to="/services">Services</Link></li>
                            <li><Link className="hover:text-primary transition-colors uppercase tracking-widest" to="/about">About Me</Link></li>
                            <li><Link className="hover:text-primary transition-colors uppercase tracking-widest" to="/contact">Connect</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase mb-8">System_</h6>
                        <ul className="flex flex-col gap-6 text-sm font-medium">
                            <li><Link className="hover:text-primary transition-colors uppercase tracking-widest" to="/contact">Terms</Link></li>
                            <li><Link className="hover:text-primary transition-colors uppercase tracking-widest" to="/contact">Privacy</Link></li>
                            <li><Link className="hover:text-primary transition-colors uppercase tracking-widest" to="/contact">Security</Link></li>
                        </ul>
                    </div>
                    {/* <div>
                        <h6 className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase mb-8">Newsletter_</h6>
                        <p className="text-zinc-500 text-xs mb-6 uppercase tracking-wider">Join the future of engineering.</p>
                        <div className="relative group">
                            <input className="w-full bg-surface-dark border-white/10 focus:border-primary focus:ring-0 rounded-full px-6 py-4 text-sm transition-all pr-14 outline-none" placeholder="USER@TERMINAL" type="email" />
                            <button className="absolute right-2 top-2 size-10 rounded-full bg-primary flex items-center justify-center hover:bg-white transition-colors">
                                <IoSend className="text-black" />
                            </button>
                        </div>
                    </div> */}
                </div>
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-8">
                    <div className="text-[10px] text-zinc-600 font-bold tracking-widest uppercase">
                        Made with ❤ by EMMANUEL DALYOP.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
