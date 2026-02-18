import React, { useState } from 'react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';

const Contact = () => {
    const [activeTab, setActiveTab] = useState('project');
    const [loading, setLoading] = useState(false);
    const { showSuccess, showError } = useNotification();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        budget: '',
        deadline: 'IMMEDIATE_EXECUTION',
        description: '',
        services: [],
        subject: '',
        preferredDateTime: '',
        urgencyLevel: 'medium'
    });

    const handleServiceToggle = (service) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter(s => s !== service)
                : [...prev.services, service]
        }));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        try {
            const payload = {
                inquiryType: activeTab,
                name: formData.name,
                email: formData.email,
                description: formData.description
            };

            if (activeTab === 'project') {
                payload.serviceInterested = formData.services.join(', ') || 'General Project';
                payload.budgetRange = formData.budget;
                payload.preferredTimeline = formData.deadline;
            } else if (activeTab === 'consultation') {
                payload.subject = formData.subject;
                payload.preferredDateTime = formData.preferredDateTime;
            } else if (activeTab === 'urgent') {
                payload.subject = formData.subject;
                payload.urgencyLevel = formData.urgencyLevel;
            }

            await api.post('/inquiries', payload);
            showSuccess('Transmission Sent: Packet ID 88AF-091C');
            setFormData({
                name: '',
                email: '',
                budget: '',
                deadline: 'IMMEDIATE_EXECUTION',
                description: '',
                services: [],
                subject: '',
                preferredDateTime: '',
                urgencyLevel: 'medium'
            });
        } catch (err) {
            showError('Transmission Failed: Security Layer Reject');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 relative overflow-x-hidden">
            <div className="fixed inset-0 digital-grid pointer-events-none"></div>

            <main className="flex-1 flex flex-col max-w-[1200px] mx-auto w-full px-6 py-10 gap-10 relative z-10">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                        <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Status: Available for Inquiry</p>
                    </div>
                    <h1 className="text-white text-2xl sm:text-5xl font-black leading-tight tracking-tighter uppercase cursor-default">
                        Initiate Contact
                    </h1>
                    {/* <p className="text-slate-500 text-sm font-medium">ESTABLISHING SECURE CONNECTION...</p> */}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-primary text-[10px] sm:text-sm font-bold tracking-widest border-l-2 border-primary pl-3">CONTACT LINKS</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex flex-col gap-3 rounded border border-white/10 bg-white/5 p-4 hover:border-primary/50 transition-colors group cursor-pointer">
                                    <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">mail</span>
                                    <a href="mailto:emmanueldcode@gmail.com" target="_blank" rel="noopener noreferrer" className="flex flex-col">
                                        <h2 className="text-white text-xs font-bold tracking-widest">EMAIL</h2>
                                        <p className="text-slate-400 text-[10px] font-mono mt-1">emmanueldcode@gmail.com</p>
                                    </a>
                                </div>
                                <div className="flex flex-col gap-3 rounded border border-white/10 bg-white/5 p-4 hover:border-primary/50 transition-colors group cursor-pointer">
                                    <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">code</span>
                                    <a href="https://github.com/EcodeJR" target="_blank" rel="noopener noreferrer" className="flex flex-col">
                                        <h2 className="text-white text-xs font-bold tracking-widest">GITHUB</h2>
                                        <p className="text-slate-400 text-[10px] font-mono mt-1">EcodeJR</p>
                                    </a>
                                </div>
                                <div className="flex flex-col gap-3 rounded border border-white/10 bg-white/5 p-4 hover:border-primary/50 transition-colors group cursor-pointer">
                                    <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">hub</span>
                                    <a href="https://www.linkedin.com/in/emmanuel-dalyop-5b6a1b178?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="flex flex-col">
                                        <h2 className="text-white text-xs font-bold tracking-widest">LINKEDIN</h2>
                                        <p className="text-slate-400 text-[10px] font-mono mt-1">Emmanuel Dalyop</p>
                                    </a>
                                </div>
                                <div className="flex flex-col gap-3 rounded border border-white/10 bg-white/5 p-4 hover:border-primary/50 transition-colors group cursor-pointer">
                                    <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">location_on</span>
                                    <a href="https://maps.app.goo.gl/pMSxeYsAn3hTuXSx5" target="_blank" rel="noopener noreferrer" className="flex flex-col">
                                        <h2 className="text-white text-xs font-bold tracking-widest">LOCATION</h2>
                                        <p className="text-slate-400 text-[10px] font-mono mt-1">Abuja-Keffi Express Way, Nasarawa State, Nigeria</p>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 p-6 rounded border border-primary/20 bg-primary/5 flex flex-col gap-4 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-2 opacity-20">
                                <span className="material-symbols-outlined text-6xl">memory</span>
                            </div>
                            <h4 className="text-white text-xs font-bold tracking-[0.3em] uppercase">Available for:</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-mono border-b border-white/10 pb-1">
                                    <span className="text-slate-500 uppercase">Full-Stack Roles</span>
                                    <span className="text-primary">Yes</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-mono border-b border-white/10 pb-1">
                                    <span className="text-slate-500 uppercase">Frontend Roles</span>
                                    <span className="text-primary">Yes</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-mono border-b border-white/10 pb-1">
                                    <span className="text-slate-500 uppercase">Backend Roles</span>
                                    <span className="text-primary">Yes</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-mono border-b border-white/10 pb-1">
                                    <span className="text-slate-500 uppercase">Remote Work</span>
                                    <span className="text-primary">Yes</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-mono border-b border-white/10 pb-1">
                                    <span className="text-slate-500 uppercase">Technical Collaboration</span>
                                    <span className="text-primary">Yes</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-mono border-b border-white/10 pb-1">
                                    <span className="text-slate-500 uppercase">Freelance</span>
                                    <span className="text-primary">Yes</span>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-500 font-mono mt-2 leading-relaxed">
                                &gt; Let’s build scalable, impactful products together.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-lg p-8 relative">
                        <div className="flex border-b border-white/10 mb-8 overflow-x-auto">
                            {[
                                { id: 'project', label: 'FREELANCE PROJECT' },
                                { id: 'consultation', label: 'CONTACT' },
                                { id: 'urgent', label: 'URGENT' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-3 border-b-2 text-xs font-bold tracking-widest whitespace-nowrap transition-colors ${activeTab === tab.id
                                        ? 'border-primary text-white bg-primary/5'
                                        : 'border-transparent text-slate-500 hover:text-slate-300'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                            {activeTab === 'project' && (
                                <div className="flex flex-col gap-4 animate-in fade-in duration-300">
                                    <label className="text-white text-xs font-black tracking-widest uppercase flex flex-col md:flex-row item-start md:items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">project type</span>
                                        Select Project Type
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {['FULL-STACK', 'FRONTEND', 'BACKEND', 'SECURITY'].map((service) => (
                                            <label key={service} className="cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    className="hidden peer"
                                                    checked={formData.services.includes(service)}
                                                    onChange={() => handleServiceToggle(service)}
                                                />
                                                <div className="px-4 py-2 rounded border border-white/10 bg-white/5 text-[10px] font-bold tracking-widest text-slate-400 peer-checked:border-primary peer-checked:text-primary peer-checked:bg-primary/10 transition-all group-hover:border-white/30">
                                                    {service}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {(activeTab === 'consultation' || activeTab === 'urgent') && (
                                <div className="flex flex-col gap-2 animate-in fade-in duration-300">
                                    <label className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">
                                        {activeTab === 'consultation' ? 'Contact Subject' : 'Title'}
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-primary focus:ring-0 placeholder:text-slate-700 transition-colors"
                                        placeholder={activeTab === 'consultation' ? 'E.G., ARCHITECTURE_REVIEW' : 'E.G., CRITICAL_SYSTEM_FAILURE'}
                                        required
                                    />
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-primary focus:ring-0 placeholder:text-slate-700 transition-colors"
                                        placeholder="ENTER_NAME"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-primary focus:ring-0 placeholder:text-slate-700 transition-colors"
                                        placeholder="ENTER_SECURE_EMAIL"
                                        required
                                    />
                                </div>
                            </div>

                            {activeTab === 'project' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">Project Budget (USD)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold text-xs">$</span>
                                            <input
                                                type="number"
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border border-white/10 rounded pl-8 pr-4 py-3 text-sm text-white focus:border-primary focus:ring-0 placeholder:text-slate-700 transition-colors"
                                                placeholder="5,000+"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">Deadline</label>
                                        <select
                                            name="deadline"
                                            value={formData.deadline}
                                            onChange={handleChange}
                                            className="w-full bg-background-dark border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-primary focus:ring-0 transition-colors cursor-pointer"
                                        >
                                            <option value="IMMEDIATE_EXECUTION">IMMEDIATE_PROJECT</option>
                                            <option value="1-3_MONTHS">1-3_MONTHS</option>
                                            <option value="LONG_TERM_ORBIT">LONG_TERM_PROJECT</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'consultation' && (
                                <div className="flex flex-col gap-2 animate-in fade-in duration-300">
                                    <label className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">Preferred Date and Time</label>
                                    <input
                                        type="text"
                                        name="preferredDateTime"
                                        value={formData.preferredDateTime}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-primary focus:ring-0 placeholder:text-slate-700 transition-colors"
                                        placeholder="E.G., MONDAY, 2PM UTC"
                                        required={activeTab === 'consultation'}
                                    />
                                </div>
                            )}

                            {activeTab === 'urgent' && (
                                <div className="flex flex-col gap-2 animate-in fade-in duration-300">
                                    <label className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">Urgency_Level</label>
                                    <select
                                        name="urgencyLevel"
                                        value={formData.urgencyLevel}
                                        onChange={handleChange}
                                        className="w-full bg-background-dark border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-primary focus:ring-0 transition-colors cursor-pointer"
                                    >
                                        <option value="low">LOW_PRIORITY</option>
                                        <option value="medium">MEDIUM_STABILITY</option>
                                        <option value="high">HIGH_ALTITUDE_URGENCY</option>
                                        <option value="critical">CRITICAL_SYSTEM_FAILURE</option>
                                    </select>
                                </div>
                            )}

                            <div className="flex flex-col gap-2">
                                <label className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">
                                    {activeTab === 'project' ? 'Project Description' : activeTab === 'consultation' ? 'Message' : 'Summary'}
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-primary focus:ring-0 placeholder:text-slate-700 transition-colors resize-none"
                                    placeholder={activeTab === 'project' ? 'DESCRIBE_PROJECT_GOALS_AND_TECHNICAL_REQUIREMENTS...' : activeTab === 'consultation' ? 'DETAIL_THE_TOPICS_YOU_WISH_TO_DISCUSS...' : 'SPECIFY_THE_URGENT_PROBLEM_AND_REQUIRED_REMEDIATION...'}
                                    rows="4"
                                    required
                                ></textarea>
                            </div>

                            <div className="flex flex-col gap-4 mt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative w-full overflow-hidden bg-primary text-sm md:text-2xl text-white py-4 rounded font-black tracking-[0.4em] uppercase hover:shadow-[0_0_30px_rgba(242,108,13,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        <span className={`material-symbols-outlined ${loading ? 'animate-spin' : 'animate-pulse'}`}>
                                            {loading ? 'sync' : 'sensors'}
                                        </span>
                                        {loading ? 'TRANSMITTING...' : 'SEND'}
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
                                </button>
                                <div className="flex items-center justify-between px-2">
                                    <div className="flex gap-1">
                                        <div className="size-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                        <div className="size-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="size-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                    {/* <p className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">
                                        Transmission_Protocol: E2EE_ACTIVE // Packet_ID: 88AF-091C
                                    </p> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Contact;

