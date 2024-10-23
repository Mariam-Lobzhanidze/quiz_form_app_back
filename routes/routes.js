const express = require("express");
const { register, login } = require("../controllers/authController");
const {
  blockUser,
  unblockUser,
  deleteUser,
  getAllUsers,
  changeUserRole,
  changeUserTheme,
} = require("../controllers/userController");

const {
  createTemplate,
  getAllTemplates,
  updateTemplate,
  deleteTemplate,
  getUserTemplates,
} = require("../controllers/templateController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

router.get("/users", authMiddleware, getAllUsers);
router.put("/users/block/:id", authMiddleware, blockUser);
router.put("/users/unblock/:id", authMiddleware, unblockUser);
router.delete("/users/:id", authMiddleware, deleteUser);
router.put("/users/role/:id", authMiddleware, changeUserRole);
router.put("/users/theme/:id", authMiddleware, changeUserTheme);

// Routes for templates
router.post("/templates", authMiddleware, createTemplate);
router.get("/templates", getAllTemplates);
router.get("/users/:userId/templates", authMiddleware, getUserTemplates);
router.put("/templates/:id", authMiddleware, updateTemplate);
router.delete("/templates/:id", authMiddleware, deleteTemplate);

module.exports = router;
