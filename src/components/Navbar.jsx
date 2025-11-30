import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/">
                        <img src="/fast_logo.png" alt="FAST Logo" className="h-16 object-contain" />
                    </Link>
                </div>

                {/* Main Navigation - Larger Text */}
                <nav className="hidden md:flex items-center gap-8 text-lg font-medium text-gray-800">
                    <Link to="/" className="hover:text-[#8B0000] transition-colors">Home</Link>
                    <Link to="/about" className="hover:text-[#8B0000] transition-colors">About FAST</Link>
                    <Link to="/admissions" className="hover:text-[#8B0000] transition-colors">Admissions</Link>
                    <Link to="/training" className="hover:text-[#8B0000] transition-colors">Training</Link>
                    <Link to="/research" className="hover:text-[#8B0000] transition-colors">Research</Link>
                    <Link to="/dashboard" className="bg-[#8B0000] text-white px-4 py-2 rounded hover:bg-[#600000] transition-colors">
                        Dashboard
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="h-10 w-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[#8B0000] font-bold text-lg">
                            {user.email?.charAt(0).toUpperCase() || 'A'}
                        </div>
                    ) : (
                        <Link to="/login" className="text-lg font-medium text-gray-700 hover:text-[#8B0000]">Login</Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
