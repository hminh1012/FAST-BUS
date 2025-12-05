import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { auth } from './firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null); // Firebase Auth User (System)
  const [loading, setLoading] = useState(true);
  const [currentStudent, setCurrentStudent] = useState(null); // App User (Student)

  useEffect(() => {
    // Check for saved student session
    const savedStudent = localStorage.getItem('currentStudent');
    if (savedStudent) {
      setCurrentStudent(JSON.parse(savedStudent));
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Auto-login with the credentials from the original app
    // Note: In a real app, you'd want a proper login page instead of auto-login
    const email = 'tranhoangminh675@gmail.com';
    const password = 'kuroba12';

    if (!auth.currentUser) {
      signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
          console.error("Auto-login failed:", error);
        });
    }

    return () => unsubscribe();
  }, []);

  const handleStudentLogin = (student) => {
    setCurrentStudent(student);
    localStorage.setItem('currentStudent', JSON.stringify(student));
  };

  const handleStudentLogout = () => {
    setCurrentStudent(null);
    localStorage.removeItem('currentStudent');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
        {/* Only show Navbar if not on Login page (optional, but cleaner) */}
        <Navbar user={user} student={currentStudent} onLogout={handleStudentLogout} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={
                currentStudent ? <Navigate to="/dashboard" /> : <Login onLogin={handleStudentLogin} />
              }
            />
            <Route
              path="/dashboard"
              element={
                currentStudent ? <Dashboard currentStudent={currentStudent} /> : <Navigate to="/login" />
              }
            />
            {/* Add more routes as needed */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
