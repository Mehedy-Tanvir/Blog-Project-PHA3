import { z } from 'zod';

export const AdminValidation = {
  blockUserValidationSchema: z.object({
    params: z.object({
      userId: z.string({ required_error: 'User ID is required' }),
    }),
  }),

  deleteBlogValidationSchema: z.object({
    params: z.object({
      id: z.string({ required_error: 'Blog ID is required' }),
    }),
  }),
};
