import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import User from '../user/user.model';

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

export const AuthService = {
  registerUser,
};
