<script setup>
import { GlobeEuropeAfricaIcon } from '@heroicons/vue/24/solid/index.js';
import { ref } from 'vue';
const { setLocale } = useI18n()
const isDropdownOpen = ref(false); // State to toggle the dropdown

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}
function changeLanguage(lang) {
  setLocale(lang); // Update the current locale
  isDropdownOpen.value = false; // Close the dropdown after selection
}
</script>


<template>

  <!-- Language Switcher -->
  <div class="relative">
    <!-- Globe Icon -->
    <button @click="toggleDropdown" class="btn-nav">
      <GlobeEuropeAfricaIcon class="size-8 text-black my-2" />
    </button>

    <!-- Dropdown Menu -->
    <div
        v-if="isDropdownOpen"
        class="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg"
    >
      <ul class="flex flex-col">
        <li>
          <button
              @click="changeLanguage('en')"
              class="block px-4 py-2 text-black hover:bg-gray-200 w-full"
          >
            English
          </button>
        </li>
        <li>
          <button
              @click="changeLanguage('fr')"
              class="block px-4 py-2 text-black hover:bg-gray-200 w-full"
          >
            Français
          </button>
        </li>
        <li>
          <button
              @click="changeLanguage('de')"
              class="block px-4 py-2 text-black hover:bg-gray-200 w-full"
          >
            Deutsch
          </button>
        </li>
        <li>
          <button
              @click="changeLanguage('es')"
              class="block px-4 py-2 text-black hover:bg-gray-200 w-full"
          >
            Español
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
