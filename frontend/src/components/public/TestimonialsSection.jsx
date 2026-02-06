import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const FALLBACK_TESTIMONIALS = [
    {
        clientName: "ALEX RIVERA",
        clientCompany: "NEXATECH",
        clientRole: "CTO",
        review: "The architecture implemented was flawless. We saw a 40% improvement in load times and zero downtime during peaks.",
        rating: 5,
        clientPhoto: "https://lh3.googleusercontent.com/aida-public/AB6AXuBggzdwXyaimPI7aMA6ar9u8a5-DsdDWztxyFb9yNgyX1-XopEZ79lYdNDLLTMksnN2f0PyzMbibHKK_voLVexV1bQQZObwgNtB_w47Tl5o32QBaOoSpFJMai_yzy3LyHirmLho76gO5EaJU7Yp_gNDJv83UygUeRE2GKkcltVU13NrnCILhglMmtqKZdlxS7GjsAT5hznJef_1gjRqaqkBN4KtfHtKvaE4c96ikyUxfshRyf39sypyuE8pSIg0APRDnIhmCj48Qw"
    },
    {
        clientName: "SARAH JENKINS",
        clientCompany: "STREAMLINE",
        clientRole: "PRODUCT LEAD",
        review: "Incredible attention to detail. Users have consistently praised the dashboard for its intuitiveness and speed.",
        rating: 5,
        clientPhoto: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYBW5cYmaS2KbfWiTbZNJLg5znypFp8a-MTk3xhSno-dXiIXAPg9FOK_lMDU2EYf_1Wq0FrJ_qUJEsd_2h_A2D_yf6x7UbcN-2ovJrDTAPBy17DWzGE-VaXVQARfP-P7CwT9O51Bkbfdy_G2HTZQS6t9P7SRsv4TRF_qCiVAQ8Gcv6zNRvmEkkx2xAQBvzoVEaqz3m1uMheaRqNOwv_qdHbk2wjb7VoLp14E0fCAua1rkhBXsW4i47caV0rgE4c96ikyUxfshRyf39sypyuE8pSIg0APRDnIhmCj48Qw"
    }
];

const TestimonialsSection = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await api.get('/testimonials');
                if (res.data.success && res.data.data.length > 0) {
                    setTestimonials(res.data.data);
                } else {
                    setTestimonials(FALLBACK_TESTIMONIALS);
                }
            } catch (err) {
                console.error('Error fetching testimonials:', err);
                setTestimonials(FALLBACK_TESTIMONIALS);
            }
        };
        fetchTestimonials();
    }, []);

    return (
        <section className="py-32 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display font-black text-white/5 whitespace-nowrap">FEEDBACK_LOOP</div>
            </div>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {testimonials.map((t, index) => (
                        <div key={index} className="tech-card bg-surface-dark border border-white/10 p-6 sm:p-12 relative overflow-hidden group h-full flex flex-col">
                            <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                                <span className="material-symbols-outlined text-3xl sm:text-4xl text-primary">format_quote</span>
                            </div>
                            <div className="flex text-primary mb-6 sm:mb-8 gap-1">
                                {[...Array(t.rating || 5)].map((_, i) => (
                                    <span key={i} className="material-symbols-outlined text-sm">star</span>
                                ))}
                            </div>
                            <p className="text-base sm:text-xl font-medium leading-relaxed mb-6 sm:mb-10 text-zinc-300 flex-grow">
                                "{t.review}"
                            </p>
                            <div className="flex items-center gap-4 mt-auto">
                                <div className="size-14 rounded-full border-2 border-primary p-0.5 shrink-0">
                                    <div
                                        className="w-full h-full rounded-full bg-cover bg-center bg-slate-800"
                                        style={t.clientPhoto ? { backgroundImage: `url('${t.clientPhoto}')` } : {}}
                                    >
                                        {!t.clientPhoto && <span className="w-full h-full flex items-center justify-center text-primary material-symbols-outlined">person</span>}
                                    </div>
                                </div>
                                <div>
                                    <h5 className="font-display font-bold text-sm tracking-tight uppercase">{t.clientName}</h5>
                                    <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">
                                        {t.clientRole || 'PARTNER'} // {t.clientCompany || 'ECODEJR'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
