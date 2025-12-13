import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Mail, Lock, GraduationCap, User } from "lucide-react";
import Toast from "../components/Toast";

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    cgpa: "",
  });
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/register", formData);
      if (res.status === 201 || res.data.message) {
        setFormData({ fullName: "", email: "", password: "", cgpa: "" });
        setToast({ message: "Registration successful! Redirecting to login...", type: "success" });
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      setToast({ message: err.response?.data?.error || "Registration Failed. Check server status.", type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-white">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <form
        onSubmit={handleSubmit}
        className="elevated-card p-10 rounded-3xl w-full max-w-lg space-y-6"
      >
        <div className="flex flex-col items-center space-y-3 text-center">
          <div className="soft-gradient p-4 rounded-2xl shadow-lg">
            <UserPlus className="text-white" size={30} />
          </div>
          <h2 className="text-3xl font-bold">Student Enrollment</h2>
          <p className="text-slate-300">Enter your details to join the recruitment portal.</p>
        </div>

        <div className="space-y-5">
          <div className="relative">
            <User className="absolute left-3 top-3 text-indigo-200" size={18} />
            <input
              name="fullName"
              placeholder="Full Name"
              className="w-full pl-10 p-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-cyan-400 outline-none placeholder-slate-400"
              onChange={handleChange}
              value={formData.fullName}
              required
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-indigo-200" size={18} />
            <input
              name="email"
              type="email"
              placeholder="College Email"
              className="w-full pl-10 p-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-cyan-400 outline-none placeholder-slate-400"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-indigo-200" size={18} />
            <input
              name="password"
              type="password"
              placeholder="Create Password"
              className="w-full pl-10 p-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-cyan-400 outline-none placeholder-slate-400"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </div>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-3 text-indigo-200" size={18} />
            <input
              name="cgpa"
              type="number"
              step="0.01"
              placeholder="Current CGPA (e.g., 8.5)"
              className="w-full pl-10 p-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-cyan-400 outline-none placeholder-slate-400"
              onChange={handleChange}
              value={formData.cgpa}
              required
            />
          </div>

          <button type="submit" className="w-full btn-primary justify-center py-3">
            Complete Registration
          </button>
        </div>

        <div className="text-center text-slate-300 text-sm">
          <Link to="/login" className="text-cyan-300 hover:text-white font-semibold">
            Already registered? Log in here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;