import mongoose from "mongoose"


export interface CartItem{
    productId:mongoose.Types.ObjectId,
    productName:string,
    quantity:number,
    price:number,
    totalPrice:number
}
export interface Cart{
    userId:mongoose.Schema.Types.ObjectId,
    totalPrice:number,
    totalItems:number,
    items:CartItem[]
    
}