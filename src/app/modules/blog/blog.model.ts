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
    toJSON: {
      transform: function (doc, ret) {
        // To Remove __v and isDeleted from the response
        delete ret.__v;
        // delete ret.isPublished;
        return ret;
      },
    },
  },
);

const Blog = mongoose.model<TBlog>('Blog', BlogSchema);
export default Blog;
