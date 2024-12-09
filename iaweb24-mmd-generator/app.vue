<template>
    <div class="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100">
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
        <button
            @click="selectFile"
        >
          Upload Excel File
        </button>
      </label>

      <div v-if="gridData" class="min-w-56 min-h-12 max-w-fit max-h-fit mt-6 p-4 bg-white rounded shadow">
        <h4 class="mb-4 text-center">Upload spreadsheet to see the canvas datagrid</h4>
        <div class="h-full w-full">
          <canvas-datagrid
              v-if="gridData.length"
              :data="gridData"
              :columns="columns"
          ></canvas-datagrid>
        </div>
      </div>
    </div>
</template>


<script>

import {read, utils} from "xlsx"
export default {
  data() {
    return {
      gridData: [], // Data from XLSX file
      errorMessage: '' // Error messages
    }
  },
  methods: {
    selectFile() {
      this.$refs.fileInput.click(); // Trigger file input dialog
    },
    async handleFileUpload(event) {
      console.log("handleFileUpload:", event)
      const file = event.target.files[0];
      console.log("File:", file.name)
      if (!file) {
        this.errorMessage = 'No file selected.';
        return;
      }

      // Reset previous data and error messages
      this.gridData = [];
      this.errorMessage = '';

      try {
        // Read the file using FileReader
        const data = await file.arrayBuffer() //this.readFile(file);

        // Parse the Excel file to JSON using SheetJS (XLSX)
        const workbook = read(data);

        // Get the first sheet name
        const firstSheetName = workbook.SheetNames[0];

        // Get the contents of the first sheet and convert to JSON
        const sheetData = utils.sheet_to_json(workbook.Sheets[firstSheetName], { header: 1 });

        if (sheetData.length === 0) {
          this.errorMessage = 'The file appears to be empty.';
        } else {
          this.gridData = sheetData;
          console.log("Read file: "+sheetData)

          //https://docs.sheetjs.com/docs/demos/frontend/vue#rows-and-columns
          //this.initializeDataGrid(sheetData);
        }

      } catch (error) {
        this.errorMessage = `Error processing file: ${error.message}`;
      }
    },
    readFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsBinaryString(file);
      });
    },
  }
}
</script>

<style scoped>
</style>
