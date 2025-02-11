const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Needed for Render
    },
  },
  retry: {
    match: [/ECONNREFUSED/],
    max: 5, // Retry up to 5 times
    backoffBase: 1000, // Start with 1-second delay
  },
});

module.exports = sequelize;
