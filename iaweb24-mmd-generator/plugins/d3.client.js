export default defineNuxtPlugin((nuxtApp) => {
    import('d3').then((d3) => {
        console.log('d3 imported successfully')
    })
})
