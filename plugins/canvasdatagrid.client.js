export default defineNuxtPlugin((nuxtApp) => {
    import('canvas-datagrid').then((canvasdatagrid) => {
        console.log('canvasdatagrid imported successfully')
    })
})
