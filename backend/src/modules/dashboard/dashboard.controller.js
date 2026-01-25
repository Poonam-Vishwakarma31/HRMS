import { getDashboardStats } from "./dashboard.sevice.js";

export const dashboardStats = async (req, res) => {
  try {
    const stats = await getDashboardStats({ user: req.user });
    res.json(stats);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
