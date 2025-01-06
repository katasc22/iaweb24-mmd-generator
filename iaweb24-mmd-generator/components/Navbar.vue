<template>
  <div
      class="fixed w-full h-[120px] flex justify-between items-center px-5 border-b-4"
      :class="isDarkMode ? 'bg-primary_dark text-white border-[#45474B]' : 'bg-primary_light text-black border-green'"
  >
    <!-- Logo -->
    <div class="flex flex-row items-center justify-center">
      <!--<BuildingOffice2Icon class="size-12 text-black mx-2.5" />-->
      <img src="/favicon.ico" alt="icon" class="size-12 text-black mx-2.5" >
      <h1 class="text-6xl">Skyline - Mental Model Diagram Generator </h1>
    </div>

    <!-- Desktop Menu -->
    <ul class="h-full flex items-center justify-center">
      <li class="cursor-pointer">
        <a @click.prevent="scrollTo('home')" class="btn-nav">
          Home
        </a>
      </li>
      <li class="cursor-pointer">
        <a @click.prevent="scrollTo('info')" class="btn-nav">
          Info
        </a>
      </li>
      <li class="cursor-pointer">
        <a @click.prevent="scrollTo('settings')" class="btn-nav">
          Settings
        </a>
      </li>
      <li>
        <div class="btn-nav">
          <GlobeEuropeAfricaIcon class="size-12 text-black my-2" @click.prevent="scrollTo('languageSettings')"/>
        </div>
      </li>
      <!--<li>  for dark mode?
        <div class="mx-9 pb-3 bg-primary_light hover:border-b-4 hover:border-b-green">
          <SunIcon class="size-12 text-black" />
        </div>
      </li>-->
    </ul>

    <!-- Placeholder for Theme Toggle and Language Switch
    <div class="flex justify-end items-center gap-10">-->


    <!-- Mobile Menu Icon
    <div class="md:hidden z-10">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </div>-->

    <!-- Mobile Menu
    <ul
        class="absolute top-0 left-0 w-full h-screen justify-center items-center flex flex-col gap-6 bg-primary hidden"
    >
      <li>
        <a href="/home">
          <h4>Home</h4>
        </a>
      </li>
      <li>
        <a href="/events">
          <h4>Events</h4>
        </a>
      </li>
      <li>
        <a href="/tasks">
          <h4>Tasks</h4>
        </a>
      </li>
      <li>
        <a href="/profile">
          <h4>Profile</h4>
        </a>
      </li>
      <li>
        <a href="/logout">
          <h4>Logout</h4>
        </a>
      </li>
    </ul>-->
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
