<template>
  <div class="min-h-screen w-full pt-[50px] pb-[30px] flex flex-col items-center justify-center bg-gray-100">
    <h1 class="font-bold text-blue-500 mb-4">
      Mental Model Diagram Generator
    </h1>

    <h4 class="text-gray-700 m-4">
      This is a simple test page to verify all libraries are working.
    </h4>

    <!-- File Upload Input -->
    <label class="m-4">
      <input
          type="file"
          @change="handleFileUpload"
          accept=".xlsx"
      />
    </label>

    <!-- Display any error message -->
    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

    <!--split view-->
    <div class="w-full h-full flex bg-white mt-6 relative">
      <!-- Left panel (File content) -->
      <div :style="{ flex: leftPanelFlex }" class="bg-gray-100 overflow-auto p-4">
        <h3 class="text-lg font-bold text-gray-700 mb-4">File Content</h3>
        <div class="h-full w-full">
          <template v-if="gridData.length">
            <canvas-datagrid :data="gridData"></canvas-datagrid>
          </template>
          <p v-else class="text-gray-500">No file content available.</p>
        </div>
      </div>

      <!-- Resizable divider -->
      <div
        class="w-2 bg-gray-400 cursor-col-resize"
        @mousedown="startResizing"
      ></div>

      <!-- Right panel (SVG View) -->
      <div :style="{ flex: rightPanelFlex }" class="bg-gray-100 overflow-auto p-4">
        <h3 class="text-lg font-bold text-gray-700 mb-4">SVG View</h3>
        <p class="text-gray-500">SVG content is not yet available.</p>
      </div>
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
html,
body {
margin: 0;
padding: 0;
height: 100%;
}

</style>
