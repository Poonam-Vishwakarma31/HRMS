
export const authorizeRole= (...allowedRole)=>{
  return (req, res, next)=>{
    if(!req.user || !req.user.role){
        return res.status(403).json({ message: "Access denied" });
    }

    if(!allowedRole.includes(req.user.role)){
         return res.status(403).json({ message: "Forbidden" });
    }
    next();
  }
}

