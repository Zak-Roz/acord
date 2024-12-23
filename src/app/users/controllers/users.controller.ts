import { FastifyRequest, FastifyReply } from 'fastify';
import { createUser } from '../services/users.service';
import { CreateUserDto } from '../models/schemas/user.schemas';
import { UserDto } from '../models/dtos/user.dto';
import { statusCodes } from '../../common/resources/common/status-codes';
import { findUserByUsername } from '../repositories/users.repository';

export const registerUser = async function (req: FastifyRequest, reply: FastifyReply) {
  const data = req.body as CreateUserDto;
  const getUserByUsername = await findUserByUsername(data.username);

  if (getUserByUsername) {
    reply.status(statusCodes.badRequest);
    throw new Error(req.server.i18n.t('USERNAME_ALREADY_TAKEN'));
  }

  const user = await createUser(data);
  return reply.status(statusCodes.created).send(new UserDto(user));
}
