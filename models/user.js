// models/User.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); // Import your Sequelize instance

// Define the User model
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registration_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("active", "blocked"),
      defaultValue: "active",
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
    profile_image_url: {
      type: DataTypes.STRING,
    },
    language: {
      type: DataTypes.STRING,
      defaultValue: "English",
    },
    theme: {
      type: DataTypes.ENUM("light", "dark"),
      defaultValue: "light",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false, // Disable automatic timestamping
  }
);

// Sync the model with the database
const syncDatabase = async () => {
  try {
    await User.sync(); // Create the table if it doesn't exist
    console.log("User table synced.");
  } catch (error) {
    console.error("Error syncing User table:", error);
  }
};

syncDatabase();

module.exports = User;
