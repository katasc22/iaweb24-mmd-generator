
## Setup

## Make sure to install dependencies:
```
npm install
```
## Development Server
## Start the development server on [http://localhost:3000/iaweb24-mmd-generator/]
## Run development
```
npm run dev
```
## Generate files for deployment:
```
npm run generate
```
## Deploy via github pages:
```
npm run deploy
```
## Tauri app Deployment


## Step 1: Change Nuxt Configuration
Since the original configuration uses SSR (which is not compatible with the tauri app), we need to change a few things, to this final nuxt.config.ts. Change for the following code:

```export default defineNuxtConfig({
  target: 'static', 
  ssr: false,       
  app: {
    baseURL: './',  
    buildAssetsDir: 'assets',
  },
 
  nitro: {
    output: {
      dir: 'dist', 
    },
    prerender: {
      routes: ['/'], 
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

  compatibility date: '2025-01-22',
});
```

## Step 2: Generate nuxt app build
```
npx nuxi generate
```
## Step 3: Initialize Tauri
```
npx tauri init
```
## - Set the name of the app
## - Set the name of the window
## - Set the path to `../dist/public`
## - Let the rest as teh default

## Step 4: Change Identifier
Change the identifier name in tauri.config.json as something else, such as `com.skyline.dev`

## Step 5: Build Tauri
```
npx tauri build
```
## Step 6: Run the application
it is on `src-tauri/target/release/app.exe`


