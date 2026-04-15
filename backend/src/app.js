import express, { json } from 'express';
import authRouter from './modules/auth/auth.routes.js'
import userRouter from './modules/users/user.route.js';
import leaveRouter from './modules/leave/leave.routes.js';
import dotenv from "dotenv";
import {connectToDB} from './db/connection.js';
import { bootstrapAdmin } from './bootstrap/bootstrapAdmin.js';
import cors from 'cors';
import dashboardRouter from './modules/dashboard/dashboard.route.js';

dotenv.config();

const app= express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth",authRouter);
app.use('/api/users',userRouter);
app.use("/api/leaves",leaveRouter);
app.use("/api/dashboard", dashboardRouter)


async function run() {
    try {
        await connectToDB();
        await bootstrapAdmin();
        const PORT= process.env.PORT || 5000;
        app.listen(PORT,()=>{
    console.log(`Server is running on localhost:5000`)})
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
    
}

run()
