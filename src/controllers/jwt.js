import jwt from "jsonwebtoken";

export const createToken= (id, email, role)=>{
    const token=jwt.sign({id, email, role},process.env.JWT_TOKEN,{expiresIn: "1hr"})
    return token;
}