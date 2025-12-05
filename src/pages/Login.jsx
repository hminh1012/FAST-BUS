import React, { useState } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { UserCircle, CreditCard, LogIn, AlertCircle } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [studentId, setStudentId] = useState('');
    const [cccd, setCccd] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // 1. Check if inputs are provided
            if (!studentId || !cccd) {
                throw new Error('Please enter both Student ID and CCCD');
            }

            // 2. Fetch user data from Firebase
            const userRef = ref(db, `users/${studentId}`);
            const snapshot = await get(userRef);

            if (!snapshot.exists()) {
                throw new Error('Student ID not found');
            }

            const userData = snapshot.val();

            // 3. Verify CCCD
            // Note: Ensure your database has 'cccd' field for users
            if (userData.cccd !== cccd) {
                throw new Error('Incorrect CCCD');
            }

            // 4. Login successful
            const studentInfo = {
                id: studentId,
                ...userData
            };

            onLogin(studentInfo);
            navigate('/dashboard');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-[#8B0000] p-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">Student Portal</h2>
                    <p className="text-red-100">Enter your credentials to track your bus</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded flex items-start gap-3">
                                <AlertCircle className="text-red-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 block">Student ID</label>
                            <div className="relative">
                                <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. STUDENT001"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 block">CCCD (Identity Card)</label>
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={cccd}
                                    onChange={(e) => setCccd(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent outline-none transition-all"
                                    placeholder="Enter your CCCD number"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#8B0000] hover:bg-[#6d0000] text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform active:scale-95 duration-200"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Access Dashboard
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                        Protected System • Authorized Access Only
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
