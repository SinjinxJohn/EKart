import { addProduct } from "../Controllers/productController";
import express from "express";
import { Router } from "express";
import { checkRole } from "../Middlewares/authorizer";

const productRouter = express.Router();

productRouter.post('/addProduct',checkRole,addProduct);

export default productRouter;