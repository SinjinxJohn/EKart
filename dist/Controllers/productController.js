"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.addReview = exports.deleteProduct = exports.updateProduct = exports.getProductsByName = exports.getProductsByTag = exports.getAllProducts = exports.addProduct = void 0;
const productModel_1 = require("../Models/productModel");
const uuid_1 = require("uuid");
const userModel_1 = require("../Models/userModel");
const addProduct = async (req, res) => {
    try {
        const userId = req.user?.id;
        const user = await userModel_1.userModel.findById(userId);
        const { productName, productPrice, brand, colour, material, productImage, stock, tags } = req.body;
        if (!productName || !productPrice || !productImage || !stock || !brand || !colour || !material || !tags) {
            res.status(401).json({
                messageType: "error",
                message: "Invalid/missing metdata for product. Please add all details"
            });
        }
        else {
            const address = user?.address;
            const productDetails = { brand: brand, colour: colour, material: material };
            const newprod = await productModel_1.productModel.create({
                productName,
                productPrice,
                productImage,
                productDetails,
                stock,
                tags,
                address
            });
            res.status(201).json({
                messageType: "success",
                message: newprod
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
exports.addProduct = addProduct;
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel_1.productModel.find();
        if (!products) {
            res.status(401).json({
                messageType: "error",
                message: "No products available"
            });
        }
        else {
            res.status(200).json({
                messageType: "success",
                message: products
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
exports.getAllProducts = getAllProducts;
const getProductsByTag = async (req, res) => {
    try {
        const { tags } = req.body;
        const products = await productModel_1.productModel.find({ tags: { $in: tags } });
        if (products.length == 0) {
            res.status(401).json({
                messageType: "error",
                message: "No products available with the given tag"
            });
        }
        else {
            res.status(200).json({
                messageType: "success",
                message: products
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
exports.getProductsByTag = getProductsByTag;
const getProductsByName = async (req, res) => {
    try {
        const { productName } = req.body;
        const products = await productModel_1.productModel.find({ productName: { $in: productName } });
        if (products.length == 0) {
            res.status(401).json({
                messageType: "error",
                message: "No products available with the given name"
            });
        }
        else {
            res.status(200).json({
                messageType: "success",
                message: products
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
exports.getProductsByName = getProductsByName;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, productPrice, brand, colour, material, productImage, stock, tags } = req.body;
        const product = await productModel_1.productModel.findById(id);
        if (!product) {
            res.json({
                messageType: "error",
                message: "No product found by this id"
            });
        }
        else {
            if (productName)
                product.productName = productName;
            if (brand) {
                product.productDetails.brand = brand;
            }
            if (colour) {
                product.productDetails.colour = colour;
            }
            if (material) {
                product.productDetails.material = material;
            }
            if (productPrice)
                product.productPrice = productPrice;
            if (productImage)
                product.productImage = productImage;
            if (stock)
                product.stock = stock;
            if (tags)
                product.tags = tags;
            const updatedProduct = await product.save();
            //remove updated product from json
            res.status(200).json({
                messageType: "success",
                product: updatedProduct,
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
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel_1.productModel.findByIdAndDelete(id);
        if (!product) {
            res.status(401).json({
                messageType: "error",
                message: "No product found"
            });
        }
        else {
            res.status(200).json({
                messageType: "success",
                message: "Product deleted successfully"
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
exports.deleteProduct = deleteProduct;
// export interface Review{
//     reviewer:string,
//     rating:number,
//     comment:string,
//     date:Date
// }
const addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const { id } = req.params;
        const product = await productModel_1.productModel.findById(id);
        if (!product) {
            res.status(401).json({
                messageType: "error",
                message: "No product found or valid user"
            });
        }
        else {
            const username = req.user?.username || "Anonymous";
            const newReview = {
                id: (0, uuid_1.v4)(),
                reviewer: username,
                rating,
                comment,
                date: new Date()
            };
            product.reviews.push(newReview);
            await productModel_1.productModel.findByIdAndUpdate(id, product, { new: true });
            //remove product from json 
            res.status(200).json({
                messageType: "success",
                message: "Review added successfully",
                product
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
exports.addReview = addReview;
const deleteReview = async (req, res) => {
    try {
        const { productId, reviewId } = req.params;
        const product = await productModel_1.productModel.findById(productId);
        if (!product) {
            res.status(401).json({
                messageType: "error",
                message: "No product found"
            });
        }
        else {
            product.reviews = product.reviews.filter(review => review.id != reviewId);
            await product.save();
            res.status(200).json({
                messageType: "success",
                message: "Review deleted successfully"
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
exports.deleteReview = deleteReview;
//# sourceMappingURL=productController.js.map