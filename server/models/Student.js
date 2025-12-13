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
        type: String, 
        required: true,
    },
    cgpa: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Student', studentSchema);