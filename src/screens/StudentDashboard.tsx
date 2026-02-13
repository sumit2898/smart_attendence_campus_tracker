
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { analyzeAttendanceTrends } from '../services/geminiService';

const StudentDashboard: React.FC = () => {
  const { user, attendanceHistory, schedule, aiInsights, setAiInsights } = useStore();
  const [analyzing, setAnalyzing] = useState(false);

  const stats = {
    present: attendanceHistory.filter(h => h.status === 'PRESENT').length,
    late: attendanceHistory.filter(h => h.status === 'LATE').length,
    total: 32, // More realistic semester total
  };

  const attendancePercentage = Math.round(((stats.present + (stats.late * 0.5)) / stats.total) * 100);

  const handleAnalyzeRisk = async () => {
    setAnalyzing(true);
    const result = await analyzeAttendanceTrends(attendanceHistory);
    if (result) {
      setAiInsights(result);
    }
    setAnalyzing(false);
  };

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

      {/* AI Insights Card */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-[100px] -mr-8 -mt-8 z-0"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <i className="fa-solid fa-wand-magic-sparkles text-sm"></i>
              </div>
              <h3 className="font-black text-gray-900">AI Risk Analysis</h3>
            </div>
            {!aiInsights && (
              <button
                onClick={handleAnalyzeRisk}
                disabled={analyzing}
                className="bg-black text-white text-xs font-bold px-4 py-2 rounded-full active:scale-95 transition-transform"
              >
                {analyzing ? 'Analying...' : 'Analyze Now'}
              </button>
            )}
          </div>

          {aiInsights ? (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Risk Score</span>
                <span className={`text-xl font-black ${aiInsights.status === 'CRITICAL' ? 'text-red-500' :
                    aiInsights.status === 'WARNING' ? 'text-orange-500' : 'text-green-500'
                  }`}>
                  {aiInsights.riskScore}/100
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full mb-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${aiInsights.status === 'CRITICAL' ? 'bg-red-500' :
                      aiInsights.status === 'WARNING' ? 'bg-orange-500' : 'bg-green-500'
                    }`}
                  style={{ width: `${aiInsights.riskScore}%` }}
                />
              </div>
              <p className="text-xs font-medium text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                <i className="fa-solid fa-quote-left mr-2 text-gray-300"></i>
                {aiInsights.recommendation}
              </p>
            </div>
          ) : (
            <p className="text-xs text-gray-400 font-medium">
              Get personalized insights on your attendance patterns and risk of detention.
            </p>
          )}
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
          {schedule.map((item) => (
            <div key={item.id} className={`bg-white p-5 rounded-3xl border border-gray-100 flex items-center justify-between transition-colors ${item.status === 'UPCOMING' ? 'group hover:border-indigo-500' : 'opacity-60'
              }`}>
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black ${item.status === 'UPCOMING' ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-50 text-gray-400'
                  }`}>
                  <span className="text-lg leading-none">{item.time.split(' ')[0]}</span>
                  <span className="text-[8px] uppercase">{item.time.split(' ')[1]}</span>
                </div>
                <div>
                  <h4 className="font-black text-gray-800">{item.courseName}</h4>
                  <div className="flex items-center space-x-3 text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">
                    <span className="flex items-center"><i className="fa-solid fa-user-tie mr-1"></i> {item.professor}</span>
                    <span className="flex items-center text-green-600"><i className="fa-solid fa-circle-dot mr-1 text-[6px]"></i> Room {item.room}</span>
                  </div>
                </div>
              </div>
              {item.status === 'UPCOMING' ? (
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                </div>
              ) : (
                <div className="px-3 py-1 bg-gray-100 rounded-full text-[8px] font-black text-gray-400 uppercase">{item.status}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
