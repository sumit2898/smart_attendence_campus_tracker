
import React from 'react';
import { useStore } from '../store';

const HistoryScreen: React.FC = () => {
  const { attendanceHistory } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Attendance Log</h2>
        <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
          {attendanceHistory.length} Sessions
        </div>
      </div>

      <div className="space-y-4">
        {attendanceHistory.length > 0 ? (
          attendanceHistory.map((record) => (
            <div key={record.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-indigo-600 border border-gray-100">
                  <i className="fa-solid fa-calendar-check text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Lecture Verification</h4>
                  <p className="text-sm text-gray-400">{new Date(record.timestamp).toLocaleString()}</p>
                  <div className="flex items-center mt-1 space-x-2 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>Room 102 (Geofenced)</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${record.status === 'PRESENT' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {record.status}
                </span>
                {!record.isSynced && (
                   <span className="text-[10px] text-orange-500 font-bold italic">
                     <i className="fa-solid fa-cloud-arrow-up mr-1"></i> Pending Sync
                   </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-50 rounded-full mx-auto flex items-center justify-center mb-4 text-gray-300">
              <i className="fa-solid fa-folder-open text-2xl"></i>
            </div>
            <h3 className="text-gray-900 font-bold">Empty History</h3>
            <p className="text-gray-400 text-sm">You haven't scanned any attendance QR codes yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;
