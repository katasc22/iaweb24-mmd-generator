<script setup>
const { setLocale } = useI18n()
</script>
<template>
  <Navbar/>
  <div
      class="bg-primary_light text-black min-h-screen w-full flex flex-col"
  >
    <div class="w-full min-h-screen flex flex-col px-[20px] py-32 text-center justify-center items-center mx-auto">
      <h2>Welcome!</h2>
      <p>This is an open-source webpage to generate mental model diagrams from spreadsheets. Please, select a file:</p>
      <!-- File Upload Input -->
      <input
          type="file"
          @change="handleFileUpload"
          accept=".xlsx"
          class="border-none my-16 w-[340px] text-2xl"
      />
      <MMForm/>

      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

      <a id="diagram"/>
      <div class="flex flex-col md:flex-row mb-10">
        <!--split view-->
        <div class="w-full h-full flex bg-white mt-6 relative">
          <!-- Left panel (File content) -->
          <div :style="{ flex: leftPanelFlex }" class="overflow-auto p-4">
            <h3>File Content</h3>
            <div class="h-full w-full min-h-[500px]">
              <template v-if="gridData.length">
                <canvas-datagrid :data="gridData"></canvas-datagrid>
              </template>
              <p v-else>No file content available.</p>
            </div>
          </div>

          <!-- Resizable divider -->
          <div
              class="w-2 cursor-col-resize"
              @mousedown="startResizing"
          ></div>

          <!-- Right panel (SVG View) -->
          <div :style="{ flex: rightPanelFlex }" class="overflow-auto p-4">
            <h4>SVG View</h4>
            <p class="text-gray-500">SVG content is not yet available.</p>
            <img src="assets/img/MoviegoersDataset.png" alt="a mental model diagram">
          </div>
        </div>
      </div>

      <h2>Infos</h2>
      <p> add some text here i guess</p>

      <h2>Language Settings</h2>
      <p> Select your Language:</p>
      <template>
        <div>
          <div>
            <button @click="setLocale('en')">en</button>
            <button @click="setLocale('fr')">fr</button>
            <button @click="setLocale('de')">de</button>
            <p>{{ $t('welcome') }}</p>
          </div>
        </div>
      </template>


    </div>
  </div>
</template>

<script>
import { read, utils } from "xlsx";
export default {
  data() {
    return {
      gridData: [], // Data from XLSX file
      errorMessage: "", // Error messages
      leftPanelFlex: 0.5, // Initial proportion (50%)
      rightPanelFlex: 0.5, // Initial proportion (50%)
      isResizing: false, // Track resizing state
      startX: 0, // Track mouse start position for resizing
      minFlex: 0.01,
      maxFlex: 0.99,
    };
  },
  methods: {
    createDiagram() {
      console.log("TODO");
    },
    async handleFileUpload(event) {
      console.log("handleFileUpload:", event);
      const file = event.target.files[0];
      console.log("File:", file.name);
      if (!file) {
        this.errorMessage = "No file selected.";
        return;
      }

      // Reset previous data and error messages
      this.gridData = [];
      this.errorMessage = "";

      // Read the file using FileReader
      const data = await file.arrayBuffer();
      try {
        const workbook = read(data);
        const firstSheetName = workbook.SheetNames[0];
        const sheetData = utils.sheet_to_json(
            workbook.Sheets[firstSheetName],
            { header: 1 }
        );

        if (sheetData.length === 0) {
          this.errorMessage = "The file appears to be empty.";
        } else {
          this.gridData = sheetData;
          console.log("Read file: " + sheetData);

          // https://docs.sheetjs.com/docs/demos/frontend/vue#rows-and-columns
          // Initialize DataGrid for displaying sheet data
          this.initializeDataGrid(sheetData);
        }
      } catch (error) {
        this.errorMessage = `Error processing file: ${error.message}`;
      }
    },
    initializeDataGrid(sheetData) {
      console.log("Initializing DataGrid with:", sheetData);
      // Placeholder for additional DataGrid setup if needed
      this.gridData = sheetData;
    },
    // ---------- Added resizing logic ----------
    startResizing(event) {
      this.isResizing = true;
      this.startX = event.clientX;
      document.addEventListener("mousemove", this.resizePanels);
      document.addEventListener("mouseup", this.stopResizing);
    },
    resizePanels(event) {
      if (this.isResizing) {
        const deltaX = event.clientX - this.startX;
        this.startX = event.clientX;
        const totalWidth = window.innerWidth;
        const newLeftFlex = Math.max(
            this.minFlex,
            Math.min((this.leftPanelFlex * totalWidth + deltaX) / totalWidth, this.maxFlex)
        );
        this.leftPanelFlex = newLeftFlex;
        this.rightPanelFlex = 1 - this.leftPanelFlex;
      }
    },
    stopResizing() {
      this.isResizing = false;
      document.removeEventListener("mousemove", this.resizePanels);
      document.removeEventListener("mouseup", this.stopResizing);
    },
    // ---------- End resizing logic ----------
  },
};
</script>

<style scoped>

</style>