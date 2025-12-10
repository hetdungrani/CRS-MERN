import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Lock, Mail } from "lucide-react";
import axios from "axios";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", credentials);

      if (response.data.success && response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        navigate("/admin");
      } else {
        alert("Login failed due to incomplete server response.");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid Credentials. Please check your details.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-white">
      <div className="admin-card p-10 rounded-3xl w-full max-w-md">
        <div className="flex flex-col items-center mb-8 text-center space-y-2">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-lg">
            <LogIn className="text-white" size={28} />
          </div>
          <h2 className="text-3xl font-bold">Admin Login</h2>
          <p className="text-slate-300">Enter your admin credentials to access the console.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-indigo-100" size={18} />
            <input
              type="email"
              name="email"
              value={credentials.email}
              placeholder="Admin Email"
              className="w-full pl-10 p-3.5 border border-white/10 bg-white/5 text-white rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none placeholder-slate-400"
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-indigo-100" size={18} />
            <input
              type="password"
              name="password"
              value={credentials.password}
              placeholder="Password"
              className="w-full pl-10 p-3.5 border border-white/10 bg-white/5 text-white rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none placeholder-slate-400"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="w-full admin-btn justify-center py-3">
            Access Console
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;