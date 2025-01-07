<template>
  <div
      class="fixed w-full h-[120px] flex justify-between items-center px-5 border-b-4 z-50"
      :class="isDarkMode ? 'bg-primary_dark text-white border-[#45474B]' : 'bg-primary_light text-black border-green'"
  >
    <!-- Logo -->
    <div class="flex flex-row items-center justify-center">
      <img src="/favicon.ico" alt="icon" class="size-12 text-black mx-2.5" />
      <h1 class="text-6xl">{{ $t("navbar.logoTitle") }}</h1>
    </div>

    <!-- Desktop Menu -->
    <ul class="h-full flex items-center justify-center">
      <li class="cursor-pointer">
        <a @click.prevent="scrollTo('home')" class="btn-nav">
          {{ $t("navbar.menu.home") }}
        </a>
      </li>
      <li class="cursor-pointer">
        <a @click.prevent="scrollTo('info')" class="btn-nav">
          {{ $t("navbar.menu.info") }}
        </a>
      </li>
      <li class="cursor-pointer">
        <a @click.prevent="scrollTo('settings')" class="btn-nav">
          {{ $t("navbar.menu.settings") }}
        </a>
      </li>
      <li class="cursor-pointer">
        <a @click.prevent="scrollTo('diagram')" class="btn-nav">
          {{ $t("navbar.menu.diagram") }}
        </a>
      </li>
      <li>
        <div class="btn-nav">
          <GlobeEuropeAfricaIcon class="size-12 text-black my-2" @click.prevent="scrollTo('languageSettings')" />
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
  props: {
    isDarkMode: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    scrollTo(id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
