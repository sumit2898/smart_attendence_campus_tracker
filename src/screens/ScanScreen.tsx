
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

const ScanScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, addAttendance, addToOfflineQueue } = useStore();
  const [scanning, setScanning] = useState(false);
  const [success, setSuccess] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setScanning(true);
      }
    } catch (err) {
      console.error("Camera access denied", err);
      alert("Please allow camera access to scan codes.");
      navigate('/');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleManualScan = () => {
    // Simulate finding a valid QR
    setScanning(false);
    setSuccess(true);
    
    const record = {
      id: Math.random().toString(36).substr(2, 9),
      studentId: user?.id || 'anon',
      studentName: user?.name || 'Anonymous',
      timestamp: Date.now(),
      sessionId: 'sess-' + Math.random().toString(36).substr(2, 5),
      status: 'PRESENT' as const,
      isSynced: navigator.onLine
    };

    if (navigator.onLine) {
      addAttendance(record);
    } else {
      addToOfflineQueue(record);
    }

    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="p-4 flex items-center justify-between text-white">
        <button onClick={() => navigate('/')} className="p-2">
          <i className="fa-solid fa-arrow-left text-xl"></i>
        </button>
        <span className="font-bold">Scan Attendance QR</span>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 relative overflow-hidden flex items-center justify-center">
        {scanning && (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        )}

        {success ? (
          <div className="z-10 bg-white/10 backdrop-blur-md p-10 rounded-full flex flex-col items-center animate-bounce">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <i className="fa-solid fa-check text-4xl text-white"></i>
            </div>
            <p className="text-white font-bold text-xl uppercase tracking-widest">Verified!</p>
          </div>
        ) : (
          <div className="relative w-72 h-72">
            {/* Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg"></div>
            
            {/* Animated Scanning Line */}
            <div className="scanner-line absolute top-0 left-0 right-0 h-1 bg-indigo-500 shadow-[0_0_15px_#6366f1] z-20"></div>
          </div>
        )}
      </div>

      <div className="p-10 bg-black/40 backdrop-blur-sm text-center">
        <p className="text-white/60 mb-6 text-sm">Align the QR code within the frame to automatically scan attendance</p>
        <button 
          onClick={handleManualScan}
          className="bg-white text-black py-4 px-8 rounded-2xl font-bold flex items-center justify-center space-x-2 mx-auto"
        >
          <i className="fa-solid fa-bolt text-yellow-500"></i>
          <span>Simulate QR Found</span>
        </button>
      </div>
    </div>
  );
};

export default ScanScreen;
