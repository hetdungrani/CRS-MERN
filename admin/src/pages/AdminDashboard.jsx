import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, Briefcase, TrendingUp, Award } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ studentCount: 0, jobCount: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const studentRes = await axios.get("http://localhost:5000/api/students", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats({
          studentCount: studentRes.data.length,
          jobCount: 5,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
        alert("Failed to fetch dashboard stats. Please check your connection or login status.");
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: "Total Students", value: stats.studentCount, icon: <Users size={22} />, tone: "from-indigo-500 to-cyan-400" },
    { title: "Active Jobs", value: stats.jobCount, icon: <Briefcase size={22} />, tone: "from-violet-500 to-blue-500" },
    { title: "Placed Students", value: "42", icon: <Award size={22} />, tone: "from-emerald-500 to-teal-400" },
    { title: "Placement Rate", value: "88%", icon: <TrendingUp size={22} />, tone: "from-amber-500 to-orange-400" },
  ];

  return (
    <div className="admin-shell py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <p className="admin-pill mb-2">Control Panel</p>
          <h1 className="text-3xl font-bold text-white">TPO Dashboard</h1>
          <p className="text-slate-300">Monitor activity, drive readiness, and posted roles.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => (
          <div key={card.title} className="admin-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${card.tone} text-white`}>{card.icon}</div>
              <span className="text-xs uppercase tracking-wide text-slate-300">{card.title}</span>
            </div>
            <p className="text-3xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="admin-card rounded-3xl p-8 text-slate-200">
        <h2 className="text-xl font-semibold text-white mb-3">Quick Management</h2>
        <p className="text-slate-300">
          Welcome back, Placement Officer. Use the navigation bar to manage student records or broadcast new job opportunities to your campus community.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;