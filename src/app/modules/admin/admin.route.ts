import express from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Block a user
router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  validateRequest(AdminValidation.blockUserValidationSchema),
  AdminController.blockUserController,
);

// Delete a blog
router.delete(
  '/blogs/:id',
  auth(USER_ROLE.admin),
  validateRequest(AdminValidation.deleteBlogValidationSchema),
  AdminController.deleteBlogController,
);

export const AdminRoutes = router;
