import React from 'react';
import { Mail, ShieldCheck, Globe } from 'lucide-react';

const AdminFooter = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Admin Rights Section */}
          <div>
            <div className="flex items-center space-x-2 text-white mb-4">
              <ShieldCheck className="text-blue-500" size={20} />
              <span className="font-bold">Administrative Access</span>
            </div>
            <p className="text-sm leading-relaxed">
              Confidential TPO access only. Unauthorized use or data modification 
              within this recruitment portal is strictly prohibited.
            </p>
          </div>

          {/* Quick Links for TPO */}
          <div>
            <h4 className="text-white font-semibold mb-4">Management Links</h4>
            <ul className="text-sm space-y-2">
              <li><a href="/admin/students" className="hover:text-blue-400 transition">View Student List</a></li>
              <li><a href="/admin/post-job" className="hover:text-blue-400 transition">Broadcast Vacancy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Audit Logs</a></li>
            </ul>
          </div>

          {/* Institutional Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">System Support</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-blue-500" />
                <span>it-support@college.edu</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe size={16} className="text-blue-500" />
                <span>www.college-portal.edu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Campus Recruitment System | TPO Module</p>
          <p className="mt-2 md:mt-0">Built with MERN Stack (MongoDB, Express, React, Node.js)</p>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;