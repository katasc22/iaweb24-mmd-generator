export default defineNuxtPlugin((nuxtApp) => {
    import('xlsx').then((XLSX) => {
        console.log('XLSX imported successfully')
    })
})
