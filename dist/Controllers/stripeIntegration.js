"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refundPayment = exports.getPaymentStatus = exports.createPaymentIntent = void 0;
const stripe_1 = require("stripe");
const orderModel_1 = require("../Models/orderModel");
const stripe = new stripe_1.Stripe("sk_test_51QCl8WRw5Jx1DnY566hnjTG6ssP1GLeFeYyKpmvMr2uKEQyzfyYYk375x1rxtPOpzLuux8UKgkmKyBw2ZGMRzzNh00VeeSAaeb");
const createPaymentIntent = async (req, res) => {
    const { orderId, paymentMethodType } = req.body;
    try {
        const order = await orderModel_1.orderModel.findById(orderId);
        if (!order) {
            res.status(404).json({
                messageType: "error",
                message: "Order does not exist"
            });
        }
        else {
            const orderprice = order.totalPrice * 100;
            const paymentIntent = await stripe.paymentIntents.create({
                amount: orderprice,
                currency: 'inr',
                payment_method_types: [paymentMethodType],
                metadata: { orderId: order._id.toString() }
            });
            res.status(200).json({
                clientSecret: paymentIntent.client_secret,
                paymentIntentId: paymentIntent.id,
            });
        }
    }
    catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ message: error });
    }
};
exports.createPaymentIntent = createPaymentIntent;
const getPaymentStatus = async (req, res) => {
    const { orderId, id } = req.params;
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(id);
        if (paymentIntent.status === 'succeeded') {
            // Update the order status in your database
            await orderModel_1.orderModel.findByIdAndUpdate(orderId, { status: 'paid' });
            res.status(200).json({
                message: 'Payment successful and order status updated.',
                paymentIntent
            });
        }
        else {
            res.status(400).json({ message: 'Payment not successful' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            messageType: "error",
            message: error
        });
    }
};
exports.getPaymentStatus = getPaymentStatus;
const refundPayment = async (req, res) => {
    try {
        const { orderId, id } = req.params;
        const paymentIntent = await stripe.paymentIntents.retrieve(id);
        const charge = await stripe.charges.list({ payment_intent: paymentIntent.id });
        if (!charge.data || charge.data.length === 0) {
            res.status(400).json({
                messageType: "error",
                message: "No charge found for this payment intent",
            });
        }
        else {
            // Find the order associated with the orderId and update its status
            const updatedOrder = await orderModel_1.orderModel.findByIdAndUpdate(orderId, // Condition to find the order
            { status: "Refunded" }, // Update the status
            { new: true } // Option to return the updated document
            );
            // Check if the order was found and updated
            if (!updatedOrder) {
                res.status(404).json({
                    messageType: "error",
                    message: "Order not found",
                });
            }
            else {
                // Create a refund for the payment intent
                const refund = await stripe.refunds.create({
                    payment_intent: paymentIntent.id,
                });
                res.status(200).json({
                    messageType: "success",
                    message: "Payment refunded successfully",
                    refund,
                    orderStatus: updatedOrder.status, // Return the updated order status
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            messageType: "error",
            message: error
        });
    }
};
exports.refundPayment = refundPayment;
//# sourceMappingURL=stripeIntegration.js.map