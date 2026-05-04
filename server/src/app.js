require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/projects", require("./routes/project.routes"));
app.use("/api/tasks", require("./routes/task.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));

const taskRoutes = require("./routes/task.routes");
const projectRoutes = require("./routes/project.routes");

app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});