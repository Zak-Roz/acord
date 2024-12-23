import { CreateUserDto } from '../models/schemas/user.schemas';
import { saveUser } from '../repositories/users.repository';

export async function createUser(data: CreateUserDto) {
  return saveUser(data.username, data.password);
}
