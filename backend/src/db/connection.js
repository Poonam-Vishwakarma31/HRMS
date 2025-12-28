import mongoose from "mongoose";

export const connectToDB= async()=>{
    try {
        const MONGO_URI= process.env.MONGODB_URL || "";
        await mongoose.connect(MONGO_URI)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Database connnection failed")
        throw error
    }
}