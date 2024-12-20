import { z } from 'zod';

// registration validation
const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required.' }),
    email: z
      .string({ required_error: 'Email is required.' })
      .email({ message: 'Invalid email address.' }),
    password: z
      .string({ required_error: 'Password is required.' })
      .min(6, { message: 'Password must be at least 6 characters long.' }),
  }),
});

// login validation
const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required.' })
      .email({ message: 'Invalid email address.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});
export const AuthValidation = {
  registerUserValidationSchema,
  loginValidationSchema,
};
