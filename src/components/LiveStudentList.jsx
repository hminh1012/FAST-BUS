import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { UserCheck, Bus, MapPin, Clock, AlertCircle } from 'lucide-react';

const LiveStudentList = ({ currentStudent }) => {
    const [status, setStatus] = useState({ state: 'unknown', timestamp: null, location: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const logsRef = ref(db, 'attendance_logs');

        const unsubscribeLogs = onValue(logsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const logsArray = Object.values(data);

                // Filter logs for this student and sort by time (newest first)
                const studentLogs = logsArray
                    .filter(log => log.student_id === currentStudent.id)
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

                if (studentLogs.length > 0) {
                    const lastLog = studentLogs[0];
                    setStatus({
                        state: lastLog.action === 'check_in' ? 'on_bus' : 'off_bus',
                        timestamp: lastLog.timestamp,
                        location: lastLog.location
                    });
                } else {
                    setStatus({ state: 'no_data', timestamp: null, location: null });
                }
            } else {
                setStatus({ state: 'no_data', timestamp: null, location: null });
            }
            setLoading(false);
        });

        return () => {
            unsubscribeLogs();
        };
    }, [currentStudent]);

    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
    };

    const renderStatusContent = () => {
        if (loading) return <p className="text-gray-500">Checking status...</p>;

        switch (status.state) {
            case 'on_bus':
                return (
                    <div className="p-8 rounded-2xl border-2 bg-green-50 border-green-200 transition-all duration-500">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center bg-green-100 text-green-600 animate-pulse">
                            <Bus size={48} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">On The Bus</h3>
                        <p className="text-green-700 font-medium mb-4">Student has checked in.</p>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-white/50 py-2 rounded-lg">
                            <Clock size={16} />
                            <span>Last update: {formatTime(status.timestamp)}</span>
                        </div>
                    </div>
                );
            case 'off_bus':
                return (
                    <div className="p-8 rounded-2xl border-2 bg-blue-50 border-blue-200 transition-all duration-500">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                            <MapPin size={48} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Checked Out</h3>
                        <p className="text-blue-700 font-medium mb-4">Student has left the bus.</p>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-white/50 py-2 rounded-lg">
                            <Clock size={16} />
                            <span>Time: {formatTime(status.timestamp)}</span>
                        </div>
                    </div>
                );
            default: // no_data
                return (
                    <div className="p-8 rounded-2xl border-2 bg-gray-50 border-gray-200">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center bg-gray-200 text-gray-400">
                            <AlertCircle size={48} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Activity</h3>
                        <p className="text-gray-500">No check-in/out records found for today.</p>
                    </div>
                );
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <UserCheck className="text-[#8B0000]" />
                    Current Status
                </h2>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center">
                {renderStatusContent()}
            </div>
        </div>
    );
};

export default LiveStudentList;
