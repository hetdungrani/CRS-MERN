const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        // This is the HASHED password
        type: String, 
        required: true,
    },
    cgpa: {
        type: Number,
        required: true,
    },
    // Add other fields as needed (e.g., branch, year)
});

module.exports = mongoose.model('Student', studentSchema);