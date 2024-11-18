import headConfig from "./head.config";
const nodeEnv =
  process.env.NUXT_NODE_ENV === "development" ? "development" : "production";

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: nodeEnv === "development" },
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "msapplication-TileColor",
          content: process.env.NUXT_THEME_COLOR,
        },
        {
          name: "msapplication-TileImage",
          content: "/icons/ms-icon-144x144.png",
        },
        { name: "theme-color", content: process.env.NUXT_THEME_COLOR },
        { name: "google", content: "notranslate" },
        {
          name: "google-site-verification",
          content: process.env.NUXT_GOOGLE_SITE_VERIFICATION,
        },
      ],
    },
  },
  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
    "dayjs-nuxt",
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "@nuxtjs/i18n",
    "nuxt-lodash",
  ],
  ui: {
    // icons: ["mdi", "fa6-solid", "fa6-regular", "fa6-brands"],
  },
  i18n: {
    defaultLocale: "th",
    locales: [
      {
        code: "th",
        countryCode: "th",
        name: "ไทย",
        subName: "Thai",
        iso: "th-TH",
      },
      {
        code: "en",
        countryCode: "us",
        name: "English",
        subName: "อังกฤษ",
        iso: "en-US",
      },
    ],
    vueI18n: "./i18n.config.ts",
  },
  googleFonts: {
    families: {
      Kanit: [100, 200, 300, 400, 500, 600, 700],
      Sarabun: [100, 200, 300, 400, 500, 600, 700],
    },
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  colorMode: {
    preference: "light",
  },
  dayjs: {
    locales: ["en", "th"],
    defaultLocale: "en",
    defaultTimezone: "Asia/Bangkok",
    plugins: ["utc", "timezone", "buddhistEra", "localeData", "relativeTime"],
  },
  runtimeConfig: {
    public: {
      appName: process.env.NUXT_PUBLIC_APP_NAME || "App Name",
      webBase: process.env.NUXT_PUBLIC_WEB_BASE || "http://localhost:3000",
      webPath: process.env.NUXT_PUBLIC_WEB_PATH || "/",
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:5000",
      apiPath: process.env.NUXT_PUBLIC_API_PATH || "/api/",
    },
  },
});
