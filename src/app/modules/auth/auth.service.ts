import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import User from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const registerUser = async (
  userData: Pick<TUser, 'name' | 'email' | 'password'>,
) => {
  // checking if the given token is valid
  const { name, email, password } = userData;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(400, 'Email is already registered');
  }

  // Create the user
  const newUser = await User.create({
    name,
    email,
    password,
  });

  // Return the response without the password field
  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  };
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(401, 'Invalid credentials!');
  }
  // checking if the user is blocked

  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError(403, 'This user is blocked!');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(401, 'Invalid credentials!');

  //create token and sent to the  client
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  registerUser,
  loginUser,
};
