import { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import Loader from '../common/Loader';
import { useAuth } from '../../context/AuthContext';

const ClientMessages = ({ projectId }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);
    const scrollContainerRef = useRef(null);

    const fetchMessages = async () => {
        try {
            const res = await api.get(`/messages/${projectId}`);
            setMessages(res.data.data);
        } catch (err) {
            console.error('Error fetching messages:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 10000);
        return () => clearInterval(interval);
    }, [projectId]);

    useEffect(() => {
        if (scrollContainerRef.current) {
            const { scrollHeight, clientHeight } = scrollContainerRef.current;
            scrollContainerRef.current.scrollTo({
                top: scrollHeight - clientHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setSending(true);
        try {
            await api.post(`/messages/${projectId}`, { content: newMessage });
            setNewMessage('');
            fetchMessages();
        } catch (err) {
            console.error('Error sending message:', err);
        } finally {
            setSending(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center p-20">
            <Loader />
        </div>
    );

    return (
        <div className="flex flex-col h-[500px] border border-white/5 rounded-sm overflow-hidden bg-background-dark/30 backdrop-blur-md">
            <div className="bg-white/[0.02] px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
                    <h3 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">Secure_Thread // Archive</h3>
                </div>
                <span className="text-[8px] font-mono text-slate-700">AES-256 Enabled</span>
            </div>

            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
            >
                {messages.length > 0 ? (
                    messages.map((msg) => {
                        const isMe = msg.senderId._id === user._id || msg.senderId === user._id;
                        return (
                            <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                                <div className={`max-w-[85%] rounded-xl px-4 py-3 border ${isMe ? 'bg-primary/10 border-primary/30 text-white rounded-tr-none' : 'bg-surface-dark/60 border-white/5 text-slate-300 rounded-tl-none'
                                    }`}>
                                    <p className="text-xs leading-relaxed">{msg.content}</p>
                                    <div className={`flex items-center gap-2 mt-2 ${isMe ? 'flex-row-reverse' : ''}`}>
                                        <p className={`text-[8px] font-mono uppercase tracking-widest ${isMe ? 'text-primary/60' : 'text-slate-600'}`}>
                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                        <span className="size-0.5 rounded-full bg-slate-700"></span>
                                        <p className="text-[8px] font-mono text-slate-600 uppercase">Verified</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-600 font-mono text-[10px] uppercase tracking-widest gap-4">
                        <span className="material-symbols-outlined text-4xl opacity-20">history</span>
                        <span>No historical data found in this buffer</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-6 border-t border-white/5 bg-white/[0.01]">
                <form onSubmit={handleSend} className="flex gap-4">
                    <div className="flex-1 relative">
                        <input
                            name="message"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="EXECUTE TRANSMISSION..."
                            className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-xs font-mono text-white placeholder:text-slate-700 focus:border-primary/50 focus:outline-none transition-all uppercase"
                            autoComplete="off"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={sending || !newMessage.trim()}
                        className="bg-primary text-black size-10 flex items-center justify-center rounded-lg hover:bg-white transition-all shadow-[0_0_15px_rgba(255,95,31,0.2)] disabled:opacity-50"
                    >
                        {sending ? <span className="material-symbols-outlined animate-spin">refresh</span> : <span className="material-symbols-outlined">send</span>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ClientMessages;
