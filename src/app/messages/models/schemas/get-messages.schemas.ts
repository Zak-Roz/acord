import { responsePaginationSchema } from '../../../common/resources/common/pagination.dto';
import {
  basicSchema,
  errorSchemas,
  offsetPaginationSchema,
} from '../../../common/resources/common/schema';
import { statusCodes } from '../../../common/resources/common/status-codes';
import { responseMessageSchema } from '../dtos/message.dto';

const request = {
  tags: ['Messages'],
  summary: 'Get messages',
  ...offsetPaginationSchema,
};

const response = {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: {
        ...responseMessageSchema
      },
    },
    pagination: responsePaginationSchema
  },
};

export const listMessagesSchema = {
  ...basicSchema,
  ...request,
  response: {
    [statusCodes.created]: response,
    ...errorSchemas,
  },
};
