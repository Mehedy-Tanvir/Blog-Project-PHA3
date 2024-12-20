import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required.' }),
    content: z.string({ required_error: 'Content is required.' }),
  }),
});

const updateBlogValidationSchema = z.object({
  params: z.object({
    blogId: z.string({ required_error: 'Blog ID is required.' }),
  }),
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  }),
});

const deleteBlogValidationSchema = z.object({
  params: z.object({
    blogId: z.string({ required_error: 'Blog ID is required.' }),
  }),
});

const getAllBlogsValidationSchema = z.object({
  query: z
    .object({
      search: z.string().optional(),
      sortBy: z.string().optional().default('createdAt'),
      sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
      filter: z.string().optional(),
    })
    .optional(),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
  deleteBlogValidationSchema,
  getAllBlogsValidationSchema,
};
