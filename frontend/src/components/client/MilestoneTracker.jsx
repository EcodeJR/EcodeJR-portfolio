import React from 'react';

const MilestoneTracker = ({ milestones, currentMilestone }) => {
    return (
        <div className="py-2">
            <div className="relative space-y-12">
                {milestones.map((milestone, index) => {
                    const isCompleted = milestone.status === 'completed';
                    const isCurrent = milestone.name === currentMilestone;
                    const isLast = index === milestones.length - 1;

                    return (
                        <div key={milestone._id || index} className="flex gap-8 relative group">
                            {/* Vertical line connecting milestones */}
                            {!isLast && (
                                <div
                                    className={`absolute left-4 top-10 bottom-[-48px] w-px ${isCompleted ? 'bg-primary/50' : 'bg-white/5'
                                        }`}
                                />
                            )}

                            <div className="shrink-0 relative">
                                {isCompleted ? (
                                    <div className="size-8 rounded-sm bg-primary/20 border border-primary flex items-center justify-center rotate-45 shadow-[0_0_10px_rgba(255,95,0,0.3)]">
                                        <span className="material-symbols-outlined text-primary text-sm -rotate-45 font-bold">check</span>
                                    </div>
                                ) : isCurrent ? (
                                    <div className="size-8 rounded-sm bg-[#00F0FF]/10 border border-[#00F0FF] flex items-center justify-center rotate-45 shadow-[0_0_15px_rgba(0,240,255,0.4)] animate-pulse">
                                        <div className="size-2 bg-[#00F0FF] rounded-full"></div>
                                    </div>
                                ) : (
                                    <div className="size-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center rotate-45 group-hover:border-white/30 transition-colors">
                                        <div className="size-1 bg-white/20 rounded-full"></div>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 pt-0.5">
                                <div className="flex flex-wrap justify-between items-start gap-4">
                                    <div className="space-y-1">
                                        <h4 className={`text-sm font-black uppercase tracking-widest italic group-hover:translate-x-1 transition-transform ${isCompleted ? 'text-primary' : isCurrent ? 'text-[#00F0FF]' : 'text-slate-500'
                                            }`}>
                                            {milestone.name}
                                        </h4>
                                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider leading-relaxed max-w-md">{milestone.description}</p>
                                    </div>
                                    <div className="text-right flex flex-col items-end gap-2">
                                        <span className={`text-[9px] font-mono px-3 py-1 rounded-sm border uppercase tracking-widest ${isCompleted ? 'bg-primary/10 border-primary text-primary' :
                                            isCurrent ? 'bg-[#00F0FF]/10 border-[#00F0FF] text-[#00F0FF]' :
                                                'bg-white/5 border-white/10 text-slate-600'
                                            }`}>
                                            {milestone.status.replace('_', ' ')}
                                        </span>
                                        {(milestone.completedDate || isCompleted) && (
                                            <p className="text-[8px] font-mono text-slate-700 uppercase tracking-[0.2em]">
                                                {milestone.completedDate ? new Date(milestone.completedDate).toLocaleDateString() : 'ARCHIVED'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MilestoneTracker;
