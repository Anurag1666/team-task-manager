const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateStatus,
} = require("../controllers/task.controller");

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id/status", updateStatus);

module.exports = router;