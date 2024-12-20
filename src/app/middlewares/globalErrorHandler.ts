/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import { TErrorSources } from '../interface/error';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let error: {
    details: TErrorSources;
  } = {
    details: [
      {
        path: '',
        message: 'An unexpected error occurred.',
      },
    ],
  };

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = { details: simplifiedError?.errorSources };
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = { details: simplifiedError?.errorSources };
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = { details: simplifiedError?.errorSources };
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = { details: simplifiedError?.errorSources };
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    error = {
      details: [
        {
          path: '',
          message: err?.message,
        },
      ],
    };
  } else if (err instanceof Error) {
    message = err.message;
    error = {
      details: [
        {
          path: '',
          message: err?.message,
        },
      ],
    };
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode: statusCode,
    error,
    stack: err?.stack,
  });
};

export default globalErrorHandler;