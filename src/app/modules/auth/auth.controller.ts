import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

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

export const AuthController = {
  registerUserController,
};
