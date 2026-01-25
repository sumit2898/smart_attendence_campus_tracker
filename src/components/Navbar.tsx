
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { UserRole } from '../types';

const Navbar: React.FC = () => {
  const { user, setUser, offlineQueue } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-qrcode text-indigo-700"></i>
          </div>
          <span className="font-bold text-xl tracking-tight">SCAT</span>
        </Link>

        <div className="flex items-center space-x-4">
          {user?.role === UserRole.STUDENT && (
            <Link to="/scan" className="hover:bg-indigo-600 p-2 rounded-full transition">
              <i className="fa-solid fa-camera"></i>
            </Link>
          )}
          
          <Link to="/history" className="hover:bg-indigo-600 p-2 rounded-full transition">
            <i className="fa-solid fa-clock-rotate-left"></i>
          </Link>

          {offlineQueue.length > 0 && (
            <Link to="/queue" className="relative hover:bg-indigo-600 p-2 rounded-full transition">
              <i className="fa-solid fa-cloud-arrow-up"></i>
              <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {offlineQueue.length}
              </span>
            </Link>
          )}

          <button 
            onClick={handleLogout}
            className="bg-indigo-800 hover:bg-indigo-900 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
