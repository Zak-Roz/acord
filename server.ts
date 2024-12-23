import fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import sequelize from './config/database';
import multipart from '@fastify/multipart';

import { userRoutes } from './src/app/users/routes/users.routes';
import { messageRoutes } from './src/app/messages/routes/messages.routes';
import basicAuthPlugin from './src/plugins/basic-auth';
import localePlugin from './src/plugins/locales';

async function startServer() {
  const app = fastify({ logger: true });
  app.register(basicAuthPlugin);

  app.register(localePlugin);

  app.register(swagger, {
    openapi: {
      info: {
        title: 'Chat API',
        version: '1.0.0'
      },
      components: {
        securitySchemes: {
          basicAuth: {
            type: 'http',
            scheme: 'basic'
          }
        },
      }
    }
  });
  app.addSchema({
    $id: 'FileUploadSchema',
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  });
  app.register(multipart);
  app.register(swaggerUi, {
    routePrefix: '/docs',
  });

  app.register(userRoutes, { prefix: 'v1/account' });
  app.register(messageRoutes, { prefix: 'v1/message' });

  try {
    await sequelize.sync({ alter: true });
    const PORT = Number(process.env.PORT ) || 3000;
    await app.listen({
      host: process.env.DOCKER ? '0.0.0.0' : 'localhost',
      port: PORT,
    });
    console.log('Server is running on http://localhost:3000');
    console.log('Swagger docs: http://localhost:3000/docs');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

startServer();