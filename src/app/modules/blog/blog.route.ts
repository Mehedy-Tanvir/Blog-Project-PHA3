import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogController } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Route to create a blog
router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogController.createBlogController,
);

// // Route to update a blog
router.patch(
  '/:blogId',
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.updateBlogValidationSchema),
  BlogController.updateBlogController,
);

// // Route to delete a blog
// router.delete(
//   '/delete/:blogId',
//   validateRequest(BlogValidation.deleteBlogValidationSchema),
//   BlogController.deleteBlogController,
// );

// // Route to get all blogs
// router.get(
//   '/all',
//   validateRequest(BlogValidation.getAllBlogsValidationSchema),
//   BlogController.getAllBlogsController,
// );

export const BlogRoutes = router;
