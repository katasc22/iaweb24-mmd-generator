// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {enabled: true},
  head: {
    title: 'Skyline - Mental Model Diagram Generator',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Your app description'},
    ],
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}]
  },
  modules: [
    '@nuxtjs/tailwindcss', // TailwindCSS module
    '@nuxtjs/i18n',
  ],
  i18n: {
    vueI18n: './i18n.config.js' // if you are using custom path, default
},
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('canvas-datagrid'),
    },
  },
});