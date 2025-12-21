
export const authorizePermissions = (...requiredPermissions) => {
  return (req, res, next) => {
    // Safety check
    if (!req.user || !Array.isArray(req.user.permissions)) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Check all required permissions
    const hasAllPermissions = requiredPermissions.some(permission =>
      req.user.permissions.includes(permission)
    );

    if (!hasAllPermissions) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};


