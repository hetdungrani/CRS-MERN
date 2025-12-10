import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, PlusCircle, LogOut, ListOrdered, Briefcase } from 'lucide-react';

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20}/> },
    { name: 'Student Pool', path: '/admin/students', icon: <Users size={20}/> },
    { name: 'Post Job', path: '/admin/post-job', icon: <PlusCircle size={20}/> },
    // ADDED: Link to the Job Post List Page
    { name: 'Job List', path: '/admin/job-list', icon: <ListOrdered size={20}/> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('adminToken');

  return (
    <nav className="bg-slate-900 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
             <Briefcase size={22} />
          </div>
          <span className="font-bold text-lg hidden md:block tracking-tight">CRS Admin Console</span>
        </div>

        <div className="flex items-center space-x-1 md:space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition text-sm ${
                location.pathname === item.path || (location.pathname === '/admin' && item.path === '/admin') ? 
                'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {item.icon}
              <span className="hidden sm:block">{item.name}</span>
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition ml-4"
            >
              <LogOut size={18} />
              <span className="hidden sm:block">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-2 px-3 py-2 text-green-400 hover:bg-green-500/10 rounded-lg transition ml-4"
            >
              <PlusCircle size={18} />
              <span className="hidden sm:block">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;