import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, Shield, Clock } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-24">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                        Smart School Transport <br />
                        <span className="text-[#8B0000] text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                            Management System
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Real-time tracking, automated attendance, and enhanced safety for students.
                        The future of school transportation is here.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/dashboard" className="bg-[#8B0000] hover:bg-[#600000] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg">
                            Go to Dashboard
                        </Link>
                        <Link to="/about" className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all">
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FAST Transport?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our system integrates cutting-edge technology to ensure the safety and efficiency of student transportation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Bus className="w-12 h-12 text-[#8B0000]" />}
                            title="Real-Time Tracking"
                            description="Monitor bus locations in real-time with our advanced GPS integration."
                        />
                        <FeatureCard
                            icon={<Shield className="w-12 h-12 text-[#8B0000]" />}
                            title="Enhanced Safety"
                            description="Automated check-ins and check-outs ensure no student is left behind."
                        />
                        <FeatureCard
                            icon={<Clock className="w-12 h-12 text-[#8B0000]" />}
                            title="History & Logs"
                            description="Access detailed travel history and attendance logs for complete transparency."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
        <div className="mb-6">{icon}</div>
        <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

export default LandingPage;
