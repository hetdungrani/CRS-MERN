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
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        credentials
      );

      if (response.data.success && response.data.token) {
        alert("Login Successful!");
        localStorage.setItem("adminToken", response.data.token);
        navigate("/admin");
      } else {
        alert("Login failed due to incomplete server response.");
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Invalid Credentials. Please check your details."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-slate-800 p-4">
      <div className="bg-white/5 backdrop-blur-lg p-10 rounded-3xl shadow-2xl shadow-slate-900/50 w-full max-w-md border border-white/10 transition-all duration-500">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-slate-700/70 p-4 rounded-full mb-3 shadow-xl">
            <LogIn className="text-white" size={32} />
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-1">
            Admin Login
          </h2>
          <p className="text-gray-300 mt-2 text-center">
            Enter your admin credentials to access the console
          </p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail
              className="absolute left-3 top-3.5 text-slate-400"
              size={20}
            />
            <input
              type="email"
              name="email"
              value={credentials.email}
              placeholder="Admin Email"
              className="w-full pl-10 p-3.5 border-none bg-white/10 text-white rounded-xl focus:ring-2 focus:ring-slate-400 outline-none transition placeholder-gray-400 shadow-inner"
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <Lock
              className="absolute left-3 top-3.5 text-slate-400"
              size={20}
            />
            <input
              type="password"
              name="password"
              value={credentials.password}
              placeholder="Password"
              className="w-full pl-10 p-3.5 border-none bg-white/10 text-white rounded-xl focus:ring-2 focus:ring-slate-400 outline-none transition placeholder-gray-400 shadow-inner"
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-600 text-white py-4 rounded-xl font-extrabold text-lg hover:bg-slate-700 shadow-xl shadow-slate-500/50 transition-all duration-300 active:scale-[0.98]"
          >
            Access Console
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;