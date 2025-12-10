import React, { useState } from 'react';
import axios from 'axios';
import { Briefcase } from 'lucide-react';

const PostJob = () => {
  const [job, setJob] = useState({ title: '', company: '', salary: '', criteria: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken'); // Retrieve token from local storage
      await axios.post('http://localhost:5000/api/jobs', job,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Job Posted Successfully!");
      setJob({ title: '', company: '', salary: '', criteria: '' }); // Clear form
    } catch (err) {
      alert("Error posting job");
    }
  };

  return (
    <div className="flex items-center justify-center p-6 min-h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg border-l-8 border-indigo-600">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          <Briefcase className="text-indigo-600"/> Post New Recruitment
        </h2>
        <div className="space-y-4">
          <input name="title" value={job.title} placeholder="Job Title (e.g. Software Dev)" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" onChange={(e) => setJob({...job, title: e.target.value})} required />
          <input name="company" value={job.company} placeholder="Company Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" onChange={(e) => setJob({...job, company: e.target.value})} required />
          <input name="salary" value={job.salary} placeholder="Salary Package (e.g. 10 LPA)" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" onChange={(e) => setJob({...job, salary: e.target.value})} required />
          <input name="criteria" value={job.criteria} type="number" step="0.01" placeholder="Minimum CGPA Criteria" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" onChange={(e) => setJob({...job, criteria: e.target.value})} required />
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition">Broadcast Job</button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;