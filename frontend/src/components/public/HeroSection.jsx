import React from 'react';
import { Link } from 'react-router-dom';
import hero_image from '../../assets/hero_profile.jpeg';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex flex-col items-center lg:pb-20 overflow-hidden">
            <div className="lg:absolute m-10 lg:m-0 lg:right-0 lg:top-1/2 lg:-translate-y-1/2 w-[70vw] lg:w-1/2 h-[40vh] lg:h-4/5 opacity-60 lg:opacity-40 mix-blend-screen lg:block">
                <div className="w-full h-full bg-cover bg-center rounded-xl lg:rounded-l-[100px] border-l border-y border-white/10" style={{ backgroundImage: `url(${hero_image})` }}></div>
                {/* "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDB2TCv_UGGn56NwkfuDfv5ZLcUkTI_wpiDp5lPnwjiZ12T2src091mNfe7TXfZqJ-iTULnzPVO38g37TSt63oJKjXGgeBPbvWibEc-WxhdTDeUyTGq3BVpf5b9YDKqOPz-YwCke2P6NtUkljQgJIpdQS1pkt3qlxfa10XhfpJ_WI1vJQh65iE6molpdohGxdiQnDhIPi6cDrqqvgwPApn35IX0fi2VcVd_LNbZl_gII4wbTmM06juuiYAjBxDHSIvLoqAo0AHzFA')" */}
                <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-transparent to-transparent"></div>
            </div>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
                <div className="flex flex-col gap-12 max-w-4xl">
                    <div className="flex items-center gap-4 text-primary font-bold text-xs tracking-[0.4em] uppercase">
                        <span className="w-12 h-[1px] bg-primary"></span>
                        Full Stack Engineer
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-none wide-type">
                        BUILDING<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">SCALABLE</span><br />
                        WEB PRODUCTS
                    </h1>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mt-4">
                        <p className="text-zinc-500 max-w-sm text-base md:text-lg leading-relaxed border-l-2 border-primary/30 pl-6">
                            I build websites and web apps for businesses ready to go digital.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex gap-4">
                                <Link to="/projects" className="size-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group">
                                    <span className="material-symbols-outlined group-hover:rotate-45 transition-transform">arrow_outward</span>
                                </Link>
                                <div className="flex flex-col justify-center">
                                    <span className="text-sm font-display font-bold">View Projects</span>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <a href="https://wa.me/2347051242451" target="_blank" rel="noopener noreferrer" className="size-16 rounded-full border border-white/20 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white hover:border-green-500 flex items-center justify-center transition-all group">
                                    <span className="material-symbols-outlined transition-transform group-hover:scale-110">chat</span>
                                </a>
                                <div className="flex flex-col justify-center">
                                    <span className="text-sm font-display font-bold">WhatsApp Me</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
