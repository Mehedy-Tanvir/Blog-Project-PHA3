import mongoose, { Schema } from 'mongoose';
import { TBlog } from './blog.interface';

// Blog Schema
const BlogSchema: Schema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create and export the model
const Blog = mongoose.model<TBlog>('Blog', BlogSchema);
export default Blog;
