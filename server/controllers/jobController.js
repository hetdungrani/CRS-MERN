const Job = require('../models/Job');
const Student = require('../models/Student');
const socket = require('../socket');

// --- C: Create Operation (Post Job) ---
exports.postJob = async (req, res) => {
    try {
        const newJob = new Job(req.body);
        await newJob.save();
        // populate and emit to connected clients
        const populated = await Job.findById(newJob._id).populate('applicants', 'fullName email cgpa');
        try { socket.getIO().emit('jobPosted', populated); } catch (e) { /* ignore if socket not ready */ }
        res.status(201).json({ message: "Job posted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error posting job" });
    }
};

// --- R: Read Operation (View Jobs for Student Portal) ---
exports.getJobs = async (req, res) => {
    try {
        // Populate applicants with selected student fields so admin UI can display them
        const jobs = await Job.find()
            .sort({ postedDate: -1 })
            .populate('applicants', 'fullName email cgpa');
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: 'Server error fetching jobs' });
    }
};

// POST /api/jobs/apply/:id
exports.applyJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { studentId } = req.body;

        if (!studentId) {
            return res.status(400).json({ error: 'studentId required' });
        }

        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ error: 'Job not found' });

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ error: 'Student not found' });

        // Check if already applied
        if (job.applicants && job.applicants.includes(student._id)) {
            return res.status(400).json({ error: 'Student already applied for this job' });
        }

        // Check CGPA criteria
        if (student.cgpa < job.criteria) {
            return res.status(400).json({ error: 'CGPA below required criteria' });
        }

        job.applicants = job.applicants || [];
        job.applicants.push(student._id);
        await job.save();

        // populate job for emitting
        const populatedJob = await Job.findById(jobId).populate('applicants', 'fullName email cgpa');
        try { socket.getIO().emit('jobUpdated', populatedJob); } catch (e) { /* ignore if socket not ready */ }

        return res.json({ message: 'Application submitted successfully' });
    } catch (err) {
        console.error('Error applying to job:', err);
        return res.status(500).json({ error: 'Server error while applying' });
    }
};