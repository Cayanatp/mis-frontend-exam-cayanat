export const useAuth = () => {
  const config = useRuntimeConfig();
  const endpoint = `${config.public.apiBase}${config.public.apiPath}auth`;

  const setupTokenExpirationTimer = (res: Authentication) => {
    if (res.access_token && res.expires_in && res.refresh_token) {
      let tokenExpirationTimer: any;
      const tokenExpirationTime = res.expires_in * 100;
      const currentTime = Date.now();
      const timeUntilExpiration = tokenExpirationTime - currentTime;
      const refreshToken = useCookie("refreshToken");
      refreshToken.value = res.refresh_token;
      clearTimeout(tokenExpirationTimer);
      tokenExpirationTimer = setTimeout(() => {
        refreshAccessToken();
      }, timeUntilExpiration);
    }
  };

  async function Login(payload: Login) {
    try {
      const { data, error } = await useFetch<Authentication>(
        `${endpoint}/login`,
        {
          method: "post",
          body: {
            username: payload.username,
            password: payload.password,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode,
          statusMessage: error.value.statusMessage,
          fatal: true,
        });
      }
      const accessToken = useCookie("accessToken");
      accessToken.value = data.value?.access_token;
      setupTokenExpirationTimer(data.value!);
    } catch (err) {
      // console.error("Token refresh error:", err);
    }
  }

  async function Logout() {
    try {
      const { data, error } = await useFetch(`${endpoint}/logout`, {
        method: "delete",
      });
      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode,
          statusMessage: error.value.statusMessage,
          fatal: true,
        });
      }
    } catch (err) {
      console.error("Token refresh error:", err);
    }
  }

  async function refreshAccessToken() {
    try {
      const refreshToken = useCookie("refreshToken");
      const { data, error } = await useFetch<Authentication>(
        `${endpoint}/refresh`,
        {
          method: "POST",
          body: {
            refresh_token: refreshToken.value,
          },
        }
      );
      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode,
          statusMessage: error.value.statusMessage,
          fatal: true,
        });
      }

      return data.value;
    } catch (err) {
      console.error("Token refresh error:", err);
      return null;
    }
  }

  return {
    Login,
    Logout,
    refreshAccessToken,
  };
};
