const ExamGrades = require('../models/examGrades');

const addGrade = async (req, res) => {
    try {
        const grade = await ExamGrades.create(req.body);
        res.status(201).json(grade);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add grade', details: err });
    }
};

const getGrade = async (req,res) =>{
    try {
        const grade = await ExamGrades.findAll()
        res.status(201).json(grade);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add grade', details: err });
    }
}

module.exports = {addGrade,getGrade};