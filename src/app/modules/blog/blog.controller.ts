import { Request, Response } from 'express';
import { BlogService } from './blog.service';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller to create a new blog
const createBlogController = catchAsync(async (req: Request, res: Response) => {
  const userId = req.userId;
  const { title, content } = req.body;

  const blog = await BlogService.createBlog(userId, { title, content });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog created successfully',
    data: blog,
  });
});

// Controller to update an existing blog
const updateBlogController = catchAsync(async (req: Request, res: Response) => {
  const userId = req.userId;
  const { blogId } = req.params;
  const { title, content } = req.body;

  const updatedBlog = await BlogService.updateBlog(blogId, userId, {
    title,
    content,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog updated successfully',
    data: updatedBlog,
  });
});

// // Controller to delete a blog
// const deleteBlogController = catchAsync(async (req: Request, res: Response) => {
//   const userId = req.user.id; // Assuming user ID is available in req.user (via middleware)
//   const { blogId } = req.params;

//   await BlogService.deleteBlog(blogId, userId);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Blog deleted successfully',
//   });
// });

// // Controller to get all blogs (with optional filters, search, etc.)
// const getAllBlogsController = catchAsync(
//   async (req: Request, res: Response) => {
//     const query = req.query; // Extracting query parameters for search, sorting, etc.

//     const blogs = await BlogService.getAllBlogs(query);

//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: 'Blogs fetched successfully',
//       data: blogs,
//     });
//   },
// );

export const BlogController = {
  createBlogController,
  updateBlogController,
  //   deleteBlogController,
  //   getAllBlogsController,
};
