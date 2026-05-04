const prisma = require("../config/prisma");

exports.getDashboard = async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: { assigneeId: req.user.userId },
  });

  const now = new Date();

  res.json({
    total: tasks.length,
    completed: tasks.filter(t => t.status === "COMPLETED").length,
    inProgress: tasks.filter(t => t.status === "IN_PROGRESS").length,
    overdue: tasks.filter(
      t => t.dueDate && t.dueDate < now && t.status !== "COMPLETED"
    ).length,
  });
};