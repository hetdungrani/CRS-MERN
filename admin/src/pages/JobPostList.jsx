import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Briefcase,
  Clock,
  IndianRupee,
  Target,
  XCircle,
  Users,
  ChevronDown,
  ChevronUp,
  PenSquare,
  Trash2,
  X,
} from "lucide-react";
import { io } from "socket.io-client";

const API_BASE = "http://localhost:5000/api";

const JobPostList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [form, setForm] = useState({ title: "", company: "", salary: "", criteria: "" });
  const token = useMemo(() => localStorage.getItem("adminToken"), []);

  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("jobUpdated", (updatedJob) => {
      setJobs((prev) => prev.map((j) => (j._id === updatedJob._id ? updatedJob : j)));
    });

    socket.on("jobPosted", (newJob) => {
      setJobs((prev) => [newJob, ...prev]);
    });

    socket.on("jobDeleted", ({ _id }) => {
      setJobs((prev) => prev.filter((j) => j._id !== _id));
    });

    return () => socket.disconnect();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/jobs`);
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const toggleApplicants = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const openEdit = (job) => {
    setEditingJob(job);
    setForm({
      title: job.title,
      company: job.company,
      salary: job.salary,
      criteria: job.criteria,
    });
  };

  const closeEdit = () => {
    setEditingJob(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingJob) return;
    try {
      const res = await axios.put(`${API_BASE}/jobs/${editingJob._id}`, form, { headers: authHeader });
      const updated = res.data.job;
      setJobs((prev) => prev.map((j) => (j._id === updated._id ? updated : j)));
      closeEdit();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update job");
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await axios.delete(`${API_BASE}/jobs/${jobId}`, { headers: authHeader });
      setJobs((prev) => prev.filter((j) => j._id !== jobId));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete job");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-20 text-cyan-200 font-medium">
        Loading Job Posts...
      </div>
    );
  }

  return (
    <div className="admin-shell py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="admin-pill mb-2">Posted Opportunities</p>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Briefcase className="text-cyan-300" size={28} /> Job Listings
          </h1>
        </div>
      </div>
      <div className="admin-card rounded-2xl overflow-hidden">
        {jobs.length === 0 ? (
          <div className="text-center p-12 text-slate-300 flex flex-col items-center">
            <XCircle size={32} className="text-red-400 mb-3" />
            <span className="font-semibold text-lg">No Active Job Postings Found.</span>
            <p className="text-sm mt-1">Use the 'Post Job' link to create new opportunities.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse text-slate-200">
              <thead>
                <tr className="bg-white/5 text-white uppercase text-sm tracking-wider">
                  <th className="px-6 py-3 font-semibold">Job Title</th>
                  <th className="px-6 py-3 font-semibold">Company</th>
                  <th className="px-6 py-3 font-semibold text-center">Salary (LPA)</th>
                  <th className="px-6 py-3 font-semibold text-center">Min. CGPA</th>
                  <th className="px-6 py-3 font-semibold text-center">Applicants</th>
                  <th className="px-6 py-3 font-semibold">Posted Date</th>
                  <th className="px-6 py-3 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <React.Fragment key={job._id}>
                    <tr
                      className={`border-t border-white/5 text-slate-200 transition ${
                        index % 2 === 0 ? "bg-white/5" : "bg-transparent"
                      }`}
                    >
                      <td className="px-6 py-4 font-bold text-white">{job.title}</td>
                      <td className="px-6 py-4 text-slate-300 font-medium">{job.company}</td>
                      <td className="px-6 py-4 text-center font-extrabold text-emerald-300 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <IndianRupee size={16} className="text-emerald-200" />
                          {job.salary} LPA
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-cyan-300 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <Target size={16} /> {job.criteria}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => toggleApplicants(job._id)}
                          className={`font-extrabold text-base flex items-center justify-center gap-2 transition ${
                            job.applicants && job.applicants.length > 0
                              ? "text-red-300 hover:text-red-200"
                              : "text-slate-500 cursor-default"
                          }`}
                          disabled={!job.applicants || job.applicants.length === 0}
                        >
                          <Users size={18} />
                          {job.applicants?.length || 0}
                          {job.applicants?.length > 0 &&
                            (expandedJobId === job._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Clock size={14} /> {formatDate(job.postedDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => openEdit(job)}
                            className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-200 flex items-center gap-2 text-sm"
                          >
                            <PenSquare size={16} /> Update
                          </button>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="px-3 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 flex items-center gap-2 text-sm"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedJobId === job._id && job.applicants && job.applicants.length > 0 && (
                      <tr>
                        <td colSpan="7" className={`p-0 ${index % 2 === 0 ? "bg-white/5" : "bg-transparent"}`}>
                          <div className="p-4 mx-6 my-4 rounded-xl bg-white/5 border border-white/10">
                            <h4 className="text-lg font-semibold text-white mb-3">
                              Applicants ({job.applicants.length})
                            </h4>
                            <div className="space-y-2">
                              {job.applicants.map((student) => (
                                <div
                                  key={student._id}
                                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-white/10 text-slate-200"
                                >
                                  <span className="font-semibold">{student.fullName}</span>
                                  <span className="text-sm text-slate-300">{student.email}</span>
                                  <span className="font-bold text-cyan-300">CGPA: {student.cgpa}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editingJob && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="admin-card rounded-2xl p-6 w-full max-w-lg relative">
            <button
              onClick={closeEdit}
              className="absolute top-3 right-3 text-slate-300 hover:text-white"
            >
              <X size={18} />
            </button>
            <h3 className="text-xl font-semibold text-white mb-4">Update Job</h3>
            <form className="space-y-4" onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-300 mb-1">Job Title</p>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 outline-none"
                    required
                  />
                </div>
                <div>
                  <p className="text-sm text-slate-300 mb-1">Company</p>
                  <input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 outline-none"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-300 mb-1">Salary (LPA)</p>
                  <input
                    value={form.salary}
                    onChange={(e) => setForm({ ...form, salary: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 outline-none"
                    required
                  />
                </div>
                <div>
                  <p className="text-sm text-slate-300 mb-1">Min CGPA</p>
                  <input
                    type="number"
                    step="0.01"
                    value={form.criteria}
                    onChange={(e) => setForm({ ...form, criteria: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 outline-none"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={closeEdit}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn px-5 py-2">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostList;
