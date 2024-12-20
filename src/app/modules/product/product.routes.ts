import { Router } from 'express';
import { ProductController } from './product.controller';

// import {
//   createProductSchema,
//   updateProductSchema,
//   getProductSchema,
// } from './product.vallidation';
// import { validate } from './product.validation.middleware';

const productRouter = Router();

// Create a bike
productRouter.post('/', ProductController.createProduct);

// Get all bikes (with optional search)
productRouter.get('/', ProductController.getAllProducts);

// Get a specific bike by ID
productRouter.get('/:productId', ProductController.getProductById);

// Update a bike by ID
productRouter.put('/:productId', ProductController.updateProduct);

// Delete a bike by ID (soft delete)
productRouter.delete('/:productId', ProductController.deleteProduct);

export default productRouter;
