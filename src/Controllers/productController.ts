import { Request,Response } from "express"
import { productModel } from "../Models/productModel";
import { Product, Review } from "../Models/productInterface";
import {v4 as uuidv4} from 'uuid';
import { CustomRequest } from "../Middlewares/authHelper";
import { userModel } from "../Models/userModel";

export const addProduct =async (req:CustomRequest,res:Response)=>{
    try{
        const userId = req.user?.id;

        const user  = await userModel.findById(userId);
        const {productName,productPrice,brand,colour,material,productImage,stock,tags} = req.body;
        if(!productName || !productPrice||!productImage||!stock||!brand||!colour||!material||!tags){
            res.status(401).json({
                messageType:"error",
                message:"Invalid/missing metdata for product. Please add all details"
            })
        }else{
            const address = user?.address;
            const productDetails = {brand:brand,colour:colour,material:material};
            const newprod = await productModel.create({
                productName,
                productPrice,
                productImage,
                productDetails,
                stock,
                tags,
                address
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

export const getAllProducts = async(req:Request,res:Response)=>{
    try{
        const products = await productModel.find();
        if(!products){
            res.status(401).json({
                messageType:"error",
                message:"No products available"
            })
        }else{
            res.status(200).json({
                messageType:"success",
                message:products
            })
        }

    }catch(error){
        res.status(500).json({
            messageType:"error",
            message:error
        })
    }
}

export const getProductsByTag = async(req:Request,res:Response)=>{
    try{
        const {tags} = req.body;
        const products = await productModel.find({tags:{$in:tags}})
        if(products.length==0){
            res.status(401).json({
                messageType:"error",
                message:"No products available with the given tag"
            })
        }else{
            res.status(200).json({
                messageType:"success",
                message:products
            })
        }


    }catch(error){
        res.status(500).json({
            messageType:"error",
            message:error
        })
    }
}

export const getProductsByName = async(req:Request,res:Response)=>{
    try{
        const {productName} = req.body;
        const products = await productModel.find({productName:{$in:productName}})
        if(products.length==0){
            res.status(401).json({
                messageType:"error",
                message:"No products available with the given name"
            })
        }else{
            res.status(200).json({
                messageType:"success",
                message:products
            })
        }


    }catch(error){
        res.status(500).json({
            messageType:"error",
            message:error
        })
    }
}



export const updateProduct = async(req:Request,res:Response)=>{
    try{
        const {id}  = req.params;
        const {productName,productPrice,brand,colour,material,productImage,stock,tags} = req.body;

        const product =await  productModel.findById(id);
        if(!product){
            res.json({
                messageType:"error",
                message:"No product found by this id"
            })
        }else{
            if (productName) product.productName = productName;
            if(brand){
                product.productDetails.brand = brand;
            }
            if(colour){
                product.productDetails.colour = colour;
            }
            if(material){
                product.productDetails.material = material;
            }
            if (productPrice) product.productPrice = productPrice;
            if (productImage) product.productImage = productImage;
            if (stock) product.stock = stock;
            if (tags) product.tags = tags;

            const updatedProduct = await product.save();

            //remove updated product from json
            res.status(200).json({
                messageType: "success",
                product: updatedProduct,
              });

    

            
        }
    }catch(error){
        res.status(500).json({
            messageType:"error",
            message:error
        })
    }
}

export const deleteProduct = async(req:Request,res:Response)=>{
    try{
        const {id} = req.params;
        const product = await productModel.findByIdAndDelete(id);
        if(!product){
            res.status(401).json({
                messageType:"error",
                message:"No product found"
            })
        }else{
           res.status(200).json({
            messageType:"success",
            message:"Product deleted successfully"
           })
        }
    }catch(error){
        res.status(500).json({
            messageType:"error",
            message:error
        })
    }
}


// export interface Review{
//     reviewer:string,
//     rating:number,
//     comment:string,
//     date:Date
// }
export const addReview = async(req:CustomRequest,res:Response)=>{
    try{
        const {rating,comment} = req.body;
        const {id} = req.params;
        const product =await productModel.findById(id);
        if(!product){
            res.status(401).json({
                messageType:"error",
                message:"No product found or valid user"
                
            })
        }else{
            const username = req.user?.username||"Anonymous";
            
           const newReview:Review = {
            id:uuidv4(),
            reviewer:username,
            rating,
            comment,
            date: new Date()
           };

           product.reviews.push(newReview);
           await productModel.findByIdAndUpdate(id,product,{new:true});

           //remove product from json 
           res.status(200).json({
            messageType:"success",
            message:"Review added successfully",
            product
           })
        }



    }catch(error){
        res.status(500).json({
            messageType:"error",
            message:error
        })
    }
}

export const deleteReview = async(req:Request,res:Response)=>{
    try{
    const {productId,reviewId} = req.params;
    const product = await productModel.findById(productId);

    if(!product){
        res.status(401).json({
            messageType:"error",
            message:"No product found"
        })
    }else{
        product.reviews = product.reviews.filter(review=>review.id != reviewId);
        await product.save();

        res.status(200).json({
            messageType:"success",
            message:"Review deleted successfully"
        })
    }

    }catch(error){
        res.status(500).json({
            messageType:"error",
            message:error
        })
    }
}