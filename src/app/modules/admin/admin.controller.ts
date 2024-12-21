import { Request, Response } from 'express';
import { blockUser, deleteBlog } from './admin.service';
import { catchAsync } from '../../utils/catchAsync';

export const AdminController = {
  // blocking user controller
  blockUserController: catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await blockUser(userId);

    res.status(200).json({
      success: true,
      message: result.message,
      statusCode: 200,
    });
  }),

  // deleting user controller
  deleteBlogController: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteBlog(id);

    res.status(200).json({
      success: true,
      message: result.message,
      statusCode: 200,
    });
  }),
};
