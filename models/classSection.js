const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ClassSection = sequelize.define(
    'ClassSection',
    {
        class_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        class_name: { type: DataTypes.STRING(50), allowNull: false },
        section: { type: DataTypes.STRING(10) },
    },
    {
        tableName: 'class_sections',
        timestamps: false, 
    }
);

module.exports = ClassSection;
