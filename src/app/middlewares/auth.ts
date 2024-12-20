import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import { catchAsync } from '../utils/catchAsync';
import User from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Extract token from Authorization header
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new AppError(403, 'You are not authorized!');
    }

    // Extract the token by splitting the Authorization header
    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new AppError(403, 'Token format is incorrect or missing');
    }

    // Verifying the token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, email } = decoded;

    // Check if the user exists
    const user = await User.isUserExistsByEmail(email);

    if (!user) {
      throw new AppError(404, 'This user is not found!');
    }

    // Check if the user is blocked
    const isBlocked = user?.isBlocked;
    if (isBlocked) {
      throw new AppError(403, 'This user is blocked!');
    }

    // Check if the user has the required role
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(403, 'You are not authorized!');
    }

    // Add the user information to the request
    req.user = decoded as JwtPayload;
    req.userId = user?._id;

    // Proceed to the next middleware or route handler
    next();
  });
};

export default auth;
