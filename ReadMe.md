Dependencies can be found in package.json!

For SheetJS remove older versions than 0.20, there are vulnerabilities! 
> npm rm --save xlsx\

with npm xlsx the vulnerable 0.18 is installed! to get the safe 0.20 version use the command:
> npm i --save https://cdn.sheetjs.com/xlsx-0.20.3/xlsx-0.20.3.tgz


Getting started: 
> npm install -g nuxi
> cd iaweb24-mmd-generator \
> npm install d3 canvas-datagrid\
> npm i --save https://cdn.sheetjs.com/xlsx-0.20.3/xlsx-0.20.3.tgz \
> npm install --save-dev @nuxtjs/tailwindcss \
> npm install @headlessui/vue @heroicons/vue \
> npm run dev

For tailwind add the following to nuxt.config.ts:
(https://nuxt.com/modules/tailwindcss)
>export default defineNuxtConfig({ \
>    modules: ['@nuxtjs/tailwindcss']
>})

sheetjs and datagrid usage:
https://docs.sheetjs.com/docs/demos/grid/cdg