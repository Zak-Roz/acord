import { FastifyRequest, FastifyReply } from 'fastify';
import {
  createText,
  createFile,
  getMessages,
  fetchMessageContent,
} from '../services/messages.service';
import { MessageDto } from '../models/dtos/message.dto';
import { statusCodes } from '../../common/resources/common/status-codes';
import { ILisQuery } from '../../common/resources/common/schema';
import { IContentQuery, ICreateTextMessage } from '../models/schemas';

export async function createTextMessage(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const data = req.body as ICreateTextMessage;
  const msg = await createText(req.user.id, data.text);
  return reply.status(statusCodes.created).send(new MessageDto(msg));
}

export async function createFileMessage(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const file = await req.file();
  if (!file) {
    reply.status(statusCodes.badRequest);
    throw new Error(req.server.i18n.t('FILE_NOT_PROVIDED'));
  }

  const msg = await createFile(req, reply, req.user.id, file);
  return reply.status(statusCodes.created).send(new MessageDto(msg));
}

export async function getAllMessages(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as ILisQuery;
  const { data, pagination } = await getMessages(query.offset, query.limit);
  return reply.code(statusCodes.ok).send({ data, pagination });
}

export async function getMessageContent(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const query = req.query as IContentQuery;
  const result = await fetchMessageContent(query.id, req, reply);
  return result;
}
