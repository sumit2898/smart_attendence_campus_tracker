
import React, { useState, useEffect } from 'react';
import { useStore } from '../store';

const FacultyDashboard: React.FC = () => {
  const { user } = useStore();
  const [token, setToken] = useState('token-' + Math.random().toString(36).substr(2, 9));
  const [timeLeft, setTimeLeft] = useState(10);
  const [activeStudents, setActiveStudents] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setToken('token-' + Math.random().toString(36).substr(2, 9));
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate real-time scans via "Socket.io" mock
    const studentAdder = setInterval(() => {
      const names = ["Marcus A.", "Sarah W.", "James T.", "Emma R.", "Lucas G."];
      const randomName = names[Math.floor(Math.random() * names.length)];
      setActiveStudents(prev => [randomName, ...prev].slice(0, 5));
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(studentAdder);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">CS402: Distributed Systems</h2>
          <p className="text-gray-400 text-sm mb-6">Scanning Active • Room 402B</p>
          
          <div className="bg-gray-50 p-6 rounded-3xl border-4 border-indigo-500/10 mb-6 relative">
             <div className="w-48 h-48 bg-white flex items-center justify-center overflow-hidden border border-gray-100 p-2">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${token}`} 
                  alt="Attendance QR"
                  className="w-full h-full grayscale contrast-125"
                />
             </div>
             {/* Dynamic Token Overlay */}
             <div className="absolute -top-3 -right-3 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg border-2 border-white">
                {timeLeft}s
             </div>
          </div>

          <div className="w-full bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-600 uppercase tracking-tighter">Live Session Token</span>
            </div>
            <span className="font-mono text-xs text-indigo-600">{token}</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
            <span>Live Scan Stream</span>
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">{activeStudents.length} Scanning</span>
          </h3>
          <div className="space-y-3">
            {activeStudents.map((name, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between animate-fadeIn">
                <div className="flex items-center space-x-3">
                  <img src={`https://picsum.photos/seed/${name}/40/40`} className="w-10 h-10 rounded-full bg-gray-100" alt="avatar" />
                  <div>
                    <p className="font-bold text-sm">{name}</p>
                    <p className="text-[10px] text-gray-400">Verified via iPhone 13 • 5G</p>
                  </div>
                </div>
                <div className="text-green-500">
                  <i className="fa-solid fa-circle-check"></i>
                </div>
              </div>
            ))}
            {activeStudents.length === 0 && (
              <div className="text-center py-10 bg-gray-50 rounded-3xl text-gray-400 italic">
                Waiting for students to scan...
              </div>
            )}
          </div>
        </div>

        <button className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-bold hover:bg-red-100 transition border border-red-100">
          End Attendance Session
        </button>
      </div>
    </div>
  );
};

export default FacultyDashboard;
