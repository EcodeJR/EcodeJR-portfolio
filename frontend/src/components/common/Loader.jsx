const Loader = ({ fullScreen = false }) => {
    return (
        <div className={`flex flex-col justify-center items-center gap-8 ${fullScreen ? 'fixed inset-0 z-[9999] bg-background-dark' : 'h-full w-full py-20'}`}>
            <div className="relative size-24 md:size-32">
                {/* Core Glitch Circle */}
                <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping"></div>
                <div className="absolute inset-2 border border-primary/40 rounded-full animate-[spin_3s_linear_infinite]"></div>
                <div className="absolute inset-4 border-2 border-primary rounded-full animate-[spin_1.5s_linear_infinite_reverse] shadow-[0_0_20px_rgba(249,107,6,0.5)]"></div>

                {/* Scanning Lines */}
                <div className="absolute inset-0 overflow-hidden rounded-full opacity-30">
                    <div className="w-full h-1 bg-primary/50 absolute top-0 left-0 animate-[scan_2s_linear_infinite]"></div>
                </div>

                {/* Center Core */}
                <div className="absolute inset-[40%] bg-primary rounded-sm rotate-45 animate-pulse shadow-[0_0_15px_rgba(249,107,6,0.8)]"></div>
            </div>

            <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                    <span className="h-[1px] w-8 bg-primary/40"></span>
                    <span className="text-xs font-black text-primary tracking-[0.5em] uppercase animate-pulse">
                        LOADING_SYSTEM
                    </span>
                    <span className="h-[1px] w-8 bg-primary/40"></span>
                </div>
                <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="w-4 h-1 bg-primary/20 overflow-hidden"
                        >
                            <div
                                className="h-full bg-primary"
                                style={{
                                    animation: `loading-bar 1.5s infinite`,
                                    animationDelay: `${i * 0.2}s`
                                }}
                            ></div>
                        </div>
                    ))}
                </div>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-2 animate-pulse">
                    Establishing Secure Connection...
                </p>
            </div>

            <style>{`
                @keyframes scan {
                    0% { top: -10%; }
                    100% { top: 110%; }
                }
                @keyframes loading-bar {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(0); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
};

export default Loader;
