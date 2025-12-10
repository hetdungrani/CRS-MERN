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
import { Link } from "react-router-dom";
import { io } from 'socket.io-client';

const JobPostList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedJobId, setExpandedJobId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  // Socket.IO real-time updates
  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('jobUpdated', (updatedJob) => {
      setJobs(prev => prev.map(j => j._id === updatedJob._id ? updatedJob : j));
    });

    socket.on('jobPosted', (newJob) => {
      setJobs(prev => [newJob, ...prev]);
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const toggleApplicants = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-20 text-indigo-600 font-medium">
        Loading Job Posts...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 text-slate-800 flex items-center gap-3">
        <Briefcase className="text-indigo-600" size={32} /> Posted Opportunities
      </h1>
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        {jobs.length === 0 ? (
          <div className="text-center p-12 text-gray-500 flex flex-col items-center">
            <XCircle size={32} className="text-red-400 mb-3" />
            <span className="font-semibold text-lg">
              No Active Job Postings Found.
            </span>
            <p className="text-sm mt-1">
              Use the 'Post Job' link to create new opportunities.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-indigo-700 text-white uppercase text-sm tracking-wider">
                  <th className="px-6 py-3 font-semibold">Job Title</th>
                  <th className="px-6 py-3 font-semibold">Company</th>
                  <th className="px-6 py-3 font-semibold text-center">
                    Salary (LPA)
                  </th>
                  <th className="px-6 py-3 font-semibold text-center">
                    Min. CGPA
                  </th>
                  <th className="px-6 py-3 font-semibold text-center">
                    Applicants
                  </th>
                  <th className="px-6 py-3 font-semibold">Posted Date</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <React.Fragment key={job._id}>
                    {/* MAIN JOB ROW */}
                    <tr
                      className={`border-t border-gray-200 text-gray-700 transition ${
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-indigo-50 hover:bg-indigo-100"
                      }`}
                    >
                      {/* Job Title */}
                      <td className="px-6 py-4 font-bold text-slate-800">
                        {job.title}
                      </td>
                      {/* Company */}
                      <td className="px-6 py-4 text-gray-600 font-medium">
                        {job.company}
                      </td>
                      {/* Salary */}
                      <td className="px-6 py-4 text-center font-extrabold text-green-700 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <IndianRupee size={18} className="text-green-600" />
                          {job.salary} LPA
                        </div>
                      </td>
                      {/* CGPA */}
                      <td className="px-6 py-4 text-center font-bold text-indigo-600 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <Target size={18} /> {job.criteria}
                        </div>
                      </td>
                      {/* Applicants and Dropdown Toggle */}
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => toggleApplicants(job._id)}
                          className={`font-extrabold text-lg flex items-center justify-center gap-2 transition hover:text-red-700 ${
                            job.applicants && job.applicants.length > 0
                              ? "text-red-600"
                              : "text-gray-400 cursor-default"
                          }`}
                          disabled={
                            !job.applicants || job.applicants.length === 0
                          }
                        >
                          <Users size={20} />
                          {job.applicants?.length || 0}
                          {job.applicants?.length > 0 &&
                            (expandedJobId === job._id ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            ))}
                        </button>
                      </td>
                      {/* Posted Date */}
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Clock size={16} /> {formatDate(job.postedDate)}
                        </div>
                      </td>
                    </tr>
                    {/* EXPANDABLE APPLICANT ROW */}
                    {expandedJobId === job._id &&
                      job.applicants &&
                      job.applicants.length > 0 && (
                        <tr>
                          <td
                            colSpan="6"
                            className={`p-0 ${
                              index % 2 === 0 ? "bg-white" : "bg-indigo-50"
                            }`}
                          >
                            <div className="p-4 border-l-4 border-red-500 mx-6 my-4 rounded-lg shadow-inner bg-white/50">
                              <h4 className="text-xl font-bold text-red-700 mb-3">
                                List of {job.applicants.length} Applicants
                              </h4>
                              <div className="space-y-2">
                                {job.applicants.map((student) => (
                                  <div
                                    key={student._id}
                                    className="flex justify-between items-center p-3 border rounded-lg bg-gray-50 text-gray-800 hover:bg-gray-100 transition"
                                  >
                                    <span className="font-semibold w-1/3">
                                      {student.fullName}
                                    </span>
                                    <span className="text-sm w-1/3 text-gray-600">
                                      {student.email}
                                    </span>
                                    <span className="font-bold w-1/6 text-right text-indigo-600">
                                      CGPA: {student.cgpa}
                                    </span>
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
