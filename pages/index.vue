<template>
  <div id="home">
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
</template>

<script setup>
  import { read, utils } from "xlsx";
  import { useDataStore } from "~/stores/dataStore";

  // Use the Pinia store
  const dataStore = useDataStore();
  async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) {
      alert("No file selected.");
      return;
    }

    const fileName = file.name.slice(0, file.name.lastIndexOf("."));

    // Read the file
    const data = await file.arrayBuffer();
    try {
      const workbook = read(data);
      const firstSheetName = workbook.SheetNames[0];
      const sheetData = utils.sheet_to_json(workbook.Sheets[firstSheetName], { header: 1 });

      if (sheetData.length === 0) {
        alert("The file appears to be empty.");
      } else {
        // Update the store with the parsed data
        dataStore.updateFileName(fileName);
        dataStore.updateGridData(sheetData);
      }
    } catch (error) {
      alert(`Error processing file: ${error.message}`);
    }
  }
</script>
