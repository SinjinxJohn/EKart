require('dotenv').config();

import express,{Request,Response} from "express";
import cors from 'cors';
import http from 'http';
import cookieParser from "cookie-parser";
import mongoose from "mongoose"
// import { checkForToken } from "./Middlewares/authHelper";
import userRouter from "./Routes/userRoutes";


const app = express();

app.use(
    cors({
        credentials:true
    })
);

app.use(express.json());
app.use(cookieParser());
// app.use(checkForToken());


//Enpoints
app.get("/", (req:Request, res:Response) => {
    res.status(200).send("This is the backend of noteHarbour");
});

app.use("/",userRouter);

const server = http.createServer(app);


//starter server logic
server.listen(process.env.PORT,()=>{
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})

//db connection
mongoose.connect(process.env.MONGO_URL||"betty").then(function(db){
    console.log("Connected to the database successfully")
}).catch(function (err){
    console.log(err)
})

// module.exports = app;
