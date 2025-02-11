require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  retry: {
    match: [/ECONNREFUSED/],
    max: 5,
    backoffBase: 1000,
  },
});

module.exports = sequelize;
