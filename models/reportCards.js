const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const StudentProfile = require('./studentProfile');
const ClassSection = require('./classSection');

const ReportCards = sequelize.define('ReportCards', {
    report_card_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    academic_year: { type: DataTypes.STRING(10), allowNull: false },
    exam_name: { type: DataTypes.STRING(255), allowNull: false },
    subject_grades: { type: DataTypes.JSON, allowNull: false },
    total_marks_obtained: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    total_maximum_marks: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    overall_grade: { type: DataTypes.STRING(10) },
    teacher_remarks: { type: DataTypes.TEXT },
    generated_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
},
{
    tableName: 'report_cards',
    timestamps: false,  
});

ReportCards.belongsTo(StudentProfile, { foreignKey: 'student_id', onDelete: 'CASCADE' });
ReportCards.belongsTo(ClassSection, { foreignKey: 'class_id', onDelete: 'CASCADE' });

module.exports = ReportCards;
