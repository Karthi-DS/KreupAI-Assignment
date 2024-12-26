const StudentProfile = require("../models/studentProfile")

const addStudent = async (req, res) => {
    try {
        const student = await StudentProfile.create(req.body);
        res.status(201).json({status:true,data:student});
    } catch (err) {
        res.status(500).json({status:false, error: 'Failed to add student', details: err });
    }
};

const getStudents = async (req,res) =>{
    try {
        const student = await StudentProfile.findAll()
        res.status(200).json({status:true,data:student});
    } catch (err) {
        res.status(500).json({status:false, error: 'Failed to get students', details: err });
    }
}

const deleteStudent = async (req,res) =>{
    try {
        console.log(req.body)
        const student = await StudentProfile.destroy({where:{student_id:req.body.student_id}})
        res.status(200).json({status:true,data:student});
    } catch (err) {
        res.status(500).json({status:false, error: 'Failed to get students', details: err });
    }
}

module.exports = {addStudent,getStudents,deleteStudent};