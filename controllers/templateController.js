const templateService = require("../services/templateService");

const createTemplate = async (req, res) => {
  try {
    const { id, title, description, userId, questions, imageUrl, imagePublicId } = req.body;
    const template = await templateService.createTemplate(
      id,
      title,
      description,
      userId,
      questions,
      imageUrl,
      imagePublicId
    );
    res.status(201).json(template);
  } catch (error) {
    console.error("Error in createTemplate endpoint:", error);
    res.status(500).json({ message: error.message || "An error occurred." });
  }
};

const getAllTemplates = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const { templates, totalTemplates } = await templateService.getAllTemplates(page, limit);

    res.json({
      templates,
      totalTemplates,
      page,
      limit,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await templateService.updateTemplate(id, updates);

    res.json({ updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await templateService.deleteTemplate(id);

    res.json({ deleted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTemplate,
  getAllTemplates,
  updateTemplate,
  deleteTemplate,
};
