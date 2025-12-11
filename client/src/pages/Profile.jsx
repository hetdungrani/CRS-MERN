import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { User, Mail, GraduationCap, Save, RefreshCw, Briefcase } from "lucide-react";

const API_BASE = "http://localhost:5000/api";

const Profile = () => {
  const studentId = useMemo(() => localStorage.getItem("studentId"), []);
  const token = useMemo(() => localStorage.getItem("token"), []);
  const [profile, setProfile] = useState({ fullName: "", email: "", cgpa: "" });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const fetchData = async () => {
    if (!studentId) return;
    setLoading(true);
    try {
      const [profileRes, jobsRes] = await Promise.all([
        axios.get(`${API_BASE}/students/${studentId}`),
        axios.get(`${API_BASE}/jobs`),
      ]);
      setProfile({
        fullName: profileRes.data.fullName || "",
        email: profileRes.data.email || "",
        cgpa: profileRes.data.cgpa || "",
      });
      const appliedJobs = jobsRes.data.filter((job) =>
        job.applicants?.some((a) => a._id === studentId)
      );
      setJobs(appliedJobs);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!studentId) return;
    setSaving(true);
    try {
      await axios.put(`${API_BASE}/students/${studentId}`, profile, { headers });
      alert("Profile updated");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleWithdraw = async (jobId) => {
    if (!studentId) return;
    if (!window.confirm("Remove this application?")) return;
    try {
      await axios.delete(`${API_BASE}/jobs/apply/${jobId}`, {
        data: { studentId },
        headers,
      });
      setJobs((prev) => prev.filter((j) => j._id !== jobId));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to remove application");
    }
  };

  if (!studentId) {
    return (
      <div className="section-shell py-14 text-white">
        <div className="elevated-card p-8 rounded-3xl">
          <h1 className="heading-lg mb-2">Profile</h1>
          <p className="text-slate-300">Please log in to view and edit your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-shell py-14 text-white space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="pill mb-2">Student Profile</p>
          <h1 className="heading-lg">Manage your information</h1>
          <p className="text-slate-300">Update your details and review applied jobs.</p>
        </div>
        <button
          onClick={fetchData}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 inline-flex items-center gap-2"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form
          onSubmit={handleSave}
          className="lg:col-span-1 elevated-card rounded-3xl p-6 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/10">
              <User className="text-white" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-300">Profile</p>
              <p className="font-semibold text-white">Student details</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm text-slate-300">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-indigo-200" size={18} />
              <input
                className="w-full pl-10 p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 outline-none"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm text-slate-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-indigo-200" size={18} />
              <input
                className="w-full pl-10 p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 outline-none"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required
                type="email"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm text-slate-300">CGPA</label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-3 text-indigo-200" size={18} />
              <input
                className="w-full pl-10 p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 outline-none"
                value={profile.cgpa}
                onChange={(e) => setProfile({ ...profile, cgpa: e.target.value })}
                required
                type="number"
                step="0.01"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full btn-primary justify-center py-3 disabled:opacity-60"
          >
            <Save size={18} className="mr-2" />
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>

        <div className="lg:col-span-2 elevated-card rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-white/10">
              <Briefcase className="text-white" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-300">Applied Jobs</p>
              <p className="font-semibold text-white">Your applications</p>
            </div>
          </div>
          {loading ? (
            <p className="text-slate-300">Loading...</p>
          ) : jobs.length === 0 ? (
            <p className="text-slate-300">No applications yet.</p>
          ) : (
            <div className="space-y-3">
              {jobs.map((job) => (
                <div key={job._id} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{job.title}</p>
                      <p className="text-sm text-slate-300">{job.company}</p>
                      <p className="text-xs text-slate-400 mt-1">Min CGPA: {job.criteria}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-cyan-200 font-semibold">{job.salary} LPA</span>
                      <button
                        onClick={() => handleWithdraw(job._id)}
                        className="px-3 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;