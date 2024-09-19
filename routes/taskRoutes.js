const express = require("express");

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  checkCompletedTask,
  deleteTask,
} = require("../controllers/tasksController");

const router = express.Router();

router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", createTask);
router.put("/tasks/check-completed/:id", checkCompletedTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;
