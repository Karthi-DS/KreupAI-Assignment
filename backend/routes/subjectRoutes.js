const express = require('express');
const {getSubjects,addSubject} = require('../controllers/subjectController');

const router = express.Router();
router.get('/get-subjects', getSubjects);
router.post('/add-subject',addSubject);

module.exports = router;