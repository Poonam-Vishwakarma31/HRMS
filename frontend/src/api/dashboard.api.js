import api from "./axios.js";

export const getDashboardStats = () => {
  return api.get("/dashboard/stats");
};
