import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        projects: 0,
        inquiries: 0,
        portfolio: 0,
        pendingInquiries: 0
    });
    const [recentInquiries, setRecentInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // In a real scenario, we would have dedicated endpoints for these stats
                // For now, we'll fetch list endpoints and count
                const [projectsRes, inquiriesRes, portfolioRes] = await Promise.all([
                    api.get('/projects'),
                    api.get('/inquiries'),
                    api.get('/portfolio'),
                ]);

                const inquiries = inquiriesRes.data.data;
                const pending = inquiries.filter(i => i.status === 'new').length;

                setStats({
                    projects: projectsRes.data.count,
                    inquiries: inquiriesRes.data.count,
                    portfolio: portfolioRes.data.count,
                    pendingInquiries: pending
                });

                setRecentInquiries(inquiries.slice(0, 5));
            } catch (err) {
                console.error('Error fetching admin data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Helper to format date relative time
    const getRelativeTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds}s_AGO`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m_AGO`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h_AGO`;
        return `${Math.floor(diffInSeconds / 86400)}d_AGO`;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'new': return 'text-primary';
            case 'contacted': return 'text-secondary';
            case 'converted': return 'text-green-500';
            default: return 'text-slate-500';
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="size-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                <p className="text-primary font-mono text-xs tracking-widest uppercase animate-pulse">Initializing Core...</p>
            </div>
        </div>
    );

    return (
        <div className="p-4 sm:p-6 lg:p-10 space-y-8 lg:space-y-10 max-w-[1600px] mx-auto">
            <header className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-10">
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tighter text-white uppercase italic">System_Execution // <span className="text-primary">Overview</span></h2>
                    <p className="font-mono text-[11px] text-slate-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary animate-pulse rounded-full"></span>
                        ROOT_ACCESS: GRANTED // STATUS: OPTIMAL
                    </p>
                </div>
                <div className="flex items-center gap-6">
                    <Link to="/admin/projects" className="p-2 text-slate-400 hover:text-primary transition-colors relative">
                        <span className="material-symbols-outlined">dataset</span>
                    </Link>
                    <Link to="/admin/projects/new" className="bg-primary hover:shadow-[0_0_20px_rgba(255,92,0,0.4)] text-black px-6 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 group">
                        <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform">add</span>
                        <span>INITIALIZE_PROJECT</span>
                    </Link>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="tech-card p-5 sm:p-6 group bg-charcoal/50 border border-white/10 backdrop-blur-sm rounded-2xl relative overflow-hidden flex flex-col justify-between">
                    <div className="scanner-line"></div>
                    <div className="flex justify-between items-start mb-6 gap-2">
                        <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary rounded-lg shrink-0">
                            <span className="material-symbols-outlined">precision_manufacturing</span>
                        </div>
                        <div className="text-right shrink-0">
                            <span className="text-[9px] sm:text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">+18% SYN</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mb-1">Active Projects</p>
                        <div className="flex items-end gap-3">
                            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">{stats.projects}</h3>
                            <div className="flex gap-1 mb-2">
                                <div className="w-1 h-3 bg-primary"></div>
                                <div className="w-1 h-3 bg-primary"></div>
                                <div className="w-1 h-3 bg-primary/20"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tech-card p-5 sm:p-6 group bg-charcoal/50 border border-white/10 backdrop-blur-sm rounded-2xl relative overflow-hidden flex flex-col justify-between">
                    <div className="scanner-line"></div>
                    <div className="flex justify-between items-start mb-6 gap-2">
                        <div className="w-10 h-10 bg-[#00f0ff]/10 border border-[#00f0ff]/20 flex items-center justify-center text-[#00f0ff] rounded-lg shrink-0">
                            <span className="material-symbols-outlined">hub</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-0.5 rounded border border-[#00f0ff]/20 shrink-0">URGENT</span>
                    </div>
                    <div>
                        <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mb-1">Pending Inquiries</p>
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-white">{stats.pendingInquiries}</h3>
                        <div className="mt-8 space-y-1">
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-[#00f0ff] w-2/3"></div>
                            </div>
                            <p className="text-[9px] text-slate-500">QUEUE LOAD: 65%</p>
                        </div>
                    </div>
                </div>

                <div className="tech-card p-5 sm:p-6 group bg-charcoal/50 border border-white/10 backdrop-blur-sm rounded-2xl relative overflow-hidden flex flex-col justify-between">
                    <div className="scanner-line"></div>
                    <div className="flex justify-between items-start mb-6 gap-2">
                        <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary rounded-lg shrink-0">
                            <span className="material-symbols-outlined">currency_exchange</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 shrink-0">+$2.4k</span>
                    </div>
                    <div>
                        <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mb-1">Total Inquiries</p>
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-white">{stats.inquiries}</h3>
                        <div className="mt-4 flex items-center gap-4">
                            <div className="size-10 sm:size-12 rounded-full border-4 border-white/5 border-t-primary rotate-45 shrink-0"></div>
                            <span className="text-[10px] text-slate-400">YIELD_TARGET: 82%</span>
                        </div>
                    </div>
                </div>

                <div className="tech-card p-5 sm:p-6 group bg-charcoal/50 border border-white/10 backdrop-blur-sm rounded-2xl relative overflow-hidden flex flex-col justify-between">
                    <div className="scanner-line"></div>
                    <div className="flex justify-between items-start mb-6 gap-2">
                        <div className="w-10 h-10 bg-slate-100/5 border border-white/10 flex items-center justify-center text-white rounded-lg shrink-0">
                            <span className="material-symbols-outlined">visibility</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/10 shrink-0">+8.4%</span>
                    </div>
                    <div>
                        <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mb-1">Portfolio Items</p>
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-white">{stats.portfolio}</h3>
                        <div className="mt-6 flex items-center gap-1 opacity-50">
                            <div className="h-1 flex-1 bg-white/10"></div>
                            <div className="h-1 flex-1 bg-white/10"></div>
                            <div className="h-1 flex-1 bg-white/10"></div>
                            <div className="h-1 flex-1 bg-primary"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Inquiry Log table */}
                <div className="lg:col-span-2 tech-card bg-charcoal/50 border border-white/10 backdrop-blur-sm rounded-2xl relative overflow-hidden">
                    <div className="p-6 md:p-8 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h3 className="font-bold text-base md:text-lg text-white uppercase tracking-tight">INQUIRY_LOG</h3>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Live data stream enabled</p>
                        </div>
                        <button className="text-primary text-[10px] font-bold border border-primary/30 px-4 py-1.5 rounded-full hover:bg-primary hover:text-white transition-all uppercase whitespace-nowrap">DUMP_ALL</button>
                    </div>
                    <div className="overflow-x-auto p-4">
                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <thead className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                <tr>
                                    <th className="px-4 md:px-6 py-3">ORIGIN</th>
                                    <th className="px-6 py-3 hidden md:table-cell">SUBJECT_PARAMS</th>
                                    <th className="px-4 md:px-6 py-3">TIMESTAMP</th>
                                    <th className="px-4 md:px-6 py-3">STATUS</th>
                                    <th className="px-4 md:px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="text-xs">
                                {recentInquiries.length > 0 ? (
                                    recentInquiries.map((inquiry) => (
                                        <tr key={inquiry._id} className="bg-white/[0.02] hover:bg-white/[0.05] transition-colors group">
                                            <td className="px-4 md:px-6 py-4">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className="size-8 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-[10px] shrink-0">
                                                        {inquiry.name.charAt(0)}
                                                    </div>
                                                    <span className="text-slate-200 uppercase tracking-tight truncate max-w-[80px] sm:max-w-[150px] lg:max-w-none">{inquiry.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-400 hidden md:table-cell truncate max-w-[200px]">{inquiry.serviceInterested}</td>
                                            <td className="px-4 md:px-6 py-4 text-slate-500 whitespace-nowrap text-[10px]">{getRelativeTime(inquiry.createdAt || new Date())}</td>
                                            <td className="px-4 md:px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`size-1.5 rounded-full shadow-[0_0_8px_currentColor] hidden lg:inline-block ${inquiry.status === 'new' ? 'bg-primary' : 'bg-slate-500'}`}></span>
                                                    <span className={`font-bold uppercase text-[9px] sm:text-[10px] ${getStatusColor(inquiry.status)}`}>{inquiry.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link to="/admin/inquiries" className="text-slate-600 hover:text-white transition-colors">
                                                    <span className="material-symbols-outlined text-lg">terminal</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-slate-500">NO_DATA_FOUND</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Allocation Map */}
                <div className="tech-card p-8 flex flex-col bg-charcoal/50 border border-white/10 backdrop-blur-sm rounded-2xl relative overflow-hidden">
                    <div className="mb-8">
                        <h3 className="font-bold text-lg text-white">ALLOCATION_MAP</h3>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Resource distribution matrix</p>
                    </div>
                    <div className="space-y-8 flex-1">
                        <div>
                            <div className="flex justify-between text-[10px] mb-3">
                                <span className="text-slate-400 uppercase">Neural Net Dev</span>
                                <span className="text-primary font-bold">45%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] mb-3">
                                <span className="text-slate-400 uppercase">UX Projection</span>
                                <span className="text-white/80 font-bold">25%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-white/40" style={{ width: '25%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] mb-3">
                                <span className="text-slate-400 uppercase">Core Audit</span>
                                <span className="text-white/80 font-bold">15%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-white/20" style={{ width: '15%' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 p-5 bg-primary/5 border border-primary/20 rounded-2xl">
                        <div className="flex items-start gap-4">
                            <div className="text-primary"><span className="material-symbols-outlined text-3xl">bolt</span></div>
                            <div>
                                <p className="text-[10px] font-bold text-primary uppercase tracking-tighter">Next Milestone</p>
                                <p className="text-xs text-white mt-1">FINTECH_PRO_DEPLOYMENT</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-[9px] text-slate-500">T-MINUS: 04d 12h</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
