import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { Briefcase, Gauge, Target, Building2 } from "lucide-react";
import Toast from "../components/Toast";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/jobs");
      const studentId = localStorage.getItem("studentId");
      const jobsWithApplied = response.data.map((j) => ({
        ...j,
        applied:
          !!(studentId && j.applicants && j.applicants.some((a) => a._id === studentId)),
      }));
      setJobs(jobsWithApplied);
      setError(null);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load job listings. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("jobUpdated", (updatedJob) => {
      const studentId = localStorage.getItem("studentId");
      setJobs((prev) =>
        prev.map((j) =>
          j._id === updatedJob._id
            ? {
                ...updatedJob,
                applied:
                  !!(
                    studentId &&
                    updatedJob.applicants &&
                    updatedJob.applicants.some((a) => a._id === studentId)
                  ),
              }
            : j
        )
      );
    });

    socket.on("jobPosted", (newJob) => {
      const studentId = localStorage.getItem("studentId");
      const jobWithApplied = {
        ...newJob,
        applied:
          !!(studentId && newJob.applicants && newJob.applicants.some((a) => a._id === studentId)),
      };
      setJobs((prev) => [jobWithApplied, ...prev]);
    });

    return () => socket.disconnect();
  }, []);

  const handleApply = async (jobId) => {
    try {
      const studentId = localStorage.getItem("studentId");
      if (!studentId) {
        setToast({ message: "Please log in before applying to a job.", type: "warning" });
        return;
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/jobs/apply/${jobId}`,
        { studentId },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      setToast({ message: response.data.message || "Application submitted successfully!", type: "success" });

      setJobs((prev) =>
        prev.map((j) => {
          if (j._id !== jobId) return j;
          const already = j.applicants && j.applicants.some((a) => a._id === studentId);
          return {
            ...j,
            applied: true,
            applicants: already ? j.applicants : [...(j.applicants || []), { _id: studentId }],
          };
        })
      );
    } catch (err) {
      setToast({ message: err.response?.data?.error || "Application failed. Please try again.", type: "error" });
    }
  };

  return (
    <div className="section-shell py-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
        <div>
          <p className="pill mb-2">Opportunities</p>
          <h1 className="heading-lg">Open Roles ({jobs.length})</h1>
          <p className="text-muted">
            Discover the latest openings curated for your campus profile.
          </p>
        </div>
      </div>

      {loading && (
        <div className="text-center text-slate-300 py-10">Loading available opportunities...</div>
      )}

      {error && (
        <div className="text-center text-red-400 font-semibold py-10">Error: {error}</div>
      )}

      {!loading && !error && jobs.length === 0 && (
        <div className="text-center text-slate-300 py-10">No job postings are currently available.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="elevated-card rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-slate-300 text-sm">{job.company}</p>
                <h3 className="text-xl font-bold text-white">{job.title}</h3>
              </div>
              <span className="pill bg-white/15">
                <Briefcase size={14} /> {job.salary} LPA
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <Gauge size={16} /> Min CGPA: <strong className="text-white">{job.criteria}</strong>
              </span>
              <span className="flex items-center gap-2">
                <Target size={16} /> Applicants:{" "}
                <strong className="text-white">{job.applicants?.length || 0}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-cyan-200">
              <Building2 size={16} /> Office: Hybrid / Onsite
            </div>
            <button
              onClick={() => handleApply(job._id)}
              disabled={job.applied}
              className={`mt-auto w-full py-3 rounded-xl font-semibold transition ${
                job.applied
                  ? "bg-white/10 text-slate-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-cyan-400 text-white hover:shadow-lg hover:-translate-y-0.5"
              }`}
            >
              {job.applied ? "Applied ✓" : "Apply Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
