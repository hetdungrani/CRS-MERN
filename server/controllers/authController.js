const Student = require('../models/Student');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerStudent = async (req, res) => {
    try {
        const { fullName, email, password, cgpa } = req.body;

        let student = await Student.findOne({ email });
        if (student) {
            return res.status(400).json({ error: "Student already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        student = new Student({
            fullName,
            email,
            password: hashedPassword,
            cgpa
        });

        await student.save();
        res.status(201).json({ message: "Student Registered Successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error during registration" });
    }
};

exports.loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        const payload = { userId: student._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ 
            success: true, 
            token,
            studentId: student._id,
            message: "Login Successful"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error during login" });
    }
};

exports.getAllStudents = async (req, res) => {
    const students = await Student.find().select('-password'); 
    res.json(students);
};

exports.deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student record deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Could not delete record" });
    }
};

exports.getStudentProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).select('-password');
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: "Server error fetching profile" });
    }
};

exports.updateStudentProfile = async (req, res) => {
    try {
        const updates = { ...req.body };
        delete updates.password;
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true, select: '-password' }
        );
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.json({ message: "Profile updated", student });
    } catch (err) {
        res.status(500).json({ error: "Server error updating profile" });
    }
};

exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ error: 'Admin already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ success: false, message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid Credentials' });
    }

    const payload = { adminId: admin._id, role: admin.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ success: true, token, message: 'Login Successful' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};