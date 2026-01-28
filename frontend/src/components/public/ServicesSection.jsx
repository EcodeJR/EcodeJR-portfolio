import { FaCode, FaMobileAlt, FaServer, FaPalette } from 'react-icons/fa';

const services = [
    {
        title: 'Web Development',
        description: 'Custom websites built with modern technologies like React, Node.js, and MongoDB.',
        icon: FaCode,
    },
    {
        title: 'Mobile Apps',
        description: 'Responsive and cross-platform mobile applications for iOS and Android.',
        icon: FaMobileAlt,
    },
    {
        title: 'Backend Systems',
        description: 'Scalable server-side architectures, APIs, and database management.',
        icon: FaServer,
    },
    {
        title: 'UI/UX Design',
        description: 'Intuitive and aesthetic user interfaces with a focus on user experience.',
        icon: FaPalette,
    },
];

const ServicesSection = () => {
    return (
        <div className="bg-white py-12 sm:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        My Services
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Comprehensive solutions for your digital needs.
                    </p>
                </div>

                <div className="mt-16 bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
                    {services.map((service, serviceIdx) => (
                        <div
                            key={service.title}
                            className={`relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 ${serviceIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : ''
                                } ${serviceIdx === 1 ? 'sm:rounded-tr-lg' : ''
                                } ${serviceIdx === services.length - 2 ? 'sm:rounded-bl-lg' : ''
                                } ${serviceIdx === services.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : ''
                                }`}
                        >
                            <div>
                                <span className="rounded-lg inline-flex p-3 ring-4 ring-white bg-primary-50 text-primary-600">
                                    <service.icon className="h-6 w-6" aria-hidden="true" />
                                </span>
                            </div>
                            <div className="mt-8">
                                <h3 className="text-lg font-medium">
                                    <a href="#" className="focus:outline-none">
                                        <span className="absolute inset-0" aria-hidden="true" />
                                        {service.title}
                                    </a>
                                </h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;
