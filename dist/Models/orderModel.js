"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const mongoose_1 = require("mongoose");
const cartModel_1 = require("./cartModel");
const OrderSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'UserModel', required: true },
    totalPrice: { type: Number },
    items: {
        type: [cartModel_1.CartItemSchema], required: true
    },
    status: {
        type: String,
        enum: ['Shipped', 'Delivered', 'Ordered', "Pending", "Paid", "Refunded"],
        default: "Pending"
    },
    to: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
exports.orderModel = (0, mongoose_1.model)("OrderModel", OrderSchema);
//# sourceMappingURL=orderModel.js.map