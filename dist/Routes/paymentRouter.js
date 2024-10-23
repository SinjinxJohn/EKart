"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripeIntegration_1 = require("../Controllers/stripeIntegration");
const express_1 = __importDefault(require("express"));
const paymentRouter = express_1.default.Router();
paymentRouter.post('/createPaymentIntent', stripeIntegration_1.createPaymentIntent);
paymentRouter.get('/:orderId/getPaymentStatus/:id', stripeIntegration_1.getPaymentStatus);
paymentRouter.patch('/:orderId/refundPayment/:id', stripeIntegration_1.refundPayment);
exports.default = paymentRouter;
//# sourceMappingURL=paymentRouter.js.map