import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', formData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setFormData({ email: '', password: '' });
      navigate('/', { replace: true });
      window.location.reload(); 
    } catch (err) {
      alert(err.response?.data?.message || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 mt-3 font-medium">Please enter your details to sign in</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              type="email" 
              required
              value={formData.email}
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all duration-300 placeholder:text-slate-300"
              placeholder="admin@dreamhome.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <input 
              type="password" 
              required
              value={formData.password}
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all duration-300 placeholder:text-slate-300"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-100 transition-all duration-300 active:scale-95 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>
        
        <div className="mt-10 text-center">
          <p className="text-slate-500 font-medium">
            Don't have an account? <Link to="/register" className="text-blue-600 font-bold hover:underline underline-offset-4">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;