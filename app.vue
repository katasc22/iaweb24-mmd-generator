
<template>
  <div class="flex flex-col min-h-screen items-center">
    <Navbar/>
    <div class="content-container">
      <NuxtPage/>
    </div>
    <Footer/>
  </div>
</template>


<style scoped>
html,
body {
margin: 0;
padding: 0;
}

.content-container {
  width: 100%; /* Assure que la largeur correspond au parent */

  margin: 0 auto; /* Centre horizontalement */
  overflow-x: hidden; /* Évite les débordements horizontaux */
}


</style>
<script setup lang="ts">
import Footer from "~/components/Footer.vue";
import Navbar from "~/components/Navbar.vue";
</script>