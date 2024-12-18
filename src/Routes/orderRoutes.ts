import { cancelOrder, createOrder, getAllOrders, getUserOrders, updateStatus } from '../Controllers/orderController';
import { updateProduct } from '../Controllers/productController';
import express from 'express';
import { checkAdmin, checkRole } from '../Middlewares/authorizer';
const orderRoute = express.Router();



orderRoute.get('/getAllOrders',checkRole,getAllOrders);
orderRoute.get('/getUserOrders',getUserOrders);
orderRoute.post('/createOrder',checkAdmin,createOrder);
orderRoute.patch('/:id/updateOrder',checkRole,updateStatus);
orderRoute.delete('/:id/cancelOrder',cancelOrder);


export default orderRoute;