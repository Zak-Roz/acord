export const responsePaginationSchema = {
  type: 'object',
  required: ['nextOffset', 'nextPage', 'totalCount'],
  properties: {
    nextOffset: {
      type: 'integer',
      description: 'Next offset'
    },
    nextPage: {
      type: 'integer',
      description: 'Next page'
    },
    totalCount: {
      type: 'integer',
      description: 'Total amount of records'
    }
  }
};
