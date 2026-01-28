import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HiMenu, HiX } from 'react-icons/hi';
import Button from '../common/Button';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout, isAuthenticated, isAdmin } = useAuth();
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    const isActive = (path) => {
        return location.pathname === path ? 'text-primary-600 font-semibold' : 'text-gray-600 hover:text-primary-600';
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: 'Services', path: '/services' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-primary-600">EcodeJR</span>
                        </Link>
                    </div>

                    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(link.path)}`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4 ml-4">
                                <Link to={isAdmin ? "/admin/dashboard" : "/client/dashboard"}>
                                    <Button variant="outline" size="small">
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button variant="text" size="small" onClick={logout}>
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4 ml-4">
                                <Link to="/login">
                                    <Button variant="text" size="small">Login</Button>
                                </Link>
                                <Link to="/contact">
                                    <Button size="small">Hire Me</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="-mr-2 flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <HiX className="block h-6 w-6" /> : <HiMenu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${location.pathname === link.path
                                        ? 'bg-primary-50 border-primary-500 text-primary-700'
                                        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {isAuthenticated ? (
                            <div className="pt-4 pb-3 border-t border-gray-200">
                                <div className="flex items-center px-4">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                                            {user?.name?.charAt(0) || 'U'}
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800">{user?.name}</div>
                                        <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                                    </div>
                                </div>
                                <div className="mt-3 space-y-1">
                                    <Link
                                        to={isAdmin ? "/admin/dashboard" : "/client/dashboard"}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="pt-4 pb-3 border-t border-gray-200 flex flex-col space-y-2 px-4">
                                <Link to="/login" onClick={() => setIsOpen(false)}>
                                    <Button variant="outline" className="w-full">Login</Button>
                                </Link>
                                <Link to="/contact" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full">Hire Me</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
