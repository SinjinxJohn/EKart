import { cartModel } from "../Models/cartModel"
import { Request, Response } from "express";
import { CustomRequest } from "../Middlewares/authHelper";
// import { CartItem } from "Models/cartInterface";
import { productModel } from "../Models/productModel";
import mongoose from "mongoose";


export const addToCart = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const { productId, quantity } = req.body;


        const productObjectId = new mongoose.Types.ObjectId(productId);
        let product = await productModel.findById(productObjectId);

        // const productObjectId = new mongoose.Types.ObjectId(productId);

        if (!product) {
            res.status(404).json({
                messageType: "error",
                message: "No product found"
            })
        } else {
            let cart = await cartModel.findOne({ userId });
            const totalPrice = product.productPrice * quantity;

            if (!cart) {
                const newCart = await cartModel.create({
                    userId,
                    items: [
                        {
                            productId: productObjectId,
                            productName: product.productName,
                            totalPrice,
                            price: product.productPrice,
                            quantity,
                            address:product.address
                        }
                    ]
                });
                res.status(201).json({
                    messageType: 'success',
                    message: newCart
                })
            } else {
                const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

                if (productIndex > -1) {
                    cart.items[productIndex].quantity += quantity;
                    cart.items[productIndex].totalPrice += totalPrice;

                } else {
                    cart.items.push({
                        productId: productObjectId,
                        productName: product.productName,
                        quantity,
                        price: product.productPrice,
                        totalPrice: totalPrice,
                        address:product.address
                    });
                }
                cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
                cart.totalPrice = cart.items.reduce((total, item) => total + item.totalPrice, 0);

                const updatedCart = await cart.save();
                res.status(200).json(updatedCart);
            }
        }

    } catch (error) {
        res.status(500).json({
            messageType: "error",
            message: error
        })
    }
}

export const removeFromCart = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const { productId } = req.body;

        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            res.status(404).json({
                messageType: "error",
                message: "Cart Information Not Available. Please try again"
            })
        } else {
            cart.items = cart.items.filter(item => item.productId.toString() != productId);
            cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
            cart.totalPrice = cart.items.reduce((total, item) => total + item.totalPrice, 0);


            const updatedCart = await cart.save();
            res.status(200).json({
                messageType: "success",
                message: updatedCart
            })

        }

    } catch (error) {
        res.status(500).json({
            messageType: "error",
            message: error
        })
    }
}