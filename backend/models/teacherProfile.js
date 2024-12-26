const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TeacherProfile = sequelize.define('TeacherProfile', {
    teacher_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    teacher_name: { type: DataTypes.STRING(255), allowNull: false }
},
{
    tableName: 'teacher_profile',
    timestamps: false, 
});

module.exports = TeacherProfile;
