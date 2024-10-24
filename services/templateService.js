const Template = require("../models/templateModel");
const sequelize = require("../config/sequelize");
const Question = require("../models/questionModel");
const { Op } = require("sequelize");

const createTemplate = async (id, title, description, userId, questions, imageUrl, imagePublicId) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const template = await Template.create(
        {
          id,
          title,
          description,
          userId,
          imageUrl,
          imagePublicId,
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
    console.error("Error creating template:", error);
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

const getTemplatesByUserId = async (userId, page, limit) => {
  const offset = (page - 1) * limit;

  const totalTemplates = await Template.count({
    where: { userId },
  });

  const templates = await Template.findAll({
    where: { userId },
    limit,
    offset,
    include: [{ model: Question, as: "questions" }],
  });

  return {
    templates,
    totalTemplates,
  };
};

const updateTemplate = async (id, updates) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const { questions, ...templateUpdates } = updates;

      const [updated] = await Template.update(templateUpdates, {
        where: { id },
        transaction: t,
      });
      if (!updated) {
        throw new Error("Template not found");
      }

      if (questions && questions.length) {
        const questionIds = questions.map((q) => q.id).filter(Boolean);

        for (const question of questions) {
          if (question.id) {
            const existingQuestion = await Question.findOne({
              where: { id: question.id },
              transaction: t,
            });

            if (existingQuestion) {
              await Question.update(question, {
                where: { id: question.id, templateId: id },
                transaction: t,
              });
            } else {
              question.id = generateNewUUID();
              await Question.create({ ...question, templateId: id }, { transaction: t });
            }
          }
        }

        await Question.destroy({
          where: {
            templateId: id,
            id: { [Op.notIn]: questionIds },
          },
          transaction: t,
        });
      }

      const fullTemplate = await Template.findOne({
        where: { id },
        include: [{ model: Question, as: "questions" }],
        transaction: t,
      });

      return fullTemplate;
    });

    return result;
  } catch (error) {
    console.error("Error updating template:", error);
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

const getTemplateById = async (id) => {
  try {
    const template = await Template.findOne({
      where: { id },
      include: [{ model: Question, as: "questions" }],
    });

    if (!template) {
      throw new Error("Template not found");
    }

    return template;
  } catch (error) {
    console.error("Error fetching template by ID:", error);
    throw error;
  }
};

module.exports = {
  createTemplate,
  getAllTemplates,
  updateTemplate,
  deleteTemplate,
  getTemplatesByUserId,
  getTemplateById,
};
