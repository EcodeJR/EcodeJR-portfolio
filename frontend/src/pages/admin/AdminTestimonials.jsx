import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNotification } from '../../context/NotificationContext';

const AdminTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showSuccess, showError } = useNotification();

    const fetchTestimonials = async () => {
        try {
            const res = await api.get('/testimonials/admin');
            setTestimonials(res.data.data);
        } catch (err) {
            console.error('Error fetching admin testimonials:', err);
            showError('Failed to fetch testimonials');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            await api.put(`/testimonials/${id}`, { isPublished: !currentStatus });
            showSuccess(`Testimonial ${!currentStatus ? 'Approved' : 'Unpublished'}`);
            fetchTestimonials();
        } catch (err) {
            showError('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('IRREVERSIBLE_ACTION: Are you sure you want to delete this review?')) return;
        try {
            await api.delete(`/testimonials/${id}`);
            showSuccess('Review Deleted');
            fetchTestimonials();
        } catch (err) {
            showError('Deletion failed');
        }
    };

    if (loading) return (
        <div className="p-8 text-primary font-mono text-center animate-pulse tracking-widest uppercase text-xs">Awaiting_Data_Packet...</div>
    );

    return (
        <div className="p-4 sm:p-8 space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col gap-2 mb-12 border-b border-white/5 pb-8">
                <div className="flex items-center gap-2 text-primary">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#FF5F00]"></span>
                    <p className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase">Security Level: Admin</p>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase italic">Control_Panel // <span className="text-slate-500">Reviews</span></h2>
            </header>

            <div className="grid grid-cols-1 gap-6">
                {testimonials.length > 0 ? (
                    testimonials.map((t) => (
                        <div key={t._id} className="tech-border bg-surface-dark/40 p-6 flex flex-col md:flex-row gap-8 items-start hover:bg-surface-dark/60 transition-all border-l-4 border-l-transparent group">
                            {/* Publishing Indicator */}
                            <div className={`absolute top-0 right-0 py-1 px-4 text-[8px] font-mono font-bold uppercase tracking-widest ${t.isPublished ? 'bg-primary text-black' : 'bg-slate-800 text-slate-500'}`}>
                                {t.isPublished ? 'LIVE' : 'PENDING_APPROVAL'}
                            </div>

                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-sm border border-white/10 bg-black/40 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-2xl">person</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold uppercase tracking-widest text-sm">{t.clientName}</h4>
                                        <p className="text-[10px] font-mono text-slate-500 uppercase">{t.clientCompany || 'EXTERNAL_PARTNER'}</p>
                                    </div>
                                    <div className="flex text-primary gap-1 ml-auto">
                                        {[...Array(t.rating || 5)].map((_, i) => (
                                            <span key={i} className="material-symbols-outlined text-xs">star</span>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-slate-300 text-xs font-mono leading-relaxed bg-black/20 p-4 border border-white/5 rounded-sm">
                                    "{t.review}"
                                </p>

                                <div className="text-[9px] font-mono text-slate-600 uppercase">
                                    Timestamp: {new Date(t.createdAt).toLocaleString()}
                                </div>
                            </div>

                            <div className="flex md:flex-col gap-3 w-full md:w-auto shrink-0 md:pt-4">
                                <button
                                    onClick={() => handleToggleStatus(t._id, t.isPublished)}
                                    className={`flex-1 h-10 px-6 font-mono text-[10px] uppercase font-black tracking-widest transition-all ${t.isPublished
                                            ? 'bg-slate-800 text-white hover:bg-slate-700'
                                            : 'bg-primary text-black hover:bg-white shadow-[0_0_15px_rgba(255,95,31,0.3)]'
                                        }`}
                                >
                                    {t.isPublished ? 'UNPUBLISH' : 'APPROVE'}
                                </button>
                                <button
                                    onClick={() => handleDelete(t._id)}
                                    className="flex-1 h-10 px-6 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white font-mono text-[10px] uppercase font-black tracking-widest transition-all"
                                >
                                    DELETE
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-20 text-center tech-border bg-white/[0.02] border-dashed">
                        <span className="material-symbols-outlined text-4xl text-slate-700 mb-4 block">format_quote</span>
                        <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.3em]">No Review Data Found in Cache</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminTestimonials;
