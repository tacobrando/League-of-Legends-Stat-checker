export default defineNuxtConfig({
  css: ['/assets/css/app.css'],
  // routeRules: {
  //   '/summoner/[region]/[name]': { ssr: false }
  // },
  modules: ['@element-plus/nuxt', '@pinia/nuxt', "@nuxtjs/tailwindcss", "@nuxt/image"],
  elementPlus: {},
  pinia: {},
  runtimeConfig: {
    apiKey: process.env.RIOT_API_KEY,
    public: {
      apiBase: process.env.API_BASE_URL,
      avatarBase: `${process.env.IMAGE_BASE_URL}${process.env.PROFILE_IMAGE_SLUG}`,
      championBase: `${process.env.IMAGE_BASE_URL}${process.env.CHAMPION_IMAGE_SLUG}`,
      itemBase: `${process.env.IMAGE_BASE_URL}${process.env.ITEM_IMAGE_SLUG}`,
      spellBase: `${process.env.IMAGE_BASE_URL}${process.env.SPELL_IMAGE_SLUG}`,
      runeBase: `${process.env.RUNE_BASE_URL}/`
    }
  }
})