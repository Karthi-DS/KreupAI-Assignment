const express = require('express');
const { addGrade,getGrade } = require('../controllers/examGradesController');

const router = express.Router();
router.post('/add-grades', addGrade);
router.get('/get-grades', getGrade);

module.exports = router;
