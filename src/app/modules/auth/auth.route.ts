import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

// user registering route
router.post(
  '/register',
  validateRequest(AuthValidation.registerUserValidationSchema),
  AuthController.registerUserController,
);

// user login route
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUserController,
);

//   '/login',
//   validateRequest(AuthValidation.loginValidationSchema),
//   AuthControllers.loginUser,
// );

export const AuthRoutes = router;
