import jwt from "jsonwebtoken";
import { ROLE_PERMISSIONS } from "../../config/rolePermission.js";

export const createToken= (id, email, role)=>{

    const permissions= ROLE_PERMISSIONS[role] || [];


    const token=jwt.sign({id, email, role, permissions},process.env.JWT_TOKEN,{expiresIn: "1d"})
    return token;
}