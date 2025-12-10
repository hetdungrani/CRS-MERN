import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, PlusCircle, LogOut, ListOrdered, Briefcase } from "lucide-react";

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
    { name: "Student Pool", path: "/admin/students", icon: <Users size={18} /> },
    { name: "Post Job", path: "/admin/post-job", icon: <PlusCircle size={18} /> },
    { name: "Job List", path: "/admin/job-list", icon: <ListOrdered size={18} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("adminToken");

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="admin-shell flex justify-between items-center h-16">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-lg">
            <Briefcase size={20} className="text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">Admin</p>
            <p className="text-white font-semibold">CRS Console</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active =
              location.pathname === item.path || (location.pathname === "/admin" && item.path === "/admin");
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                  active ? "bg-white/10 text-white" : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-300 hover:bg-red-500/10 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <Link to="/login" className="admin-btn text-sm h-10">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;