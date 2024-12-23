import { FastifyInstance } from 'fastify';
import path from 'path';
import fp from 'fastify-plugin';
import fastifyPolyglot from 'fastify-polyglot';

const localePlugin = async (fastify: FastifyInstance) => {
  fastify.register(fastifyPolyglot, {
    defaultLocale: 'en',
    localesPath: path.join(process.cwd(), './locales'),
  });
};

export default fp(localePlugin);
