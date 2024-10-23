"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartModel = exports.CartItemSchema = void 0;
// import { model } from "mongoose";
const mongoose_1 = require("mongoose");
exports.CartItemSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'ProductModel', required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
});
const CartSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'UserModel', required: true },
    totalPrice: { type: Number },
    totalItems: { type: Number },
    items: {
        type: [exports.CartItemSchema], required: true
    }
});
exports.cartModel = (0, mongoose_1.model)("CartModel", CartSchema);
//# sourceMappingURL=cartModel.js.map