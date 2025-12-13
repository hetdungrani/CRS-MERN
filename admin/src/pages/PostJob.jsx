import React, { useState } from "react";
import axios from "axios";
import { Briefcase } from "lucide-react";
import Toast from "../components/Toast";

const PostJob = () => {
  const [job, setJob] = useState({ title: "", company: "", salary: "", criteria: "" });
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post("http://localhost:5000/api/jobs", job, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setToast({ message: "Job posted successfully!", type: "success" });
      setJob({ title: "", company: "", salary: "", criteria: "" });
    } catch (err) {
      setToast({ message: "Error posting job. Please try again.", type: "error" });
    }
  };

  return (
    <div className="admin-shell min-h-[80vh] flex items-center justify-center py-10">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <form onSubmit={handleSubmit} className="admin-card p-8 rounded-3xl w-full max-w-xl space-y-5 text-white">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white">
            <Briefcase size={22} />
          </div>
          <div>
            <p className="admin-pill mb-1">Post Job</p>
            <h2 className="text-2xl font-bold">Broadcast new opportunity</h2>
          </div>
        </div>
        <div className="space-y-4">
          <input
            name="title"
            value={job.title}
            placeholder="Job Title (e.g. Software Dev)"
            className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 outline-none"
            onChange={(e) => setJob({ ...job, title: e.target.value })}
            required
          />
          <input
            name="company"
            value={job.company}
            placeholder="Company Name"
            className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 outline-none"
            onChange={(e) => setJob({ ...job, company: e.target.value })}
            required
          />
          <input
            name="salary"
            value={job.salary}
            placeholder="Salary Package (e.g. 10 LPA)"
            className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 outline-none"
            onChange={(e) => setJob({ ...job, salary: e.target.value })}
            required
          />
          <input
            name="criteria"
            value={job.criteria}
            type="number"
            step="0.01"
            placeholder="Minimum CGPA Criteria"
            className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 outline-none"
            onChange={(e) => setJob({ ...job, criteria: e.target.value })}
            required
          />
          <button className="w-full admin-btn justify-center py-3">Broadcast Job</button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;