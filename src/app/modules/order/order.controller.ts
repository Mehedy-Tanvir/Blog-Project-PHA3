import { Request, Response } from 'express';
import { OrderService } from './order.service';

// Create a new order
const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await OrderService.createOrder(req.body);
    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: order,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || 'Failed to create order',
      status: false,
      error: {
        name: error.name,
        ...(error.name === 'ValidationError' && { errors: error.errors }),
      },
      stack: `Error: Something went wrong! \n ${error.stack}`,
    });
  }
};

// Calculate total revenue
const calculateRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalRevenue = await OrderService.calculateRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Failed to calculate revenue',
      status: false,
      error: {
        name: error.name,
        ...(error.name === 'ValidationError' && { errors: error.errors }),
      },
      stack: `Error: Something went wrong! \n ${error.stack}`,
    });
  }
};

export const OrderController = { createOrder, calculateRevenue };
