interface ListModel {
  user: Me | null;
  loggedIn: boolean;
}

const endpoint = "auth";

export const authen = defineStore("authen", {
  state: () => {
    return {
      user: null,
      loggedIn: false,
    } as ListModel;
  },
  actions: {
    async getUser() {
      if (!this.loggedIn) {
        const accessTokenDev = useCookie("accessToken");
        if (!!accessTokenDev.value) {
          await fetchApiUser();
          if (this.user) {
            this.loggedIn = true;
          }
        }
      }
    },
    async fetchUser(requireLogin: boolean = true) {
      if (this.loggedIn && requireLogin) return;
      await fetchApiUser();
    },
    async logout() {
      await useAuth().Logout();
      const accessTokenDev = useCookie("accessToken");
      accessTokenDev.value = null;
      this.user = null;
      this.loggedIn = false;
      const localePath = useLocalePath();
      navigateTo(localePath({ name: "login" }));
    },
  },
});

const fetchApiUser = async () => {
  const { error, data } = await useIFetch<Me>(`${endpoint}/me`);
  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      statusMessage: error.value.statusMessage,
      fatal: true,
    });
  }
  if (data.value) {
    const auth = authen();
    auth.user = data.value;
  }
};
