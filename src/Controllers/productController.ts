import { Request,Response } from "express"
import { productModel } from "../Models/productModel";

export const addProduct =async (req:Request,res:Response)=>{
    try{
        const {productName,productPrice,brand,colour,material,productImage,stock,tags} = req.body;
        if(!productName || !productPrice||!productImage||!stock||!brand||!colour||!material||!tags){
            res.status(401).json({
                messageType:"error",
                message:"Invalid/missing metdata for product. Please add all details"
            })
        }else{
            const productDetails = {brand:brand,colour:colour,material:material};
            const newprod = await productModel.create({
                productName,
                productPrice,
                productImage,
                productDetails,
                stock,
                tags
            })
            res.status(201).json({
                messageType:"success",
                message:newprod
            })
        }

    }catch(error){
        res.status(500).json({
            messageType:"error",
            message:error
        })
    }

}