require('dotenv').config();

import express,{Request,Response} from "express";
import cors from 'cors';
import http from 'http';
import cookieParser from "cookie-parser";
import mongoose from "mongoose"
// import { checkForToken } from "./Middlewares/authHelper";
import userRouter from "./Routes/userRoutes";
import productRouter from "./Routes/productRoutes";
import { checkForToken } from "./Middlewares/authHelper";
import cartRoute from "./Routes/cartRoutes";
import orderRoute from "./Routes/orderRoutes";
import paymentRouter from "./Routes/paymentRouter";
import { Server } from "socket.io";
// import { Socket } from "dgram";


const app = express();


app.use(
    cors({
        credentials:true
    })
);

app.use(express.json());
app.use(cookieParser());
// app.use(checkForToken);


//Enpoints
app.get("/", (req:Request, res:Response) => {
    res.status(200).send("This is the backend of EKart");
});

app.use("/",userRouter);
app.use("/product",checkForToken(),productRouter);
app.use("/cart",checkForToken(),cartRoute);
app.use('/order',checkForToken(),orderRoute);
app.use('/payments',checkForToken(),paymentRouter);

const server = http.createServer(app);
export const io = new Server(server);

io.on("connection",(socket)=>{
    console.log("user is connected");

    socket.on("join",(userId)=>{
        socket.join(userId);
        console.log(`User joined room:${userId}`);
    });

    socket.on("disconnect",()=>{
        console.log("User has disconnected");
    })
})


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
