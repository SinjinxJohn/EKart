import { checkAdmin } from "../Middlewares/authorizer";
import { addToCart, removeFromCart } from "../Controllers/cartController";
import express from "express";

const cartRoute = express.Router();

cartRoute.post("/addToCart",checkAdmin,addToCart);
cartRoute.delete("/removeFromCart",checkAdmin,removeFromCart);

export default cartRoute;