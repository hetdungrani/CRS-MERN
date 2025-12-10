const Student = require('../models/Student');
const Admin = require('../models/Admin'); // Assuming Admin model exists
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- C: Create Operation (Registration) ---
exports.registerStudent = async (req, res) => {
    try {
        const { fullName, email, password, cgpa } = req.body;

        let student = await Student.findOne({ email });
        if (student) {
            return res.status(400).json({ error: "Student already registered" });
        }

        // 1. HASH PASSWORD BEFORE SAVING
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        student = new Student({
            fullName,
            email,
            password: hashedPassword, // Store the HASHED password
            cgpa
        });

        await student.save();
        res.status(201).json({ message: "Student Registered Successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error during registration" });
    }
};

// --- R: Read Operation (Login) ---
exports.loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        const student = await Student.findOne({ email });
        if (!student) {
            // Use a generic message for security
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        // 2. THIS IS THE CRITICAL FIX: Compare the plain text password with the stored HASH
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        // 3. CREATE AND SEND JWT TOKEN upon success
        const payload = { userId: student._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ 
            success: true, 
            token, // Send the token to the client
            studentId: student._id,
            message: "Login Successful"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error during login" });
    }
};

// --- R/D: Read and Delete Operations (Admin Side) ---
exports.getAllStudents = async (req, res) => {
    // This is the data visualization (Read) for the TPO Dashboard [cite: 19]
    const students = await Student.find().select('-password'); 
    res.json(students);
};

exports.deleteStudent = async (req, res) => {
    // This is the record management (Delete) for the Admin Dashboard [cite: 21]
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student record deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Could not delete record" });
    }
};

// --- Admin Registration ---
exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ error: 'Admin already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    admin = new Admin({
      email,
      password: hashedPassword,
      role: 'admin',
    });

    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error during admin registration' });
  }
};

// --- Admin Login ---
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ success: false, message: 'Invalid Credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid Credentials' });
    }

    // Generate JWT token
    const payload = { adminId: admin._id, role: admin.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ success: true, token, message: 'Login Successful' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};