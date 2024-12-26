const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ExamTimetables = sequelize.define('ExamTimetables', {
    timetable_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    exam_name: { type: DataTypes.STRING(255), allowNull: false },
    exam_date: { type: DataTypes.DATE, allowNull: false }
},
{
    tableName: 'exam_timetables',
    timestamps: false,  
});

module.exports = ExamTimetables;
