import { Request, Response } from 'express';
import { ProductService } from './product.service';

// Create a Bike
const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json({
      message: 'Bike created successfully',
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(400).json({
      message: 'Validation failed',
      success: false,
      error: {
        name: error.name,
        ...(error.name === 'ValidationError' && { errors: error.errors }),
      },
      stack: `Error: Something went wrong! \n ${error.stack}`,
    });
  }
};

// Get All Products by Name, Brand, or Category
const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract query parameters from the request
    const { name, brand, category } = req.query;

    // Call the service with the appropriate query parameter
    const products = await ProductService.getAllProducts({
      name: name as string,
      brand: brand as string,
      category: category as string,
    });

    res.status(200).json({
      message: 'Products retrieved successfully',
      success: true,
      data: products,
    });
  } catch (error: any) {
    res.status(400).json({
      message: 'Failed to retrieve bikes',
      success: false,
      error: {
        name: error.name,
        message: error.message,
      },
      stack: `Error: Something went wrong! \n ${error.stack}`,
    });
  }
};

// Get a Bike by ID
const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await ProductService.getProductById(req.params.productId);
    if (!product) {
      res.status(404).json({
        message: 'Bike not found',
        success: false,
      });
      return;
    }
    res.status(200).json({
      message: 'Bike retrieved successfully',
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(400).json({
      message: 'Failed to retrieve bike',
      success: false,
      error: {
        name: error.name,
        message: error.message,
      },
      stack: `Error: Something went wrong! \n ${error.stack}`,
    });
  }
};

// Update a Bike
const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await ProductService.updateProduct(
      req.params.productId,
      req.body,
    );
    if (!product) {
      res.status(404).json({
        message: 'Bike not found',
        success: false,
      });
      return;
    }
    res.status(200).json({
      message: 'Bike updated successfully',
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(400).json({
      message: 'Validation failed',
      success: false,
      error: {
        name: error.name,
        ...(error.name === 'ValidationError' && { errors: error.errors }),
      },
      stack: `Error: Something went wrong! \n ${error.stack}`,
    });
  }
};

// Delete a Bike
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await ProductService.deleteProduct(req.params.productId);
    if (!product) {
      res.status(404).json({
        message: 'Bike not found',
        success: false,
      });
      return;
    }
    res.status(200).json({
      message: 'Bike deleted successfully',
      success: true,
      data: {},
    });
  } catch (error: any) {
    res.status(400).json({
      message: 'Failed to delete bike',
      success: false,
      error: {
        name: error.name,
        message: error.message,
      },
      stack: `Error: Something went wrong! \n ${error.stack}`,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
