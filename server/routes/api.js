const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const jobController = require('../controllers/jobController');
const { protectAdmin } = require('../middleware/authMiddleware');

// --- Student/Auth Routes ---
router.post('/register', authController.registerStudent); // CREATE (Registration) [cite: 15]
router.post('/login', authController.loginStudent); // READ (Login/Auth)

// --- Admin (TPO) Routes ---
router.get('/students', protectAdmin, authController.getAllStudents); // READ (Student Pool View) [cite: 19]
router.delete('/students/:id', protectAdmin, authController.deleteStudent); // DELETE (Record Management) [cite: 21]
router.post('/admin/register', authController.registerAdmin); // Admin registration
router.post('/admin/login', authController.loginAdmin); // Admin login

// --- Job Routes ---
router.post('/jobs', protectAdmin, jobController.postJob); // CREATE (Job Posting)
router.get('/jobs', jobController.getJobs); // READ (View Jobs)
router.post('/jobs/apply/:id', jobController.applyJob); // Student applies to job
module.exports = router;