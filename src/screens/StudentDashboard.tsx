
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';

const StudentDashboard: React.FC = () => {
  const { user, attendanceHistory } = useStore();
  
  const stats = {
    present: attendanceHistory.filter(h => h.status === 'PRESENT').length,
    late: attendanceHistory.filter(h => h.status === 'LATE').length,
    total: 32, // More realistic semester total
  };

  const attendancePercentage = Math.round(((stats.present + (stats.late * 0.5)) / stats.total) * 100);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h2 className="text-3xl font-black mb-1 italic">Hey {user?.name.split(' ')[0]}!</h2>
            <p className="text-indigo-100 font-medium flex items-center">
               <i className="fa-solid fa-location-dot mr-2 text-indigo-300"></i>
               Science Block • Level 3
            </p>
          </div>
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
            <i className="fa-solid fa-bell-concierge text-xl"></i>
          </div>
        </div>
        
        <div className="mt-10 flex items-center justify-between relative z-10">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-indigo-200 mb-1">Semester Progress</p>
            <div className="flex items-baseline space-x-1">
               <span className="text-5xl font-black">{attendancePercentage}%</span>
               <span className="text-xs font-bold text-indigo-300">Avg.</span>
            </div>
          </div>
          
          <div className="h-24 w-24 relative flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90 scale-110">
              <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.15)" strokeWidth="10" fill="transparent" />
              <circle cx="48" cy="48" r="40" stroke="white" strokeWidth="10" fill="transparent" 
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - attendancePercentage / 100)}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               <i className="fa-solid fa-shield-halved text-white/40 text-xs mb-1"></i>
               <span className="text-[10px] font-black leading-none">SAFE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link to="/scan" className="group bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-4 active:scale-95 transition-all hover:shadow-lg hover:border-indigo-100">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 transition-transform group-hover:scale-110">
            <i className="fa-solid fa-qrcode text-3xl"></i>
          </div>
          <div>
             <span className="block font-black text-gray-800">Scan QR</span>
             <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Enter Class</span>
          </div>
        </Link>
        <Link to="/history" className="group bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-4 active:scale-95 transition-all hover:shadow-lg hover:border-blue-100">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 transition-transform group-hover:scale-110">
            <i className="fa-solid fa-timeline text-3xl"></i>
          </div>
          <div>
            <span className="block font-black text-gray-800">Logs</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">View History</span>
          </div>
        </Link>
      </div>

      <div className="pt-2">
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-lg font-black text-gray-900">Today's Schedule</h3>
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">October 24</span>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-gray-100 flex items-center justify-between group hover:border-indigo-500 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex flex-col items-center justify-center text-indigo-600 font-black">
                <span className="text-lg leading-none">09</span>
                <span className="text-[8px] uppercase">AM</span>
              </div>
              <div>
                <h4 className="font-black text-gray-800">Advanced AI Lab</h4>
                <div className="flex items-center space-x-3 text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">
                   <span className="flex items-center"><i className="fa-solid fa-user-tie mr-1"></i> Dr. Peterson</span>
                   <span className="flex items-center text-green-600"><i className="fa-solid fa-circle-dot mr-1 text-[6px]"></i> Room 402</span>
                </div>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
               <i className="fa-solid fa-chevron-right text-xs"></i>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 flex items-center justify-between opacity-60">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex flex-col items-center justify-center text-gray-400 font-black">
                <span className="text-lg leading-none">11</span>
                <span className="text-[8px] uppercase">AM</span>
              </div>
              <div>
                <h4 className="font-black text-gray-800">Discrete Math</h4>
                <div className="flex items-center space-x-3 text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">
                   <span className="flex items-center">Dr. Aris</span>
                   <span className="flex items-center">Hall B</span>
                </div>
              </div>
            </div>
            <div className="px-3 py-1 bg-gray-100 rounded-full text-[8px] font-black text-gray-400 uppercase">Pending</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
