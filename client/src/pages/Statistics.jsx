import React from "react";
import { TrendingUp, Target, Users, Briefcase } from "lucide-react";

const metrics = [
  { label: "Students Placed", value: "92%", tone: "from-emerald-500 to-cyan-400", icon: <TrendingUp size={22} /> },
  { label: "Hiring Partners", value: "85+", tone: "from-indigo-500 to-blue-500", icon: <Briefcase size={22} /> },
  { label: "Highest Package", value: "32 LPA", tone: "from-orange-500 to-amber-400", icon: <Target size={22} /> },
  { label: "Yearly Drives", value: "48", tone: "from-pink-500 to-red-400", icon: <Users size={22} /> },
];

const Statistics = () => {
  return (
    <div className="section-shell py-14 text-white">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <p className="pill mx-auto">Placement Pulse</p>
        <h1 className="heading-lg">Outcomes that keep improving year over year</h1>
        <p className="text-slate-300">
          A transparent snapshot of how students, recruiters, and placement teams collaborate through CRS to improve hiring outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl p-6 elevated-card">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.tone} text-white`}>
                {metric.icon}
              </div>
              <span className="text-sm text-slate-300 uppercase tracking-wide">{metric.label}</span>
            </div>
            <p className="text-4xl font-bold">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl elevated-card p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Campus to Offer time", value: "21 days", desc: "Average turnaround across roles" },
          { title: "Offer acceptance", value: "87%", desc: "Students accepting first choice offers" },
          { title: "Repeat recruiters", value: "72%", desc: "Industry partners returning every season" },
        ].map((item) => (
          <div key={item.title} className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-sm text-slate-300">{item.title}</p>
            <p className="text-2xl font-bold text-white mt-2">{item.value}</p>
            <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;