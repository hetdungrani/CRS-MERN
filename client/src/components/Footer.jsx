import React from 'react';
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 border-b border-blue-500 pb-2 w-max">About CRS</h3>
          <p className="text-gray-400 leading-relaxed">
            The Campus Recruitment System provides a digital platform for high-performance recruitment management, streamlining the process for students and TPOs alike[cite: 31, 38].
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 border-b border-blue-500 pb-2 w-max">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/jobs" className="hover:text-white transition">Current Openings</a></li>
            <li><a href="/registration" className="hover:text-white transition">Student Registration</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact Placement Cell</a></li>
            <li><a href="/about" className="hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-4 border-b border-blue-500 pb-2 w-max">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-400">
              <MapPin size={18} className="mr-3 text-blue-500" /> 123 University Drive, City
            </li>
            <li className="flex items-center text-gray-400">
              <Phone size={18} className="mr-3 text-blue-500" /> +1 234 567 890
            </li>
            <li className="flex items-center text-gray-400">
              <Mail size={18} className="mr-3 text-blue-500" /> placement@college.edu
            </li>
          </ul>
          
          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition"><Linkedin size={20}/></a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-400 transition"><Twitter size={20}/></a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-800 transition"><Facebook size={20}/></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Campus Recruitment System. Built with MERN Stack[cite: 2, 32].</p>
      </div>
    </footer>
  );
};

export default Footer;