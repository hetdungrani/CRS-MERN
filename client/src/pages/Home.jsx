import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex flex-col items-center justify-center text-white p-6">
    <h1 className="text-5xl font-bold mb-4">Campus Recruitment System</h1>
    <p className="text-xl mb-8 max-w-2xl text-center">A digital bridge between students and top-tier opportunities. Start your career journey today.</p>
    <div className="flex gap-4">
      <Link to="/register" className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">Student Register</Link>
      <Link to="/jobs" className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition">View Jobs</Link>
    </div>
  </div>
);

export default Home;