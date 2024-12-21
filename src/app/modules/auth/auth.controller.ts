import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// controller to register user
const registerUserController = catchAsync(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const user = await AuthService.registerUser({ name, email, password });

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'User registered successfully',
      data: user,
    });
  },
);

// controller to login user
const loginUserController = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await AuthService.loginUser({ email, password });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    data: { token: result.accessToken },
  });
});

export const AuthController = {
  registerUserController,
  loginUserController,
};
