import jwt from 'jsonwebtoken'

export const veryfyToken= (token)=>{
  return Promise((res,rej)=>{
     jwt.verify(token,process.env.JWT_TOKEN,(err,payload)=>{
        if(err){
            console.log("Invalid token")
            return rej(err)
        }else{
            console.log("Valid token")
            return res(payload)
        }
    })
  })
}