import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';

const Services = () => {
    const services = [
        {
            title: "NEURAL_WEB_DEV",
            icon: "language",
            description: "High-performance web applications built on modern frameworks. We engineer digital experiences that are faster, smarter, and scalable.",
            features: ["React / Next.js Architecture", "Progressive Web Apps (PWA)", "WebGL Integrations"]
        },
        {
            title: "UI/UX_PROTOCOLS",
            icon: "design_services",
            description: "Designing intuitive interfaces for human-machine interaction. We focus on usability, accessibility, and futuristic aesthetics.",
            features: ["Wireframing & Prototyping", "Design Systems", "User Research Analysis"]
        },
        {
            title: "SYSTEM_BACKEND",
            icon: "dns",
            description: "Robust server-side solutions. We build secure, efficient APIs and database structures to power your applications.",
            features: ["Node.js / Python API", "Database Design (SQL/NoSQL)", "Cloud Infrastructure (AWS/Azure)"]
        },
        {
            title: "MOBILE_LINK",
            icon: "smartphone",
            description: "Native and cross-platform mobile applications. extending your reach to every device in the network.",
            features: ["React Native Development", "iOS & Android", "Offline Capabilities"]
        },
        {
            title: "CYBER_SECURITY",
            icon: "security",
            description: "Fortifying your digital assets against threats. We implement best practices in security to protect your data.",
            features: ["Vulnerability Assessment", "Secure Coding Practices", "Data Encryption"]
        },
        {
            title: "AI_INTEGRATION",
            icon: "psychology",
            description: "Embedding intelligence into your software. From chatbots to data analysis, we leverage AI to enhance functionality.",
            features: ["Machine Learning Models", "NLP Integration", "Predictive Analytics"]
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background-dark font-display text-white selection:bg-primary/30">
            {/* <Navbar /> */}

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative py-24 px-6 overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(249,107,6,0.15),transparent_70%)]"></div>
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                    </div>

                    <div className="max-w-7xl mx-auto text-center relative z-10">
                        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            <span className="text-xs font-mono text-primary uppercase tracking-widest">System Capabilities Online</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00f0ff] glitch-text" data-text="Expertise">Expertise</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Deploying advanced digital solutions. We specialize in architecting the future of the web, one line of code at a time.
                        </p>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-20 px-6 relative">
                    <div className="absolute inset-0 digital-grid opacity-20 pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <div key={index} className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:transform hover:-translate-y-1">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="w-14 h-14 mb-6 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                            <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                                        </div>
                                        <h3 className="text-xl font-bold uppercase tracking-wider mb-3 group-hover:text-primary transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-400 mb-6 text-sm leading-relaxed flex-grow">
                                            {service.description}
                                        </p>
                                        <ul className="space-y-2 mb-8">
                                            {service.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center gap-3 text-sm text-slate-300 font-mono">
                                                    <span className="text-primary text-xs">{`>>>`}</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-auto pt-6 border-t border-white/5">
                                            <Link to="/contact" className="inline-flex items-center text-sm font-bold text-primary hover:text-white transition-colors uppercase tracking-widest gap-2">
                                                Initialize <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section className="py-24 px-6 bg-surface-dark border-t border-white/5 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">Development <span className="text-primary">Lifecycle</span></h2>
                            <p className="text-slate-400">Our systematic approach to deploying digital assets.</p>
                        </div>

                        <div className="relative">
                            {/* Connector Line */}
                            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {[
                                    { step: "01", title: "Discovery", desc: "Analyzing requirements and defining system architecture." },
                                    { step: "02", title: "Design", desc: "Creating high-fidelity prototypes and user interfaces." },
                                    { step: "03", title: "Development", desc: "Coding robust front-end and back-end modules." },
                                    { step: "04", title: "Deployment", desc: "Testing, optimization, and final launch sequence." }
                                ].map((phase, i) => (
                                    <div key={i} className="relative z-10 flex flex-col items-center text-center">
                                        <div className="w-16 h-16 rounded-full bg-background-dark border-2 border-primary text-primary font-black text-xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(249,107,6,0.3)]">
                                            {phase.step}
                                        </div>
                                        <h3 className="text-lg font-bold uppercase tracking-wider mb-2">{phase.title}</h3>
                                        <p className="text-sm text-slate-400 font-mono">{phase.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 px-6 relative">
                    <div className="max-w-5xl mx-auto p-12 rounded-3xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-20">
                            <span className="material-symbols-outlined text-9xl text-primary">rocket_launch</span>
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">Ready to <span className="text-primary">Upgrade?</span></h2>
                            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                                Initiate your project with us. We are standing by to process your request.
                            </p>
                            <Link to="/contact">
                                <Button size="lg" className="shadow-[0_0_30px_rgba(249,107,6,0.4)] hover:shadow-[0_0_50px_rgba(249,107,6,0.6)]">
                                    Start Project Sequence
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            {/* 
            <Footer /> */}
        </div>
    );
};

export default Services;
