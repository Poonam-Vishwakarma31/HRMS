import express, { json } from 'express';
import router from './routes/auth.routes.js'
import dotenv from "dotenv";

dotenv.config();

const app= express();
const Port= 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1",router);

app.listen(Port,()=>{
    console.log(`Server is running on localhost:5000`)
})