const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const StudentProfile = require('./studentProfile');
const AcademicSubjects = require('./academicSubjects');
const ExamTimetables = require('./examTimetables');
const TeacherProfile = require('./teacherProfile');

const ExamGrades = sequelize.define('ExamGrades', {
    grade_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    marks_obtained: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
    maximum_marks: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
    grade: { type: DataTypes.STRING(10) },
    teacher_remarks: { type: DataTypes.TEXT },
    entry_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
},
{
    tableName: 'exam_grades',
    timestamps: false,  
});

ExamGrades.belongsTo(StudentProfile, { foreignKey: 'student_id', onDelete: 'CASCADE' });
ExamGrades.belongsTo(AcademicSubjects, { foreignKey: 'subject_id', onDelete: 'CASCADE' });
ExamGrades.belongsTo(ExamTimetables, { foreignKey: 'timetable_id', onDelete: 'CASCADE' });
ExamGrades.belongsTo(TeacherProfile, { foreignKey: 'finalized_by', onDelete: 'SET NULL' });
module.exports = ExamGrades;
