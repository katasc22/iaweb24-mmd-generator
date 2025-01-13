<script setup>
  const localePath = useLocalePath();
</script>

<template>
  <div
      class="fixed w-full h-[120px] flex justify-between items-center px-5 border-b-4 border-green z-50 bg-primary_light"
  >
    <!-- Logo -->
    <div class="flex flex-row items-center justify-center">
      <img src="/favicon.ico" alt="icon" class="size-12 text-black mx-2.5" />
      <h1 class="text-6xl">{{ $t("navbar.logoTitle") }}</h1>
    </div>

    <!-- Desktop Menu -->
    <ul class="h-full flex items-center justify-center">
      <li class="cursor-pointer">
        <NuxtLink :to="localePath('/')" class="btn-nav"> {{ $t("navbar.menu.home") }}</NuxtLink>
      </li>
      <li class="cursor-pointer">
        <nuxt-link :to="localePath('/settings')" class="btn-nav">{{ $t("navbar.menu.settings") }}</nuxt-link>
      </li>
      <li class="cursor-pointer">
        <nuxt-link :to="localePath('/diagram')" class="btn-nav">
          {{ $t("navbar.menu.diagram") }}
        </nuxt-link>
      </li>
      <li class="cursor-pointer">
        <nuxt-link :to="localePath('/info')" class="btn-nav">
          {{ $t("navbar.menu.info") }}
        </nuxt-link>
      </li>
      <li>
        <div class="btn-nav">
          <NuxtLink :to="localePath('/languages')"><GlobeEuropeAfricaIcon class="size-12 text-black my-2"  /></NuxtLink>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
import {BuildingOffice2Icon} from "@heroicons/vue/24/outline/index.js";
import {GlobeEuropeAfricaIcon} from "@heroicons/vue/24/solid/index.js";
import {SunIcon} from "@heroicons/vue/24/solid/index.js";
export default {
  name: "Navbar",
  components: {
    BuildingOffice2Icon,
    GlobeEuropeAfricaIcon,
    SunIcon
  },
};
</script>

