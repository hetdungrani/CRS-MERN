import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Trash2, UserCheck } from 'lucide-react';

const RegisteredStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('adminToken'); // Retrieve token from local storage
      const res = await axios.get('http://localhost:5000/api/students', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
      alert('Failed to fetch students. Please check your connection or login status.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('adminToken'); // Retrieve token from local storage
      await axios.delete(`http://localhost:5000/api/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // UPDATE STATE WITHOUT RELOAD
      setStudents(students.filter(student => student._id !== id));
    } catch (err) {
      console.error('Error deleting student:', err);
      alert("Delete failed");
    }
  };

  const filteredStudents = students.filter(s => 
    s.fullName.toLowerCase().includes(search.toLowerCase()) || 
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <UserCheck className="text-blue-600"/> Applicant Pool
        </h1>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="w-full pl-10 p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
              <th className="p-4">Student Name</th>
              <th className="p-4">College Email</th>
              <th className="p-4">CGPA</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student._id} className="border-t hover:bg-blue-50 transition">
                <td className="p-4 font-medium">{student.fullName}</td>
                <td className="p-4 text-gray-600">{student.email}</td>
                <td className="p-4 font-bold text-blue-600">{student.cgpa}</td>
                <td className="p-4 text-center">
                  <button onClick={() => handleDelete(student._id)} className="text-red-500 hover:scale-110 transition">
                    <Trash2 size={20}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredStudents;