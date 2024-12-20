import { Router } from 'express';
import { OrderController } from './order.controller';

const orderRouter = Router();

// Create a new order
orderRouter.post('/', OrderController.createOrder);

// Calculate total revenue
orderRouter.get('/revenue', OrderController.calculateRevenue);

export default orderRouter;
