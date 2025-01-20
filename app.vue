
<template>
  <div class="flex flex-col min-h-screen items-center">
    <Navbar/>
    <NuxtPage/>
    <Footer/>
  </div>
</template>


<style scoped>
html,
body {
margin: 0;
padding: 0;
height: 100%;
}

</style>
<script setup lang="ts">
import Footer from "~/components/Footer.vue";
import Navbar from "~/components/Navbar.vue";
</script>