<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <h2 class="border-b-2 border-green">Font Settings</h2>
      <div class="grid-container">
        <!-- Tower Row -->
        <div class="grid-item label">Tower</div>
        <div class="grid-item">
          <label for="towerFontFamily">Font Family</label>
          <input v-model="settings.tower.fontFamily" id="towerFontFamily" type="text" placeholder="Arial" />
        </div>
        <div class="grid-item">
          <label for="towerFontSize">Font Size</label>
          <input v-model="settings.tower.fontSize" id="towerFontSize" type="number" placeholder="12" />
        </div>
        <div class="grid-item">
          <label for="towerFontWeight">Font Weight</label>
          <select v-model="settings.tower.fontWeight" id="towerFontWeight">
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="lighter">Lighter</option>
          </select>
        </div>
        <div class="grid-item">
          <label for="towerFontColor">Font Color</label>
          <input v-model="settings.tower.fontColor" id="towerFontColor" type="color" />
        </div>

        <!-- Summary Row -->
        <div class="grid-item label">Summary</div>
        <div class="grid-item">
          <label for="summaryFontFamily">Font Family</label>
          <input v-model="settings.summary.fontFamily" id="summaryFontFamily" type="text" placeholder="Arial" />
        </div>
        <div class="grid-item">
          <label for="summaryFontSize">Font Size</label>
          <input v-model="settings.summary.fontSize" id="summaryFontSize" type="number" placeholder="12" />
        </div>
        <div class="grid-item">
          <label for="summaryFontWeight">Font Weight</label>
          <select v-model="settings.summary.fontWeight" id="summaryFontWeight">
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="lighter">Lighter</option>
          </select>
        </div>
        <div class="grid-item">
          <label for="summaryFontColor">Font Color</label>
          <input v-model="settings.summary.fontColor" id="summaryFontColor" type="color" />
        </div>

        <!-- Mental Space Row -->
        <div class="grid-item label">Mental Space</div>
        <div class="grid-item">
          <label for="mentalSpaceFontFamily">Font Family</label>
          <input v-model="settings.mentalSpace.fontFamily" id="mentalSpaceFontFamily" type="text" placeholder="Arial" />
        </div>
        <div class="grid-item">
          <label for="mentalSpaceFontSize">Font Size</label>
          <input v-model="settings.mentalSpace.fontSize" id="mentalSpaceFontSize" type="number" placeholder="18" />
        </div>
        <div class="grid-item">
          <label for="mentalSpaceFontWeight">Font Weight</label>
          <select v-model="settings.mentalSpace.fontWeight" id="mentalSpaceFontWeight">
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="lighter">Lighter</option>
          </select>
        </div>
        <div class="grid-item">
          <label for="mentalSpaceFontColor">Font Color</label>
          <input v-model="settings.mentalSpace.fontColor" id="mentalSpaceFontColor" type="color" />
        </div>
      </div>
      <h2 class="border-b-2 border-green">Other Settings</h2>
      <div>TODO</div>


      <button type="submit">Submit</button>
    </form>

    <!--<div class="form-preview">
      <h3>Preview</h3>
      <div :style="previewStyle.tower">
        <p>Tower Sample Text</p>
      </div>
      <div :style="previewStyle.summary">
        <p>Summary Sample Text</p>
      </div>
      <div :style="previewStyle.mentalSpace">
        <p>Mental Space Sample Text</p>
      </div>
    </div>-->
  </div>
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
