import React, { useEffect, useState } from "react";
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
} from "lucide-react";
import { io } from "socket.io-client";

const JobPostList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedJobId, setExpandedJobId] = useState(null);

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

    return () => socket.disconnect();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/jobs");
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
                    </tr>
                    {expandedJobId === job._id && job.applicants && job.applicants.length > 0 && (
                      <tr>
                        <td colSpan="6" className={`p-0 ${index % 2 === 0 ? "bg-white/5" : "bg-transparent"}`}>
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
    </div>
  );
};

export default JobPostList;
