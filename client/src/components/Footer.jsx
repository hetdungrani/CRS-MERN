import React from "react";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="section-shell py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-3">
          <div className="pill">CRS Portal</div>
          <p className="text-muted leading-relaxed">
            A unified recruitment hub that keeps students, placement teams, and recruiters aligned on every opportunity.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2 text-muted">
            <li><a href="/jobs" className="hover:text-white transition">Open Roles</a></li>
            <li><a href="/statistics" className="hover:text-white transition">Placement Stats</a></li>
            <li><a href="/profile" className="hover:text-white transition">Profile</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-muted">
            <li><a href="mailto:placement@college.edu" className="hover:text-white transition">Email Support</a></li>
            <li><a href="/profile" className="hover:text-white transition">Profile FAQs</a></li>
            <li><a href="/contact" className="hover:text-white transition">Help Desk</a></li>
          </ul>
        </div>

        <div className="space-y-3 text-muted">
          <h4 className="text-white font-semibold mb-4">Get in touch</h4>
          <p className="flex items-center gap-3"><MapPin size={18} className="text-cyan-300" /> 123 University Drive</p>
          <p className="flex items-center gap-3"><Phone size={18} className="text-cyan-300" /> +1 (234) 567-890</p>
          <p className="flex items-center gap-3"><Mail size={18} className="text-cyan-300" /> placement@college.edu</p>
          <div className="flex gap-3 pt-2">
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition"><Linkedin size={18} /></a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition"><Twitter size={18} /></a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition"><Github size={18} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs uppercase tracking-[0.3em] text-slate-400">
        © {new Date().getFullYear()} CRS Platform — Built on MERN
      </div>
    </footer>
  );
};

export default Footer;