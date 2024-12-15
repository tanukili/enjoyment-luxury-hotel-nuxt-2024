// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["@/assets/stylesheets/all.scss"],
  plugins: ["@/plugins/iconify.js"],
  // 環境變數設定
  runtimeConfig: {
    public: {
      baseUrl: ''
    }
  }
});