import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, Clock, ArrowRight, BarChart, Users } from "lucide-react";

const highlights = [
  { icon: <ShieldCheck size={18} />, title: "Secure by design", desc: "Role-based access with JWT powered APIs." },
  { icon: <Clock size={18} />, title: "Real-time updates", desc: "Socket powered job notifications." },
  { icon: <BarChart size={18} />, title: "Placement insights", desc: "Track stats with live dashboards." },
];

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const data = await response.json();
        // Get top 4 most recent jobs
        setJobs(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
  <div className="text-white">
    <section className="section-shell pt-16 pb-20 flex flex-col lg:flex-row items-center gap-12">
      <div className="flex-1 space-y-6">
        <span className="pill">
          <Sparkles size={14} /> Campus recruitment reinvented
        </span>
        <h1 className="heading-xl">
          Launch your career with a platform built for students and recruiters.
        </h1>
        <p className="text-lg text-slate-200 max-w-2xl">
          Discover curated roles, track applications, and collaborate with your placement cell in one responsive dashboard.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/register" className="btn-primary">
            Join as Student <ArrowRight size={16} className="ml-2" />
          </Link>
          <Link to="/jobs" className="btn-ghost">
            Browse Openings
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          {highlights.map((item) => (
            <div key={item.title} className="glass-panel p-4 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-2 text-cyan-200">
                {item.icon}
                <p className="font-semibold">{item.title}</p>
              </div>
              <p className="text-sm text-slate-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 w-full">
        <div className="elevated-card rounded-3xl p-6 h-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-slate-300">Active Job Matches</p>
              <h3 className="text-4xl font-bold text-white">{jobs.length}</h3>
            </div>
            <div className="pill bg-white/15">Live</div>
          </div>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {loading ? (
              <div className="text-center text-slate-400 py-8">Loading jobs...</div>
            ) : jobs.length === 0 ? (
              <div className="text-center text-slate-400 py-8">No jobs available</div>
            ) : (
              jobs.map((job) => (
                <div key={job._id} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{job.title}</p>
                      <p className="text-sm text-slate-300">{job.company}</p>
                    </div>
                    <span className="text-cyan-300 font-semibold">{job.salary} LPA</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400" style={{ width: `${Math.min(job.cgpa * 10, 100)}%` }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>

    <section className="section-shell py-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {[
        { title: "For Students", desc: "One-click applications, saved roles, and transparent eligibility checks.", icon: <Users size={20} /> },
        { title: "For Placement Cells", desc: "Manage drives, publish roles, and monitor student readiness.", icon: <ShieldCheck size={20} /> },
        { title: "For Recruiters", desc: "Discover pre-vetted profiles and push updates in real time.", icon: <Sparkles size={20} /> },
      ].map((item) => (
        <div key={item.title} className="elevated-card rounded-2xl p-6">
          <div className="flex items-center gap-3 text-cyan-200 mb-3">
            {item.icon}
            <p className="font-semibold">{item.title}</p>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </section>
  </div>
);
};

export default Home;