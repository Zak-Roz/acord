import { basicSchema } from '../../../common/resources/common/schema';

export interface IContentQuery {
  id: number
}

const request = {
  tags: ['Messages'],
  summary: 'Get content',
  querystring: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
};

export const contentQuerySchema = {
  ...basicSchema,
  ...request,
};
