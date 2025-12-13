import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Trash2, UserCheck } from "lucide-react";
import Toast from "../components/Toast";

const RegisteredStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("http://localhost:5000/api/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
      setToast({ message: "Failed to fetch students. Please check your connection or login status.", type: "error" });
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(students.filter((student) => student._id !== id));
      setToast({ message: "Student record deleted successfully!", type: "success" });
    } catch (err) {
      console.error("Error deleting student:", err);
      setToast({ message: "Failed to delete student record.", type: "error" });
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-shell py-10">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <p className="admin-pill mb-2">Applicants</p>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <UserCheck className="text-cyan-300" /> Student Pool
          </h1>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto admin-card rounded-2xl">
        <table className="w-full text-left border-collapse text-slate-200">
          <thead>
            <tr className="bg-white/5 text-sm uppercase tracking-wide">
              <th className="p-4">Student Name</th>
              <th className="p-4">College Email</th>
              <th className="p-4">CGPA</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, idx) => (
              <tr
                key={student._id}
                className={`border-t border-white/5 ${idx % 2 === 0 ? "bg-white/5" : "bg-transparent"}`}
              >
                <td className="p-4 font-medium">{student.fullName}</td>
                <td className="p-4 text-slate-300">{student.email}</td>
                <td className="p-4 font-bold text-cyan-300">{student.cgpa}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="text-red-400 hover:text-red-300 transition inline-flex items-center gap-2"
                  >
                    <Trash2 size={18} /> Remove
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