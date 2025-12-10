import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Lock, Mail } from "lucide-react";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        credentials
      );

      if (response.data.success && response.data.token) {
        alert("Login Successful!"); // --- CRITICAL FIX: STORE THE JWT TOKEN ---
        localStorage.setItem("token", response.data.token); // Optionally store user ID
        localStorage.setItem("studentId", response.data.studentId);
        navigate("/"); // Navigate to home after login success
      } else {
        // Fallback for unexpected successful response without token
        alert("Login failed due to incomplete server response.");
      }
    } catch (err) {
      // Use the message sent by the server for better debugging
      alert(
        err.response?.data?.message ||
          "Invalid Credentials. Please check your details."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-900 to-gray-900 p-4">
           {" "}
      <div className="bg-white/5 backdrop-blur-lg p-10 rounded-3xl shadow-2xl shadow-indigo-900/50 w-full max-w-md border border-white/10 transition-all duration-500">
               {" "}
        <div className="flex flex-col items-center mb-8">
                   {" "}
          <div className="bg-indigo-700/70 p-4 rounded-full mb-3 shadow-xl">
                        <LogIn className="text-white" size={32} />         {" "}
          </div>
                   {" "}
          <h2 className="text-4xl font-extrabold text-white mb-1">
            Welcome Back
          </h2>
                   {" "}
          <p className="text-gray-300 mt-2 text-center">
            Enter your college credentials to access the CRS portal
          </p>
                 {" "}
        </div>
               {" "}
        <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email Input */}         {" "}
          <div className="relative">
                       {" "}
            <Mail
              className="absolute left-3 top-3.5 text-indigo-400"
              size={20}
            />
                       {" "}
            <input
              type="email"
              name="email"
              value={credentials.email}
              placeholder="College Email"
              className="w-full pl-10 p-3.5 border-none bg-white/10 text-white rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition placeholder-gray-400 shadow-inner"
              onChange={handleChange}
              required
            />
                     {" "}
          </div>
                    {/* Password Input */}         {" "}
          <div className="relative">
                       {" "}
            <Lock
              className="absolute left-3 top-3.5 text-indigo-400"
              size={20}
            />
                       {" "}
            <input
              type="password"
              name="password"
              value={credentials.password}
              placeholder="Password"
              className="w-full pl-10 p-3.5 border-none bg-white/10 text-white rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition placeholder-gray-400 shadow-inner"
              onChange={handleChange}
              required
            />
                     {" "}
          </div>
                   {" "}
          <div className="text-right pt-1">
                       {" "}
            <a
              href="#"
              className="text-sm text-indigo-300 hover:text-white hover:underline transition"
            >
              Forgot Password?
            </a>
                     {" "}
          </div>
                   {" "}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-extrabold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-500/50 transition-all duration-300 active:scale-[0.98]"
          >
                        Access Portal          {" "}
          </button>
                 {" "}
        </form>
               {" "}
        <div className="mt-10 text-center text-gray-400">
                   {" "}
          <p>
            Don't have an account?            {" "}
            <Link
              to="/register"
              className="text-indigo-400 font-semibold hover:text-white hover:underline ml-1 transition"
            >
              Register Now
            </Link>
                     {" "}
          </p>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default Login;
