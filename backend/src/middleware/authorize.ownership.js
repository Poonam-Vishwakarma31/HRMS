
export const authorizeOwnership = (getResourceOwnerId) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Access denied" });
      }

      // Admin bypass (intentional and explicit)
      if (req.user.role === "admin") {
        return next();
      }

      // Resolve resource owner dynamically
      const ownerId = await getResourceOwnerId(req);

      if (ownerId== null) {
        return res.status(404).json({ message: "Resource not found" });
      }

      // Ownership check
      if (String(ownerId) !== String(req.user.id)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (error) {
      console.error("Ownership check failed:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
