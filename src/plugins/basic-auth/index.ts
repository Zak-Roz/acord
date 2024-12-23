import fp from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { findUserByUsername, validatePassword } from '../../app/users/repositories/users.repository';

async function basicAuthPlugin(app: FastifyInstance) {
  app.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
          return reply.status(401).send({ error: 'No credentials sent' });
        }

        const [scheme, credentials] = authHeader.split(' ');
        if (scheme !== 'Basic') {
          return reply.status(401).send({ error: 'Invalid auth scheme' });
        }

        const buff = Buffer.from(credentials, 'base64');
        const [username, plainPassword] = buff.toString().split(':');

        const user = await findUserByUsername(username);
        if (!user) {
          return reply.status(401).send({ error: 'Invalid credentials' });
        }

        const match = await validatePassword(user, plainPassword);
        if (!match) {
          return reply.status(401).send({ error: 'Invalid credentials' });
        }

        request.user = user;
      } catch (err) {
        return reply.status(500).send({ error: 'Server error' });
      }
    }
  );
}

export default fp(basicAuthPlugin);

declare module 'fastify' {
    interface FastifyInstance {
      authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    }
    interface FastifyRequest {
      user?: any;
    }
}