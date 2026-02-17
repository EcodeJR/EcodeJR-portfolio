import { useState, useEffect } from 'react';
import api from '../../services/api';

const Inquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const res = await api.get('/inquiries');
                setInquiries(res.data.data);
                if (res.data.data.length > 0) setSelectedInquiry(res.data.data[0]);
            } catch (err) {
                console.error('Error fetching inquiries:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchInquiries();
    }, []);

    const handleConvert = async (inquiryId) => {
        if (!window.confirm('Initialize this inquiry as a live project?')) return;
        try {
            await api.post(`/projects/from-inquiry/${inquiryId}`);
            alert('Project initialized successfully! Client record created.');
            // Refresh
            const res = await api.get('/inquiries');
            setInquiries(res.data.data);
            const updated = res.data.data.find(i => i._id === inquiryId);
            if (updated) setSelectedInquiry(updated);
        } catch (err) {
            console.error('Conversion failed:', err);
            alert(err.response?.data?.message || 'Failed to convert inquiry');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'new': return 'text-primary bg-primary/10 border-primary/20';
            case 'converted': return 'text-green-400 bg-green-400/10 border-green-400/20';
            default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="size-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        </div>
    );

    return (
        <div className="flex-1 flex flex-col md:flex-row md:overflow-hidden md:h-full">
            {/* List */}
            <div className="w-full md:w-[350px] lg:w-[400px] border-b md:border-b-0 md:border-r border-white/5 flex flex-col bg-background-dark/30 backdrop-blur-sm shrink-0 md:h-auto">
                {/* Header */}
                <div className="h-16 border-b border-white/5 flex items-center px-6 shrink-0">
                    <h2 className="text-xl font-black tracking-tighter uppercase">Inquiry_Inbox</h2>
                </div>
                {/* Tabs */}
                <div className="flex border-b border-white/5 px-4 overflow-x-auto whitespace-nowrap scrollbar-hide shrink-0">
                    <button className="px-4 py-4 text-xs font-bold border-b-2 border-primary text-primary tracking-widest uppercase">All_Signals</button>
                </div>
                {/* Items */}
                <div className="h-auto md:flex-1 md:overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">
                    {inquiries.map(inquiry => (
                        <div
                            key={inquiry._id}
                            onClick={() => setSelectedInquiry(inquiry)}
                            className={`p-5 sm:p-6 rounded-2xl relative overflow-hidden group hover:border-primary/50 cursor-pointer transition-all border min-h-[140px] flex flex-col justify-between ${selectedInquiry?._id === inquiry._id ? 'bg-white/10 border-primary shadow-[0_0_20px_rgba(249,107,6,0.1)]' : 'bg-white/5 border-white/10'}`}
                        >
                            <div className="flex flex-col gap-2">
                                <p className="text-[10px] text-slate-500 font-mono tracking-tighter">ID: {inquiry._id.substring(0, 8)}</p>
                                <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors uppercase truncate">{inquiry.subject || inquiry.name}</h3>
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border shrink-0 ${inquiry.inquiryType === 'urgent' ? 'text-red-400 border-red-400/30 bg-red-400/10' : inquiry.inquiryType === 'consultation' ? 'text-blue-400 border-blue-400/30 bg-blue-400/10' : 'text-primary border-primary/30 bg-primary/10'}`}>
                                        {inquiry.inquiryType?.toUpperCase() || 'PROJECT'}
                                    </span>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest truncate">{inquiry.serviceInterested || inquiry.subject || 'GENERAL'}</p>
                                </div>
                                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                                    <span className="text-[10px] text-slate-500 font-mono">{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${getStatusColor(inquiry.status)}`}>{inquiry.status}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {inquiries.length === 0 && <div className="text-center text-slate-500 text-xs py-12 font-mono uppercase">NO SIGNAL DETECTED</div>}
                </div>
            </div>

            {/* Detail View */}
            <div className="flex-1 bg-background-dark/10 overflow-y-auto relative custom-scrollbar p-4 sm:p-8 lg:p-12">
                {selectedInquiry ? (
                    <div className="max-w-4xl mx-auto flex flex-col gap-6 sm:gap-10">
                        {/* Summary */}
                        <div className="flex flex-col gap-4 sm:gap-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="bg-primary/20 text-primary px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider border border-primary/30">Active_Signal</span>
                                <span className="text-[10px] text-slate-500 font-mono">T-STAMP: {new Date(selectedInquiry.createdAt).toISOString()}</span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight break-words">{selectedInquiry.subject || selectedInquiry.name || 'INQUIRY_RECEIVED'}</h2>
                        </div>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                            <div className="tech-card p-6 sm:p-8 rounded-2xl bg-charcoal/50 border border-white/10 flex flex-col gap-6">
                                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                                    <span className="material-symbols-outlined text-primary">person_search</span>
                                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 break-words">Identity Parameters</h4>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <span className="text-[9px] text-slate-500 uppercase font-black">Full_Name</span>
                                        <span className="text-base sm:text-lg font-bold text-white truncate" title={selectedInquiry.name}>{selectedInquiry.name}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <span className="text-[9px] text-slate-500 uppercase font-black">Email_Endpoint</span>
                                        <span className="text-sm font-bold font-mono text-primary truncate" title={selectedInquiry.email}>{selectedInquiry.email}</span>
                                    </div>
                                    {selectedInquiry.phone && (
                                        <div className="flex flex-col gap-1 min-w-0">
                                            <span className="text-[9px] text-slate-500 uppercase font-black">Comm_Line</span>
                                            <span className="text-sm font-bold text-white truncate">{selectedInquiry.phone}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="tech-card p-6 sm:p-8 rounded-2xl bg-charcoal/50 border border-white/10 flex flex-col gap-6">
                                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                                    <span className="material-symbols-outlined text-primary">analytics</span>
                                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 break-words">Project Context</h4>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <span className="text-[9px] text-slate-500 uppercase font-black">Inquiry_Type</span>
                                        <span className="text-sm font-bold text-white uppercase">{selectedInquiry.inquiryType || 'PROJECT'}</span>
                                    </div>
                                    {selectedInquiry.inquiryType === 'project' || !selectedInquiry.inquiryType ? (
                                        <>
                                            <div className="flex flex-col gap-1 min-w-0">
                                                <span className="text-[9px] text-slate-500 uppercase font-black">Target_Service</span>
                                                <span className="text-sm font-bold text-white uppercase truncate" title={selectedInquiry.serviceInterested}>{selectedInquiry.serviceInterested}</span>
                                            </div>
                                            <div className="flex flex-col gap-1 min-w-0">
                                                <span className="text-[9px] text-slate-500 uppercase font-black">Fiscal_Projection</span>
                                                <span className="text-xl font-black text-primary truncate">{selectedInquiry.budgetRange || selectedInquiry.budget || 'UNDETERMINED'}</span>
                                            </div>
                                        </>
                                    ) : selectedInquiry.inquiryType === 'consultation' ? (
                                        <>
                                            <div className="flex flex-col gap-1 min-w-0">
                                                <span className="text-[9px] text-slate-500 uppercase font-black">Preferred_Window</span>
                                                <span className="text-sm font-bold text-white uppercase truncate">{selectedInquiry.preferredDateTime}</span>
                                            </div>
                                            <div className="flex flex-col gap-1 min-w-0">
                                                <span className="text-[9px] text-slate-500 uppercase font-black">Subject</span>
                                                <span className="text-sm font-bold text-white uppercase truncate" title={selectedInquiry.subject}>{selectedInquiry.subject}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex flex-col gap-1 min-w-0">
                                                <span className="text-[9px] text-slate-500 uppercase font-black">Urgency_Level</span>
                                                <span className={`text-sm font-bold uppercase ${selectedInquiry.urgencyLevel === 'critical' ? 'text-red-500' : 'text-orange-500'}`}>{selectedInquiry.urgencyLevel}</span>
                                            </div>
                                            <div className="flex flex-col gap-1 min-w-0">
                                                <span className="text-[9px] text-slate-500 uppercase font-black">Override_Title</span>
                                                <span className="text-sm font-bold text-white uppercase truncate" title={selectedInquiry.subject}>{selectedInquiry.subject}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Message Content */}
                        <div className="tech-card p-6 sm:p-8 rounded-2xl bg-charcoal/50 border border-white/10 flex flex-col gap-6">
                            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                                <span className="material-symbols-outlined text-primary">description</span>
                                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Transmission_Payload</h4>
                            </div>
                            <div className="bg-black/40 p-4 sm:p-8 rounded-xl border border-white/5 text-slate-300 leading-relaxed text-sm font-mono relative min-h-[150px]">
                                <p className="whitespace-pre-wrap break-words">{selectedInquiry.description || selectedInquiry.message}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 pt-4 mb-20 md:mb-0">
                            {selectedInquiry.status !== 'converted' && (
                                <button
                                    onClick={() => handleConvert(selectedInquiry._id)}
                                    className="flex-1 sm:flex-none px-6 sm:px-10 py-4 bg-[#00F0FF] text-black hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:scale-[1.02] rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-lg">rocket_launch</span>
                                    Initialize_Project
                                </button>
                            )}
                            <a href={`mailto:${selectedInquiry.email}`} className="flex-1 sm:flex-none px-6 sm:px-10 py-4 bg-primary text-black hover:shadow-[0_0_30px_rgba(249,107,6,0.4)] hover:scale-[1.02] rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-lg">terminal</span>
                                Establish_Contact
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <span className="material-symbols-outlined text-6xl text-slate-800 animate-pulse">radar</span>
                        <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.3em]">Awaiting Signal Selection...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inquiries;
