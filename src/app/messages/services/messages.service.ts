import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { MessageTypes } from '../models/entities/message.entity';
import { FastifyReply, FastifyRequest } from 'fastify';
import { statusCodes } from '../../common/resources/common/status-codes';
import { buildPagination } from '../../../helpers/pagination.helper';
import { MessageDto } from '../models/dtos/message.dto';
import {
  createMessage,
  getAllMessagesFromDB,
  getMessageById,
} from '../repositories/message.repository';
import { createFileInDB, getFileById } from '../repositories/file.repository';

export async function createText(userId: number, text: string) {
  return createMessage(userId, text);
}

export async function createFile(
  req: FastifyRequest,
  reply: FastifyReply,
  userId: number,
  data: any,
) {
  const uploadDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filename = `${uuidv4()}_${data.filename}`;
  const filePath = path.join(uploadDir, filename);

  await new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(filePath);
    data.file.pipe(writeStream);
    data.file.on('error', reject);
    writeStream.on('finish', resolve);
  });

  const stats = fs.statSync(filePath);
  const newFile = await createFileInDB(
    filename,
    data.mimetype,
    stats.size.toString(),
  );

  const msg = await createMessage(userId, undefined, newFile.id);

  const messageWithFile = await getMessageById(msg.id, ['withFile']);

  if (!messageWithFile) {
    reply.status(statusCodes.badRequest);
    throw new Error(req.server.i18n.t('MESSAGE_NOT_FOUND'));
  }

  return messageWithFile;
}

export async function getMessages(offset: number, limit: number) {
  const { rows, count } = await getAllMessagesFromDB([
    'withFile',
    'orderBy',
    { method: ['pagination', limit, offset] },
  ]);

  return {
    data: rows.map((item) => new MessageDto(item)),
    pagination: buildPagination(offset, limit, count),
  };
}

export async function fetchMessageContent(
  id: number,
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const message = await getMessageById(id);
  if (!message) {
    reply
      .status(statusCodes.notFound)
      .send({ error: req.server.i18n.t('MESSAGE_NOT_FOUND') });
    return;
  }

  switch (message.type) {
    case MessageTypes.text:
      reply.type('text/plain').send(message.content);
      break;

    case MessageTypes.file: {
      if (!message.fileId) {
        reply
          .status(statusCodes.notFound)
          .send({ error: req.server.i18n.t('FILE_NOT_FOUND') });
        return;
      }
      const file = await getFileById(message.fileId);
      if (!file) {
        reply
          .status(statusCodes.notFound)
          .send({ error: req.server.i18n.t('FILE_NOT_ASSOCIATED') });
        return;
      }

      const filePath = path.join(process.cwd(), 'uploads', file.filePath);
      if (!fs.existsSync(filePath)) {
        reply
          .status(statusCodes.notFound)
          .send({ error: req.server.i18n.t('FILE_NOT_FOUND_ON_DISK') });
        return;
      }

      reply.headers({
        'Content-Disposition': `attachment; filename="${encodeURIComponent(file.filePath)}"`,
      });
      reply.type(file.mimeType);

      return fs.createReadStream(filePath);
    }
  }
}
