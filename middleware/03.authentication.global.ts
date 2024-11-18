export default defineNuxtRouteMiddleware(async (to) => {
  const localeRoute = useLocaleRoute();
  const auth = authen();
  const localePath = useLocalePath();
  const publicPages = [localeRoute("login")?.name, localeRoute("auth")?.name];
  if (publicPages.includes(to.name) && auth.loggedIn) {
    return navigateTo(localePath({ name: "index" }));
  } else if (!auth.loggedIn && !publicPages.includes(to.name)) {
    abortNavigation();
    return navigateTo(localePath({ name: "login" }));
  }
});
