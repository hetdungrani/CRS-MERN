const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    salary: { type: String, required: true },
    criteria: { type: Number, required: true }, // Min CGPA criteria
    postedDate: { type: Date, default: Date.now },
    applicants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
});

module.exports = mongoose.model('Job', jobSchema);