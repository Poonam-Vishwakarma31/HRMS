import express, { json } from 'express';

const app= express();
const Port= 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/api/v1",router);

app.listen(Port,()=>{
    console.log(`Server is running on localhost:5000`)
})