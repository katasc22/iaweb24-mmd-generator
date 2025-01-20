<script setup>
  const localePath = useLocalePath();
</script>

<template>
  <div
      class="fixed w-full h-[50px] flex justify-between items-center px-5 border-b-[3px] border-green z-50 bg-primary_light"
  >
    <!-- Logo -->
    <NuxtLink :to="localePath('/')">
      <div class="flex flex-row items-center justify-center">
        <img src="/favicon.ico" alt="icon" class="size-8 text-black mx-2.5" />
        <!--<h1>{{ $t("navbar.logoTitle") }}</h1>-->
      </div>
    </NuxtLink>
    <!-- Desktop Menu -->
    <ul class="h-full flex items-center justify-center">
      <li class="cursor-pointer">
        <NuxtLink :to="localePath('/diagram')" class="btn-nav">
          {{ $t("navbar.menu.diagram") }}
        </NuxtLink>
      </li>
      <li class="cursor-pointer">
        <NuxtLink :to="localePath('/info')" class="btn-nav">
          {{ $t("navbar.menu.info") }}
        </NuxtLink>
      </li>
      <li>
          <LanguageSwitcher/>
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

