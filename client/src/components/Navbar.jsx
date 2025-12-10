import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ⬅️ CRITICAL: Added useNavigate
import { Menu, X, GraduationCap, LogOut } from 'lucide-react'; // Added LogOut icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigation hook

  // 1. Check for token in localStorage to determine login status
  const isLoggedIn = !!localStorage.getItem('token'); 

  // 2. Logout handler function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the JWT token
    localStorage.removeItem('studentId'); // Clear stored user ID
    setIsOpen(false); // Close mobile menu
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="text-blue-600" size={32} />
            <span className="font-bold text-xl text-gray-800">CRS Portal</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition">Home</Link>
            <Link to="/jobs" className="text-gray-600 hover:text-blue-600 font-medium transition">Jobs</Link>
            <Link to="/statistics" className="text-gray-600 hover:text-blue-600 font-medium transition">Statistics</Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium transition">About College</Link>

            {/* 3. Conditional Button: Logout or Login */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition shadow-md flex items-center space-x-2"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            ) : (
              <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-md">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 animate-fade-in-down">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium">Home</Link>
          <Link to="/jobs" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium">Jobs</Link>
          <Link to="/statistics" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium">Statistics</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium">About College</Link>
          
          {/* 4. Conditional Button for Mobile Menu */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block w-full bg-red-600 text-center text-white py-2 rounded-md"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="block bg-blue-600 text-center text-white py-2 rounded-md">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;