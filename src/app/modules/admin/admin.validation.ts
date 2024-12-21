import { z } from 'zod';

export const AdminValidation = {
  // blocking user validation
  blockUserValidationSchema: z.object({
    params: z.object({
      userId: z.string({ required_error: 'User ID is required' }),
    }),
  }),

  // deleting blog validation
  deleteBlogValidationSchema: z.object({
    params: z.object({
      id: z.string({ required_error: 'Blog ID is required' }),
    }),
  }),
};
