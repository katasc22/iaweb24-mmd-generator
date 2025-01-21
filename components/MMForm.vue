<template>
  <form @submit.prevent="submitForm">
    <!-- Block Settings Section -->
    <h3>{{$t('form.blockSettings')}}</h3>
    <div class="grid-container">
      <!--<div class="grid-item">
        <label for="blockMargin">{{$t('form.margin')}}</label>
        <input v-model="settings.block.margin" id="blockMargin" type="number" placeholder="20" />
      </div>
      <div class="grid-item">
        <label for="blockPadding">{{$t('form.padding')}}</label>
        <input v-model="settings.block.padding" id="blockPadding" type="number" placeholder="20" />
      </div>
      <div class="grid-item">
        <label for="blockGap">{{$t('form.gap')}}</label>
        <input v-model="settings.block.gap" id="blockGap" type="number" placeholder="10" />
      </div>-->
      <div class="grid-item">
        <label for="blockBackgroundColor">{{$t('form.backgroundColor')}}</label>
        <input v-model="settings.block.backgroundColor" id="blockBackgroundColor" type="color" />
      </div>
      <div class="grid-item">
        <label for="blockStrokeColor">{{$t('form.borderColor')}}</label>
        <input v-model="settings.block.strokeColor" id="blockStrokeColor" type="color" />
      </div>
      <div class="grid-item">
        <label for="blockTextColor">{{$t('form.textColor')}}</label>
        <input v-model="settings.block.textColor" id="blockTextColor" type="color" />
      </div>
      <div class="grid-item">
        <label for="blockFontFamily">{{$t('form.fontFamily')}}</label>
        <select v-model="settings.block.fontFamily" id="towerFontFamily">
          <option value="Arial">Arial</option>
          <option value="'Times New Roman', Times, serif">Times New Roman</option>
          <option value="Verdana, Geneva, sans-serif">Verdana</option>
          <option value="Tahoma, Geneva, sans-serif">Tahoma</option>
          <option value="'Courier New', Courier, monospace">Courier New</option>
          <option value="'Georgia', serif">Georgia</option>
        </select>
      </div>
      <div class="grid-item">
        <label for="blockFontSize">{{$t('form.fontSize')}}</label>
        <input v-model="settings.block.fontSize" id="blockFontSize" type="number" placeholder="18" />
      </div>
    </div>

    <!-- Tower Settings Section -->
    <h3>{{$t('form.towerSettings')}}</h3>
    <div class="grid-container">
      <!--<div class="grid-item">
        <label for="towerWidth">{{$t('form.width')}}</label>
        <input v-model="settings.tower.width" id="towerWidth" type="number" placeholder="200" />
      </div>
      <div class="grid-item">
        <label for="towerPadding">{{$t('form.padding')}}</label>
        <input v-model="settings.tower.padding" id="towerPadding" type="number" placeholder="10" />
      </div>
      <div class="grid-item">
        <label for="towerGap">{{$t('form.gap')}}</label>
        <input v-model="settings.tower.gap" id="towerGap" type="number" placeholder="20" />
      </div>-->
      <div class="grid-item">
        <label for="towerBackgroundColor">{{$t('form.backgroundColor')}}</label>
        <input v-model="settings.tower.backgroundColor" id="towerBackgroundColor" type="color" />
      </div>
      <div class="grid-item">
        <label for="towerStrokeColor">{{$t('form.borderColor')}}</label>
        <input v-model="settings.tower.strokeColor" id="towerStrokeColor" type="color" />
      </div>
      <div class="grid-item">
        <label for="towerTextColor">{{$t('form.textColor')}}</label>
        <input v-model="settings.tower.textColor" id="towerTextColor" type="color" />
      </div>
      <div class="grid-item">
        <label for="towerFontFamily">{{$t('form.fontFamily')}}</label>
        <select v-model="settings.tower.fontFamily" id="towerFontFamily">
          <option value="Arial">Arial</option>
          <option value="'Times New Roman', Times, serif">Times New Roman</option>
          <option value="Verdana, Geneva, sans-serif">Verdana</option>
          <option value="Tahoma, Geneva, sans-serif">Tahoma</option>
          <option value="'Courier New', Courier, monospace">Courier New</option>
          <option value="'Georgia', serif">Georgia</option>
        </select>
      </div>
      <div class="grid-item">
        <label for="towerFontSize">{{$t('form.fontSize')}}</label>
        <input v-model="settings.tower.fontSize" id="towerFontSize" type="number" placeholder="16" />
      </div>
    </div>

    <!-- Box Settings Section -->
    <h3 class="border-b-2 border-green">{{$t('form.boxSettings')}}</h3>
    <div class="grid-container">
      <!--<div class="grid-item">
        <label for="boxPadding">{{$t('form.padding')}}</label>
        <input v-model="settings.box.padding" id="boxPadding" type="number" placeholder="10" />
      </div>
      <div class="grid-item">
        <label for="boxGap">{{$t('form.gap')}}</label>
        <input v-model="settings.box.gap" id="boxGap" type="number" placeholder="10" />
      </div>-->
      <div class="grid-item">
        <label for="boxBackgroundColor">{{$t('form.backgroundColor')}}</label>
        <input v-model="settings.box.backgroundColor" id="boxBackgroundColor" type="color" />
      </div>
      <div class="grid-item">
        <label for="boxStrokeColor">{{$t('form.borderColor')}}</label>
        <input v-model="settings.box.strokeColor" id="boxStrokeColor" type="color" />
      </div>
      <div class="grid-item">
        <label for="boxTextColor">{{$t('form.textColor')}}</label>
        <input v-model="settings.box.textColor" id="boxTextColor" type="color" />
      </div>
      <div class="grid-item">
        <label for="boxFontFamily">{{$t('form.fontFamily')}}</label>
        <select v-model="settings.box.fontFamily" id="towerFontFamily">
          <option value="Arial">Arial</option>
          <option value="'Times New Roman', Times, serif">Times New Roman</option>
          <option value="Verdana, Geneva, sans-serif">Verdana</option>
          <option value="Tahoma, Geneva, sans-serif">Tahoma</option>
          <option value="'Courier New', Courier, monospace">Courier New</option>
          <option value="'Georgia', serif">Georgia</option>
        </select>
      </div>
      <div class="grid-item">
        <label for="boxFontSize">{{$t('form.fontSize')}}</label>
        <input v-model="settings.box.fontSize" id="boxFontSize" type="number" placeholder="14" />
      </div>
    </div>

    <!-- Submit Button -->
    <button type="submit" class="btn-primary w-fit">{{$t('form.save')}}</button>
  </form>


</template>

<script setup>
import { useDataStore } from "@/stores/dataStore.js";
import { computed } from "vue";

// Define the event emitted to the parent
const emit = defineEmits(['form-submit']);

// Use the settings store
const dataStore = useDataStore();

// Access the settings
const settings = computed(() => dataStore.settings);


// Handle form submission
const submitForm = () => {
  dataStore.updateSettings(settings.value);
  emit('form-submit');
};
</script>
