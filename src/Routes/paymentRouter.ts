import { checkAdmin } from "../Middlewares/authorizer";
import { createPaymentIntent, getPaymentStatus, refundPayment } from "../Controllers/stripeIntegration";
import express from "express";
const paymentRouter = express.Router();



paymentRouter.post('/createPaymentIntent',checkAdmin,createPaymentIntent);

paymentRouter.get('/:orderId/getPaymentStatus/:id',getPaymentStatus);

paymentRouter.patch('/:orderId/refundPayment/:id',refundPayment);

export default paymentRouter;
