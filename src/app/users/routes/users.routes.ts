import { FastifyInstance } from 'fastify';
import { registerUser } from '../controllers/users.controller';
import { registerSchema } from '../models/schemas/user.schemas';

export const userRoutes = (fastify: FastifyInstance) => {
  fastify.route({
    method: 'POST',
    url: '/register',
    schema: registerSchema,
    handler: registerUser,
  });
}
