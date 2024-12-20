import { z } from 'zod';

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Product name is required' })
    .max(50, { message: 'Product name cannot exceed 50 characters' }),
  brand: z
    .string()
    .min(1, { message: 'Brand is required' })
    .max(30, { message: 'Brand name cannot exceed 30 characters' }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric'], {
    errorMap: () => ({
      message:
        "Invalid category. Valid categories are 'Mountain', 'Road', 'Hybrid', and 'Electric'",
    }),
  }),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(500, { message: 'Description cannot exceed 500 characters' }),
  quantity: z.number().min(0, { message: 'Quantity cannot be negative' }),
  inStock: z.boolean(),
});

export const updateProductSchema = createProductSchema.partial();

export const getProductSchema = z.object({
  productId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid product ID format' }),
});
