import User from '../user/user.model';
import Blog from '../blog/blog.model';
import AppError from '../../errors/AppError';

export const blockUser = async (userId: string) => {
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { isBlocked: true },
    { new: true },
  );

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  return { message: 'User blocked successfully' };
};

export const deleteBlog = async (blogId: string) => {
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new AppError(404, 'Blog not found');
  }

  await blog.deleteOne();

  return { message: 'Blog deleted successfully' };
};
