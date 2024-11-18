export default () => {
  const endpoint = "blogs";

  return {
    show: async (
      page: number,
      size: number,
      q: string,
      show: string = "active"
    ) => {
      const { data, error } = await useIFetch<articleList>(
        `${endpoint}?page=${page}&size=${size}&q=${q}&show=${show}`
      );
      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode,
          statusMessage: error.value.statusMessage,
          fatal: true,
        });
      }
      return { data };
    },
  };
};
