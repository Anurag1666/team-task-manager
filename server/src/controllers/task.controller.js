const prisma = require("../config/prisma");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, assigneeId } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        assigneeId,
      },
    });

    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating task" });
  }
};

// GET ALL TASKS
exports.getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        assignee: true,
      },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// UPDATE STATUS
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await prisma.task.update({
      where: { id },
      data: { status },
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
};