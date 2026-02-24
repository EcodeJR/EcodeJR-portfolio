import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={project.previewImage || project.heroImage || project.imageUrl || 'https://via.placeholder.com/600x400?text=Project+Image'}
                    alt={project.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                {project.isFeatured && (
                    <div className="absolute top-2 right-2">
                        <Badge variant="warning">Featured</Badge>
                    </div>
                )}
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                    {project.briefDescription}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies && project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="primary">
                            {tech}
                        </Badge>
                    ))}
                    {project.technologies && project.technologies.length > 3 && (
                        <Badge variant="secondary">+{project.technologies.length - 3}</Badge>
                    )}
                </div>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <Link
                        to={`/projects/${project._id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                        View Details &rarr;
                    </Link>

                    <div className="flex space-x-3">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gray-900"
                                title="View Code"
                            >
                                <FaGithub className="h-5 w-5" />
                            </a>
                        )}
                        {project.liveDemoUrl && (
                            <a
                                href={project.liveDemoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-primary-600"
                                title="Live Demo"
                            >
                                <FaExternalLinkAlt className="h-4 w-4" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
