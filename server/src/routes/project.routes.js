const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
  addMember,
} = require("../controllers/project.controller");

router.post("/", createProject);
router.get("/", getProjects);
router.post("/add-member", addMember);

module.exports = router;