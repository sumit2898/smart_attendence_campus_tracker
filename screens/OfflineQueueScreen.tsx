
import React, { useState } from 'react';
import { useStore } from '../store';

const OfflineQueueScreen: React.FC = () => {
  const { offlineQueue, syncOfflineQueue } = useStore();
  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    setSyncing(true);
    await syncOfflineQueue();
    setSyncing(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-orange-600 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
            <i className="fa-solid fa-cloud-slash text-2xl"></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Offline Storage</h2>
            <p className="opacity-80">{offlineQueue.length} records waiting for sync</p>
          </div>
        </div>
        
        <button 
          onClick={handleSync}
          disabled={syncing || offlineQueue.length === 0}
          className="w-full bg-white text-orange-600 py-4 rounded-2xl font-bold shadow-lg hover:bg-gray-100 transition disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {syncing ? (
            <i className="fa-solid fa-spinner animate-spin"></i>
          ) : (
            <i className="fa-solid fa-cloud-arrow-up"></i>
          )}
          <span>{syncing ? 'Syncing...' : 'Sync Now'}</span>
        </button>
      </div>

      <div className="space-y-3">
        {offlineQueue.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                <i className="fa-solid fa-file-signature"></i>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm">Session {item.data.sessionId}</h4>
                <p className="text-[10px] text-gray-400 italic">Saved: {new Date(item.data.timestamp!).toLocaleTimeString()}</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Attempt {item.attempts}
            </span>
          </div>
        ))}
        {offlineQueue.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl text-gray-100 mb-4">
              <i className="fa-solid fa-check-double"></i>
            </div>
            <p className="text-gray-400">All data is currently up-to-date with server.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfflineQueueScreen;
