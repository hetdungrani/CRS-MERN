import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, GraduationCap, User } from 'lucide-react'; // Added icons for inputs

const Registration = () => {
  // State initialization for form fields
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    password: '', 
    cgpa: '' 
  });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to backend 
      const res = await axios.post('http://localhost:5000/api/register', formData);
      
      // Check for success (assuming backend sends HTTP 201 or a success message)
      if (res.status === 201 || res.data.message) {
          alert("Registration Successful! Please log in.");
          
          // 1. CLEAR THE FORM
          setFormData({ fullName: '', email: '', password: '', cgpa: '' }); 
          
          // 2. REDIRECT TO LOGIN PAGE
          navigate('/login'); 
      }
    } catch (err) {
      // Handle error responses from the backend
      alert("Error: " + (err.response?.data?.error || "Registration Failed. Check server status."));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-700 to-cyan-500 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg border-t-8 border-green-500 transition-all duration-300">
        
        <div className="flex flex-col items-center mb-8">
            <div className="bg-green-100 p-4 rounded-full mb-4 shadow-md">
                <UserPlus className="text-green-600" size={32} />
            </div>
            <h2 className="text-4xl font-extrabold text-gray-800 mb-1">Student Enrollment</h2>
            <p className="text-gray-500 text-center">Enter your details to join the recruitment portal</p>
        </div>

        <div className="space-y-5">
            {/* Full Name Input */}
            <div className="relative">
                <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input 
                    name="fullName" 
                    placeholder="Legal Full Name" 
                    className="w-full pl-10 p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition shadow-sm" 
                    onChange={handleChange} 
                    value={formData.fullName}
                    required 
                />
            </div>
            
            {/* Email Input */}
            <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input 
                    name="email" 
                    type="email" 
                    placeholder="College Email" 
                    className="w-full pl-10 p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition shadow-sm" 
                    onChange={handleChange} 
                    value={formData.email}
                    required 
                />
            </div>

            {/* Password Input */}
            <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Create Password" 
                    className="w-full pl-10 p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition shadow-sm" 
                    onChange={handleChange} 
                    value={formData.password}
                    required 
                />
            </div>

            {/* CGPA Input */}
            <div className="relative">
                <GraduationCap className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input 
                    name="cgpa" 
                    type="number" 
                    step="0.01" 
                    placeholder="Current CGPA (e.g., 8.5)" 
                    className="w-full pl-10 p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition shadow-sm" 
                    onChange={handleChange} 
                    value={formData.cgpa}
                    required 
                />
            </div>

            <button 
                type="submit"
                className="w-full bg-green-600 text-white py-4 rounded-xl font-extrabold text-lg hover:bg-green-700 transition shadow-lg shadow-green-200 active:scale-[0.98] duration-300"
            >
                Complete Registration
            </button>
        </div>
        
        <div className="mt-8 text-center">
            <Link to="/login" className="text-gray-500 hover:text-blue-600 hover:underline text-sm font-medium transition">
                Already Registered? Log In Here
            </Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;