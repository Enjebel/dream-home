import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return alert("Passwords do not match!");

    setLoading(true);
    try {
      await API.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      alert("Account Created Successfully!");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="max-w-md w-full bg-white p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Join Us</h2>
          <p className="text-slate-400 mt-3 font-medium">Start your luxury real estate journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <input 
            type="text" 
            placeholder="Full Name"
            className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all duration-300"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input 
            type="email" 
            placeholder="Email Address"
            className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all duration-300"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input 
            type="password" 
            placeholder="Create Password"
            className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all duration-300"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <input 
            type="password" 
            placeholder="Confirm Password"
            className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all duration-300"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-black text-white font-extrabold py-5 rounded-2xl shadow-xl transition-all duration-300 active:scale-95 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        
        <div className="mt-10 text-center">
          <p className="text-slate-500 font-medium">
            Already a member? <Link to="/login" className="text-blue-600 font-bold hover:underline underline-offset-4">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;