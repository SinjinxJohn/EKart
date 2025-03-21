"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrder = exports.updateStatus = exports.createOrder = exports.getAllOrders = exports.getUserOrders = void 0;
const cartModel_1 = require("../Models/cartModel");
const orderModel_1 = require("../Models/orderModel");
const userModel_1 = require("../Models/userModel");
const productModel_1 = require("../Models/productModel");
const index_1 = require("../index");
const getUserOrders = async (req, res) => {
    try {
        const userId = req.user?.id;
        const orders = await orderModel_1.orderModel.find({ userId }).sort({ createdAt: -1 });
        if (!orders || orders.length == 0) {
            res.status(404).json({
                messageType: "error",
                message: "No orders have been placed"
            });
        }
        else {
            res.status(200).json({
                messageType: "success",
                message: orders
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
exports.getUserOrders = getUserOrders;
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel_1.orderModel.find();
        if (!orders) {
            res.status(404).json({
                messageType: "error",
                message: "No orders present at the moment."
            });
        }
        else {
            res.status(200).json({
                messageType: 'success',
                message: orders
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
exports.getAllOrders = getAllOrders;
const createOrder = async (req, res) => {
    try {
        const userId = req.user?.id;
        const cart = await cartModel_1.cartModel.findOne({ userId });
        const user = await userModel_1.userModel.findById(userId);
        if (!cart || cart.items.length == 0) {
            res.status(404).json({
                messageType: "error",
                message: "Cart is empty"
            });
        }
        else {
            const totalPrice = cart.totalPrice;
            const items = cart.items;
            var userAddress = user?.address;
            if (!userAddress) {
                userAddress = "United India apartments, Mayur Vihar Phase - 1";
            }
            const order = await new orderModel_1.orderModel({
                userId,
                totalPrice,
                items,
                to: userAddress,
            });
            for (const item of items) {
                const productId = item.productId;
                const quantity = item.quantity;
                // Find the product and update stock
                const product = await productModel_1.productModel.findById(productId);
                if (product) {
                    if (product.stock >= quantity) {
                        product.stock -= quantity;
                        await product.save();
                    }
                    else {
                    }
                }
            }
            await order.save();
            res.status(201).json({
                messageType: "success",
                message: order
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
exports.createOrder = createOrder;
//performed only by admin/moderator
const updateStatus = async (req, res) => {
    try {
        const { id } = req.params; // Destructure 'id' since the route defines it as ':id'
        const { status } = req.body; // Destructure status from req.body
        const order = await orderModel_1.orderModel.findByIdAndUpdate(id, { status }, { new: true }); // Use 'id' instead of 'orderId'
        if (!order) {
            res.status(404).json({
                messageType: "error",
                message: "No order found"
            });
        }
        else {
            index_1.io.to(order.userId.toString()).emit("order-status-updated", {
                orderId: order._id,
                status: order.status,
                message: `Order status has been updated to ${order.status}`
            });
            res.status(200).json({
                messageType: "success",
                message: order
            });
        }
    }
    catch (error) {
        res.status(500).json({
            messageType: "error",
            message: error || "An error occurred"
        });
    }
};
exports.updateStatus = updateStatus;
const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params; // Destructure id from req.params
        const order = await orderModel_1.orderModel.findByIdAndDelete(id); // Use id directly and await the result
        if (!order) {
            res.status(404).json({
                messageType: "error",
                message: "No order found"
            });
        }
        else {
            res.status(200).json({
                messageType: "success", // Correct capitalization
                message: "Order successfully canceled",
                order
            });
        }
    }
    catch (error) {
        res.status(500).json({
            messageType: "error",
            message: error || "An error occurred"
        });
    }
};
exports.cancelOrder = cancelOrder;
//# sourceMappingURL=orderController.js.map