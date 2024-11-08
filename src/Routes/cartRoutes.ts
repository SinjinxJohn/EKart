import { checkAdmin } from "../Middlewares/authorizer";
import { addToCart, fetchCart, removeFromCart } from "../Controllers/cartController";
import express from "express";

const cartRoute = express.Router();

cartRoute.post("/addToCart",checkAdmin,addToCart);
cartRoute.get('/fetchCart',checkAdmin,fetchCart);
cartRoute.delete("/removeFromCart",checkAdmin,removeFromCart);

export default cartRoute;