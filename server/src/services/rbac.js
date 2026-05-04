const prisma = require("../config/prisma");

exports.isAdmin = async (userId, projectId) => {
  const member = await prisma.projectMember.findUnique({
    where: {
      userId_projectId: { userId, projectId },
    },
  });

  return member?.role === "ADMIN";
};