import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Briefcase, TrendingUp, Award } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ studentCount: 0, jobCount: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken'); // Retrieve token from local storage
        const studentRes = await axios.get('http://localhost:5000/api/students', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Logic to simulate dynamic analytics
        setStats({
          studentCount: studentRes.data.length,
          jobCount: 5, // Placeholder for active job posts
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        alert('Failed to fetch dashboard stats. Please check your connection or login status.');
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: "Total Students", value: stats.studentCount, icon: <Users size={24}/>, color: "bg-blue-500" },
    { title: "Active Jobs", value: stats.jobCount, icon: <Briefcase size={24}/>, color: "bg-purple-500" },
    { title: "Placed Students", value: "42", icon: <Award size={24}/>, color: "bg-green-500" },
    { title: "Placement Rate", value: "88%", icon: <TrendingUp size={24}/>, color: "bg-orange-500" },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">TPO Control Panel</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, idx) => (
          <div key={idx} className={`${card.color} text-white p-6 rounded-2xl shadow-lg transition transform hover:scale-105`}>
            <div className="flex justify-between items-center mb-4">
              <span className="opacity-80 font-medium">{card.title}</span>
              {card.icon}
            </div>
            <span className="text-3xl font-bold">{card.value}</span>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Quick Management</h2>
        <p className="text-gray-500">Welcome back, Placement Officer. Use the navigation sidebar to manage student records or broadcast new job opportunities to the cloud database[cite: 6, 8].</p>
      </div>
    </div>
  );
};

export default AdminDashboard;