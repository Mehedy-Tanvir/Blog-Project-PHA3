import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body, params: req.params, query: req.query });
      next();
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          message: 'Validation failed',
          success: false,
          error: {
            name: error.name,
            ...(error.name === 'ValidationError' && { errors: error }),
          },
          stack: error.stack,
        });
      }
    }
  };
};
