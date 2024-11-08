"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCart = exports.addToCart = void 0;
const cartModel_1 = require("../Models/cartModel");
// import { CartItem } from "Models/cartInterface";
const productModel_1 = require("../Models/productModel");
const mongoose_1 = __importDefault(require("mongoose"));
const addToCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { productId, quantity } = req.body;
        const productObjectId = new mongoose_1.default.Types.ObjectId(productId);
        let product = await productModel_1.productModel.findById(productObjectId);
        // const productObjectId = new mongoose.Types.ObjectId(productId);
        if (!product) {
            res.status(404).json({
                messageType: "error",
                message: "No product found"
            });
        }
        else {
            let cart = await cartModel_1.cartModel.findOne({ userId });
            const totalPrice = product.productPrice * quantity;
            if (!cart) {
                const newCart = await cartModel_1.cartModel.create({
                    userId,
                    items: [
                        {
                            productId: productObjectId,
                            productName: product.productName,
                            totalPrice,
                            price: product.productPrice,
                            quantity,
                            address: product.address
                        }
                    ]
                });
                res.status(201).json({
                    messageType: 'success',
                    message: newCart
                });
            }
            else {
                const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
                if (productIndex > -1) {
                    cart.items[productIndex].quantity += quantity;
                    cart.items[productIndex].totalPrice += totalPrice;
                }
                else {
                    cart.items.push({
                        productId: productObjectId,
                        productName: product.productName,
                        quantity,
                        price: product.productPrice,
                        totalPrice: totalPrice,
                        address: product.address
                    });
                }
                cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
                cart.totalPrice = cart.items.reduce((total, item) => total + item.totalPrice, 0);
                const updatedCart = await cart.save();
                res.status(200).json({
                    messageType: "success",
                    message: updatedCart
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            messageType: "error",
            message: error
        });
    }
};
exports.addToCart = addToCart;
const removeFromCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { productId } = req.body;
        const cart = await cartModel_1.cartModel.findOne({ userId });
        if (!cart) {
            res.status(404).json({
                messageType: "error",
                message: "Cart Information Not Available. Please try again"
            });
        }
        else {
            cart.items = cart.items.filter(item => item.productId.toString() != productId);
            cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
            cart.totalPrice = cart.items.reduce((total, item) => total + item.totalPrice, 0);
            const updatedCart = await cart.save();
            res.status(200).json({
                messageType: "success",
                message: updatedCart
            });
        }
    }
    catch (error) {
        res.status(500).json({
            messageType: "error",
            message: error
        });
    }
};
exports.removeFromCart = removeFromCart;
//# sourceMappingURL=cartController.js.map