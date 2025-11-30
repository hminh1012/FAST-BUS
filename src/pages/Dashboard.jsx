import React from 'react';
import MapComponent from '../components/MapComponent';
import LiveStudentList from '../components/LiveStudentList';
import HistoryTable from '../components/HistoryTable';

const Dashboard = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#8B0000] mb-2 uppercase">Transport Dashboard</h2>
                <p className="text-gray-500 italic text-lg">Real-time monitoring and management</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)] min-h-[600px]">
                {/* Map Section - Takes up 2 columns on large screens */}
                <div className="lg:col-span-2 h-[500px] lg:h-full shadow-md rounded-xl overflow-hidden border border-gray-200 bg-white">
                    <MapComponent />
                </div>

                {/* Right Column - Live List and History */}
                <div className="lg:col-span-1 flex flex-col gap-6 h-full">
                    <div className="flex-1 min-h-[300px] bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                        <LiveStudentList />
                    </div>
                    <div className="flex-1 min-h-[300px] bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                        <HistoryTable />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
