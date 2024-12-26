const academicSubjects = require("../models/academicSubjects");


const getSubjects = async (req,res) =>{
    try {
        const subjects = await academicSubjects.findAll()
        res.status(201).json({status:true,data:subjects});
    } catch (err) {
        res.status(500).json({ status:false, details: err });
    }
}

const addSubject = async (req, res) => {
    try {
        const subject = await academicSubjects.create(req.body);
        res.status(200).json({status:true,data:subject});
    } catch (err) {
        res.status(500).json({status:false, error: 'Failed to get subject', details: err });
    }
};

module.exports = {getSubjects,addSubject};