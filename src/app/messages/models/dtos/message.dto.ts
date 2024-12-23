import Message from '../entities/message.entity';
import { FileDto, responseFileSchema } from './file.dto';

export class MessageDto {
  readonly id: number;
  readonly userId: number;
  readonly type: number;
  readonly content?: string;
  readonly fileId?: number;
  readonly file?: FileDto;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(data: Message) {
    this.id = data.id;
    this.userId = data.userId;
    this.type = data.type;
    this.content = data.content || undefined;
    this.fileId = data.fileId || undefined;
    this.file = data.file ? new FileDto(data.file) : undefined;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export const responseMessageSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    userId: { type: 'number' },
    type: { type: 'string' },
    content: { type: 'string' },
    createdAt: { type: 'string' },
    file: {
      ...responseFileSchema
    },
  },
};
