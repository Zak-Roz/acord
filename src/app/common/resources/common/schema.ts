import { DEFAULT_PAGINATION_LIMIT } from "./base-constants";
import { statusCodes } from "./status-codes";

export const basicSchema = {
  security: [
    {
      basicAuth: []
    }
  ]
};

export const entityByIdSchema = {
  params: {
    id: {
      type: 'number'
    }
  }
};


export interface ILisQuery {
  offset: number,
  limit: number,
}

export const offsetPaginationSchema = {
  querystring: {
    type: 'object',
    properties: {
      offset: {
        type: 'number',
        description: 'Offset for pagination',
        default: 0
      },
      limit: {
        type: 'number',
        description: 'Limit for pagination',
        default: DEFAULT_PAGINATION_LIMIT
      }
    }
  }
};

const validationErrorSchema = {
  type: 'object',
  properties: {
    errors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          property: { type: 'string' },
          message: { type: 'string' },
          code: { type: 'string' }
        }
      }
    }
  }
};

const commonErrorSchema = {
  type: 'object',
  properties: {
    errors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          code: { type: 'string' },
          message: { type: 'string' }
        }
      }
    }
  }
};

export const errorSchemas = {
  [statusCodes.badRequest]: validationErrorSchema,
  [statusCodes.unauthorized]: commonErrorSchema,
  [statusCodes.notFound]: commonErrorSchema,
  405: commonErrorSchema,
  415: commonErrorSchema,
  429: commonErrorSchema,
  [statusCodes.internalServerError]: commonErrorSchema,
  502: commonErrorSchema
};
