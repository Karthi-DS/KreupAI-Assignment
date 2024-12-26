const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('grading_reports', 'postgres', 'PostgreSQL', {
    host: 'localhost',
    dialect: 'postgres', 
    logging: false, 
    port: 5432
});

module.exports = sequelize;
