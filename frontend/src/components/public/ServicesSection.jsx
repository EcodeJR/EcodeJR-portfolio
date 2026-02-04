import React from 'react';

const ServicesSection = () => {
    const services = [
        {
            id: '01',
            icon: 'terminal',
            title: 'Full-Stack\nEngineering',
            description: 'Robust architecture using MongoDB, Express, React, and Node.js.'
        },
        {
            id: '02',
            icon: 'layers',
            title: 'UI/UX\nCybernetics',
            description: 'Designing interfaces that bridge the gap between human and machine.'
        },
        {
            id: '03',
            icon: 'database',
            title: 'Data\nStructures',
            description: 'Optimized database schemas for ultra-fast query performance.'
        },
        {
            id: '04',
            icon: 'hub',
            title: 'API\nProtocols',
            description: 'High-frequency RESTful and GraphQL communication layers.'
        }
    ];

    return (
        <section className="py-32 border-t border-white/5" id="services">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-primary font-bold text-xs tracking-[0.5em] uppercase mb-6">Capabilities_</h2>
                        <h3 className="text-3xl md:text-4xl lg:text-6xl font-display font-bold tracking-tighter uppercase leading-none">High-Tech<br />Implementations</h3>
                    </div>
                    <p className="text-zinc-500 text-sm max-w-xs font-medium uppercase tracking-wider">
                        Modular systems designed for speed, security, and absolute visual precision.
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
