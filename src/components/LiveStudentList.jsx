import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { getCurrentPassengers } from '../utils/busLogic';
import { User, UserCheck } from 'lucide-react';

const LiveStudentList = () => {
    const [passengers, setPassengers] = useState([]);
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const logsRef = ref(db, 'attendance_logs');
        const usersRef = ref(db, 'users');

        // Fetch users once or listen for changes if users are dynamic
        const unsubscribeUsers = onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setUsers(data);
            }
        });

        const unsubscribeLogs = onValue(logsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert object to array if needed, assuming logs are pushed with keys
                const logsArray = Object.values(data);
                const currentPassengerIds = getCurrentPassengers(logsArray);
                setPassengers(currentPassengerIds);
            } else {
                setPassengers([]);
            }
            setLoading(false);
        });

        return () => {
            unsubscribeUsers();
            unsubscribeLogs();
        };
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <UserCheck className="text-green-600" />
                    Live Occupancy
                </h2>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                    {passengers.length} On Board
                </span>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {loading ? (
                    <p className="text-gray-500 text-center py-4">Loading...</p>
                ) : passengers.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        <User className="w-12 h-12 mx-auto mb-2 opacity-20" />
                        <p>Bus is currently empty</p>
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {passengers.map((studentId) => {
                            const student = users[studentId];
                            return (
                                <li key={studentId} className="bg-gray-50 rounded-lg p-3 flex items-center gap-3 border border-gray-100 hover:border-gray-200 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
                                        {student?.name ? student.name.charAt(0).toUpperCase() : '?'}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{student?.name || `ID: ${studentId}`}</p>
                                        <p className="text-xs text-gray-500">{student?.class || 'Student'}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default LiveStudentList;
