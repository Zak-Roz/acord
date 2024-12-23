export const buildPagination = (
  offset: number,
  limit: number,
  count: number,
) => {
  return {
    nextOffset: offset + limit,
    nextPage: Math.round((offset + limit) / limit + 1),
    totalCount: count,
  };
};

export const buildCount = (count: number) => {
  return {
    totalCount: count || 0,
  };
};
