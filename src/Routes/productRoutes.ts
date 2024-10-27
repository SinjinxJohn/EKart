import { addProduct, addReview, deleteProduct, deleteReview, getAllProducts, getProductsByName, getProductsByTag, updateProduct } from "../Controllers/productController";
import express from "express";
import { Router } from "express";
import { checkAdmin, checkForSeller, checkRole } from "../Middlewares/authorizer";

const productRouter = express.Router();

productRouter.post('/addProduct',checkForSeller,addProduct);
productRouter.get('/getAllProducts',getAllProducts);
productRouter.get('/getProductByTag',getProductsByTag);
productRouter.get('/getProductByName',getProductsByName);
productRouter.put('/updateProduct/:id',checkForSeller,updateProduct);
productRouter.delete('/deleteProduct/:id',checkForSeller,deleteProduct);
productRouter.post('/addReview/:id',checkAdmin,addReview);
productRouter.delete('/:productId/deleteReview/:reviewId',checkAdmin,deleteReview);

export default productRouter;