// import { model } from "mongoose";
import { Schema, model } from "mongoose";
import { Cart, CartItem } from "./cartInterface";


export interface CartModel extends Document, Cart { }
export interface CartItemModel extends Document, CartItem { }

    export const CartItemSchema: Schema = new Schema<CartItemModel>({
        productId: { type: Schema.Types.ObjectId, ref: 'ProductModel', required: true },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        totalPrice: { type: Number, required: true }
    })
    const CartSchema: Schema<CartModel> = new Schema({
        userId: { type: Schema.Types.ObjectId, ref: 'UserModel', required: true },
        totalPrice: { type: Number },
        totalItems: { type: Number },
        items: {
            type: [CartItemSchema], required: true
        }
    })


export const cartModel = model<CartModel>("CartModel", CartSchema);
