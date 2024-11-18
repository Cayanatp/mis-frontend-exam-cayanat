import type { UseFetchOptions } from "#app";

export const useIFetch = <T>(
  endpoint: string,
  options: UseFetchOptions<T> = {},
  customPath?: string
) => {
  const config = useRuntimeConfig();
  const baseURL = `${config.public.apiBase}${
    customPath ?? config.public.apiPath
  }`;
  const accessToken = useCookie("accessToken");

  const defaults: UseFetchOptions<T> = {
    baseURL,
    retryStatusCodes: [401],
    retry: 1,
    onRequest: async ({ request, options }) => {
      if (accessToken.value) {
        options.headers.set("Authorization", `Bearer ${accessToken.value}`);
      } else {
        const accessToken = await useAuth().refreshAccessToken();
        if (accessToken) {
          options.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      }
    },
    onResponseError: async ({ response, options }) => {
      if (response.status === 401 && !accessToken.value) {
        try {
          const accessToken = await useAuth().refreshAccessToken();
          options.headers.set("Authorization", `Bearer ${accessToken}`);
        } catch (error) {
          //
        }
      }
    },
  };

  const params = useMerge(options, defaults);

  return useFetch(endpoint, params);
};
