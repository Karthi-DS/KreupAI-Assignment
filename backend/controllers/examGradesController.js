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
        const {studentId} = req.body;
        const grade = studentId!='All'?await ExamGrades.findAll({where:{student_id:studentId}}):await ExamGrades.findAll()
        res.status(200).json({status:true,data:grade});
    } catch (err) {
        res.status(500).json({ error: 'Failed to get grades', details: err });
    }
}

module.exports = {addGrade,getGrade};