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
  },
  modules: ["@vee-validate/nuxt"],
  veeValidate: {
    componentNames: {
      Form: "VFrom",
      Field: "VField",
      ErrorMessage: "VErrorMessage"
    }
  },
  app: {
    head: {
      viewport: "width=device-width, initial-scale=1",
      charset: "utf-8",
      // 全站 SEO
      title: '享樂酒店－高雄豪華住宿之選',
      meta: [
        {
          property: 'title',
          content: '享樂酒店－高雄豪華住宿之選'
        },
        {
          name: 'description',
          content: '享樂酒店，坐落於高雄市中心，是頂級奢華酒店的首選。我們為旅客提供高品質的住宿體驗，結合現代時尚設計與五星級設施，讓您盡享舒適與尊榮服務。酒店擁有精緻客房、無邊際泳池、高空酒吧及米其林推薦美食，並鄰近六合夜市、愛河、駁二藝術特區等知名景點，讓您的高雄之旅更加難忘。立即預訂，體驗無與倫比的豪華住宿！（本網站為虛擬訂房網，純粹作為前端技術練習用）'
        },
        {
          property: 'url',
          content: 'https://enjoyment-luxury-hotel-nuxt-2024.onrender.com/'
        },
        {
          property: 'og:title',
          content: '享樂酒店－高雄豪華住宿之選'
        },
        {
          name: 'og:description',
          content: '享樂酒店，坐落於高雄市中心，是頂級奢華酒店的首選。我們為旅客提供高品質的住宿體驗，結合現代時尚設計與五星級設施，讓您盡享舒適與尊榮服務。酒店擁有精緻客房、無邊際泳池、高空酒吧及米其林推薦美食，並鄰近六合夜市、愛河、駁二藝術特區等知名景點，讓您的高雄之旅更加難忘。立即預訂，體驗無與倫比的豪華住宿！（本網站為虛擬訂房網，純粹作為前端技術練習用）'
        },
        {
          property: 'og:image',
          content: '/home-hero-sm.png'
        },
        {
          property: 'og:url',
          content: 'https://enjoyment-luxury-hotel-nuxt-2024.onrender.com/'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:locale',
          content: 'zh-TW'
        },
        { name: 'theme-color', content: '#bf9d7d' },
        {
          property: 'keywords', // google 已棄用
          content: '享樂酒店, 高雄酒店, 高雄住宿, 五星級酒店, 六合夜市, 愛河, 駁二藝術特區, 米其林'
        }
      ],
      link: [
        { rel: 'icon', href: '/logo-primary.svg' },
        { rel: 'canonical', href: 'https://enjoyment-luxury-hotel-nuxt-2024.onrender.com/' }
      ]
    }
  }
});