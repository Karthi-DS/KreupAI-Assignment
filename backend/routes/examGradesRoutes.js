const express = require('express');
const { addGrade,getGrade } = require('../controllers/examGradesController');

const router = express.Router();
router.post('/add-grades', addGrade);
router.post('/get-grades', getGrade);

module.exports = router;
