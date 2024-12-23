import { FastifyInstance } from 'fastify';
import {
  createTextMessage,
  createFileMessage,
  getAllMessages,
  getMessageContent,
} from '../controllers/messages.controller';
import {
  textMessageSchema,
  fileMessageSchema,
  listMessagesSchema,
  contentQuerySchema,
} from '../models/schemas';

export const messageRoutes = (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', fastify.authenticate);

  fastify.route({
    method: 'POST',
    url: '/text',
    schema: textMessageSchema,
    handler: createTextMessage,
  });

  fastify.route({
    method: 'POST',
    url: '/file',
    schema: fileMessageSchema,
    handler: createFileMessage,
    validatorCompiler: () => () => true,
  });

  fastify.route({
    method: 'GET',
    url: '/list',
    schema: listMessagesSchema,
    handler: getAllMessages,
  });

  fastify.route({
    method: 'GET',
    url: '/content',
    schema: contentQuerySchema,
    handler: getMessageContent,
  });
};