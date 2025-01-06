<script setup>
const { setLocale } = useI18n()
</script>

<template>
  <div class="flex flex-col justify-between w-[400px] h-[300px]">
    <!--<NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
      {{ locale.name }}
    </NuxtLink>-->
    <button @click="setLocale('en')" class="btn-primary">English</button>
    <button @click="setLocale('fr')" class="btn-primary">Français</button>
    <button @click="setLocale('de')" class="btn-primary">Deutsch</button>
  </div>
</template>
