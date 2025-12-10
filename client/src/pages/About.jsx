const About = () => (
  <div className="section-shell py-14 text-white">
    <div className="max-w-3xl space-y-4">
      <p className="pill">About CRS</p>
      <h1 className="heading-lg">Built to align students, mentors, and recruiters</h1>
      <p className="text-slate-300 leading-relaxed">
        CRS is a responsive MERN platform that modernizes campus hiring. Students discover roles tailored to their profile, placement teams manage drives efficiently, and recruiters engage with qualified talent in real time.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {[
          "Mobile-first UI across all pages",
          "Role-based dashboards for students and TPOs",
          "Live job and applicant updates powered by sockets",
          "Transparent analytics for every drive",
        ].map((item) => (
          <div key={item} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-slate-200">
            {item}
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default About;