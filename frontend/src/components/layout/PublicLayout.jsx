import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const PublicLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-background-dark text-white font-body selection:bg-primary selection:text-black">
            <Navbar />
            <main className="flex-grow pt-24 md:pt-36">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout;
