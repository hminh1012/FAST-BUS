import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { Clock, ArrowRight, ArrowLeft } from 'lucide-react';

const HistoryTable = () => {
    const [logs, setLogs] = useState([]);
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const logsRef = ref(db, 'attendance_logs');
        const usersRef = ref(db, 'users');

        const unsubscribeUsers = onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) setUsers(data);
        });

        const unsubscribeLogs = onValue(logsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const logsArray = Object.values(data).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                setLogs(logsArray);
            }
            setLoading(false);
        });

        return () => {
            unsubscribeUsers();
            unsubscribeLogs();
        };
    }, []);

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="text-blue-600" />
                History Log
            </h2>

            <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-500 border-b border-gray-200 text-sm uppercase tracking-wider">
                            <th className="p-3 font-medium">Time</th>
                            <th className="p-3 font-medium">Student</th>
                            <th className="p-3 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan="3" className="p-4 text-center text-gray-500">Loading...</td></tr>
                        ) : logs.length === 0 ? (
                            <tr><td colSpan="3" className="p-4 text-center text-gray-500">No history available</td></tr>
                        ) : (
                            logs.map((log, index) => {
                                const student = users[log.student_id];
                                const isCheckIn = log.action === 'check_in';
                                return (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-3 text-gray-600 font-mono text-sm">{formatTime(log.timestamp)}</td>
                                        <td className="p-3 text-gray-900 font-medium">{student?.name || log.student_id}</td>
                                        <td className="p-3">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${isCheckIn ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
                                                }`}>
                                                {isCheckIn ? <ArrowRight size={12} /> : <ArrowLeft size={12} />}
                                                {isCheckIn ? 'Check In' : 'Check Out'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HistoryTable;
