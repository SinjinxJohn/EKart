"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authorizer_1 = require("../Middlewares/authorizer");
const cartController_1 = require("../Controllers/cartController");
const express_1 = __importDefault(require("express"));
const cartRoute = express_1.default.Router();
cartRoute.post("/addToCart", authorizer_1.checkAdmin, cartController_1.addToCart);
cartRoute.delete("/removeFromCart", authorizer_1.checkAdmin, cartController_1.removeFromCart);
exports.default = cartRoute;
//# sourceMappingURL=cartRoutes.js.map