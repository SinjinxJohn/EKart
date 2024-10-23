"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderController_1 = require("../Controllers/orderController");
const express_1 = __importDefault(require("express"));
const authorizer_1 = require("../Middlewares/authorizer");
const orderRoute = express_1.default.Router();
orderRoute.get('/getAllOrders', authorizer_1.checkRole, orderController_1.getAllOrders);
orderRoute.get('/getUserOrders', orderController_1.getUserOrders);
orderRoute.post('/createOrder', orderController_1.createOrder);
orderRoute.patch('/:id/updateOrder', authorizer_1.checkRole, orderController_1.updateStatus);
orderRoute.delete('/:id/cancelOrder', orderController_1.cancelOrder);
exports.default = orderRoute;
//# sourceMappingURL=orderRoutes.js.map