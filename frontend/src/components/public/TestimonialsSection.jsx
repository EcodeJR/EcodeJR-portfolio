import React from 'react';

const TestimonialsSection = () => {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display font-black text-white/5 whitespace-nowrap">FEEDBACK_LOOP</div>
            </div>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="tech-card bg-surface-dark border border-white/10 p-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-4xl text-primary">format_quote</span>
                        </div>
                        <div className="flex text-primary mb-8 gap-1">
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span className="material-symbols-outlined text-sm">star</span>
                        </div>
                        <p className="text-xl font-medium leading-relaxed mb-10 text-zinc-300">
                            "The architecture implemented was flawless. We saw a 40% improvement in load times and zero downtime during peaks."
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="size-14 rounded-full border-2 border-primary p-0.5">
                                <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBggzdwXyaimPI7aMA6ar9u8a5-DsdDWztxyFb9yNgyX1-XopEZ79lYdNDLLTMksnN2f0PyzMbibHKK_voLVexV1bQQZObwgNtB_w47Tl5o32QBaOoSpFJMai_yzy3LyHirmLho76gO5EaJU7Yp_gNDJv83UygUeRE2GKkcltVU13NrnCILhglMmtqKZdlxS7GjsAT5hznJef_1gjRqaqkBN4KtfHtKvaE4c96ikyUxfshRyf39sypyuE8pSIg0APRDnIhmCj48Qw')" }}></div>
                            </div>
                            <div>
                                <h5 className="font-display font-bold text-sm tracking-tight">ALEX RIVERA</h5>
                                <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">CTO // NEXATECH</p>
                            </div>
                        </div>
                    </div>
                    <div className="tech-card bg-surface-dark border border-white/10 p-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-4xl text-primary">format_quote</span>
                        </div>
                        <div className="flex text-primary mb-8 gap-1">
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span className="material-symbols-outlined text-sm">star</span>
                        </div>
                        <p className="text-xl font-medium leading-relaxed mb-10 text-zinc-300">
                            "Incredible attention to detail. Users have consistently praised the dashboard for its intuitiveness and speed."
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="size-14 rounded-full border-2 border-primary p-0.5">
                                <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYBW5cYmaS2KbfWiTbZNJLg5znypFp8a-MTk3xhSno-dXiIXAPg9FOK_lMDU2EYf_1Wq0FrJ_qUJEsd_2h_A2D_yf6x7UbcN-2ovJrDTAPBy17DWzGE-VaXVQARfP-P7CwT9O51Bkbfdy_G2HTZQS6t9P7SRsv4TRF_qCiVAQ8Gcv6zNRvmEkkx2xAQBvzoVEaqz3m1uMheaRqNOwv_qdHbk2wjb7VoLp14E0fCAua1rkhBXsW4i47caV0rgE4c96ikyUxfshRyf39sypyuE8pSIg0APRDnIhmCj48Qw')" }}></div>
                            </div>
                            <div>
                                <h5 className="font-display font-bold text-sm tracking-tight">SARAH JENKINS</h5>
                                <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">PRODUCT LEAD // STREAMLINE</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
