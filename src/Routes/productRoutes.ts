import { addProduct, addReview, deleteProduct, deleteReview, getAllProducts, getProductsByName, getProductsByTag, updateProduct } from "../Controllers/productController";
import express from "express";
import { Router } from "express";
import { checkRole } from "../Middlewares/authorizer";

const productRouter = express.Router();

productRouter.post('/addProduct',checkRole,addProduct);
productRouter.get('/getAllProducts',getAllProducts);
productRouter.get('/getProductByTag',getProductsByTag);
productRouter.get('/getProductByName',getProductsByName);
productRouter.put('/updateProduct/:id',checkRole,updateProduct);
productRouter.delete('/deleteProduct/:id',checkRole,deleteProduct);
productRouter.post('/addReview/:id',addReview);
productRouter.delete('/:productId/deleteReview/:reviewId',deleteReview);

export default productRouter;