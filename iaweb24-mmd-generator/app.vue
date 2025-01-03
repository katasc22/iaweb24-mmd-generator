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
        <!-- <button @click="createDiagram">
          Upload Excel File
        </button>-->
      </label>

      <!-- Display any error message -->
      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

      <div v-if="svg" class="mt-6 p-4 bg-white rounded shadow">
        <h4 class="mb-4 text-center">Result</h4>
        <div class="h-auto w-screen overflow-auto">
          <div v-html="svg"></div>
        </div>
      </div>

      <div v-if="gridData" class="min-w-56 min-h-12 max-w-fit max-h-fit mt-6 p-4 bg-white rounded shadow">
        <h4 class="mb-4 text-center">Upload spreadsheet to see the canvas datagrid</h4>
        <div class="h-full w-full">
          <canvas-datagrid
              v-if="gridData.length"
              :data="gridData"
          ></canvas-datagrid>
        </div>
      </div>
    </div>
</template>


<script>

import {read, utils} from "xlsx"
import {generateMentalModelDiagram} from "~/diagrams/mental-model-diagram";

export default {
  data() {
    return {
      gridData: [], // Data from XLSX file
      svg: '',
      errorMessage: '' // Error messages
    }
  },
  methods: {
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

      // Read the file using FileReader, attention do not use await in a try catch block -> nuxt has context errors if so
      const data = await file.arrayBuffer()
      try {
        // Parse the Excel file to JSON using SheetJS (XLSX) https://docs.sheetjs.com/docs/api/parse-options
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

        this.generateDiagram(sheetData);
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
  }
}
</script>

<style scoped>
</style>
