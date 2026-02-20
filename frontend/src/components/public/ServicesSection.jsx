import React from 'react';

const ServicesSection = () => {
    const services = [
        {
            id: '01',
            icon: 'terminal',
            title: 'Full-Stack\nEngineering',
            description: 'Building scalable web applications using MongoDB, Express, React, and Node.js.'
        },
        {
            id: '02',
            icon: 'layers',
            title: 'Frontend\nArchitecture',
            description: 'Building responsive, accessible, and high-performance user interfaces with modern frameworks.'
        },
        {
            id: '03',
            icon: 'database',
            title: 'Backend\nSystems',
            description: 'Designing scalable APIs and efficient database schemas for reliable performance.'
        },
        {
            id: '04',
            icon: 'hub',
            title: 'Real-Time\n& AI Integration',
            description: 'Developing interactive real-time applications and AI-driven features.'
        }
    ];

    return (
        <section className="py-10 lg:py-32 border-t border-white/5" id="services">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="w-full md:max-w-xl">
                        <h2 className="text-primary font-bold text-xs tracking-[0.5em] uppercase mb-6">Capabilities</h2>
                        <h3 className="text-2xl md:text-4xl lg:text-6xl font-display font-bold tracking-tighter uppercase leading-none">What I Do</h3>
                    </div>
                    <p className="text-zinc-500 text-sm max-w-xs font-medium uppercase tracking-wider">
                        I enjoy building scalable, user-focused web applications that are fast, secure, and built to last.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {services.map((service) => (
                        <div key={service.id} className="group tech-card bg-surface-dark p-6 sm:p-10 border border-white/5 hover:border-primary/50 transition-all flex flex-col min-h-[300px] md:h-[400px]">
                            <div className="flex justify-between items-start mb-auto">
                                <span className="text-zinc-600 font-display text-xs">{service.id}//</span>
                                <span className="material-symbols-outlined text-primary text-3xl opacity-50 group-hover:opacity-100 transition-opacity">{service.icon}</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-display font-bold mb-4 uppercase tracking-tight whitespace-pre-line">{service.title}</h4>
                                <p className="text-zinc-500 text-sm leading-relaxed mb-6">{service.description}</p>
                                <div className="h-[1px] w-full bg-white/10 group-hover:bg-primary transition-colors"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
