"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productController_1 = require("../Controllers/productController");
const express_1 = __importDefault(require("express"));
const authorizer_1 = require("../Middlewares/authorizer");
const productRouter = express_1.default.Router();
productRouter.post('/addProduct', authorizer_1.checkForSeller, productController_1.addProduct);
productRouter.get('/getAllProducts', productController_1.getAllProducts);
productRouter.get('/getProductByTag', productController_1.getProductsByTag);
productRouter.get('/getProductByName', productController_1.getProductsByName);
productRouter.put('/updateProduct/:id', authorizer_1.checkForSeller, productController_1.updateProduct);
productRouter.delete('/deleteProduct/:id', authorizer_1.checkForSeller, productController_1.deleteProduct);
productRouter.post('/addReview/:id', authorizer_1.checkAdmin, productController_1.addReview);
productRouter.delete('/:productId/deleteReview/:reviewId', authorizer_1.checkAdmin, productController_1.deleteReview);
exports.default = productRouter;
//# sourceMappingURL=productRoutes.js.map