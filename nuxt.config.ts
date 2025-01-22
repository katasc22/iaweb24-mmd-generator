export default defineNuxtConfig({
  target: 'static', // Ensure static generation
  ssr: false,       // Disable server-side rendering
  app: {
    baseURL: './',  // Relative paths for Tauri
    buildAssetsDir: 'assets',
  },
 
  nitro: {
    output: {
      dir: 'dist', // Change this to your desired folder name
    },
    prerender: {
      routes: ['/'], // Specify which routes to prerender, including the home page
    },
  },

  head: {
    title: 'Skyline - Mental Model Diagram Generator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Your app description' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: './favicon.ico' }], // Relative path
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
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
    strategy: "prefix_except_default",
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

  compatibilityDate: '2025-01-22',
});