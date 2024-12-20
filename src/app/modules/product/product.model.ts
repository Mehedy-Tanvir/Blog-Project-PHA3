import { model, Schema, Query } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [50, 'Product name cannot exceed 50 characters'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
      maxlength: [30, 'Brand name cannot exceed 30 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'Electric'],
        message: `{VALUE} is not a valid category. Valid categories are 'Mountain', 'Road', 'Hybrid', and 'Electric'`,
      },
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'Stock status is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        // To Remove __v and isDeleted from the response
        delete ret.__v;
        delete ret.isDeleted;
        return ret;
      },
    },
  },
);

// Middleware to exclude deleted documents in find and findOne queries
productSchema.pre(/^find/, function (this: Query<any, any>, next) {
  this.where({ isDeleted: false });
  next();
});

// Middleware to exclude deleted documents in aggregation queries
productSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: false } });
  next();
});

// Static method to find a product by name (ignores deleted products)
productSchema.statics.findByName = async function (name: string) {
  return this.findOne({ name, isDeleted: false });
};

// Instance method to update stock status
productSchema.methods.updateStockStatus = function () {
  this.inStock = this.quantity > 0;
  return this.inStock;
};

// Instance method to soft delete a product
productSchema.methods.softDelete = async function () {
  this.isDeleted = true;
  await this.save();
};

// Export the model
export const Product = model<TProduct & { isDeleted: boolean }>(
  'Product',
  productSchema,
);
