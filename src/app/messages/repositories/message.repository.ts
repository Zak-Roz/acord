import { Attributes, FindAndCountOptions, ScopeOptions } from 'sequelize';
import Message, { MessageTypes } from '../models/entities/message.entity';

export const createMessage = (
  userId: number,
  content?: string,
  fileId?: number,
) => {
  return Message.create({
    userId,
    type: content ? MessageTypes.text : MessageTypes.file,
    content,
    fileId,
  });
};

export const getMessageById = (
  id: number,
  scopes: readonly (string | ScopeOptions)[] = [],
) => {
  return Message.scope(scopes).findByPk(id);
};

export const getAllMessagesFromDB = (
  scopes: readonly (string | ScopeOptions)[] = [],
  options?: Omit<FindAndCountOptions<Attributes<Message>>, 'group'>,
) => {
  return Message.scope(scopes).findAndCountAll(options);
};
