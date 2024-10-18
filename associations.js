const Question = require("./models/questionModel");
const Template = require("./models/templateModel");

Question.belongsTo(Template, { foreignKey: "templateId", as: "template" });
Template.hasMany(Question, { foreignKey: "templateId", as: "questions" });
