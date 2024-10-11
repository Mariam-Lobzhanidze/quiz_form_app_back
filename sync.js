// sync.js

const sequelize = require("./config/sequelize");
const User = require("./models/user");

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Set force: true to drop the table if it exists
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();
