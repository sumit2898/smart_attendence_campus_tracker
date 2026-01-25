
import React, { useState } from 'react';
import { useStore } from '../store';
import { UserRole } from '../types';

const LoginScreen: React.FC = () => {
  const setUser = useStore(state => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (role: UserRole) => {
    setLoading(true);
    // Simulate Auth
    setTimeout(() => {
      setUser({
        id: Math.random().toString(36).substr(2, 9),
        email: email || `${role.toLowerCase()}@campus.edu`,
        name: email.split('@')[0] || (role === UserRole.STUDENT ? "Alex Johnson" : "Prof. Smith"),
        role,
        deviceId: "DVC-" + Math.random().toString(36).toUpperCase().substr(2, 6)
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto mt-12 px-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-xl shadow-indigo-200">
          <i className="fa-solid fa-graduation-cap text-4xl text-white"></i>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">SCAT</h1>
        <p className="text-gray-500">Secure Campus Attendance Tracker</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campus Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="id@university.edu"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            disabled={loading}
            onClick={() => handleLogin(UserRole.STUDENT)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition flex flex-col items-center justify-center disabled:opacity-50"
          >
            <i className="fa-solid fa-user-graduate mb-1"></i>
            Student
          </button>
          <button 
            disabled={loading}
            onClick={() => handleLogin(UserRole.FACULTY)}
            className="bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-bold transition flex flex-col items-center justify-center disabled:opacity-50"
          >
            <i className="fa-solid fa-chalkboard-user mb-1"></i>
            Faculty
          </button>
        </div>
        
        <button 
          onClick={() => handleLogin(UserRole.ADMIN)}
          className="w-full mt-3 bg-white border border-gray-200 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
        >
          Login as Administrator
        </button>
      </div>

      <p className="text-center mt-8 text-sm text-gray-400">
        Requires Camera & Location Permissions
      </p>
    </div>
  );
};

export default LoginScreen;
