export default defineNuxtRouteMiddleware(() => {
  useNuxtApp().$i18n.setLocale("th");
});
