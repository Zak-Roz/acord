import { basicSchema, errorSchemas } from '../../../common/resources/common/schema';
import { statusCodes } from '../../../common/resources/common/status-codes';
import { MessagesValidationRules } from '../../../common/resources/messages';

export interface ICreateTextMessage {
  text: string;
}

const request = {
  tags: ['Messages'],
  summary: 'Send a text message',
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['text'],
    properties: {
      text: {
        type: 'string',
        minLength: MessagesValidationRules.textMinLength,
        maxLength: MessagesValidationRules.textMaxLength,
      },
    },
  }
};

const response = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    userId: { type: 'number' },
    type: { type: 'number' },
    content: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
  }
};

export const textMessageSchema = {
  ...basicSchema,
  ...request,
  response: {
    [statusCodes.created]: response,
    ...errorSchemas
  }
};
