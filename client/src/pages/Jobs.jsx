import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { io } from 'socket.io-client';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      // API Call to your server route /api/jobs
      const response = await axios.get("http://localhost:5000/api/jobs");
      const studentId = localStorage.getItem('studentId');
      // mark whether current student has applied for each job
      const jobsWithApplied = response.data.map(j => ({
        ...j,
        applied: !!(studentId && j.applicants && j.applicants.some(a => a._id === studentId))
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

  // Real-time updates via Socket.IO
  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('jobUpdated', (updatedJob) => {
      const studentId = localStorage.getItem('studentId');
      setJobs(prev => prev.map(j => j._id === updatedJob._id ? ({
        ...updatedJob,
        applied: !!(studentId && updatedJob.applicants && updatedJob.applicants.some(a => a._id === studentId))
      }) : j));
    });

    socket.on('jobPosted', (newJob) => {
      const studentId = localStorage.getItem('studentId');
      const jobWithApplied = {
        ...newJob,
        applied: !!(studentId && newJob.applicants && newJob.applicants.some(a => a._id === studentId))
      };
      setJobs(prev => [jobWithApplied, ...prev]);
    });

    return () => socket.disconnect();
  }, []);

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto text-center text-lg text-gray-600">
        Loading Available Opportunities...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-7xl mx-auto text-center text-lg text-red-500 font-medium">
        Error: {error}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="p-8 max-w-7xl mx-auto text-center text-lg text-gray-500 font-medium">
        No job postings are currently available.
      </div>
    );
  }
  const handleApply = async (jobId) => {
    try {
      const studentId = localStorage.getItem('studentId');
      if (!studentId) {
        alert('Please log in before applying to a job.');
        return;
      }

      const token = localStorage.getItem('token');

      const response = await axios.post(
        `http://localhost:5000/api/jobs/apply/${jobId}`,
        { studentId },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      alert(response.data.message || 'Applied successfully');

      // Update UI: mark job as applied locally immediately
      setJobs(prev => prev.map(j => {
        if (j._id !== jobId) return j;
        const already = j.applicants && j.applicants.some(a => a._id === studentId);
        return {
          ...j,
          applied: true,
          applicants: already ? j.applicants : ([...(j.applicants || []), { _id: studentId }])
        };
      }));
    } catch (err) {
      alert(`Application Failed: ${err.response?.data?.error || 'Server error'}`);
    }
  };
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-blue-800">
        Available Opportunities ({jobs.length})
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
            <p className="text-blue-600 font-medium mb-4">{job.company}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Package: {job.salary} LPA</span>
              <span>Min: {job.criteria} CGPA</span>
            </div>
            {/* ⬅️ UPDATED TEXT: Changed to "Apply Job" */}
            <button
              onClick={() => handleApply(job._id)}
              disabled={job.applied}
              className={`mt-4 w-full py-2 rounded-lg block text-center transition font-semibold ${job.applied ? 'bg-gray-200 text-gray-600 cursor-default' : 'border border-blue-600 text-blue-600 hover:bg-blue-50'}`}
            >
              {job.applied ? 'Applied ✓' : 'Apply Job'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
