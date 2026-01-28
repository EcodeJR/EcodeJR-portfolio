import { FaCheckCircle, FaCircle, FaSpinner } from 'react-icons/fa';

const MilestoneTracker = ({ milestones, currentMilestone }) => {
    return (
        <div className="py-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Project Milestones</h3>
            <div className="relative">
                {milestones.map((milestone, index) => {
                    const isCompleted = milestone.status === 'completed';
                    const isCurrent = milestone.name === currentMilestone;
                    const isLast = index === milestones.length - 1;

                    return (
                        <div key={milestone._id || index} className="flex mb-8 last:mb-0 relative">
                            {/* Vertical line connecting milestones */}
                            {!isLast && (
                                <div
                                    className={`absolute left-3.5 top-8 bottom-[-32px] w-0.5 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'
                                        }`}
                                />
                            )}

                            <div className="flex-shrink-0 mr-4">
                                {isCompleted ? (
                                    <FaCheckCircle className="h-8 w-8 text-green-500" />
                                ) : isCurrent ? (
                                    <FaSpinner className="h-8 w-8 text-primary-600 animate-spin" />
                                ) : (
                                    <FaCircle className="h-8 w-8 text-gray-200" />
                                )}
                            </div>

                            <div className="flex-1 pt-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className={`text-md font-semibold ${isCompleted ? 'text-green-600' : isCurrent ? 'text-primary-600' : 'text-gray-500'
                                            }`}>
                                            {milestone.name}
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-1">{milestone.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${isCompleted ? 'bg-green-100 text-green-800' :
                                                isCurrent ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {milestone.status.replace('_', ' ')}
                                        </span>
                                        {milestone.completedDate && (
                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(milestone.completedDate).toLocaleDateString()}
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
