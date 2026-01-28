import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <span className="text-2xl font-bold text-primary-400">EcodeJR</span>
                        <p className="mt-2 text-gray-400 text-sm">
                            Building digital experiences that matter. Full-stack development and design solutions.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Navigation</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link to="/" className="text-base text-gray-400 hover:text-white">Home</Link></li>
                            <li><Link to="/projects" className="text-base text-gray-400 hover:text-white">Projects</Link></li>
                            <li><Link to="/services" className="text-base text-gray-400 hover:text-white">Services</Link></li>
                            <li><Link to="/about" className="text-base text-gray-400 hover:text-white">About</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link to="/privacy" className="text-base text-gray-400 hover:text-white">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-base text-gray-400 hover:text-white">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Connect</h3>
                        <div className="flex space-x-6 mt-4">
                            <a href="#" className="text-gray-400 hover:text-white">
                                <span className="sr-only">GitHub</span>
                                <FaGithub className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <span className="sr-only">LinkedIn</span>
                                <FaLinkedin className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <span className="sr-only">Twitter</span>
                                <FaTwitter className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <span className="sr-only">Instagram</span>
                                <FaInstagram className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-base text-gray-400">
                        &copy; {new Date().getFullYear()} EcodeJR. All rights reserved.
                    </p>
                    <p className="text-base text-gray-500 mt-2 md:mt-0">
                        Designed & Built by EcodeJR
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
