import { createPaymentIntent, getPaymentStatus } from "../Controllers/stripeIntegration";
import express from "express";
const paymentRouter = express.Router();



paymentRouter.post('/createPaymentIntent',createPaymentIntent);

paymentRouter.get('/:orderId/getPaymentStatus/:id',getPaymentStatus);

export default paymentRouter;
