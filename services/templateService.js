const Template = require("../models/templateModel");
const sequelize = require("../config/sequelize");
const Question = require("../models/questionModel");

const createTemplate = async (title, description, userId, questions) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const template = await Template.create(
        {
          title,
          description,
          userId,
        },
        { transaction: t }
      );

      if (questions && questions.length) {
        const questionsWithTemplateId = questions.map((question) => ({
          ...question,
          templateId: template.id,
        }));

        await Question.bulkCreate(questionsWithTemplateId, { transaction: t });
      }

      const fullTemplate = await Template.findOne({
        where: { id: template.id },
        include: [{ model: Question, as: "questions" }],
        transaction: t,
      });

      return fullTemplate;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const getAllTemplates = async (page, limit) => {
  const offset = (page - 1) * limit;
  const templates = await Template.findAndCountAll({
    limit,
    offset,
  });
  return {
    templates: templates.rows,
    totalTemplates: templates.count,
  };
};

const updateTemplate = async (id, updates) => {
  try {
    const [updated] = await Template.update(updates, {
      where: { id },
    });
    if (!updated) {
      throw new Error("Template not found");
    }
    return updated;
  } catch (error) {
    throw error;
  }
};

const deleteTemplate = async (id) => {
  try {
    const deleted = await Template.destroy({
      where: { id },
    });
    if (!deleted) {
      throw new Error("Template not found");
    }
    return deleted;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTemplate,
  getAllTemplates,
  updateTemplate,
  deleteTemplate,
};
