// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  ssr: false,
  app: {
    baseURL: "/save-smart",
    buildAssetsDir: "assets",
    head: {
      title: "SaveSmart-เนิร์ดไฟแนนซ์ x CodeTraveler",
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/save-smart/favicon.ico",
        },
      ],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@nuxt/image"],
});
