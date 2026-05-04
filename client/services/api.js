import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manager-production-1b73.up.railway.app/api",
});

export default API;