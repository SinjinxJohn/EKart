"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cartController_1 = require("../Controllers/cartController");
const express_1 = __importDefault(require("express"));
const cartRoute = express_1.default.Router();
cartRoute.post("/addToCart", cartController_1.addToCart);
cartRoute.delete("/removeFromCart", cartController_1.removeFromCart);
exports.default = cartRoute;
//# sourceMappingURL=cartRoutes.js.map