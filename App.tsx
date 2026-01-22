
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import { UserRole } from './types';

// Screens
import LoginScreen from './screens/LoginScreen';
import StudentDashboard from './screens/StudentDashboard';
import FacultyDashboard from './screens/FacultyDashboard';
import AdminDashboard from './screens/AdminDashboard';
import ScanScreen from './screens/ScanScreen';
import HistoryScreen from './screens/HistoryScreen';
import OfflineQueueScreen from './screens/OfflineQueueScreen';

// Components
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const { user, isAuthenticated } = useStore();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {!isOnline && (
          <div className="bg-orange-500 text-white text-center py-1 text-xs font-bold animate-pulse">
            OFFLINE MODE - RECORDS WILL BE QUEUED
          </div>
        )}
        
        {isAuthenticated && <Navbar />}
        
        <main className="flex-1 container mx-auto px-4 py-6">
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <LoginScreen /> : <Navigate to="/" />} />
            
            <Route path="/" element={
              isAuthenticated ? (
                user?.role === UserRole.STUDENT ? <StudentDashboard /> :
                user?.role === UserRole.FACULTY ? <FacultyDashboard /> :
                <AdminDashboard />
              ) : <Navigate to="/login" />
            } />

            <Route path="/scan" element={isAuthenticated ? <ScanScreen /> : <Navigate to="/login" />} />
            <Route path="/history" element={isAuthenticated ? <HistoryScreen /> : <Navigate to="/login" />} />
            <Route path="/queue" element={isAuthenticated ? <OfflineQueueScreen /> : <Navigate to="/login" />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
