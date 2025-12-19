import jwt from 'jsonwebtoken'

export const veryfyToken= (req, res, next)=>{
    const token= req.headers?.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({error:"No token"})
     try {
        const decoded= jwt.verify(token,process.env.JWT_TOKEN);
        req.user= decoded;
        next();
     } catch (error) {
         return res.status(401).json({ message: "Invalid or expired token" });
     }
}