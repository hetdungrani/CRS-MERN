const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const jobController = require('../controllers/jobController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/register', authController.registerStudent);
router.post('/login', authController.loginStudent);
router.get('/students/:id', authController.getStudentProfile);
router.put('/students/:id', authController.updateStudentProfile);

router.get('/students', protectAdmin, authController.getAllStudents);
router.delete('/students/:id', protectAdmin, authController.deleteStudent);
router.post('/admin/register', authController.registerAdmin);
router.post('/admin/login', authController.loginAdmin);

router.post('/jobs', protectAdmin, jobController.postJob);
router.get('/jobs', jobController.getJobs);
router.post('/jobs/apply/:id', jobController.applyJob);
router.delete('/jobs/apply/:id', jobController.withdrawJob);
router.put('/jobs/:id', protectAdmin, jobController.updateJob);
router.delete('/jobs/:id', protectAdmin, jobController.deleteJob);
module.exports = router;