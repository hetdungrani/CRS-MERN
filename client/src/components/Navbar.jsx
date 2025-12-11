import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, GraduationCap, LogOut } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Jobs" },
  { to: "/statistics", label: "Statistics" },
  { to: "/profile", label: "Profile" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("studentId");
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className="backdrop-blur-xl glass-panel border-b border-white/10">
        <div className="section-shell">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 rounded-xl soft-gradient shadow-lg">
                <GraduationCap className="text-white" size={22} />
              </div>
              <div className="leading-tight">
                <p className="text-xs text-slate-300 uppercase tracking-[0.2em]">
                  Campus Recruitment
                </p>
                <p className="text-white font-semibold text-lg">CRS Portal</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-3">
              {links.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-slate-200 px-3 py-2 rounded-lg hover:text-white hover:bg-white/10 transition text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              ) : (
                <Link to="/login" className="btn-primary text-sm">
                  Login
                </Link>
              )}
            </div>

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-white/10 bg-slate-900/90 backdrop-blur-xl">
            <div className="section-shell py-4 space-y-2">
              {links.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-xl text-white bg-white/5 hover:bg-white/10 transition font-medium"
                >
                  {item.label}
                </Link>
              ))}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full px-3 py-3 rounded-xl text-white bg-red-500 hover:bg-red-600 transition font-semibold"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center px-3 py-3 rounded-xl text-white bg-gradient-to-r from-indigo-500 to-cyan-400 hover:shadow-lg transition font-semibold"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;