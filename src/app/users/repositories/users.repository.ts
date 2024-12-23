import User from '../models/entities/user.entity';
import bcrypt from 'bcryptjs';

export const findUserByUsername = (username: string) => {
  return User.findOne({ where: { username } });
};

export const saveUser = async (username: string, password: string) => {
  const { salt, hashedPassword } = await hashPassword(password);
  return User.create({ username, salt, password: hashedPassword });
};

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return { salt, hashedPassword };
};

export const validatePassword = async (
  user: User,
  password: string,
): Promise<boolean> => {
  const hash = await bcrypt.hash(password, user.salt);
  return hash === user.password;
};
