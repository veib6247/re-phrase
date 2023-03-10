// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'RE:Phrase | AI-powered rephrasing tool',
      link: [{ rel: 'icon', href: '/cpu.png' }],
      htmlAttrs: {
        'data-theme': 'black',
      },
    },
  },
  css: ['~/assets/css/main.css'], // global css for tailwind
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
