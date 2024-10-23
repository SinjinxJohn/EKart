
import { Schema, model } from "mongoose";
import { Cart, CartItem } from "./cartInterface";
import { CartItemSchema } from "./cartModel";
import { Order } from "./orderInterface";
export interface OrderModel extends Document, Order{}

const OrderSchema: Schema<OrderModel> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'UserModel', required: true },
        totalPrice: { type: Number },
        items: {
            type: [CartItemSchema], required: true
        },

        status:{
            type:String,
            enum:['Shipped','Delivered','Ordered',"Pending","Paid","Refunded"],
            default:"Pending"
        },
        createdAt:{
            type:Date,
            default:Date.now(),
        },
        
})

export const orderModel = model<OrderModel>("OrderModel",OrderSchema);