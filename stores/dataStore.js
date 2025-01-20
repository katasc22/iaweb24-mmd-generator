// src/stores/dataStore.js
import { defineStore } from "pinia";

export const useDataStore = defineStore("dataStore", {
  state: () => ({
    fileName: "", // Holds the name of the uploaded file
    gridData: [], // Holds the parsed Excel data
    diagramData: null, // Holds the generated diagram data
    svg: null, // Holds the generated SVG content
    blockCount: 0, // Count of blocks
    towerCount: 0, // Count of towers
  }),

  actions: {
    updateFileName(name) {
      this.fileName = name;
    },
    updateGridData(data) {
      this.gridData = data;
    },
    updateDiagramData(data, svg, blockCount, towerCount) {
      this.diagramData = data;
      this.svg = svg;
      this.blockCount = blockCount;
      this.towerCount = towerCount;
    },
    resetData() {
      this.fileName = "";
      this.gridData = [];
      this.diagramData = null;
      this.svg = null;
      this.blockCount = 0;
      this.towerCount = 0;
    },
  },
});