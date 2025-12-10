import React from "react";
import { Mail, ShieldCheck, Globe } from "lucide-react";

const AdminFooter = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950 mt-10">
      <div className="admin-shell py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-300">
        <div className="space-y-3">
          <div className="admin-pill w-fit">
            <ShieldCheck size={16} /> Admin Access
          </div>
          <p className="leading-relaxed">
            Confidential TPO console. Manage drives, student pools, and posted roles in one responsive workspace.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Management</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/admin/students" className="hover:text-white transition">View Student List</a></li>
            <li><a href="/admin/post-job" className="hover:text-white transition">Broadcast Vacancy</a></li>
            <li><a href="/admin/job-list" className="hover:text-white transition">View Job Posts</a></li>
          </ul>
        </div>
        <div className="space-y-2 text-sm">
          <h4 className="text-white font-semibold mb-3">System Support</h4>
          <p className="flex items-center gap-2"><Mail size={16} className="text-cyan-300" /> it-support@college.edu</p>
          <p className="flex items-center gap-2"><Globe size={16} className="text-cyan-300" /> www.college-portal.edu</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs uppercase tracking-[0.25em] text-slate-400">
        © {new Date().getFullYear()} CRS TPO Console
      </div>
    </footer>
  );
};

export default AdminFooter;