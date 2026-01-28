import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Messages = () => {
    const { user } = useAuth();
    const [activeThread, setActiveThread] = useState(1);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "LEAD_DEV_CORE",
            time: "09:12 AM",
            content: "The API integration is complete. We're seeing a 15% reduction in latency on the edge nodes. Ready for client review of the dashboard widgets.",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3Kb2xXpUC-gDstw-Y3kRQwf7MauNSKckpkNCWQjXUT5peHHgHKB2LQFtMjSCZ_JEcfVxvqElcHE9y21t37VuUTljZYZvLqQmkVHGskHLFaWxpy56L9KpJeEjUDMOj4xbwpRZzVbB5z61YuzXEvm79i0xKwqTboXooWXHHkerzX_sYw1qfelokkqlRVLv8Sz4YX2ukdS6H20f0TWLkg2IQKVAMPrp2nP88AOcoTEcrUN5TwMQ1rY_DywCvszux_RiQBQJDYDD8IQ",
            isMe: false
        },
        {
            id: 2,
            sender: "SYS_ADMIN",
            time: "09:14 AM",
            content: "Node redundancy checks passed. Cluster stability is at 99.98%.",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGF_KRoWJteKHhaAKqZ-bIXp1uHWhmpHxUUxcACVoHnaR1-mnumlfxoECLzcAr6zlth9G4rhf-6M4Zl5bEYZg0sjR2MdTruqw9w0uRPKTVxM-lXg6Fkme62DRv27eZMBn_l9hucwOIxIsnQJFycZZHMIJwWeLYrI3j-N4NqjtT0FnuJrH-OTwiM7cuVfLPTNr1Q2SIMvur3CQqUTSHPOVWwUmWnWb4I2Qlq-oV9Kqjbl1wsfK3mbAiiGURp67F-J6NMx0bmX6grQ",
            isMe: false
        },
        {
            id: 3,
            sender: "CLIENT_ALPHA_V1",
            time: "09:25 AM",
            content: "Excellent progress. Proceed with the final deployment sequence to the staging environment. I'll need the performance logs by EOD.",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUqyYGNAYTf-00BpwZleMCQrv3WaAMBF-rekuvYdgnFQZ7qe9iZDj3DXylIeU5wXjhNQFdFvCtWKp5vBsV5eZDUGqo4HyS3OFuKoK1kOCiK4dDaW2kYwEhYWMj2LEEcCPfgei0bfE30hWUmb4TnoJdIDimYXjgEhqxUm8GQf3SW_mO_ZavWIgTSY23t5FYp5eA-bd_BssTem6zeP8aIetCYJ-71lmdDdcGGKnoTcsWb8zRWIPJw6drEcHbnoN7uo68_T-9pO4XzQ",
            isMe: true
        }
    ]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setMessages([...messages, {
            id: messages.length + 1,
            sender: user?.name || "CLIENT",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            content: newMessage,
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUqyYGNAYTf-00BpwZleMCQrv3WaAMBF-rekuvYdgnFQZ7qe9iZDj3DXylIeU5wXjhNQFdFvCtWKp5vBsV5eZDUGqo4HyS3OFuKoK1kOCiK4dDaW2kYwEhYWMj2LEEcCPfgei0bfE30hWUmb4TnoJdIDimYXjgEhqxUm8GQf3SW_mO_ZavWIgTSY23t5FYp5eA-bd_BssTem6zeP8aIetCYJ-71lmdDdcGGKnoTcsWb8zRWIPJw6drEcHbnoN7uo68_T-9pO4XzQ",
            isMe: true
        }]);
        setNewMessage('');
    };

    return (
        <div className="flex h-full overflow-hidden bg-background-dark/50 text-white font-body animate-in fade-in duration-500">
            {/* Thread Sidebar (Internal) */}
            <aside className="w-20 lg:w-80 flex flex-col border-r border-white/5 bg-surface-dark/40 backdrop-blur-md z-10 shrink-0">
                <div className="p-4 flex flex-col gap-6 h-full">
                    <div className="hidden lg:flex flex-col gap-1 px-4 mt-4">
                        <h1 className="text-white text-xs font-bold tracking-widest text-primary/80 uppercase">Active Links</h1>
                        <p className="text-slate-500 text-[10px] font-mono uppercase">Secure // Direct_Access</p>
                    </div>
                    <div className="flex flex-col gap-2 overflow-y-auto px-2">
                        <div className={`flex items-center gap-4 px-4 py-4 rounded-xl border-l-2 transition-all cursor-pointer ${activeThread === 1 ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(255,95,31,0.1)]' : 'border-transparent hover:bg-white/5'}`} onClick={() => setActiveThread(1)}>
                            <span className={`material-symbols-outlined text-2xl ${activeThread === 1 ? 'text-primary animate-pulse' : 'text-slate-500'}`}>rocket_launch</span>
                            <div className="hidden lg:block flex-1">
                                <p className="text-white text-xs font-bold uppercase tracking-tight">Sprint Overview</p>
                                <p className="text-[10px] text-slate-500">LIVE UPDATES</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 px-4 py-4 rounded-xl border-l-2 border-transparent hover:bg-white/5 transition-all cursor-pointer">
                            <span className="material-symbols-outlined text-2xl text-slate-500">terminal</span>
                            <div className="hidden lg:block flex-1">
                                <p className="text-white text-xs font-bold uppercase tracking-tight">Project Alpha</p>
                                <p className="text-[10px] text-slate-500">4 ACTIVE DEVS</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto hidden lg:block p-4">
                        <button className="w-full flex items-center justify-center gap-2 rounded-xl h-12 bg-primary/10 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all">
                            <span className="material-symbols-outlined text-sm">add</span>
                            <span>New_Thread</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Chat Area */}
            <section className="flex-1 flex flex-col bg-transparent relative h-full overflow-hidden">
                {/* Project Context Header */}
                <div className="flex items-center justify-between border-b border-white/5 bg-surface-dark/20 backdrop-blur-md px-8 py-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <span className="size-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#FF5F00]"></span>
                            <h2 className="text-white text-xl font-black uppercase italic tracking-tighter">
                                Neural_Net_Alpha <span className="text-slate-500 font-normal mx-2">//</span> <span className="text-sm font-mono text-primary">COMM_STABLE</span>
                            </h2>
                        </div>
                        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">+2 DEV NODES CONNECTED</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="size-8 rounded-full border-2 border-background-dark bg-surface-dark flex items-center justify-center text-[10px] font-bold overflow-hidden shadow-lg hover:translate-y-[-2px] transition-transform cursor-pointer">
                                    <span className="material-symbols-outlined text-sm">person</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 custom-scrollbar bg-black/10">
                    <div className="flex justify-center mb-4">
                        <div className="flex items-center gap-3 px-6 py-2 bg-white/[0.02] border border-white/5 rounded-full backdrop-blur-sm">
                            <span className="material-symbols-outlined text-sm text-primary">verified_user</span>
                            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em]">End-to-End Encryption Active // RSA-4096</span>
                        </div>
                    </div>

                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-start gap-5 max-w-[85%] lg:max-w-[70%] ${msg.isMe ? 'flex-row-reverse self-end' : ''} animate-in slide-in-from-bottom-2 duration-300`}>
                            <div className={`size-10 rounded-xl border overflow-hidden shrink-0 flex items-center justify-center text-white ${msg.isMe ? 'border-primary/50' : 'border-white/10 bg-white/5'}`}>
                                <span className="material-symbols-outlined">person</span>
                            </div>
                            <div className={`flex flex-col gap-2 ${msg.isMe ? 'items-end' : ''}`}>
                                <div className={`flex items-center gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                                    <p className={`text-xs font-black uppercase tracking-widest ${msg.isMe ? 'text-primary' : 'text-white'}`}>{msg.sender}</p>
                                    <p className="text-slate-500 text-[9px] font-mono">{msg.time}</p>
                                </div>
                                <div className={`text-sm leading-relaxed p-5 rounded-2xl relative shadow-2xl ${msg.isMe ? 'bg-primary/10 border border-primary/40 text-white rounded-tr-none' : 'bg-surface-dark/60 border border-white/5 text-slate-300 rounded-tl-none'}`}>
                                    {msg.content}
                                    {msg.isMe && <div className="absolute top-2 right-2 size-1 bg-primary rounded-full animate-ping"></div>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="px-8 py-8 bg-surface-dark/40 border-t border-white/5 backdrop-blur-xl">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-4 bg-black/60 rounded-2xl border border-white/10 p-3 shadow-inner group focus-within:border-primary/50 transition-all">
                        <button type="button" className="size-10 flex items-center justify-center text-slate-500 hover:text-primary transition-all">
                            <span className="material-symbols-outlined">add_circle</span>
                        </button>
                        <input
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-mono placeholder:text-slate-700 text-white uppercase"
                            placeholder="EXECUTE TRANSMISSION..."
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button type="submit" className="size-12 rounded-xl bg-primary text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,95,31,0.3)] hover:scale-[1.05] active:scale-[0.95] transition-all">
                            <span className="material-symbols-outlined font-black">send</span>
                        </button>
                    </form>
                    <div className="mt-4 flex flex-wrap justify-between gap-4 px-2 opacity-40 group-focus-within:opacity-80 transition-opacity">
                        <div className="flex gap-6">
                            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                                <span className="size-1 bg-[#00F0FF] rounded-full"></span>
                                Uplink: 100%
                            </p>
                            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                                <span className="size-1 bg-[#00F0FF] rounded-full"></span>
                                Protocol: MQTT_S
                            </p>
                        </div>
                        <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-500">Latency: 14.2ms</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Messages;
