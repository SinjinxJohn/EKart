import { Stripe } from "stripe";

import { Request, Response } from 'express';
import { orderModel } from "../Models/orderModel";
const stripe = new Stripe("sk_test_51QCl8WRw5Jx1DnY566hnjTG6ssP1GLeFeYyKpmvMr2uKEQyzfyYYk375x1rxtPOpzLuux8UKgkmKyBw2ZGMRzzNh00VeeSAaeb");



export const createPaymentIntent = async (req: Request, res: Response) => {
    const { orderId, paymentMethodType } = req.body;
    try {
        const order = await orderModel.findById(orderId);
        if (!order) {
            res.status(404).json({
                messageType: "error",
                message: "Order does not exist"
            })
        } else {
            const orderprice = order.totalPrice*100;
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

    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ message: error });
    }

}


export const getPaymentStatus = async(req:Request,res:Response)=>{
    const {orderId,id} = req.params;
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(id);
        if (paymentIntent.status === 'succeeded') {
            // Update the order status in your database
            await orderModel.findByIdAndUpdate(orderId, { status: 'paid' });

             res.status(200).json({ 
                message: 'Payment successful and order status updated.', 
                paymentIntent 
            });
        } else {
             res.status(400).json({ message: 'Payment not successful' });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            messageType:"error",
            message:error
        })
    }
}