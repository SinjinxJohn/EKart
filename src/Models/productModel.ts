import mongoose, { Schema,model, Document, Model } from "mongoose";
import { Product } from "./productInterface";


export interface ProductModel extends Product,Document{}



const ProductSchema:Schema<ProductModel> = new Schema({
    productName:{required:true, type:String},
    productPrice:{required:true,type:Number},
    productImage:{required:true,type:String},
    productDetails:{
        brand:{required:true,type:String},
        colour:{type:String,required:true},
        material:{required:true,type:String}
    },
    reviews:[
        {
            reviewer:{type:String},
            rating:{type:Number},
            comment:{type:String},
            date:{type:Date,default:Date.now}


        }
    ],
    address:{type:String,required:true},
    purchased:{type:Number},
    stock:{type:Number, required:true},
    tags:[{type:String}],

})


export const productModel = model<ProductModel>("ProductModel",ProductSchema);