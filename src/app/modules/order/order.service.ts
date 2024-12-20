import { Order } from './order.model';
import { Product } from '../product/product.model';
import { TOrder } from './order.interface';

// Create a new order
const createOrder = async (orderData: TOrder) => {
  const product = await Product.findById(orderData.product);

  if (!product) {
    throw new Error('Product not found');
  }
  if (orderData.quantity < 1) {
    throw new Error('Order quantity needs to be greater or equal to one');
  }

  if (product.quantity < orderData.quantity) {
    throw new Error('Insufficient stock available');
  }
  if (product.price * orderData.quantity !== orderData.totalPrice) {
    throw new Error(
      `Total price is incorrect, it's ${product.price * orderData.quantity} .`,
    );
  }

  // Calculate total price
  const totalPrice = product.price * orderData.quantity;

  // Create the order
  const order = await Order.create({
    ...orderData,
    totalPrice,
  });

  // Reduce product quantity
  product.quantity -= orderData.quantity;

  // Update stock status
  if (product.quantity === 0) {
    product.inStock = false;
  }

  await product.save();

  return order;
};

// Calculate total revenue
const calculateRevenue = async () => {
  const revenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  return revenue[0]?.totalRevenue || 0;
};
export const OrderService = {
  createOrder,
  calculateRevenue,
};
