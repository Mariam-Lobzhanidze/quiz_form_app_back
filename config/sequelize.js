// config/sequelize.js

const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables

// Create a Sequelize instance using the database credentials from environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS.replace(/'/g, ""),
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();

module.exports = sequelize;
