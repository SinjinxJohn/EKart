import { addToCart, removeFromCart } from "../Controllers/cartController";
import express from "express";

const cartRoute = express.Router();

cartRoute.post("/addToCart",addToCart);
cartRoute.delete("/removeFromCart",removeFromCart);

export default cartRoute;