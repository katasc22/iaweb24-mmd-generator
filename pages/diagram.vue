
<template>
  <div id="diagram" class="flex flex-col items-center w-screen h-screen">
    <h2>{{$t('diagram.yourMentalModelDiagram')}}</h2>
    <div id="panelcontainer" class="flex flex-row max-w-[1000px] w-full bg-white">
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
        <div :style="{ flex: rightPanelFlex }" class="overflow-auto p-4">
          <h3>{{$t("common.svgView")}}</h3>
          <div v-if="svg" class="mt-6 p-4 bg-white rounded shadow">
            <div class="h-auto w-full overflow-auto">
              <div v-html="svg"></div>
            </div>
          </div>
          <p v-else class="text-gray-500">{{$t("common.svgUnavailable")}}</p>
        </div>
    </div>
    <p>Blocks: {{blockCount}}, Towers: {{towerCount}}</p>
    <div class="w-full flex flex-row justify-center mt-5">
      <button class="btn-primary"  @click="downloadSvg">{{$t("common.download")}}</button>
      <button class="btn-primary"  @click="handleDataChange(gridData)">{{$t("common.reload")}}</button>
    </div>
  </div>
</template>

<script setup lang="ts"> //is this necessary to use diagramoptions type??
  import {generateMentalModelDiagram, DiagramOptions} from "~/diagrams/mental-model-diagram"
  import {useDataStore} from "~/stores/dataStore"
  import {onMounted} from "vue"

  const dataStore = useDataStore();

  // Access shared data from the Pinia store
  const fileName = ref(dataStore.fileName);
  const gridData = ref(dataStore.gridData);
  const diagramData = ref(dataStore.diagramData);
  const svg = ref(dataStore.svg);
  const blockCount = ref(dataStore.blockCount);
  const towerCount = ref(dataStore.towerCount);

  // Panel resizing state
  let leftPanelFlex = ref(0.5);
  let rightPanelFlex = ref(0.5);
  let isResizing = false;
  let startX = 0;

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

    const svg = generateMentalModelDiagram(diagramData.value, {}, {forceSize: false});
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${fileName.value}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  }

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
    const opts: DiagramOptions = dataStore.settings as DiagramOptions //TODO?
    svg.value = generateMentalModelDiagram(data, opts, {forceSize: true});
    blockCount.value = newBlockCount;
    towerCount.value = newTowerCount;

    dataStore.updateDiagramData(diagramData.value, svg.value, newBlockCount, newTowerCount);
  }

</script>