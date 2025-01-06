<template>
    <form @submit.prevent="submitForm">
      <h1 class="border-b-2 border-green">Diagram Settings</h1>

      <h2 class="border-green">{{$t('form.fontSettings')}}</h2>
      <div class="grid-container">
        <!-- Tower Row -->
        <div class="grid-item label">{{$t('form.tower')}}</div>
        <div class="grid-item">
          <label for="towerFontFamily">{{$t('form.fontFamily')}}</label>
          <input v-model="settings.tower.fontFamily" id="towerFontFamily" type="text" placeholder="Arial" />
        </div>
        <div class="grid-item">
          <label for="towerFontSize">{{$t('form.fontSize')}}</label>
          <input v-model="settings.tower.fontSize" id="towerFontSize" type="number" placeholder="12" />
        </div>
        <div class="grid-item">
          <label for="towerFontWeight">{{$t('form.fontWeight')}}</label>
          <select v-model="settings.tower.fontWeight" id="towerFontWeight">
            <option value="normal">{{$t('form.normal')}}</option>
            <option value="bold">{{$t('form.bold')}}</option>
            <option value="lighter">{{$t('form.lighter')}}</option>
          </select>
        </div>
        <div class="grid-item">
          <label for="towerFontColor">{{$t('form.fontColor')}}</label>
          <input v-model="settings.tower.fontColor" id="towerFontColor" type="color" />
        </div>

        <!-- Summary Row -->
        <div class="grid-item label">{{$t('form.summary')}}</div>
        <div class="grid-item">
          <label for="summaryFontFamily">{{$t('form.fontFamily')}}</label>
          <input v-model="settings.summary.fontFamily" id="summaryFontFamily" type="text" placeholder="Arial" />
        </div>
        <div class="grid-item">
          <label for="summaryFontSize">{{$t('form.fontSize')}}</label>
          <input v-model="settings.summary.fontSize" id="summaryFontSize" type="number" placeholder="12" />
        </div>
        <div class="grid-item">
          <label for="summaryFontWeight">{{$t('form.fontWeight')}}</label>
          <select v-model="settings.summary.fontWeight" id="summaryFontWeight">
            <option value="normal">{{$t('form.normal')}}</option>
            <option value="bold">{{$t('form.bold')}}</option>
            <option value="lighter">{{$t('form.lighter')}}</option>
          </select>
        </div>
        <div class="grid-item">
          <label for="summaryFontColor">{{$t('form.fontColor')}}</label>
          <input v-model="settings.summary.fontColor" id="summaryFontColor" type="color" />
        </div>

        <!-- Mental Space Row -->
        <div class="grid-item label">{{$t('form.mentalSpace')}}</div>
        <div class="grid-item">
          <label for="mentalSpaceFontFamily">{{$t('form.fontFamily')}}</label>
          <input v-model="settings.mentalSpace.fontFamily" id="mentalSpaceFontFamily" type="text" placeholder="Arial" />
        </div>
        <div class="grid-item">
          <label for="mentalSpaceFontSize">{{$t('form.fontSize')}}</label>
          <input v-model="settings.mentalSpace.fontSize" id="mentalSpaceFontSize" type="number" placeholder="18" />
        </div>
        <div class="grid-item">
          <label for="mentalSpaceFontWeight">{{$t('form.fontWeight')}}</label>
          <select v-model="settings.mentalSpace.fontWeight" id="mentalSpaceFontWeight">
            <option value="normal">{{$t('form.normal')}}</option>
            <option value="bold">{{$t('form.bold')}}</option>
            <option value="lighter">{{$t('form.lighter')}}</option>
          </select>
        </div>
        <div class="grid-item">
          <label for="mentalSpaceFontColor">{{$t('form.fontColor')}}</label>
          <input v-model="settings.mentalSpace.fontColor" id="mentalSpaceFontColor" type="color" />
        </div>
      </div>

      <h2 class="border-t-2 border-green">{{$t('form.otherSettings')}}</h2>
      <div>{{$t('form.todo')}}</div>

      <button type="submit" class="btn-primary">{{$t('form.submit')}}</button>
    </form>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        tower: {
          fontFamily: 'Arial',
          fontSize: 12,
          fontWeight: 'normal',
          fontColor: '#000000',
        },
        summary: {
          fontFamily: 'Arial',
          fontSize: 12,
          fontWeight: 'normal',
          fontColor: '#000000',
        },
        mentalSpace: {
          fontFamily: 'Arial',
          fontSize: 18,
          fontWeight: 'normal',
          fontColor: '#000000',
        },
      },
      previewStyle: {
        tower: {},
        summary: {},
        mentalSpace: {},
      },
    };
  },
  methods: {
    submitForm() {
      this.previewStyle.tower = {
        fontFamily: this.settings.tower.fontFamily,
        fontSize: `${this.settings.tower.fontSize}px`,
        fontWeight: this.settings.tower.fontWeight,
        color: this.settings.tower.fontColor,
      };

      this.previewStyle.summary = {
        fontFamily: this.settings.summary.fontFamily,
        fontSize: `${this.settings.summary.fontSize}px`,
        fontWeight: this.settings.summary.fontWeight,
        color: this.settings.summary.fontColor,
      };

      this.previewStyle.mentalSpace = {
        fontFamily: this.settings.mentalSpace.fontFamily,
        fontSize: `${this.settings.mentalSpace.fontSize}px`,
        fontWeight: this.settings.mentalSpace.fontWeight,
        color: this.settings.mentalSpace.fontColor,
      };
    },
  },
};
</script>
