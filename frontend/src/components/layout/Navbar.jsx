import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/login');
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const activeLink = "px-6 py-2 rounded-full text-xs font-bold tracking-widest bg-white text-black transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]";
    const normalLink = "px-6 py-2 rounded-full text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-all";

    return (
        <div className="fixed top-4 md:top-8 left-0 w-full z-50 px-4 md:px-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between bg-black/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/5">
                <Link to="/" onClick={closeMenu} className="flex items-center gap-3 bg-white text-black px-4 md:px-6 py-2 md:py-3 rounded-full font-display font-bold text-xs md:text-sm tracking-widest hover:bg-primary transition-colors">
                    ECODEJR
                </Link>

                <nav className="hidden md:flex items-center gap-2 pill-nav p-1.5 rounded-full">
                    <NavLink className={({ isActive }) => isActive ? activeLink : normalLink} to="/about">ABOUT ME</NavLink>
                    <NavLink className={({ isActive }) => isActive ? activeLink : normalLink} to="/projects">PROJECTS</NavLink>
                    <NavLink className={({ isActive }) => isActive ? activeLink : normalLink} to="/services">SERVICES</NavLink>
                    <NavLink className={({ isActive }) => isActive ? activeLink : normalLink} to="/contact">CONTACT</NavLink>
                </nav>

                <div className="flex items-center gap-2 md:gap-3">
                    {/* <div className="hidden sm:flex pill-nav p-3 rounded-full items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                        <span className="material-symbols-outlined text-xl">search</span>
                    </div> */}

                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <Link to={user.role === 'admin' ? '/admin/dashboard' : '/client/dashboard'}>
                                    <button className="bg-primary hover:bg-white hover:text-black text-black px-6 py-3 rounded-full text-xs font-bold tracking-widest transition-all uppercase">
                                        Dashboard
                                    </button>
                                </Link>
                                <button onClick={handleLogout} className="pill-nav px-4 py-3 rounded-full text-xs font-bold tracking-widest hover:bg-red-500 hover:text-white transition-all uppercase">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <button className="bg-primary hover:bg-white hover:text-black text-black px-6 py-3 rounded-full text-xs font-bold tracking-widest transition-all uppercase">
                                    Client_Login
                                </button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={toggleMenu} className="md:hidden flex items-center justify-center p-3 rounded-full bg-white/10 text-white hover:bg-primary hover:text-black transition-all">
                        <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            <div className={`fixed inset-0 bg-background-dark/95 backdrop-blur-xl z-[-1] transition-transform duration-500 md:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="flex flex-col items-center justify-center h-full gap-8 p-10">
                    <NavLink onClick={closeMenu} className={({ isActive }) => `text-4xl font-black italic tracking-tighter transition-colors uppercase ${isActive ? 'text-primary' : 'hover:text-primary'}`} to="/about">About Me</NavLink>
                    <NavLink onClick={closeMenu} className={({ isActive }) => `text-4xl font-black italic tracking-tighter transition-colors uppercase ${isActive ? 'text-primary' : 'hover:text-primary'}`} to="/projects">Projects</NavLink>
                    <NavLink onClick={closeMenu} className={({ isActive }) => `text-4xl font-black italic tracking-tighter transition-colors uppercase ${isActive ? 'text-primary' : 'hover:text-primary'}`} to="/services">Services</NavLink>
                    <NavLink onClick={closeMenu} className={({ isActive }) => `text-4xl font-black italic tracking-tighter transition-colors uppercase ${isActive ? 'text-primary' : 'hover:text-primary'}`} to="/contact">Contact</NavLink>

                    <div className="w-full h-px bg-white/10 my-4"></div>

                    {user ? (
                        <div className="flex flex-col items-center gap-6 w-full">
                            <Link onClick={closeMenu} to={user.role === 'admin' ? '/admin/dashboard' : '/client/dashboard'} className="w-full">
                                <button className="w-full bg-primary text-black py-4 rounded-xl font-bold uppercase tracking-widest">Dashboard</button>
                            </Link>
                            <button onClick={handleLogout} className="w-full border border-red-500 text-red-500 py-4 rounded-xl font-bold uppercase tracking-widest">Logout</button>
                        </div>
                    ) : (
                        <Link onClick={closeMenu} to="/login" className="w-full">
                            <button className="w-full bg-primary text-black py-4 rounded-xl font-bold uppercase tracking-widest">Client Login</button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
