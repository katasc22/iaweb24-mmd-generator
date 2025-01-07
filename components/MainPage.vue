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
      <div class="flex flex-col md:flex-row m-4 max-w-full ">
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
      <p>Blocks: {{blockCount}}, Towers: {{towerCount}}</p>
      <div class="w-[400px] flex flex-row justify-between mt-5">
        <button class="btn-primary"  @click="downloadSvg">{{$t("common.download")}}</button>
        <button class="btn-primary"  @click="reloadDiagram">{{$t("common.reload")}}</button>
      </div>


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
      blockCount: 0,
      towerCount: 0
    };
  },
  methods: {
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
          console.log("file:"+this.gridData);
          console.log("Read file: " + sheetData);

          // https://docs.sheetjs.com/docs/demos/frontend/vue#rows-and-columns
          // Initialize DataGrid for displaying sheet data
          this.initializeDataGrid(this.gridData);
          this.generateDiagram(this.gridData);
        }
      } catch (error) {
        this.errorMessage = `Error processing file: ${error.message}`;
      }
    },
    generateDiagram(jsonData) {
       this.blockCount=0;
       this.towerCount=0;
      let block = null;
      let tower = null;
      const data = {};
      console.log(jsonData);
      jsonData
          .slice(1)
          .forEach((row) => {
            console.log(row);
            if (row[0]?.trim()) {
              block = row[0];
              data[block] = {};
              this.blockCount++;
            }
            if (row[1]?.trim()) {
              tower = row[1];
              data[block][tower] = [];
              this.towerCount++;
            }
            if (row[2]?.trim()) {
              data[block][tower].push(row[2]);
            }
          });
      this.svg = generateMentalModelDiagram(data);
    },
    reloadDiagram(){
      this.generateDiagram(this.gridData);
    },
    downloadSvg() {
      if (!this.svg) {
        alert("No SVG content to download.");
        return;
      }

      // Create a Blob from the SVG content
      const blob = new Blob([this.svg], { type: "image/svg+xml" });

      // Create a temporary link element
      const link = document.createElement("a");

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Set the link attributes
      link.href = url;
      link.download = "mental-model-diagram.svg";

      // Append the link to the body (necessary for some browsers)
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Remove the link and revoke the URL
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
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
    handleEditorChange() {
    console.log("Changes detected in gridData. Rebuilding SVG...");
    this.generateDiagram(this.gridData); 
    },
    // ---------- End resizing logic ----------
  },
  watch: {
    gridData: {
      handler(newData) {
        console.log("Grid data modified:", newData);
        this.handleEditorChange();
      },
      deep: true, 
    },
  }
};
</script>

<style scoped>

</style>
