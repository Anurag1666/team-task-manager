const prisma = require("../config/prisma");

// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await prisma.project.create({
      data: {
        name,
        description,
      },
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error creating project" });
  }
};

// GET ALL PROJECTS
exports.getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        members: true,
        tasks: true,
      },
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects" });
  }
};

// ADD MEMBER
exports.addMember = async (req, res) => {
  try {
    const { userId, projectId, role } = req.body;

    const member = await prisma.projectMember.create({
      data: {
        userId,
        projectId,
        role,
      },
    });

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: "Error adding member" });
  }
};