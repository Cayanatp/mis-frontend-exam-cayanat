import thCommon from "./locales/th/common.json";
import enCommon from "./locales/en/common.json";
import thApp from "./locales/th/app.json";
import enApp from "./locales/en/app.json";
export default defineI18nConfig(() => ({
  legacy: false,
  locale: "th",
  fallbackLocale: "th",
  messages: {
    th: {
      ...thCommon,
      ...thApp,
    },
    en: {
      ...enCommon,
      ...enApp,
    },
  },
}));
