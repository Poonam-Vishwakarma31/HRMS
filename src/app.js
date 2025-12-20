import express, { json } from 'express';
import authRouter from './modules/auth/auth.routes.js'
import userRouter from './modules/users/user.route.js';
import dotenv from "dotenv";
import {connectToDB} from './db/connection.js'

dotenv.config();

const app= express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth",authRouter);
app.use('/api/users',userRouter);


async function run() {
    try {
        await connectToDB()
        const PORT= process.env.PORT || " ";
        app.listen(PORT,()=>{
    console.log(`Server is running on localhost:5000`)})
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
    
}

run()
