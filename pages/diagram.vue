<style>
.diagram svg {
  height: 100%;
}
</style>

<template>
  <div id="diagram" class="content-container">
    <div id="buttonbar" class="w-full flex flex-row justify-center mb-8">
      <!-- File Upload Input -->
      <!-- <label>{{$t("common.fileUpload")}}</label> -->
      <input
        type="file"
        ref="fileInput"
        @change="onFileChange"
        accept=".xlsx"
        class="hidden"
        style="display: none;"
      />

      <!-- Styled Button -->
      <button class="btn-primary" @click="triggerFileInput">
        {{$t("common.fileUpload")}}
      </button>

      <button class="btn-primary"  @click="downloadSvg">{{$t("common.downloadSVG")}}</button>
      <!-- <button class="btn-primary"  @click="handleDataChange(gridData)">{{$t("common.reload")}}</button> -->
      <button class="btn-primary" @click="downloadExcel">
        {{$t("common.downloadExcel")}}
      </button>

        <button
            class="btn-primary"
            @click="openModal"
        >
          {{$t("navbar.menu.settings") }}
        </button>
      <TransitionRoot appear :show="isOpen" as="template">
        <Dialog @close="closeModal" class="relative z-10">
          <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div
                class="flex min-h-full items-center justify-center p-4 mt-28 mb-16 text-center"
            >
              <TransitionChild
                  as="template"
                  enter="duration-300 ease-out"
                  enter-from="opacity-0 scale-95"
                  enter-to="opacity-100 scale-100"
                  leave="duration-200 ease-in"
                  leave-from="opacity-100 scale-100"
                  leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                    class="w-full max-w-screen-lg transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all"
                >
                  <div class="flex flex-col justify-start">
                    <MMForm @form-submit="closeModal"/>
                  </div>

                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

    </div>
    <div id="panelcontainer" class="flex flex-row flex-grow w-full max-h-[80vh] bg-white"> <!--max-w-screen-lg-->
        <div :style="{ flex: leftPanelFlex }" class="overflow-auto p-4">
          <h3>{{$t("common.fileContent")}}</h3>
          <div v-if="gridData.length" class="h-full w-full">
              <canvas-datagrid
                  :data="gridData"
                  :editable="true"
                  @data-changed="handleDataChange"
              ></canvas-datagrid>
          </div>
          <p v-else class="text-gray-500">{{$t("common.noContent")}}</p>
        </div>
        <div
            id="resizeHandle"
            class="w-2 cursor-col-resize"
            @mousedown="startResizing"
        >
        </div>
        <div :style="{ flex: rightPanelFlex }" class="overflow-auto p-4 flex flex-col">
          <h3>{{$t("common.svgView")}}</h3>
          <div v-if="svg" class="diagram h-full flex-auto mt-6 p-4 bg-white rounded shadow overflow-auto"
               v-html="svg">
          </div>
          <p v-else class="text-gray-500">{{$t("common.svgUnavailable")}}</p>
        </div>
    </div>
    <p>Blocks: {{blockCount}}, Towers: {{towerCount}}</p>
  </div>
</template>

<script setup>
  import {generateMentalModelDiagram} from "~/diagrams/mental-model-diagram";
  import {useDataStore} from "~/stores/dataStore";
  import {onMounted} from "vue";
  import { handleFileUpload } from "~/diagrams/fileUtils";
  import { utils, writeFile } from "xlsx";
  import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
  } from '@headlessui/vue'

  const dataStore = useDataStore();

  // Access shared data from the Pinia store
  const gridData = ref(dataStore.gridData);
  const diagramData = ref(dataStore.diagramData);
  const svg = ref(dataStore.svg);
  const blockCount = ref(dataStore.blockCount);
  const towerCount = ref(dataStore.towerCount);
  const fileName = ref(dataStore.fileName);
  const fileInput = ref(null);
  //settings popup:
  const isOpen = ref(false)

  // Panel resizing state
  let leftPanelFlex = ref(0.5);
  let rightPanelFlex = ref(0.5);
  let isResizing = false;
  let startX = 0;

  function closeModal() {
    isOpen.value = false
    svg.value = generateMentalModelDiagram(diagramData.value, dataStore.settings);
  }
  function openModal() {
    isOpen.value = true
  }

  async function onFileChange(event) {
  try {
    const sheetData = await handleFileUpload(event);
    fileName.value = event.target.files[0].name.split(".")[0]; // Extract the file name
    gridData.value = sheetData;

    generateDiagram(sheetData);
    dataStore.updateFileName(fileName.value);
    dataStore.updateGridData(sheetData);

    console.log("File processed successfully:", sheetData);
  } catch (error) {
    console.error("Error uploading file:", error.message);
    alert(`File upload failed: ${error.message}`);
  }
}


  onMounted(() => {
    if(gridData.value.length) {
      generateDiagram(gridData.value);
    }
  })

  // Watch for changes in gridData and regenerate the SVG
  watch(
      gridData,
      (newData) => {
        generateDiagram(newData);
      },
      { deep: true }
  );

  function triggerFileInput() {
    if (fileInput.value) {
      fileInput.value.click(); // Programmatically click the hidden input
    }
  }

  // Handle user edits to the grid data
  function handleDataChange(newData) {
    gridData.value = newData; // Update the local and store state
    dataStore.updateGridData(newData);
  }

  // Methods for resizing panels
  function startResizing(event) {
    isResizing = true;
    startX = event.clientX;
    document.addEventListener("mousemove", resizePanels);
    document.addEventListener("mouseup", stopResizing);
  }

  function resizePanels(event) {
    if (isResizing) {
      const deltaX = event.clientX - startX;
      const containerWidth = document.getElementById("panelcontainer").offsetWidth;

      // Calculate new flex values based on the deltaX
      const totalFlex = leftPanelFlex.value + rightPanelFlex.value;
      const newLeftFlex = leftPanelFlex.value + deltaX / containerWidth;
      const newRightFlex = totalFlex - newLeftFlex;

      // Constrain the panels so they don't exceed the parent's width
      if (newLeftFlex >= 0.1 && newRightFlex >= 0.1) {
        leftPanelFlex.value = newLeftFlex;
        rightPanelFlex.value = newRightFlex;
        startX = event.clientX; // Update startX for the next move
      }
    }
  }

  function stopResizing() {
    isResizing = false;
    document.removeEventListener("mousemove", resizePanels);
    document.removeEventListener("mouseup", stopResizing);
  }

  function downloadSvg() {
    if (!diagramData.value) {
      alert("No SVG content to download.");
      return;
    }

    const svg = generateMentalModelDiagram(diagramData.value, dataStore.settings);
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${fileName.value}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const downloadExcel = () => {
  if (!gridData.value.length) {
    alert("No data to download.");
    return;
  }

  const worksheet = utils.json_to_sheet(gridData.value, { skipHeader: false });
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Sheet1");

  writeFile(workbook, `${fileName.value || "updated-diagram-data"}.xlsx`);
};

  function generateDiagram(jsonData) {
    let newBlockCount = 0;
    let newTowerCount = 0;
    let block = null;
    let tower = null;
    const data = {};
    jsonData
        .slice(1)
        .forEach((row) => {
          if (row[0]?.trim()) {
            block = row[0];
            data[block] = {};
            newBlockCount++;
          }
          if (row[1]?.trim()) {
            tower = row[1];
            data[block][tower] = [];
            newTowerCount++;
          }
          if (row[2]?.trim()) {
            data[block][tower].push(row[2]);
          }
        });
    // Generate the SVG and update the state
    diagramData.value = data;
    const opts = dataStore.settings
    svg.value = generateMentalModelDiagram(data, opts);
    blockCount.value = newBlockCount;
    towerCount.value = newTowerCount;

    dataStore.updateDiagramData(diagramData.value, svg.value, newBlockCount, newTowerCount);
  }

</script>