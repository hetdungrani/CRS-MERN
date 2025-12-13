import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Lock, Mail } from "lucide-react";
import axios from "axios";
import Toast from "../components/Toast";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", credentials);

      if (response.data.success && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("studentId", response.data.studentId);
        setToast({ message: "Login successful! Redirecting...", type: "success" });
        setTimeout(() => navigate("/"), 1000);
      } else {
        setToast({ message: "Login failed due to incomplete server response.", type: "error" });
      }
    } catch (err) {
      setToast({ message: err.response?.data?.message || "Invalid Credentials. Please check your details.", type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-white">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="elevated-card p-10 rounded-3xl w-full max-w-md">
        <div className="flex flex-col items-center mb-8 text-center space-y-2">
          <div className="soft-gradient p-4 rounded-2xl shadow-lg">
            <LogIn className="text-white" size={28} />
          </div>
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="text-slate-300">Enter your credentials to access the CRS portal.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-indigo-200" size={18} />
            <input
              type="email"
              name="email"
              value={credentials.email}
              placeholder="College Email"
              className="w-full pl-10 p-3.5 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none placeholder-slate-400"
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-indigo-200" size={18} />
            <input
              type="password"
              name="password"
              value={credentials.password}
              placeholder="Password"
              className="w-full pl-10 p-3.5 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none placeholder-slate-400"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full btn-primary justify-center py-3 shadow-indigo-500/30"
          >
            Access Portal
          </button>
        </form>

        <div className="mt-8 text-center text-slate-300 text-sm">
          <p>
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-cyan-300 font-semibold hover:text-white">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
