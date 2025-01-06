<script setup>
const { setLocale } = useI18n()
</script>
<template>
  <Navbar/>
  <div class="bg-primary_light text-black w-full flex flex-col justify-center items-center">
    <div id ="home" class="content-container">
      <h2>{{$t("common.welcome")}}</h2>
      <p>{{$t("common.description")}}</p>
      <!-- File Upload Input -->
      <label>{{$t("common.fileUpload")}}</label>
      <input
          type="file"
          @change="handleFileUpload"
          accept=".xlsx"
          class="border-none my-10 w-[340px]"
      />
    </div>

    <div id="settings" class="content-container">
        <MMForm/>
      </div>
    <div id="diagram" class="content-container">
      <div class="flex flex-col md:flex-row m-10 max-w-full ">
        <div class="w-full h-full flex bg-white mt-6 relative ">
          <div :style="{ flex: leftPanelFlex }" class="overflow-auto p-4">
            <h3>{{$t("common.fileContent")}}</h3>
            <div class="h-full w-full min-h-[500px]">
              <template v-if="gridData.length">
                <canvas-datagrid :data="gridData"></canvas-datagrid>
              </template>
              <p v-else class="text-gray-500">{{$t("common.noContent")}}</p>
            </div>
          </div>
          <div
              class="w-2 cursor-col-resize"
              @mousedown="startResizing"
          >
          </div>
          <div :style="{ flex: rightPanelFlex }" class="overflow-auto p-4">
            <h3>{{$t("common.svgView")}}</h3>
            <div v-if="svg" class="mt-6 p-4 bg-white rounded shadow">
              <div class="h-auto w-screen overflow-auto">
                <div v-html="svg"></div>
              </div>
            </div>
            <p v-else class="text-gray-500">{{$t("common.svgUnavailable")}}</p>
          </div>
        </div>
      </div>
      <button class="btn-primary">{{$t("common.download")}}</button>
    </div>

  <!--Remove maybe later-->
    <div id="info" class="content-container w-2/3">
      <h2>{{$t("common.infos")}}</h2>
      <p>{{$t("common.addText")}}</p>
    </div>

    <div id="languageSettings" class="content-container">
      <h2>{{$t("common.languageSettings")}}</h2>
      <p>{{$t("common.selectLanguage")}}</p>
      <LanguageSwitcher/>
    </div>
  </div>
</template>


<script>
import { read, utils } from "xlsx";
import {generateMentalModelDiagram} from "~/diagrams/mental-model-diagram";
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
      svg:'',
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
          this.generateDiagram(sheetData);
        }
      } catch (error) {
        this.errorMessage = `Error processing file: ${error.message}`;
      }
    },
    generateDiagram(jsonData) {
      let block = null;
      let tower = null;
      const data = {};
      jsonData
          .slice(1)
          .forEach((row) => {
            console.log(row);
            if (row[0]?.trim()) {
              block = row[0];
              data[block] = {};
            }
            if (row[1]?.trim()) {
              tower = row[1];
              data[block][tower] = [];
            }
            if (row[2]?.trim()) {
              data[block][tower].push(row[2]);
            }
          });
      this.svg = generateMentalModelDiagram(data);
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