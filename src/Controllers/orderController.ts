import { Request, Response } from "express";
import { CustomRequest } from "../Middlewares/authHelper";
import { cartModel } from "../Models/cartModel";
import { orderModel } from "../Models/orderModel";
import { userModel } from "../Models/userModel";
import { productModel } from "../Models/productModel";
import { io } from "../index";



export const getUserOrders = async(req:CustomRequest,res:Response)=>{
    try {
        const userId=  req.user?.id;
        const orders = await orderModel.find({userId}).sort({createdAt:-1});
        if(!orders||orders.length==0){
            res.status(404).json({
                messageType:"error",
                message:"No orders have been placed"
            })
        }else{
            res.status(200).json({
                messageType:"success",
                message:orders
            })
        }
        
    } catch (error) {
        res.status(500).json({
            messageType:"error",
            message:error
        })
    }
}
export const getAllOrders = async(req:Request,res:Response) =>{
    try{

        const orders = await orderModel.find();
        if(!orders){
            res.status(404).json({
                messageType:"error",
                message:"No orders present at the moment."
            })

        }else{
            res.status(200).json({
                messageType:'success',
                message:orders
            })
        }

    }catch(error){
        res.status(500).json({
            messageType:"error",
            message:error
        })
    }
}

export const createOrder = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        const cart = await cartModel.findOne({ userId });
        const user = await userModel.findById(userId);
        if (!cart || cart.items.length == 0) {
            res.status(404).json({
                messageType: "error",
                message: "Cart is empty"
            })
        } else {
            const totalPrice = cart.totalPrice;
            const items = cart.items;
            var userAddress = user?.address;
            if(!userAddress){
                userAddress = "United India apartments, Mayur Vihar Phase - 1";
            }
            const order = await new orderModel({
                userId,
                totalPrice,
                items,
                to:userAddress,
            })
            for (const item of items) {
                const productId = item.productId;
                const quantity = item.quantity;
    
                // Find the product and update stock
                const product = await productModel.findById(productId);
                if (product) {
                    if (product.stock >= quantity) {
                        product.stock -= quantity;
                        await product.save();
                    } else {
                         
                    }
                }
            }
    

            await order.save();

            res.status(201).json({
                messageType: "success",
                message: order
            })
        }

    } catch (error) {
        res.status(500).json({
            messageType: "error",
            message: error
        })
    }
}


//performed only by admin/moderator
export const updateStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;  // Destructure 'id' since the route defines it as ':id'
        const { status } = req.body;  // Destructure status from req.body

        const order = await orderModel.findByIdAndUpdate(id, { status }, { new: true });  // Use 'id' instead of 'orderId'

        if (!order) {
            res.status(404).json({
                messageType: "error",
                message: "No order found"
            });
        } else {
            io.to(order.userId.toString()).emit("order-status-updated",{
                orderId:order._id,
                status:order.status,
                message:`Order status has been updated to ${order.status}`
            });
            res.status(200).json({
                messageType: "success",
                message: order
            });
        }

    } catch (error) {
        res.status(500).json({
            messageType: "error",
            message: error || "An error occurred"
        });
    }
};


export const cancelOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;  // Destructure id from req.params

        const order = await orderModel.findByIdAndDelete(id);  // Use id directly and await the result

        if (!order) {
            res.status(404).json({  // 404 for not found
                messageType: "error",
                message: "No order found"
            });
        } else {
            res.status(200).json({
                messageType: "success",  // Correct capitalization
                message: "Order successfully canceled",
                order
            });
        }
    } catch (error) {
        res.status(500).json({
            messageType: "error",
            message: error || "An error occurred"
        });
    }
};


