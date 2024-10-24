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

const getUserTemplates = async (req, res) => {
  const userId = req.params.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const { templates, totalTemplates } = await templateService.getTemplatesByUserId(userId, page, limit);
    res.status(200).json({ templates, totalTemplates });
  } catch (error) {
    console.error("Error fetching user templates:", error);
    res.status(500).json({ message: "Failed to fetch user templates" });
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

const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await templateService.getTemplateById(id);

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.status(200).json(template);
  } catch (error) {
    console.error("Error fetching template by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTemplate,
  getAllTemplates,
  getUserTemplates,
  updateTemplate,
  deleteTemplate,
  getTemplateById,
};
