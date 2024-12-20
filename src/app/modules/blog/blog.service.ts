/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import Blog from './blog.model';

const createBlog = async (
  userId: Types.ObjectId,
  blogData: Pick<TBlog, 'title' | 'content'>,
) => {
  const { title, content } = blogData;

  const newBlog = await Blog.create({
    title,
    content,
    author: userId,
  });

  // Populate the author field
  await newBlog.populate('author');

  return {
    _id: newBlog._id,
    title: newBlog.title,
    content: newBlog.content,
    author: newBlog.author,
  };
};

const updateBlog = async (
  blogId: string,
  userId: Types.ObjectId,
  updateData: Partial<Pick<TBlog, 'title' | 'content'>>,
) => {
  const blog = await Blog.findOne({ _id: blogId, author: userId });
  if (!blog) {
    throw new AppError(404, 'Blog not found or not owned by the user');
  }

  // Update blog fields
  Object.assign(blog, updateData);

  // Save updated blog
  await blog.save();

  // Populate the author field
  await blog.populate('author');

  return {
    _id: blog._id,
    title: blog.title,
    content: blog.content,
    author: blog.author,
  };
};

const deleteBlog = async (blogId: string, userId: Types.ObjectId) => {
  const blog = await Blog.findOneAndDelete({ _id: blogId, author: userId });
  if (!blog) {
    throw new AppError(404, 'Blog not found or not owned by the user');
  }

  return blog;
};

const getAllBlogs = async (query: {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filter?: string;
}) => {
  const { search, sortBy = 'createdAt', sortOrder = 'desc', filter } = query;

  const filterCriteria: any = {};
  if (search) {
    filterCriteria.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }
  if (filter) {
    filterCriteria.author = filter;
  }

  const blogs = await Blog.find(filterCriteria)
    .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
    .populate('author', 'name email'); // Populate author details

  return blogs;
};

export const BlogService = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
