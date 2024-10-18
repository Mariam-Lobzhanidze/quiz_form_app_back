const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Question = sequelize.define(
  "Question",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM,
      values: ["PRESENT_REQUIRED", "PRESENT_OPTIONAL"],
      defaultValue: "PRESENT_REQUIRED",
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    options: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    templateId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "questions",
  }
);

module.exports = Question;
