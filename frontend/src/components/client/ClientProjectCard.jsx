import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';

const ClientProjectCard = ({ project }) => {
    return (
        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 overflow-hidden">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">
                            <Link to={`/client/projects/${project._id}`} className="hover:text-primary-600">
                                {project.projectName}
                            </Link>
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{project.serviceType}</p>
                    </div>
                    <Badge
                        variant={
                            project.status === 'completed' ? 'success' :
                                project.status === 'in_progress' ? 'primary' :
                                    project.status === 'on_hold' ? 'warning' : 'secondary'
                        }
                    >
                        {project.status.replace('_', ' ')}
                    </Badge>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{project.progressPercentage}%</span>
                    </div>
                    <ProgressBar progress={project.progressPercentage} />
                </div>

                <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-4 mt-4">
                    <div className="text-gray-500">
                        Next Milestone: <span className="font-medium text-gray-900">{project.currentMilestone || 'N/A'}</span>
                    </div>
                    <Link
                        to={`/client/projects/${project._id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ClientProjectCard;
