"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    productName: { required: true, type: String },
    productPrice: { required: true, type: Number },
    productImage: { required: true, type: String },
    productDetails: {
        brand: { required: true, type: String },
        colour: { type: String, required: true },
        material: { required: true, type: String }
    },
    reviews: [
        {
            reviewer: { type: String },
            rating: { type: Number },
            comment: { type: String },
            date: { type: Date, default: Date.now }
        }
    ],
    address: { type: String, required: true },
    purchased: { type: Number },
    stock: { type: Number, required: true },
    tags: [{ type: String }],
});
exports.productModel = (0, mongoose_1.model)("ProductModel", ProductSchema);
//# sourceMappingURL=productModel.js.map