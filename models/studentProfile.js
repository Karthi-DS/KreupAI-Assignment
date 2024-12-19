const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const StudentProfile = sequelize.define('StudentProfile', {
    student_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    student_name: { type: DataTypes.STRING(255), allowNull: false }
},
{
    tableName: 'student_profile',
    timestamps: false,  
});

module.exports = StudentProfile;
