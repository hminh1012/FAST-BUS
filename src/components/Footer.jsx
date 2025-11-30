import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">FAST</h3>
                        <p className="text-gray-400">
                            The Faculty of Advanced Science and Technology.<br />
                            "Thinking, Creating and Humanity Cherishing"
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact</h3>
                        <p className="text-gray-400">
                            Danang, Vietnam<br />
                            Email: contact@fast.edu.vn<br />
                            Phone: +84 123 456 789
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">About Us</a></li>
                            <li><a href="#" className="hover:text-white">Admissions</a></li>
                            <li><a href="#" className="hover:text-white">Research</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
                    &copy; {new Date().getFullYear()} Faculty of Advanced Science and Technology. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
