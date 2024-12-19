const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AcademicSubjects = sequelize.define('AcademicSubjects', {
    subject_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    subject_name: { type: DataTypes.STRING(255), allowNull: false }
},
{
    tableName: 'academic_subjects',
    timestamps: false,  
});

module.exports = AcademicSubjects;
