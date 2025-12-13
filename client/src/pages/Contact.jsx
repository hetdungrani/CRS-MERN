import React from "react";

const Contact = () => (
  <div className="section-shell py-14 text-white">
    <div className="max-w-2xl mx-auto elevated-card p-8 rounded-3xl space-y-6">
      <div className="text-center space-y-2">
        <p className="pill mx-auto">Get Support</p>
        <h1 className="heading-lg text-white text-3xl">Contact Placement Cell</h1>
        <p className="text-slate-300">We respond on working days within 24 hours.</p>
      </div>
      <div className="space-y-4 text-slate-200">
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
          <p className="text-sm text-slate-300">Email</p>
          <p className="text-lg font-semibold">placement@college.edu</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
          <p className="text-sm text-slate-300">TPO Office</p>
          <p className="text-lg font-semibold">Block A, Room 402</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
          <p className="text-sm text-slate-300">Inquiry hours</p>
          <p className="text-lg font-semibold">10:00 AM - 4:00 PM</p>
        </div>
      </div>
    </div>
  </div>
);
export default Contact;