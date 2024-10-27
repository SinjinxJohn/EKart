import mongoose from "mongoose";
import { CartItem } from "./cartInterface";

export interface Order{
    userId:mongoose.Schema.Types.ObjectId,
    totalPrice:number,
    items:CartItem[],
    status:String,
    to:String
    createdAt:Date

}