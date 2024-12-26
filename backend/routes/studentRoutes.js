const express = require('express');
const {getStudents,addStudent,deleteStudent} = require('../controllers/studentController');

const router = express.Router();
router.get('/get-students', getStudents);
router.post('/add-student',addStudent);
router.post('/delete-student',deleteStudent)

module.exports = router;