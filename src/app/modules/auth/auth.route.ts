import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerUserValidationSchema),
  AuthController.registerUserController,
);

//   '/login',
//   validateRequest(AuthValidation.loginValidationSchema),
//   AuthControllers.loginUser,
// );

export const AuthRoutes = router;
