import { basicSchema, errorSchemas } from '../../../common/resources/common/schema';
import { statusCodes } from '../../../common/resources/common/status-codes';

const request = {
  tags: ['Messages'],
  summary: 'Send a file message',
  consumes: ['multipart/form-data'],
  body: {
    type: 'object',
    additionalProperties: false,
    properties: {
      file: { type: 'string', format: 'binary' },
    },
  }
};

const response = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    userId: { type: 'number' },
    type: { type: 'string' },
    content: { type: 'string' },
    createdAt: { type: 'string' },
    file: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          filePath: { type: 'string' },
          mimeType: { type: 'string' },
          size: { type: 'string' },
          createdAt: { type: 'string' },
        },
      }
  },
};

export const fileMessageSchema = {
  ...basicSchema,
  ...request,
  response: {
    [statusCodes.created]: response,
    ...errorSchemas
  }
};
