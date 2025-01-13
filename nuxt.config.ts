// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  router: {
    base: '/iaweb24-mmd-generator/', // Replace 'repository-name' with your GitHub repository name
  },
  pages: 'true',
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
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
      { code: 'de', name: 'German', iso: 'de-DE', file: 'de.json' },
      { code: 'fr', name: 'French', iso: 'fr-FR', file: 'fr.json' },
      { code: 'es', name: 'Spanish', iso: 'es-ES', file: 'es.json' },
    ],
    lazy: true,
    langDir: "lang",
    defaultLocale: 'en',
    strategy: "prefix",
    detectBrowserLanguage: false,
    vueI18n: "./i18n.config.ts",
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